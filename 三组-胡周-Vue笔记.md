### 第一章、Vue基础知识

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



#### 四、响应式、component

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

```
import  Vue from "vue" 
import App from 
```

#### 二、组件间的通讯

##### 1、props

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

##### 2、render方法

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

##### 3、自定义事件

###### ①、自定义事件

```js
<Child @add="add" />   //绑定自定义事件     add:函数名， 后面的add是函数体，要定义在父组件中
    
this.$listeners.add();  //触发自定义事件
this.$emit('add')
```

​	作用：用来实现子组件向父组件通讯

​	注意：给n哪个组件绑定自定义事件，哪个子组件就可以触发自定义事件

​	子组件的**this._event**是存储事件容器。（私有属性）

###### ②、ref绑定自定义事件

```js
//父组件：
<Child ref="child"></Child>
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
```

​	ref如果设置给普通元素，获取到的就是这个真是元素，如果设置给组件，获取到的就是组件实例对象。

所有的组件实例都包含以下方法：

- $on ( eventNmae,listener ) : 绑定自定义事件 （持久）
- $once  ( eventNmae,listener ) : 绑定自定义事件（一次性的），一般定义在
- $off  ( eventNmae,listener ) : 解绑事件
- $emit  ( eventNmae,data ) : 触发自定义事件

​	

