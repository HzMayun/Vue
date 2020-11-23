<template>
  <div class="box">
    <p>clicked: {{ $store.state.num }} time,count is xxx</p>
    <select v-model="val">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button>increment if odd</button>
    <button>increment async</button>
  </div>
</template>

<script>
/*
    组件使用vuex
    读取：this.$store.state.xxx
    修改：this.$store.dispatch(要触发的action函数名称，传递给action的数据)
*/
export default {
  name: "App",
  data() {
    return {
      val: 1,
    };
  },
  methods: {
    increment() {
      this.$store.dispatch("increment", this.val);
    },
    decrement() {
      this.$store.dispatch("decrement", this.val);
    },
  },
};
</script>

<style>
.box {
  margin: 50px 50px;
}
</style>
