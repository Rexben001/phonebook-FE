<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  text-decoration: none;
  color: inherit;
}

@media screen and (min-width: 600px) {
  #app {
    width: 500px;
    margin: 0 auto;
  }
}
</style>
