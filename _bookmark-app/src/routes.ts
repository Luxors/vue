import { createRouter, createWebHistory } from 'vue-router';
import AuthView from './views/AuthView.vue';
import MainView from './views/MainView.vue';
import DevelopmentView from './views/DevelopmentView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/main',
      name: 'main',
      component: MainView,
      children: [
        {
          path: 'development',
          name: 'development',
          component: DevelopmentView,
        },
      ],
    },
  ],
});
