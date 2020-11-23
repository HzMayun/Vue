import { ADD_TODO, DEL_TODO, UPDATE_TODO } from "./mutation-types"

const mutations = {
  // 添加
  [ADD_TODO](state, task) {
    console.log(state);
    state.todos.unshift({ id: Date.now(), task, isCompleted: false })
  },
  //单个删除
  [DEL_TODO](state, id) {
    // console.log(id);
    // console.log(state, id);
    state.todos = state.todos.filter((todo) => todo.id != id)
  },
  //更新单个状态
  [UPDATE_TODO](state, id) {
    state.todos = state.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted
        }
      }
      return todo
    })
  }

};

export default mutations;
