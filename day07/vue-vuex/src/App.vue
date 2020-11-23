<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <Header></Header>
        <Item></Item>
        <Footer></Footer>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./views/Header";
import Item from "./views/Item";
import Footer from "./views/Footer";

export default {
  name: "App",
  components: {
    Header,
    Item,
    Footer,
  },
};
</script>

<style>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
