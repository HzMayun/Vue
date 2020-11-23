### 

### 第一章：vue基础

####一、Vue基本认识

#####1、vue实例化对象的结构

​		vue内部对data、methods、computed、等属性进行了数据代理（将对象中的属性挂在了VM上），这样就能直接通过 vm/this.属性 来使用了

````js
//1、引入vue.js
//2、创建vue对象
	new Vue({
        el:"#root",
        data:{....},   //初始化数据的 ·
        methods:{....}, // vue对象中的方法（事件触发函数）
        computed:{    //计算属性，会监视内部使用的属性的变化，一旦其发生了变化，计算属性就会更新
        	fullName：{    //要计算的属性 
            get(){},	  //当fullName被访问时触发
            set(value){},	  //当fullName被修改时触发
        }
        },//计算属性
        watch:{   			//监视属性，监视data中的属性，
            fullName(value){
                ...
                对属性fullName的操作     //一旦该函数就会调用fullName属性发生了变化，
            }
        }
        
    })
````

##### 2、模板语法

###### 	1、双大括号表达式

```js
<h1> {{msg}} </h1>    //会将data里面的 msg 当做h1标签打印出来
......
new Vue({             //{{ 表达式 }}：只能放表达式，不可以放语句
    data:{
        msg:"你好"
    }
})
```

###### 	2、一些常用的指令

​			①、数据双向绑定 v-model="msg"  

```js
<input type/text:text v-model=" msg " />  //input中的默认值就是“你好”，当改变js代码中的msg的时候，input视图中的msg也会变化，当在input视图中改变msg的时候（就是改变input框中的值），js中的msg 也会发生变化 
<h1>{{msg}}</h1>     //就是input中输入什么，这你就会变成什么
...
new Vue({             
    data:{
        msg:"你好"
    }
})
```

​			②、数据强制绑定（单向 js-->html ）:  v-bind

```js
格式 ：   v-bind:prpoName = "表达式"
	简写 ：   :prpoName = "表达式"
```

​			③、绑定DOM事件 

```js
v-on:eventName = "事件回调函数"
简写 ：@eventName = "事件回调函数"

```

###### 	3、计算属性和监视

```js
new Vue({
  el: "#app",
  data: {
    firstName: "王",
    lastName: "八蛋",
    fullName3:"王 八"
  },
    
    
  //计算fullName的值，使用计算
  computed: {
    fullName: {        //这里的fullName属性也是可以直接通过this.fullName 得到的
      set(value) {     //当访问fullName的时候 触发该函数
        const [firstName, lastName] = value.split(" ")
        this.firstName = firstName
        this.lastName = lastName
      },
      get() {		 //当修改fullName的时候 触发该函数
        return fullName = this.firstName + " " + this.lastName
      }
    },
    fullName1:{
      get() {
        return fullName = this.firstName + " " + this.lastName
      }
    }
  },
 //监视
watch:{
    //将data里面的属性当做函数定义   这里就是监视firstName的值，当发什么变化时，就调用该函数
    firstName(newVal){   
        const names = this.fullName3.split(" ");
        names[0] = newVal;
        this.fullName3 = names.join(" ");
    },
    //这里就是监视firstName的值，当发什么变化时，就调用该函数
    lastName(newVal) {
        const names = this.fullName3.split(" ");
        names[1] = newVal;
        this.fullName3 = names.join(" ");
      },
  }

})
```

######4、class与style绑定

​	使用场景 ：

- ​	如果样式将来是可变的用style，静态写死就用class
- ​     如果样式将来是可变
  - ​      但是只在某个范围变化（red --> green --> red），用class
  - ​      但是如果变化时无穷，用style
  - ​      静态写死就用class

```js
1、 class绑定: :class='xxx'

	//单个动态类名 用字符串形式 
     <p :class="isRed ? 'red' : 'green'">这是一段文字</p>    
     
     //多个动态类名 用字符串形式
     <p :class="{red: isRed, green: !isRed}">这是一段文字</p>    
     
     //数组形式的 一般不会这么写 写死了这就
 	 <p :class="['red', 'size']">这是一段文字~</p>            
     
      //这样会直接把“”里面的字符串当做类名的
  	 <p class="isRed ? 'red' : 'green'">这是一段文字~</p>    
     <button @click="changeColor">改变颜色</button>

2、style绑定
	 <p :style="{ 'fontSize': fontSize + 'px', color: 'red' }">这是一段文字~</p>
     <input type="text" placeholder="请输入字体大小" v-model="fontSize"/>
```

###### 5、条件渲染语句

①、条件渲染指令 ：

- v-if 
- v-else
- v-show

②、比较v-if 与v-show的区别 ：v-if 是直接删除了DOM元素，v-show是通过样式display：none来实现的

​				如果需要实现频繁切换使用v-show较好

