function MVVM(options) { //options 就是创建实例时西环路的对象{el:"#app",data:{...}}
  this.$options = options; //给实例对象绑定$options属性
  var data = (this._data = this.$options.data); //data等于_data  :  {msg: "heelo , wang !"}==> (options上的data对象)
  var me = this; //me 为这个实例对象
  Object.keys(data).forEach(function (key) {    //key 就是msg ，因为这里data只有一个（元素）key ：msg
    me._proxy(key);  //me调用_proxy()方法，传入key（这里就是msg）  _proxy是真正数据代理的方法，在MVVM原型上
  });


  observe(data, this);
  this.$compile = new Compile(options.el || document.body, this);


}
MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  /**
   * 数据代理的方法
   * @param {String} key data中属性名
   */
  _proxy: function (key) {
    // 缓存this
    var me = this;      //上面可知道，me._proxy(key);me调用了这个方法，，那么这个方法的this就指向me.这里有定义了一下。（作用域的关系），目的是保证 this=me=实例对象
    Object.defineProperty(me, key, {    //给 me 添加了key（msg）属性，属性值为后面的对象 {}，一把没在里面是{get(){}，set(){} } 
      //这里的msg是新加上去的属性，但是读、取操作的返回值 都是原始数据中的，这样就实现了数据代理
      //访问的时候，可以直接this.msg 就可以访问到了，this是实例对象 而不需要this.data.msg来访问
      configurable: false,
      enumerable: true,
      get: function proxyGetter() {
        return me._data[key];  //读取key的时候，返回 me._data[key], me.[_data] ==> {msg: "heelo , wang !"},  key==>msg ,  相当于这里反回了原始数据
        //
      },
      set: function proxySetter(newVal) {
        me._data[key] = newVal;
      },
    });
  },
};
