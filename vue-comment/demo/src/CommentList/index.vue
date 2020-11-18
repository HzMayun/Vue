<template>
  <div class="col-md-8">
    <h3 class="reply">评论回复：</h3>
    <h2 v-show="!comments.length">暂无评论，点击左侧添加评论！！！</h2>
    <ul class="list-group">
      <CommentDel
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :delComment="delComment"
      ></CommentDel>
    </ul>
  </div>
</template>
<script>
import CommentDel from "../CommentDel";

export default {
  name: "CommentList",
  components: {
    CommentDel,
  },
  props: {
    comments: Array,
    delComment: Function,
  },
};
</script>
<style >
.reply {
  margin-top: 0px;
}
.user {
  font-size: 22px;
}
</style>