```js
<h1 v-if="isShow" ></h1>
<h1 v-else="isShow"></h1>
<h1 v-show="isShow"></h1>
<button @click = "handleClick">按钮</button>
//通过设置data数据来控制true或者flase，v-if 和v-show = true时，会显示出来，else相反
new Vue({
    el:"..",
    data:{
    	isShow:true    
    },
    methods:{
        handleClick(){
            this.isShow = !this.isShow
        }
    }
})
```

###### 6、列表渲染 ######

v-for用来遍历数组(item,index)，与对象(value,key)

```js
 <li v-for="item in user" :key="item.id" >
      {{item.id}}-{{item.name}}-{{item.age}}--
      <button @click="del(item.id) ">删除</button>
      <button @click="updata">更新</button>
   </li>

new Vue({
      el: "#app",
      data: {
        user: [
          { id: 1, name: "小王", age: 13 },
          { id: 2, name: "小张", age: 12 },
          { id: 3, name: "阿伟", age: 43 },
          { id: 4, name: "王八蛋", age: 56 },
        ]
      },
    methods: {
        del(id) { //接收当前点击删除按钮对应li的id
         //将data中的user修改，user调用filter（），遍历数组，吧数组中id不是当前点击的id的数组项返回出来
         //相当于啊，我点的id是1，遍历后，就把id为1 的这一项不要了
          this.user = this.user.filter((item) => item.id !== id);
        },
        updata(){
          console.log(1)
        }
      }
```

###### 7、事件处理 ######

①、事件处理 v-on：xxx=“fun(a,b,c,…$$event)”   ，当并没有参数时，默认为event参数（自己手动加要写$）

②、事件修饰符：

- .prevent :阻止事件的默认行为  event.preventDefult()
- .stop: 停止事件冒泡  event.stopPropagation( )

③、按键修饰符 :     .keycode : 键盘的keycode       .enter : 回车 

###### 7、表单输入绑定  ######

使用v-model（双向数据绑定），自动收集数据

#### 二、生命周期 ####

##### 1、生命周期

###### ①、 初始化显示  ######

- beforeCreate()
- created()      
- beforeMount()
- mounted()

###### ②、更新状态 ######

- beforeUpdate()
- updated()

###### ③、销毁vue实例对象 ######

- beforeDestory()
- destoryed()

##### 2、常用的生命周期方法 #####

- created()/mounted(): 发送ajax请求, 启动定时器等异步任务
- beforeDestory(): 做收尾工作, 如: 清除定时器

````js
<div id="app">
    <button @click="$destroy()">停止</button>
    <div  id ="center" v-show="isShow">闪闪闪</div>
  </div>

new Vue({
      el: "#app",
      data: {
        isDisplay: true,
        isShow:true
      },
      mounted() {
        this.timer = setInterval(() => {
          this.isShow=!this.isShow
          console.log(111);
        }, 1000);
      },
      beforeDestroy(){
      clearInterval(this.timer)
     }
    })
````

#### 三、过滤器、指令、插件、key、

##### 1、filter 过滤器

​	对于要显示的数据，进行特定的格式化后再显示，不改变原本的数据，产生了新的数据

​	①、定义过滤器

```js
//定义全局filter
Vue.filter("filterName",(value[arg1,arg2...])=>{
    return newValue;
})

//定义局部filter （只有当前实例可以使用）
new Vue({
    el:"#...",
    filters:{
        filter(value[arg1,arg2,arg3...]){
        return newValue
    	}
    }
})
```

②、使用过滤器

```js
<div> {{myData | filterName }} </div>
<div> {{myData | filterName(arg) }} </div>
```

③、实例 ，把当前的时间以指定的格式打印

```js
<div id="app">
    <h2>显示格式化之后的当前时间:</h2>
    <h3>{{ time|forTime01('YYYY-MM-DD',123) }} 
      {{time|forTime('HH:mm:ss')}}
    </h3>
    <button @click="$destroy()">停止计时</button>
  </div>

 Vue.filter("forTime",(value,str)=>{
      return dayjs(value).format(str)        //dayjs是一个用来处理时间的js库 
    })
    new Vue({
      el:"#app",
      data:{
        time:Date.now()
      },
      mounted(){
        this.timer=setInterval(()=>{   //计时器放在Vue上 ，而不是实例上面 
          this.time = Date.now()   //每隔一秒调用计时器，重新获取当前时间
          console.log(1);
        },1000)
      },
      beforeDestroy(){
        clearInterval(this.timer)   //销毁计时器
      }

    })
```

##### 2、指令

①、常用的指令

- v-text ： 更新元素的text
- v-html ： 更新元素的 innerHTML
- v-if ：如果为true，当前标签显示（false是直接删除了）
- v-else ：如果为false ，显示
- v-show：如果为true，当前标签显示（display：none实现的 ）
- v-for：遍历数组或者对象
- v-on：绑定监听事件，可以直接用  :事件名   来使用
- v-bind\v-model  ： 单向 \双向数据绑定
- v-cloack ： 防止闪现，与css配合: [v-cloak] { display: none }
- v-pre：不会被预解析
- v-once：只执行一次
- 
- ref : 为某个元素注册唯一的标识，vue对象通过 $ref 属性来访问这个元素

