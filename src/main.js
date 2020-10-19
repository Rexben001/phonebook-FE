import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import App from './App.vue';
import Details from './components/Details.vue';
import Home from './components/Home.vue';
import Create from './components/Create.vue';

const routes = [
  { path: '/details/:id', component: Details, name: 'Details' },
  { path: '/create', component: Create, name: 'Create' },
  { path: '/', component: Home, name: 'Home' },
//   { path: '*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
