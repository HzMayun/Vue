import { ADD_TODO } from "./mutations-types"
const mutations = {
  [ADD_TODO](state, task) {
    state.todos.unshift({ id: Date.now(), task, isCompleted: false })
  }
};

export default mutations;
