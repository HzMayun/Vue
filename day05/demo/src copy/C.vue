<template>
  <div>
    <h2>C 组件</h2>
    <!-- 以标签属性（props）方式传递person数据 -->
    <slot name="list" :person="person"></slot>
  </div>
</template>

<script>
export default {
  name: "C",
};
</script>

<style>
</style>