```html
<div ref="name"></div>
this.refs.name   //获取DOM  
```



②、自定义指令

```js
// 1、注册全局指令
Vue.directive('myfirectiveName',(el,binding)=>{
    el.innerHTML  = binding.value().toLowerCase()
})
// 2、注册局部指令
new Vue({
    ...
    directives:{
        'mydirectiveName':{
            bind(el,binding){
                el.innerHTML = binding.value().toUpperCase()
            }
        }
    }
})

```

③、使用自定义指令

```js
//使用指令:   v-my-directive='xxx'
//需求: 自定义2个指令
  //1. 功能类型于v-text, 但转换为全大写
  //2. 功能类型于v-text, 但转换为全小写
 Vue.directive("small-text", function (el, binding) {
      // console.log(el);
      // console.log(binding);
      el.textContent = binding.value.toLowerCase()     //转换成小写
    })
 new Vue({
      el: "#app",
      data: {
        msg: "HELLO , hello"
      },
      directives: {
        'big-text': function (el, binding) {
          el.textContent = binding.value.toUpperCase()   //转换成大写
        }
      }
    })
```

##### 3、插件

​	①、定义插件两种方式

```js
//方式一：定义函数
function MyPlugin(Vue){
     // 1、 扩展全局功能
    Vue.globalMethod = function () {
        console.log("globalMethods");
    }
    // 2、扩展实例对象上的功能
    Vue.prototype.$instanceMethod = function () {
        console.log("$instanceMethod");
    }
    //3、扩展全局过滤器
    Vue.filter("formatDate", (value, str) => {
        return dayjs(value).format(str)
    })
    //4、扩展全局指令
    Vue.directive("upper-text", function (el, binding) {
        el.textContent = binding.value.toUpperCase()
    })
    。。。。
}
export defalut = MyPlugins
```

````js
//方式二：创建对象
const MyPlugins01 = {}
MyPlugins01.install = function (Vue) {
    // 1、 扩展全局功能
    Vue.globalMethod = function () {
        console.log("globalMethods");
    }

    // 2、扩展实例对象上的功能
    Vue.prototype.$instanceMethod = function () {
        console.log("$instanceMethod");
    }

    //3、扩展全局过滤器
    Vue.filter("formatDate", (value, str) => {
        return dayjs(value).fomat(str)
    })

    //4、扩展全局指令
    Vue.directive("upper-text", function (el, binding) {
        el.textContent = binding.value.toUpperCase()
    })
    。。。。
}
export defalut = MyPlugins
````

​	②、使用插件

````js
// 1、 引入自定义插件 
  <script src="./MyPlugins.js"></script>
// 2、使用Vue插件==>调用插件函数，传入Vue ,要在定义new Vue之前
   Vue.use(MyPlugins)
// 3、使用
 mounted() {
        Vue.globalMethod() //全局方法
        this.$instanceMethod()  //实例对象上的方法
      }
//或者 
<h3>{{ time|formatDate('YYYY-MM-DD',123) }}
      {{time|formatDate('HH:mm:ss')}}</h3>
````



#### 四、响应式、组件

##### 1、响应式 ：

​	响应式：当你更新数据的时候，数据会变化，同时用户界面也会更新

​	data中的数据是响应式的。如果给data数据后面新添加属性买这些属性不是响应式，如果想变成响应式的，可以使用 this.$set()

##### 2、组件component

①、方式一 ：

```js
//1、定义组件 
const TestComponent = Vue.extend({
//2、组件的配置对象
        data(){
            ...
        },
        methods:{
           ...
        },
//3、组件要渲染到页面的内容
        template:"<div> <p>{{num}}   <button @click='handleclick'>num+1</button>  </p> </div>"
    })
    
 new Vue({
        el:"#app",
 //4、注册组件
        components:{
            "test-compnent":TestComponent,
        }
    })
 //4、使用方式 ：
 <test-compnent> </test-compnent>   //没有脚手架之前，注意大小写 和 - 
```

②、方式二：

```js
Vue.component("test-compnent", {
            data() {
                return {
                    num: 0
                }
            },
            methods: {
                handleclick() {
                    this.num++
                }
            },
            //组件要渲染到页面的内容
            template: "<div> <p>{{num}}   <button @click='handleclick'>num+1</button>  </p> </div>"
        })

<test-compnent> </test-compnent> 
```

#### 五、脚手架

##### 1、操作步骤;

​	①、npm i @vue/cli -g     安装脚手架

​	②、创建项目   vue create xxx

​	③、启动项目  npm run serve

#### 六、步骤

##### 1、mian.js文件

```js
import  Vue from "vue" 
import App from './App.vue'

new Vue({
	render (h)=>h(App)
}).$mount('#app')
```

### 第二章、组件间的通讯

#### 一、props

