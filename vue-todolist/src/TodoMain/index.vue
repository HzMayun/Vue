<template>
  <ul class="todo-main">
    <TodoList
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :delList="delList"
    ></TodoList>
  </ul>
</template>
<script>
import TodoList from "../TodoList";

export default {
  name: "TodoMain",
  components: {
    TodoList,
  },
  props: {
    tasks: Array,
    delList: Function,
  },
};
</script>
<style >
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}
.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
