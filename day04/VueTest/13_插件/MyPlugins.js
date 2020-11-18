//方式一
function MyPlugins(Vue) {
    //使用插件时，会调用插件函数。传入Vue做为参数

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
}
// 方式二 ：创建一个对象
// const MyPlugins01 = {}
// MyPlugins01.install = function (Vue) {
//     // 1、 扩展全局功能
//     Vue.globalMethod = function () {
//         console.log("globalMethods");
//     }

//     // 2、扩展实例对象上的功能
//     Vue.prototype.$instanceMethod = function () {
//         console.log("$instanceMethod");
//     }

//     //3、扩展全局过滤器
//     Vue.filter("formatDate", (value, str) => {
//         return dayjs(value).fomat(str)
//     })

//     //4、扩展全局指令
//     Vue.directive("upper-text", function (el, binding) {
//         el.textContent = binding.value.toUpperCase()
//     })
// }



//export defalut = MyPlugins     因为没有脚手架，所以这里先定义到window上测试
window.MyPlugins = MyPlugins