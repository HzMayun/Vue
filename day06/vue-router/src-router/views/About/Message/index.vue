<template>
  <div>
    <ul class="nav nav-tabs">
      <li v-for="message in messages" :key="message.id">
        <router-link
          :to="{
            name: 'Deltail', //跳转哪个组件
            params: {
              id: message.id,
            },
            query: {
              name: 'jack',
              age: 18,
            },
          }"
          >{{ message.content }}</router-link
        >
      </li>
    </ul>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "message",
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.messages = [
        { id: 1, content: "message001" },
        { id: 2, content: "message002" },
        { id: 3, content: "message003" },
      ];
    }, 0);
  },
};
</script>

<style>
</style>
