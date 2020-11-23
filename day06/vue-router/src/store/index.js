import Vuex from 'vuex'
import Vue from 'vue'

// 安装插件
Vue.use(Vuex)

// 集中管理所有数据的对象
const state = {
  // 对数据进行初始化
  num: 0,
};

// 用来间接更新数据的方法对象，包含n个方法，通常会做异步操作，将操作完的数据交给mutations函数更新
// 第一个参数：是一个对象store，内部有dispatch/commit/state等
// 第二个参数：是传递过来的参数
const actions = {
  /* increment(store, val) {
    // console.log(store, val);
    // 触发某一个mutation函数
    // store.commit(触发的mutation函数名称, mutation函数要接受的数据);
    store.commit("INCREMENT", val);
  }, */
  increment(store, val) {
    console.log(store);
    store.commit("INCREMENT", val)
  },
  decrement(store, val) {
    console.log(store);
    store.commit('DECREMENT', val)
  },
}

// 用来直接更新数据的方法对象，直接对数据进行操作（数据操作后会更新state，从而组件会重新渲染）
// 第一个参数：所有状态数据
// 第二个参数：传递过来的参数
const mutations = {
  INCREMENT(state, val) {
    console.log(state.num)
    state.num += val;
  },
  /* INCREMENT(state, val) {
    console.log(state.num)
    console.log(val)
    state.num += val;

    // state.num += val;
  }, */
  DECREMENT(state, val) {
    state.num -= val
  },
}

// store中包含读取和更新数据的方法
const store = new Vuex.Store({
  state,
  actions,
  mutations,
});

export default store;
