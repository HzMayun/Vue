<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="allChecked" :disabled="!allTasks" />
    </label>
    <span>
      <span>已完成{{ hasDone }}</span> / 全部{{ allTasks }}
    </span>
    <button class="btn btn-danger" @click="delAllTask">清除已完成任务</button>
  </div>
</template>
<script>
export default {
  name: "TodoFooter",
  props: {
    hasDone: Number,
    allTasks: Number,
    checkedAll: Function,
    clearDone: Function,
  },

  computed: {
    allChecked: {
      get() {
        return this.hasDone === this.allTasks && this.allTasks !== 0;
      },
      set(allChecked) {
        this.checkedAll(allChecked);
      },
    },
  },
  methods: {
    delAllTask() {
      this.clearDone();
    },
  },
};
</script>
<style >
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
