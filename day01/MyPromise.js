(
    function (w) {
        function MyPromise(executor) {
            //promise对象就是this-->new关键字 ·
            const that = this
            //初始化promise是pending状态 
            // 下划线表示是私有状态，外部不允许操作 
            that._status = 'pending'

            //用来存储失败成功函数（成功会调用then方法中的onResolved，失败会调用onRejected）
            that._callback = {}

            function resolve(res) {
                // 如果_status不是pending状态，直接返回。保证promise的状态只能被修改一次
                if (that._status !== 'pending') return
                // 调用resolve函数，即表示成功
                // console.log('成功');
                that._status = 'resolved'
                setTimeout(function () {
                    //有可能没有绑定then方法 
                    that._callback.onResolved?.(res)   //判断有没有 ？有就调用 ，没有就不调用
                    // console.log(that._callback.onResolved);
                }, 0)
            }
            function reject(rej) {
                if (that._status !== 'pending') return
                that._status = 'rejected'
                // console.log('失败');
                setTimeout(function () {
                    that._callback.onRejected?.(rej)
                }, 0)
            }
            //同步调用，promise的参数是一个同步调用函数，里面有两个参数，也是函数类型，分别是resolve和reject
            // 调用不同的参数（函数类型，）返回不同的状态 
            executor(resolve, reject)
        }

        MyPromise.prototype.then = function (onResolved, onRejected) {
            const that = this
            onRejected = typeof onRejected === 'function' ? onRejected : (rej) => { throw rej }

            onResolved = typeof onResolved === "function" ? onResolved : (value) => value

            return new MyPromise(function (resolve, reject) {

                that._callback.onResolved = function (res) {
                    try {

                        const result = onResolved(res);
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

                that._callback.onRejected = function (rej) {
                    try {
                        const result = onRejected(rej);
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
        w.MyPromise = MyPromise
    }(window)
)