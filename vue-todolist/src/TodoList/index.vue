<template>
  <li @mouseenter="isShow = true" @mouseleave="isShow = false" id="task.id">
    <label for="task.id">
      <input type="checkbox" v-model="task.checked" id="task.id" />
      <input type="checkbox" v-model="task.checked" id="task.id" />
      <span>{{ task.job }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="del">删除</button>
  </li>
</template>
<script>
// import TodoDel from "../TodoDel";

export default {
  name: "TodoList",
  components: {},
  data() {
    return {
      isShow: false,
    };
  },
  props: {
    task: Object,
    delList: Function,
  },
  methods: {
    //删除任务
    del() {
      const id = this.task.id;
      // console.log(id);
      //要把选中的ID 发过去吧 ？
      // 调用函数
      this.delList(id);
    },
  },
};
</script>
<style>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}
</style>
