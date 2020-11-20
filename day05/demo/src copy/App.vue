<template>
  <div id="app">
    <h1>App组件</h1>
    <!-- 组件写成双标签，里面放入标签数据，那么这个标签数据就会以插槽的方式传递给子组件 -->
    <!-- 默认插槽: -->
    <A>
      <p>hello atguigu00</p>
      <p>hello atguigu11</p>
      <p>hello atguigu22</p>
    </A>
    <B>
      <!-- 旧语法：slot="名称" -->
      <template slot="header">
        <header>头部...{{ title }}</header>
      </template>

      <!-- 新语法：v-slot:名称 -->
      <template v-slot:main>
        <main>内容区...</main>
      </template>

      <!-- 新语法可以简写：#名称 -->
      <template #footer>
        <footer>底部...</footer>
      </template>
    </B>
    <C>
      <!-- 父组件插槽可以接受子组件通过slot传递的props数据 -->
      <!-- <template #list="slotProps"> -->
      <!-- <template v-slot:list="slotProps"> -->

      <!-- { person } -> 就是对数据进行解构赋值 -->
      <!-- <template #list="{ person }"> -->

      <template #list="{ person: { name, age } }">
        <ul>
          <li>姓名：{{ name }}</li>
          <li>年龄：{{ age }}</li>
        </ul>
      </template>
    </C>
  </div>
</template>

<script>
import A from "./A";
import B from "./B";
import C from "./C";

export default {
  name: "App",
  data() {
    return {
      title: "hello atguigu",
    };
  },
  components: {
    A,
    B,
    C,
  },
};
</script>

<style >
</style>
