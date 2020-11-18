<template>
  <div class="app">
    <h1 class="app-h1">hello Vue!</h1>
    <div class="app-top">
      <div class="app-cont">
        <h3 class="app-text">{{ num }}</h3>
        <button @click="handleClick">按钮</button>
      </div>
      <Father :num="num" class="father"></Father>
    </div>
  </div>
</template>
<script>
import Father from "./views/Father";

export default {
  name: "APP",
  data() {
    return {
      num: 0,
    };
  },
  methods: {
    handleClick() {
      this.num += 1;
    },
  },
  //注册组件
  components: {
    Father,
  },
};
</script>
<style >
body,
html {
  background-color: antiquewhite;
  height: 100%;
}
.app {
  background-color: rgb(235, 233, 136);
  /* width: 500px; */
  height: 100%;
}
.app-top {
  display: flex;
  justify-content: space-around;
}
.app-h1 {
  text-align: center;
  height: 30px;
}
.app-cont,
.father {
  width: 200px;
  height: 300px;
  background-color: rgb(85, 240, 240);
  padding: 10px;
}
.father {
  background-color: rgb(185, 230, 230);
}
</style>
