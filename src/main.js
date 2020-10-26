import { createApp } from 'vue';
import { createWebHistory, createRouter } from 'vue-router';
import App from './App.vue';
import Details from './components/Details.vue';
import Home from './components/Home.vue';
import Create from './components/Create.vue';
import Login from './components/Login.vue';

const routes = [
  { path: '/details/:id', component: Details, name: 'Details' },
  { path: '/create', component: Create, name: 'Create' },
  { path: '/edit/:id', component: Create, name: 'Update' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/', component: Home, name: 'Home' },
  //   { path: '*', redirect: '/' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('zigsToken');
//   if (to.name === 'Create' && !token) {
//     router.push({
//       name: 'Login',
//     });
//   } else {
//     next();
//   }
// });

createApp(App)
  .use(router)
  .mount('#app');
