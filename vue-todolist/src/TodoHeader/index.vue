<template>
  <div class="todo-header">
    <input
      type="checked"
      placeholder="请输入你的任务名称，按回车键确认"
      v-model="headText"
      @keyup.13="add"
    />
  </div>
</template>
<script >
export default {
  name: "TodoHeader",
  props: {
    addList: Function,
  },
  data() {
    return {
      headText: "",
    };
  },
  methods: {
    add() {
      const headText = this.headText;
      //调用添加方法（父组件App里面的方法）
      this.addList(headText);
      //添加之后清除内容
      this.headText = "";
    },
  },
};
</script>
<style>
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>
