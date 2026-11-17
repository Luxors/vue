import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
    {
      path: '/',
      name: 'auth',
      component: () => import('@/views/AuthView.vue'),
    },
    {
      path: '/main',
      component: () => import('@/views/MainView.vue'),
      children: [
        {
          path: '',
          name: 'main',
          component: () => import('@/views/IndexView.vue'),
        },
        {
          path: ':alias',
          component: () => import('@/views/CategoryView.vue'),
        },
      ],
    },
  ],
});
