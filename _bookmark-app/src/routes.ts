import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: () => import('@/views/AuthView.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('@/views/MainView.vue'),
      children: [
        {
          path: 'development',
          name: 'development',
          component: () => import('@/views/DevelopmentView.vue'),
        },
      ],
    },
  ],
});
