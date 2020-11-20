class EventEmmiter {
    constructor() {
        this._events = {
            //  eventName : [listener1,listener2....]
        }
    }
    //绑定事件
    on(eventName, listener) {
        if (this._events[eventName]) {
            this._events[eventName].push(listener)
        } else {
            this._events[eventName] = [listener]
        }
    }
    //触发事件
    emit(eventName, ...data) {
        if (!this._events[eventName]) {  //如果里面有没有回调函数，直接返回
            return
        }
        //依次调用eventName数组里面的回调函数（可能有多个回调函数， ...data  将数组展开赋值） 
        this._events[eventName].forEach(listener => listener(...data));
    }
    //解绑事件
    off(eventName, listener) {
        if (!this._events[eventName]) {
            return
        }
        if (listener) { //传入了回调函数
            this._events[eventName] = this._events[eventName].filter(
                (lis) => lis !== listener
            );
        } else {   //如果没有传入，则将所有的回到函数全部解绑
            this._events[eventName] = null
        }
    }
    //绑定一次性事件
    once(eventName, listener) {
        const lis = (...data) => {
            this.off(eventName, lis) // 解绑事件
            listener(...data)  // 触发事件回调函数
        }
        this.on(eventName, lis)
    }
}

const a = {}
console.log(a[1]); 