<template>
  <div id="app">
    <div>
      <header class="site-header jumbotron">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              <h1>请发表对React的评论</h1>
            </div>
          </div>
        </div>
      </header>
    </div>
    <div class="container">
      <CommentAdd :addComment="addComment"></CommentAdd>
      <CommentList :comments="comments" :delComment="delComment"></CommentList>
    </div>
  </div>
</template>

<script>
import CommentAdd from "./CommentAdd";
import CommentList from "./CommentList";

export default {
  name: "App",
  components: {
    CommentAdd,
    CommentList,
  },
  data() {
    return {
      comments: [
        { id: 1, name: "小王", comment: "抽烟、喝酒、烫头" },
        { id: 2, name: "小王", comment: "抽烟、喝酒、烫头" },
      ],
    };
  },
  methods: {
    addComment(name, comment) {
      //定义函数 添加用户名和评论
      this.comments.unshift({ id: Date.now(), name, comment });
    },
    delComment(id) {
      this.comments = this.comments.filter((item) => item.id !== id);
    },
  },
};
</script>

<style >
</style>
