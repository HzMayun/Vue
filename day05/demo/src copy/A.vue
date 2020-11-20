<template>
  <div>
    <h2>A 组件</h2>
    <!-- 使用父组件以插槽方式传递的标签数据 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "A",
};
</script>

<style>
</style>
