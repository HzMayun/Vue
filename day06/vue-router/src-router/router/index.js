// @ts-nocheck
import Vue from "vue";
import VueRouter from "vue-router";

// 引入组件
import About from "../views/About/index.vue";
import Home from "../views/Home/index.vue";
import Message from "../views/About/Message";
import Adress from "../views/Home/Adress";
import Detail from "../views/About/Message/Detail";
import News from "../views/About/News";

// 安装插件
// 一旦安装插件，就会全局注册两个组件：router-link router-view
// 还会给原型上添加一个属性
Vue.use(VueRouter);

const router = new VueRouter({
  // 定义路由的配置
  routes: [
    //About路由
    {
      path: "/about", // 路由路径
      component: About, // 路由组件
      children: [{
        path: '/message',
        component: Message,
        children: [
          {
            // 加上name属性，就叫做命名路由
            name: "Detail",
            path: "detail/:id", // 动态路由配置，能匹配多个路径
            component: Detail,
            // props函数的返回值，会以props方式传递给组件
            props(route) {
              // console.log(route);
              return {
                // 展开route.params数据，到对象上
                ...route.params,
                ...route.query,
                // id: route.params.id,
                // name: route.query.name,
                // age: route.query.age,
              };
            },
          },
        ],
      },
      {
        path: "/news",
        component: News,
      },
      ],
    },
    //Home路由
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: '/adress',
          component: Adress,
        },

      ],
    },
    //默认路由
    {
      // 当路径是/时，会切换到/home
      path: "/",
      redirect: "/about", // 重定向
    },
  ],
});

export default router;
