<template>
  <div class="col-md-4">
    <form class="form-horizontal" @submit.prevent="add">
      <div class="form-group">
        <label>用户名</label>
        <input
          type="text"
          class="form-control"
          placeholder="用户名"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label>评论内容</label>
        <textarea
          class="form-control"
          rows="6"
          placeholder="评论内容"
          v-model="comment"
        ></textarea>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-default pull-right">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CommentAdd",
  data() {
    return { name: "", comment: "" };
  },
  props: {
    addComment: Function,
  },
  methods: {
    add() {
      const { name, comment } = this;
      if (!name || !comment) {
        alert("请输入用户名和评论");
        return;
      }
      //调用数组，添加（修改的是App里面的数据）
      this.addComment(name, comment);
      //清空内容
      this.name = "";
      this.comment = "";
    },
  },
};
</script>
<style >
</style>
