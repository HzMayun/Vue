<template>
  <div>
    <h2>click:{{ $store.state.conut }} times,count is xxxx</h2>
    <select v-model="num">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
      <option :value="4">4</option>
    </select>
    <button @click="increment">+</button>
    <button>-</button>
    <button>incrementIfOdd</button>
    <button>incrementAsync</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      num: 1,
    };
  },
  mounted() {
    console.log(this.$store.state.conut);
  },
  methods: {
    increment() {
      this.$store.dispatch("increment", this.num);
    },
  },
};
</script>

<style>
</style>
