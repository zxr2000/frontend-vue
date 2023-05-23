<template>
  <nav>
    <router-link to="/login">Login </router-link>
    <router-link to="/user">User </router-link>
    <router-link to="/manager">Manager </router-link>
    <router-link to="/user/my">UserMy </router-link>
    <router-link to="/user/my/message">UserMyMessage </router-link>
    <router-link to="/user/my/friend">UserMyFriend </router-link>
    <router-link to="/user/recom">Recommend </router-link>
    <router-link to="/user/recom/stranger">RecomStranger </router-link>
    <router-link to="/user/recom/friend">RecomFriend </router-link>
    <router-link to="/user/recom/res">RecomRes </router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
