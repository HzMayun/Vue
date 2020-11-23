import Vue from "vue";
import Vuex from "vuex";
// 安装插件
Vue.use(Vuex);
//集中所有数据的对象
const state = {
    conut: 0,
};

//用来间接更新数据的方法对象
// 包含n个方法 ，通常会做异步操作，将操作完成的数据交个mutations函数更新
const actions = {
    //actions函数第一个参数：是一个对象
    increment(store, num) {
        //触发某一个mutations函数，
        //store.commit("mutations函数名称",传递过去的数据)
        store.commit("INCREMENT", num)
    }

};

// 用来直接更新数据的方法对象
const mutations = {
    //mutation第一个参数: state:所有的状态数据
    //        第二个参数: num ,由上一步actions负责传递过来
    INCREMENT(state, num) {
        state.conut += num;
    }
};

//store对象包含读取数据和更新数据的各种方法
// 将来要获取其中各种方法和数据
const store = new Vuex.Store({
    state,
    actions,
    mutations
})
export default store;