​	①、props用于父子组件之间的通讯（传递动态数据），如果要实现子=>父之间的通讯，需使用在父组件中定义函数，子组件调用的方式 

```js
//通讯步骤 ： 
//1、父组件给子组件设置标签属性
<Child :key="value"/>
//2、子组件需要声明接收
prosp:["key"]     //接收方式一
props：{
    key：类型 （Number）  //接收方式二 
}
props:{                //接收方式三
    key:{
        type:Number,    //类型
        required:true,  //必须参数
        default：18,    //默认参数
        validstor(value){ //自定义函数
            return value > 18 && value < 60;
        }
    }
}
//3、子组件接收后就可以使用了 
this.key //使用

```

​	②、子组件给父组件传递数据：父组件定义更新数据的方法 ，以props方式将方法传递给子组件，子组件接收方法后调用，从而修改父组件里面的数据（也就是传递过去了）

```js
//效果：在子组件点击按钮，修改父组件中num的值

//父组件：
<h2>{{num}}</h2>     // 父组件的数据
<Child :add="add"/>  //2、父组件传递方法 add()
data(){
    return {
        num:0
    }
}
methods:{
	add(){           //1、父组件定义方法
		this.num+=1
	}
}
//子组件：
<button @click="handleClick">按钮</button>  //绑定事件
props：{
    add：Function,     //3、子组件接收方法
}
methods：{
    handleClick(){
        add()          //4、子组件调用
    }
}
```

​	③、props的type类型 

- 



​	④、props传输数据的时候，如果没有声明接收，在子组件的 **this.$attrs** 也一样可以接收到

#### 二、render方法

​	render方法中的createElment具备模板能力，

```js
import Vue from "vue"; --> vun.runtime.esm.js
vun.runtime.esm.js 只包含运行时版本（不具备编译模板能力）
通过render方法，就能具备编译模板能力
 
//main.js
new Vue({
  render: h => h(App)     // 使用这种方法· vun.runtime.esm.js 体积小·
}).$mount("#app");
```

#### 三、自定义事件

##### ①、自定义事件

```js
<Child @add="add" />   //绑定自定义事件     add:函数名， 后面的add是函数体，要定义在父组件中
    
this.$listeners.add();  //触发自定义事件
this.$emit('add')
```

​	作用：用来实现子组件向父组件通讯

​	注意：给n哪个组件绑定自定义事件，哪个子组件就可以触发自定义事件

​	子组件的**this._event**是存储事件容器。（私有属性）

##### ②、ref绑定自定义事件

```js
//父组件：
<Child ref="child"></Child> //定义自定义事件（child是Child组件的实例化对象）
mounted(){ //发请求，绑定自定义事件一般都在mounted中定义
    //通过ref定义，通过$refs接收 $on 触发
    this.$refs.child.$on('add',this.add) //绑定自定义事件   
} 
methods:{
    add(){}
}
//子组件：
<button @click="handleClick">按钮</button>
methods: {
    handleClick() {
      //触发自定义事件
      this.$emit("add");
    },
  },

//也可以给自己绑定事件 ，但是没有意义，自己可以指直接操作数据了
this.$on("add", this.add); //绑定事件
<button @click="$emit('add')"></button>  //触发事件
```

​	ref如果设置给普通元素，获取到的就是这个真是元素，如果设置给组件，获取到的就是组件实例对象。

所有的组件实例都包含以下方法：

- $on ( eventNmae,listener ) : 绑定自定义事件 （持久）
- $once  ( eventNmae,listener ) : 绑定自定义事件（一次性的），一般定义在
- $off  ( eventNmae,listener ) : 解绑事件
- $emit  ( eventNmae,data ) : 触发自定义事件

##### 	③、全局事件总线

​			Vue中，组件的原型对象的__proto__ 是指向了Vue的原型对象，所以给vue的原型对象绑定事件，vue的实例也可以访问到事件，其他组件的实例也可以访问到事件，从而达到任意组件之间的通讯

![全局事件总线](I:\学习记录\胡周笔记代码练习\md文档笔记图\全局事件总线.png)

使用方式有两种 “ 

​	`Vue.prototype.$bus=new Vue()`

`beforeCreate(){Vue.prototype.$bus = this}`

##### ④、手写全局事件

```js
class EventEmmiter {
    constructor() {
        this._events = {
            //  eventName : [listener1,listener2....]
        }
    }
    //1、绑定事件
    on(eventName, listener) {
        if (this._events[eventName]) {
            this._events[eventName].push(listener)
        } else {
            this._events[eventName] = [listener]
        }
    }
    //2、触发事件
    emit(eventName, ...data) {
        if (!this._events[eventName]) {  //如果里面有没有回调函数，直接返回
            return
        }
        //依次调用eventName数组里面的回调函数（可能有多个回调函数， ...data  将数组展开赋值） 
        this._events[eventName].forEach(listener => listener(...data));
    }
    //3、解绑事件
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
    //4、绑定一次性事件
    once(eventName, listener) {
        const lis = (...data) => {
            this.off(eventName, lis) // 解绑事件
            listener(...data)  // 触发事件回调函数
        }
        this.on(eventName, lis)
    }
}

```



