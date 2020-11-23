import Vue from 'vue';
import App from './App';
import store from "./store";
import "./css/common.css";

Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
  // 应用store
  store,
}).$mount('#app');
