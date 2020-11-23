import { ADD_TODO } from "./mutation-types";

const mutations = {
  [ADD_TODO](state, task) {
    console.log(22);
    state.todos.unshift({ id: Date.now(), isCompleted: false, task });
  },
};

export default mutations;
