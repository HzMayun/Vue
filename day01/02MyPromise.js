(function (w) {

    function MyPromise(executor) {
        const that = this
        that._status = 'pending'
        that._callback = {}

        function resolve(res) {
            if (that._status !== 'pending') return
            that._status = 'resolve'
            setTimeout(() => {
                // console.log(that._callback.onResolved);
                that._callback.onResolved?.(res)
            }, 0)
        }

        function reject(rej) {
            if (that._status !== 'pending') return
            that._status = 'reject'
            setTimeout(() => {
                // console.log(that._callback.onResolved);
                that._callback.onRejected?.(rej)
            }, 0)
        }

        executor(resolve, reject)
    }

    //then函数 
    MyPromise.prototype.then = function (onResolved, onRejected) {
        const that = this
        onRejected = typeof onRejected === 'function' ? onRejected : (rej) => { throw rej }
        onResolved = typeof onResolved === "function" ? onResolved : (value) => value
        // that._callback.onRejected = onRejected
        return new MyPromise(function (resolve, reject) {
            that._callback.onResolved = function (res) {
                try {
                    const result = onResolved(res)
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject)
                    } else {
                        resolve(result)
                    }
                } catch (err) {
                    console.log("catch报错", err);
                    reject(err)
                    // console.log("catch报错",err);
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

                catch (err) {
                    console.log("catch报错", err);
                    reject(err)
                    // console.log("catch报错",err);
                }
            }

        })

    }





    w.MyPromise = MyPromise
}(window))