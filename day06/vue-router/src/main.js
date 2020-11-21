import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  // 应用路由器
  router,
}).$mount("#app");