#### 四、插槽：

​	传数据也传标签 （父组件给子组件传标签）

##### 1、默认插槽

​			父组件写成双标签，里面放入标签数据，那么这个标签数据就会以插槽的方式传递给子组件，data数据也一样，直接插值表达式传过去，都使用slot标签就可以全部接收到 

```js
//父组件APP ：
<div>
    <h3>APP组件</h3>
    <Child>
   		<h1>{{ title }}</h1>
        <p>hello ,heoolo</p>
        <p>hello ,heoolo</p>
        <p>hello ,heoolo</p>
    </Child>
  </div>

//子组件Child ：
<div>
    <h3>Child组件</h3>
    <slot></slot>   //使用父组件，以插槽的形式 
  </div>
```

##### 2、具名插槽 /命名插槽

​		给每一个插槽取一个名字 ：3中取名语法    slot="header" 、v-slot:body、 #footer

​		具名插槽形式，必须要slot要加name才可以渲染

```js
<BChild>
    //用 <template>标签包起来，里面加上slot属性，值就是名字
    <template slot="header">
            <header>App=>BChild=>hearder</header>
    </template>

    <!-- 新语法 -->
    <template v-slot:body>
        <body>App=>BChild=>body</body>
    </template>

    <!-- 新语法简写 -->
    <template #footer>
        <footer>App=>BChild=>footer</footer>
    </template>

</BChild>

//子组件接受的时候：就会渲染出对应的内容
<slot name="header"></slot>
 <slot name="body"></slot>
 <slot name="footer"></slot>
```

##### 3、作用域插槽(子传父)

子组件可以通过在slot上传递props的方式，将数据传递给父组件

```js
//子组件 ：
<template>
  <div>
    <h3>CChild组件</h3>
    <!-- 以标签属性的方式(props)传递给父组件 -->
    <!-- 父组件就可接收到  -->
    <slot name="list" :person="person"></slot>
  </div>
</template>
//子组件定义的数据 ： 
data() {
    return {
      person: {
        name: "王二蛋",
        age: 18,
      },
    };
  },
      
//App父组件 ：
  <CChild>
  <!-- 旧语法方式 ： 取个名字 -->
  <template #list="slotperson">    //这里接受的就是person整个对象，下面再处理一下 就可达到显示效果
    <ul>
      <li>姓名：{{ slotperson.person.name }}</li>
      <li>年龄：{{ slotperson.person.age }}</li>
    </ul>
  </template>
//结构赋值一下
  	#list={person}
	<li>姓名：{{person.name }}</li>
	<li>姓名：{{person.age }}</li>
//还可以结构赋值一下：
	#list={person：{name,age}}
	<li>姓名：{{name}}</li>
	<li>姓名：{{age}}</li>

</CChild>
```



#### **五、todo-list练习**

![demo2_todo list (2)](I:\学习记录\胡周笔记代码练习\md文档笔记图\demo2_todo list (2).gif)

##### 1、拆分组件

​	①、头部组件 header 具有添加功能

​	②、Item	

​	③、List组件 =>del功能

​	④、Footer组件  计算任务 、一键删除已完成任务等。。

##### 2、结构

```js
vue create todolist-02      //终端创建项目 把前面用的package.json复制一下 （配置好了的）
创建views文件夹，放入自己的定义的组件（最好以文件夹=>index.vue的形式）项目结构如下

```

<img src="I:\学习记录\胡周笔记代码练习\md文档笔记图\todolist项目结构.png" alt="todolist项目结构" style="zoom:25%;" />

**main.js :**

```js
import Vue from "vue"  //导入vue
import App from "./App.vue" //导入根组件App

Vue.config.productionTip = false   //生产环境配置为false

new Vue({
    render:(h)=>h(App),    //render函数(前面有写到)
}).$mount('#app')
```

##### 3、静态模板

​	导入html页面和css样式1

​	**①、App.vue**

```js
//1、嵌套关系
<div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <Header></Header>
        <Item></Item>
        <Footer></Footer>
      </div>
    </div>
  </div>
//2、导入
import Header from "./views/Header";
import Item from "./views/Item";
import Footer from "./views/Footer";
//3、注册组件
components: {
    Header,
    Item,
    Footer,
  },
```

②、Item里面嵌套了List

```js
<ul class="todo-main">
    <List></List>
  </ul>
</template>
```

##### 4、功能实现

###### 	①、数据展示

