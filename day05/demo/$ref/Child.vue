<template>
  <div>
    <h2>Child 组件</h2>
    <button @click="$emit('add')">按钮</button>
  </div>
</template>

<script>
export default {
  name: "Child",
  methods: {
    handleClick() {
      //但不用props接收的时候，在this.$attrs上可以找到父组件A匹配传过来的额add()
      /*   console.log(this);
      this.$listeners.add(); */
      //触发自定义事件
      this.$emit("add");
    },
  },
};
</script>

<style>
</style>
