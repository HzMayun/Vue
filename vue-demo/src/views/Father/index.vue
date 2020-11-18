<template>
  <div>
    <h2>Father组件~~~~</h2>
    <p v-text="msg"></p>
    <h4>{{ this.num }}</h4>
    <Child :fatherName="fatherName" :age="age" />
  </div>
</template>
<script>
import Child from "../Child/index";

export default {
  name: "Father",
  data() {
    return {
      msg: "I'm your papa!",
      fatherName: "铁蛋",
      age: 13,
    };
  },
  props: {
    num: Number,
  },
  //接收组件
  components: {
    Child,
  },
};
</script>
