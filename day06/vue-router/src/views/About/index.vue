<template>
  <div>
    <h1>About</h1>
    <ul class="nav nav-tabs">
      <li>
        <router-link to="/message">Message</router-link>
      </li>
      <li>
        <router-link to="/news">news</router-link>
      </li>
    </ul>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
};
</script>

<style>
</style>