![C_{5K7Q4K9_8AQIHXE9SZCR](I:\学习记录\胡周笔记代码练习\md文档笔记图\C_{5K7Q4K9_8AQIHXE9SZCR.png)

**在App.vue中定义数据**，因为是公共数据，便于修改，所以整体定义

最终要放到	List组件中去用  job渲染页面，**APP=>Item=>List**

```js
// 在App.vue中定义数据
data() {
    return {
      tasks: [
        { id: 1, job: "吃饭" },
        { id: 2, job: "睡觉" },
        { id: 3, job: "唱歌" },
        { id: 4, job: "打游戏" },
      ],
    };
  },
// APP=>Item
 <Item :tasks="tasks"></Item>
//Item接收数据
   props: {
       tasks: Array,
    },
//循环遍历tasks,将里面的每一条数据都渲染出List页面，key值是tasks里面每一条数据task的id，然后将task传入List组件中
  <List v-for="task in tasks" :key="task.id" :task="task"></List>     
//List组件接收后，使用即可
props: {
    task: Object,
 },
     //使用
<span>{{ task.job }}</span>   
```

​		数据展示成功

###### ②、Header组件添加功能实现

- **绑定回车提交事件：v-on:keyup.enter="add"**     当键盘回车键弹起时触发 add（）方法 add用来先tasks里面添加数据
- **获取用户的输入，绑定双向数据，v-model="addText"** ，addText初始化值设置为“ ”即可，后期在add里面解构赋值
- **调用add函数，**达到先tasks里面添加数据的功能（add里面调用App里面定义的函数（这个函数才是真正添加任务的方法，通过props传递过来））

```js
//Header.vue：
v-on:keyup.enter="add"
v-model="addText"

addList: Function,   //用props接收函数后再使用

data() {return { addText: "",};},
add() {
    //  this.addText 解构赋值，可以通过addText（键名）区自动查找this中的addText
      const { addText } = this;     
      this.addList(addText);    //调用addList函数，并把addText传参（子组件向父组件传递参数，通过调用父组件函数的方式）
    },
        
//App.vue定义函数 ：
addList(addText) {
      this.tasks.unshift({ id: Date.now(), job: addText });  //在前面加 ，id避免重复
},
<Header :addList="addList"></Header>  //函数传出
```

###### ③、List组件功能实现

​	**1、<input type="checkbox" />实现点击选中**

```js
//首先在 App data数据中，添加ischeck属性
{ id: 1, job: "吃饭", isCheck: true },
//然后给List组件中的input框绑定事件（双向的，因为页面点击，也要修改data中的值）
<input type="checkbox" v-model="task.isCheck" />   // task.ischeck 
```

​	补充知识点**v-model**：

`	v-model` 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

- text 和 textarea 元素使用 `value` property 和 `input` 事件；

- checkbox 和 radio 使用 `checked` property 和 `change` 事件；

- select 字段将 `value` 作为 prop 并将 `change` 作为事件。

  **2、删除功能实现**

  ```js
  //1、鼠标悬停的时候，删除按钮才会显示
  <button class="btn btn-danger" v-show="isShow">删除</button>
  data :{
  	isShow:false   //初始不显示
  }
  //2、给Li绑定鼠标事件
  <li @mouseenter="isShow = true" @mouseleave="isShow = false">
      
  //3、绑定删除事件
  <button class="btn btn-danger" v-show="isShow" @click="del">删除</button>
  del(){
        delList(this.task.id)   //调用App组件中的 DelList（）方法，传入当前List的id
  } 
  //4、App定义delList函数，接收传入的id   filter（） true的时候保留 
  delList(id) {
        this.tasks = this.tasks.filter((item) => item.id !== id); 
      },
  //记得把函数传过去再用
  ```
```
  

###### ④、Footer组件的实现

​		**1、已完成任务 和 全部任务**

​```js
//1、全部任务就是 tasks数组的length
<span> <span>已完成0</span> / 全部{{ tasks.length }} </span>
//2、已完成任务
//App.vue 中 定义一个计算属性，用来计算{ id: 1, job: "吃饭", isCheck: true }的个数 可读的
computed: {
    num: {
      get() {
        return this.tasks.filter((item) => item.isCheck === true).length;
      },
    },
  },
//num就是要显示在已完成后面的数 传入Footer组件使用就可以
```

​		**2、清除已完成任务**

```js
//Footer.vue
<button class="btn btn-danger" @click="delHasChecked">清除已完成任务</button>
delHasChecked(){
    this.delChecked();
}
//App.vue
delChecked(){
    //把带有isCheck: true的数据删除即可
    this.tasks = this.tasks.filter((item) => item.isCheck !== true);
}

```

​		**3、全选按钮**

```js
<input type="checkbox" v-model="checkAllList" :disabled="!tasks.length" />
//因为全选按钮，可以点击（页面=>js数据），数据也可以控制显示，所以定义一个computed属性
computed: {
    checkAllList: {
      get() {
        return this.num === this.tasks.length; //访问时触发，就两个值相等的时候，被选中
      },
      set(val) { //修改 就是通过点击改变App中data的值
        //value就是checkAllList的值
        this.checkList(val);
      },
    },
  },
 //App.vue :
  checkList(val) {
      this.tasks.forEach((item) => {
        item.isCheck = val;    //让task中的isCheck和val（这里是全选按钮的值）一致就可
      });
    },    
```

##### 5、local Storage缓存

###### ①、watch监视属性

​	关闭浏览器不会触发卸载等生命周期函数。

​	watch 监视属性，只要tasks发生变化，就将tasks存入localStorage中

​		**window.localStorage.setItem("todos", JSON.stringify(newVal));**

​	 **浅度监视**：watch监视属性，默认情况下只监视第一层属性（属性的值）比如： 【{}，{}，{}】只监视第一层	{}，地址值，但是里面对象{}的内容，不监视，导致更新数据的时候，watch监视不到，则不会触发

```js
 watch: {
  //浅度监视：只监视一层属性
 	tasks(newVal) {
   	window.localStorage.setItem("todos", JSON.stringify(newVal));
  },=
```

​	 **深度监视**：会监视所有属性（对象中对象）用于监视引用类型数据（对象和数组）， 对象中还有对象数据， 数组里面的值是引用类型数据

```js
watch: {
    tasks: {
      handler(newVal) {
        window.localStorage.setItem("tasks", JSON.stringify(newVal));
      },
      deep: true,
    },
  },
```



###### ②、设置 

**window.localStorage.setItem("todos",newVal)**

```js
//App.vue:
watch{
	todos: {
      	handler(newVal) {
        	window.localStorage.setItem("todos", JSON.stringify(newVal));
      	},
     	 deep: true,  
    	},
}
```

###### ③、使用 

 **window.localStorage.getItem("tasks")**

可以在mounted中使用（要发送请求就什么的，就要在这个里面，但是这里没有发送请求），但是这里放在data函数中会更好，可以将原有的省略掉

```js
//初始化的时候，会调用data函数，如果localStorage中没有数据，就是会面的空数组    
data（）{
	const tasks = JSON.parse(window.localStorage.getItem("tasks")) || [] 
	retrun tasks
}
```

### 第三章：Vue-ajax

#### 一、**demo3: github users**

​	示例图：

![demo3_user search (4)](I:\学习记录\胡周笔记代码练习\md文档笔记图\demo3_user search (4).gif)

##### 1、项目结构：

![p1](I:\学习记录\胡周笔记代码练习\md文档笔记图\p1.png)



##### 2、main.js

添加全局事件总线对象:

```js
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    // 添加全局事件总线对象
    Vue.prototype.$bus = this;
  },
  render: (h) => h(App),
}).$mount('#app');
```

##### 3、App.vue

引入组件List和Search：

```js
<template>
  <div>
    <Search />
    <List />
  </div>
