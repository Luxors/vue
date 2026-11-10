import './assets/styles/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';

const pinia = createPinia();
const router = createRouter({
  history: createWebHistory(),
  routes: [],
});
const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');
