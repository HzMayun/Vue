<template>
  <div id="app">
    <h1>App组件</h1>
    <p>{{ num }}</p>
    <button>App</button>
    <Child ref="child"></Child>
  </div>
</template>

<script>
import Child from "./Child";

export default {
  name: "App",
  data() {
    return {
      num: 0,
    };
  },
  components: {
    Child,
  },
  mounted() {
    this.$refs.child.$on("add", this.add);
  },
  methods: {
    add() {
      this.num += 1;
    },
  },
};
</script>

<style lang="less">
</style>
