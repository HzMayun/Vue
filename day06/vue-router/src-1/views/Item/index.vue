<template>
  <ul class="todo-main">
    <List v-for="todo in todos" :key="todo.id" :todo="todo"></List>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import List from "../List";

export default {
  name: "Item",
  components: {
    List,
  },
  //计算属性 接收todos
  computed: {
    ...mapState(["todos"]),
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
