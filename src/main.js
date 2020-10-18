import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import App from './App.vue';
import Details from './components/Details.vue';
import Home from './components/Home.vue';

const routes = [
  { path: '/details/:id', component: Details, name: 'Details' },
  { path: '/', component: Home, name: 'Home' },
//   { path: '*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
