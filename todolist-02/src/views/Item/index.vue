<template>
  <ul class="todo-main">
    <List v-for="task in tasks" :key="task.id" :task="task" :delList="delList"></List>
  </ul>
</template>

<script>
import List from "../List";

export default {
  name: "Item",
  components: {
    List,
  },
  props: {
    tasks: Array,
    delList: Function,
  },
};
</script>

<style>
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
