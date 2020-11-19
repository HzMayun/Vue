<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <Header :addList="addList"></Header>
        <Item :tasks="tasks" :delList="delList"></Item>
        <Footer
          :tasks="tasks"
          :num="num"
          :delChecked="delChecked"
          :checkList="checkList"
        ></Footer>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./views/Header";
import Item from "./views/Item";
import Footer from "./views/Footer";

export default {
  name: "App",
  components: {
    Header,
    Item,
    Footer,
  },
  data() {
    const tasks = JSON.parse(window.localStorage.getItem("tasks")) || [];
    return { tasks };
    /* return {
      tasks: [
        { id: 1, job: "吃饭", isCheck: true },
        { id: 2, job: "睡觉", isCheck: true },
        { id: 3, job: "唱歌", isCheck: false },
        { id: 4, job: "打游戏", isCheck: false },
      ],
    }; */
  },
  computed: {
    num: {
      get() {
        return this.tasks.filter((item) => item.isCheck === true).length;
      },
    },
  },
  methods: {
    addList(addText) {
      this.tasks.unshift({ id: Date.now(), job: addText, isCheck: false });
    },
    delList(id) {
      this.tasks = this.tasks.filter((item) => item.id !== id);
    },
    delChecked() {
      this.tasks = this.tasks.filter((item) => item.isCheck !== true);
    },
    checkList(val) {
      this.tasks.forEach((item) => {
        item.isCheck = val;
      });
    },
  },
  watch: {
    tasks: {
      handler(newVal) {
        window.localStorage.setItem("tasks", JSON.stringify(newVal));
      },
      deep: true,
    },
  },
};
</script>

<style>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
