<template>
  <div>
    <h2>B 组件</h2>
    <slot name="header"></slot>
    <slot name="main"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: "B",
};
</script>

<style>
</style>