</template>
<script>
import Search from "./views/Search";
import List from "./views/List";

export default {
  name: "App",
  components: {
    Search,
    List,
  },
};
</script>
<style>
```

##### 4、sever.js服务器搭建

```js
const express = require("express");
const app = express();
app.get("/search/users", (req, res) => {
  // jsonp cors
  res.set('Access-Control-Allow-Origin', '*');   // 解决跨域问题
  res.json({    //响应了很多条数据，在客户端要筛选
    total_count: 772,
    incomuplete_reslts: false,
    items: [
      {
        login: "yyx",
        id: 1514965,
        node_id: "MDQ6VXNlcjE1MTQ5NjU=",
        avatar_url: "https://avatars0.githubusercontent.com/u/1514965?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/yyx",
        html_url: "https://github.com/yyx",
        followers_url: "https://api.github.com/users/yyx/followers",
        following_url: "https://api.github.com/users/yyx/following{/other_user}",
        gists_url: "https://api.github.com/users/yyx/gists{/gist_id}",
        starred_url: "https://api.github.com/users/yyx/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/yyx/subscriptions",
        organizations_url: "https://api.github.com/users/yyx/orgs",
        repos_url: "https://api.github.com/users/yyx/repos",
        events_url: "https://api.github.com/users/yyx/events{/privacy}",
        received_events_url: "https://api.github.com/users/yyx/received_events",
        type: "User",
        site_admin: false,
        score: 1
      },
    ]
  });
});
app.listen(3000, "localhost", (err) => {
  if (err) {
    console.log("err", err);
    return;
  }
  console.log("服务器启动成功");
});
```

##### 5、Search.vue

```js
<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input
        type="text"
        placeholder="enter the name you search"
        v-model="searchName"
      />
      <button @click="search">Search</button>
    </div>
  </section>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {
      searchName: "",
    };
  },
  methods: {
    search() {
      const { searchName } = this;
      if (!searchName) {
        return;
      }
      this.$bus.$emit("search", searchName);   //定义了全局事件 
    },
  },
};
</script>

