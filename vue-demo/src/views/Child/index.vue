<template>
  <div>
    <h2>Child组件</h2>
    <span>My father name is：{{ fatherName }}</span>
    <span>我今年{{ this.age }}岁</span><br />
    <button @click="handle">按钮</button>
    <!-- <span>{{ this.fatherName }}</span> -->
  </div>
</template>
<script>
export default {
  name: "Child",
  data() {
    return {};
  },
  methods: {
    handle() {
      console.log(1);
      console.log(this.age);
    },
  },
  props: {
    fatherName: String,
    age: Number,
  },
};
</script>
