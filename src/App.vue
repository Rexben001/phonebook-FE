<template>
  <nav v-if="token">
    <router-link to="/create">Create</router-link>
    <button v-if="token" class="submit" @click.prevent="logout">Logout</button>
  </nav>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
  data: function() {
    return {
      token: localStorage.getItem('zigsToken'),
    };
  },
  methods: {
    async logout() {
      localStorage.removeItem('zigsToken');
      window.location.href = '/login';
    },
  },
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

nav {
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
  padding: 1rem;
  position: fixed;
  z-index: 300;
  background: white;
  top: 0px;
}

nav a {
  padding: 10px 20px;
  font-weight: 700;
  background: #f5f5f5;
  color: green;
  margin: 0.5rem;
}
nav a:hover,
.submit:hover {
  background: #f5f5f5;
  color: green;
}

.submit {
  border: none;
  background: inherit;
  padding: 10px 20px;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  cursor: pointer;
  font-weight: 700;
  background: #f5f5f5;
  color: green;
  margin: 0.5rem;
}
/* .loader {
  width: 50px;
  height: 50px;
  margin-top: 150px;
} */
@media screen and (min-width: 600px) {
  #app {
    width: 500px;
    margin: 0 auto;
  }
}
</style>