<style>
</style>
```

##### 6、List.vue

```js
<template>
  <div>
    <h1 v-if="isFirstView">输入用户名搜索</h1>
    <h1 v-else-if="isLoading">loading...</h1>
    <div v-else class="row">
      <div class="card" v-for="user in users" :key="user.id">
        <a :href="user.url" target="_blank">
          <img :src="user.img" style="width: 100px" />
        </a>
        <p class="card-text">{{ user.login }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "List",
  data() {
    return {
      isFirstView: true,
      isLoading: false,
      users: [],
    };
  },
  mounted() {
    this.$bus.$on("search", (searchName) => {
      //奇幻loading
      this.isFirstView = false;
      this.isLoading = true;
      // 发送请求
      axios
        .get(`http://localhost:3000/search/users?q=${searchName}`)
        .then((res) => {
          this.isLoading = false;
          // 开发时：请求回来的数据有很多，只需要其中的部分数据
          this.users = res.data.items.map((user) => ({
            login: user.login,
            url: user.html_url,
            img: user.avatar_url,
            id: user.id,
          }));
        })
        .catch((err) => {
          this.isLoading = false;
          console.log(err);
          alert("网络出现故障，请联系管理员~");
        });
    });
  },
};
</script>
<style>
.card {
  float: left;
  width: 33.333%;
  padding: 0.75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: 0.75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}
</style>

```

### 第四章、vue-router

1、前段路由

​	用来开发单页面应用SPA  ： 、

​	整个应用只有一个完整页面，页面变化都是在这一个页面进行更新的 。

​	点击链接不会刷新整个页面，会局部更新

​	点击链接也不会发送请求吗，会自己写ajax代码 发送请求

2、原理：

​	点击页面不刷新 :给a标签绑定点击事件阻止其默认行为

​	会更新浏览历史（地址）-->调用history.push(path),就可以更新

​	会局部更新，-->内部监听浏览历史的变化history.listen(listener)，一旦发生变化们就会遍历路由的所有配置，看当前路径时候匹配正确，匹配上就加载-->component

3、vue-router提供的组件

​	router-link ：用来路由导航，

​	router-view ：用来显示当前路由组件

4、路由传参方式 

​		params :

​					-路由配置 ：`path:"/xxx/:xxx`  写路径的时候一定要加 **冒号**

​					-路由连接 ： `<router-link to="./xxx123">xxx</router-link>`

​					-子组件接收params参数 ：  `this.$route.params.xxx`

​		query :

​					-路由连接 ： `<router-link to="./xxx？key=value">xxx</router-link>`

​					-子组件接收params参数 ：  `this.$route.query.key`

​		props : 将params参数或query参数以props形式传递各子组件

​					-路由配置 

```js
props(route){
    return {
    ...route.params,
    ...route.query,
    }
}
//子组件声明接受
props:["xxx"]
```

​		命名路由 ： 路由简写

```js
配置：
name :"xxx"
连接 ： <router-link :to="{name:'xxx',params:{yyy},query:{zzz}.....}">xxx</router-link>

```

​		公共参数 :统一给同济路由传递公共参数

```js
<router-view ：key="value">xxx</router-link>
//子组件接受声明：
props:["key"]
//使用
this.key
```



### 第五章、Vue响应式原理分析

#### 一、prepare

##### 	1、`[].slice.call(lis)`

​			**将伪数组转换成真数组**

###### 			①伪数组：具有数组的一些函数，单数不包含全部（arguments、获取元素dcumentQuerySelectALL("li") ）

###### 			②、slice（）函数	

​				不传参数的时候，代表选中全部的,`[].slice.call(lis)`将slice的this指向lis（伪数组），然后截取全部，添加到【】中，就得到了一个真数组

```js
/* 
      slice方法怎么知道要截取的的是哪个数组？
      方法内部是通过this来决定哪个数组的
      console.log([1, 2, 3].slice());

      slice方法的this改成了lis
      slice方法就会截取lis
*/
    const lis = document.querySelectorAll("li")
    console.log(lis); // NodeList(3) [li, li, li] 伪数组，没有全部的数组方法 
    const lis02 = [].slice.call(lis)
    //变种语法：
    console.log(Array.prototype.slice.call(lis));
    console.log(lis02);//(3) [li, li, li] 真数组
```



##### 	2、node.nodeType 

​			得到类型节点。1 ：代表元素节点，3：代表文本节点

```js
console.dir(lis[0].nodeType);  //1 :元素节点    3：文本节点
```



![node.nodetype](I:\学习记录\胡周笔记代码练习\md文档笔记图\node.nodetype.png)

##### 	3、Object.definePrototype(obj,propertyName,{})

​			**给对象属性添加元属性**

```js
const person = {
	firstName:"王",
    lastName:"小二"
}
Object.defineProperty(person,"fullName",{
  		enumberable:true,
    	configurable:false,
        get(){
            return this.firstName + " " + this.lastName;
        },
        set(newVal){  //设置fullName的时候调用，？newVal就是易遨修改的值
           const{firstName,lastName}=newVal.split(" ");
            this.firstName = firstName;
            this.lastName = lastName;
        },    
})
//console.log(person)  //{firstName:"王"，lastName:"小二"，fullName:"王小二"}
person.fullName="李 铁蛋"
console.log(person) //{firstName:"李"，lastName:"铁蛋"，fullName:"李铁蛋"}
```

