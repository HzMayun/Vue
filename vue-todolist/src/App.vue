<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <TodoHeader :addList="addList"></TodoHeader>
        <TodoMain :tasks="tasks" :delList="delList"></TodoMain>
        <TodoFooter
          :hasDone="hasDone"
          :allTasks="allTasks"
          :checkedAll="checkedAll"
          :clearDone="clearDone"
        ></TodoFooter>
      </div>
    </div>
  </div>
</template>

<script>
import TodoMain from "./TodoMain";
import TodoFooter from "./TodoFooter";
import TodoHeader from "./TodoHeader";

export default {
  name: "App",
  components: {
    TodoMain,
    TodoFooter,
    TodoHeader,
  },
  data() {
    return {
      tasks: [
        { id: 1, job: "喝酒", checked: false },
        { id: 2, job: "喝酒", checked: true },
        { id: 3, job: "喝酒", checked: false },
      ],
    };
  },
  methods: {
    addList(headText) {
      this.tasks.unshift({ id: Date.now(), job: headText, checked: false });
    },
    delList(id) {
      this.tasks = this.tasks.filter((item) => item.id !== id);
    },
    checkedAll(allChecked) {
      this.tasks.forEach((todo) => {
        todo.checked = allChecked;
      });
    },
    clearDone() {
      this.tasks = this.tasks.filter((item) => !item.checked);
    },
  },
  computed: {
    hasDone() {
      return this.tasks.reduce((p, c) => p + (c.checked ? 1 : 0), 0);
    },
    allTasks() {
      return this.tasks.length;
    },
  },
};
</script>

<style>
/*app*/
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
