<template>
  <div>
    <h1>Home</h1>
    <ul class="nav nav-tabs">
      <li role="presentation">
        <router-link to="/adress">Adress</router-link>
      </li>
    </ul>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>

<style>
</style>
