import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/arts',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/ArtsPage.vue') },
      { path: ':id', component: () => import('src/pages/ArtPage.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('src/pages/HomePage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
