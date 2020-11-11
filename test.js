(function (w) {
    function MyPromise(executor) {
        const that = this;
        that._status = "pending";
        that._result = undefined;
        that._callbacks = {};
        function resolve(value) {
            if (that._status !== "pending") return;
            that._status = "resolved";
            that._result = value;
            setTimeout(function () {
                that._callbacks.onResolved?.(value);
            }, 0);
        }
        function reject(reason) {
            if (that._status !== "pending") return;
            that._status = "rejected";
            that._result = reason;

            setTimeout(function () {
                that._callbacks.onRejected?.(reason);
            }, 0);
        }
        executor(resolve, reject);
    }
    MyPromise.prototype.then = function (onResolved, onRejected) {
        const that = this;
        return new MyPromise(function (resolve, reject) {
            that._callbacks.onResolved = function (value) {
                try {
                    
                    const result = onResolved(value);

                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (e) {
                    reject(e);
                }
            };

            that._callbacks.onRejected = function (reason) {
                try {
                    const result = onRejected(reason);
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (e) {
                    reject(e);
                }
            };
        });
    };

    MyPromise.prototype.catch = function (onRejected) {
        return this.then(undefined, onRejected);
    };


    w.MyPromise = MyPromise;
})(window);