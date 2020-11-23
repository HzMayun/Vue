<template>
  <li @mouseenter="isShow = true" @mouseleave="isShow = false">
    <label>
      <input type="checkbox" v-model="isCompleted" />
      <span>{{ todo.task }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="del">删除</button>
  </li>
</template>

<script>
import { mapMutations } from "vuex";
import { DEL_TODO, UPDATE_TODO } from "../../store/mutation-types";

export default {
  name: "List",
  props: ["todo"],
  data() {
    return {
      isShow: false,
    };
  },
  mounted() {
    // console.log(this.todo);
  },
  methods: {
    ...mapMutations([DEL_TODO, UPDATE_TODO]),
    del() {
      // console.log(this.todo.id);
      // console.log(this[DEL_TODO]);
      // this[DEL_TODO](this.todo.id);
      this[DEL_TODO](this.todo.id);
    },
  },
  //用计算属性来控制是否选中了
  computed: {
    isCompleted: {
      get() {
        return this.todo.isCompleted;
      },
      set() {
        //更新数据
        this.UPDATE_TODO(this.todo.id)
      },
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
</style>
