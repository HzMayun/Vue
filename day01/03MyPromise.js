(function (w) {
    function MyPromise(executor) {
        const that = this
        that._status = 'pending'
        that._callback = {}

        function resolve(res) {
            if (that._status !== 'pending')  return;
                that._status = 'resolve'
            setTimeout(() => {
                that._callback.onResolved?.(res)
            }, 0)
        }
        function reject(rej) {
            if (that._status !== 'pending') return;
                that._status = 'reject'
            setTimeout(function () {
                that._callback.onRejected?.(rej)
            }, 0)
        }
        executor(resolve, reject)
    }
    MyPromise.prototype.then = function (onResolved, onRejected) {
        const that = this
        //为了解决 then失败的时候，第二个参数不懈的情况下， onRejected依然会被调用，会报错 不是函数。
        onRejected = typeof onRejected === 'function' ? onRejected : (rej) => { throw rej }

        //
        onResolved = typeof onResolved === 'function' ? onResolved : (res) => res
        // onResolved = typeof onResolved === "function" ? onResolved : (value) => value


        return new MyPromise(function (resolve, reject) {
            that._callback.onResolved = function (res) {
                try {
                    const result = onResolved(res)
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject)
                    } else {
                        resolve(result)
                    }
                }
                catch (error) {
                    // console.log(err);
                    reject(error)
                }
            }
            that._callback.onRejected = function (rej) {
                try {
                    const result = onRejected(rej)
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject)
                    } else {
                        resolve(result)
                    }
                }
                catch (error) {
                    reject(error)
                }
            }

        })
    }
    MyPromise.prototype.catch = function (onRejected) {
        return this.then(undefined, onRejected)
    }



    /* MyPromise.resolve = function (res) {
        if (res instanceof MyPromise) {
            return res;
        } else {
            
            return new MyPromise((resolve) => {
                resolve(res)
            })
        }
    }; */

    MyPromise.resolve = function (value) {
        if (value instanceof MyPromise) {
            return value;
        } else {
            console.log(value);
            console.log(123);
            return new MyPromise((resolve) => resolve(value));
        }
    };

    MyPromise.reject = function (reason) {
        return new MyPromise((resolve, reject) => reject(reason));
    };



    MyPromise.reject = function (rej) {
        return new MyPromise((resolve, reject) => {
            reject(rej)
        })
    };

    MyPromise.all = function (promises) {
        return new MyPromise((resolve, reject) => {
            const result = []
            const total = promises.length;
            let count = 0
            // 判断item是否是promise
            // 是 判断promise的状态，通过then
            // 不是 就当做成功的promise使用
            promises.forEach((item, index) => {
                if (item instanceof MyPromise) {
                    item.then((res, rej) => {
                        result[index] = res
                        count++
                        if (count === total) {
                            return resolve(result)
                        }
                    }, reject)
                } else {
                    result[index] = item
                    count++
                    if (count === total) {
                        return resolve(result)
                    }
                }
            });
        })

    };

    MyPromise.allSetteld = function (promises) {
        return new MyPromise((resolve) => {

            const tatol = promises.length
            let count = 0
            const result = []
            promises.forEach((item, index) => {
                if (item instanceof MyPromise) {
                    item.then((res) => {
                        result[index] = {
                            status: 'resolved',
                            res
                        }
                        count++
                        if (count === tatol) {
                            resolve(result)
                        }
                    }, (rej) => {
                        result[index] = {
                            status: 'rejected',
                            rej
                        }
                        count++
                        if (count === tatol) {
                            resolve(result)
                        }
                    })
                } else {
                    result[index] = {
                        status: 'resloved',
                        res: item
                    }
                    count++
                    if (count === tatol) {
                        resolve(result)
                    }
                }
            })



        })
    };




    w.MyPromise = MyPromise
}(window))