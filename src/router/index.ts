import {createRouter, createWebHistory} from 'vue-router'
import type {Router} from 'vue-router'

import FileInfoEmptyView from "@/views/FileInfoEmptyView.vue";
import FileInfoView from "@/views/FileInfoView.vue";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // component: HomeView,
      redirect: {name: 'file-manager'}
    },
    {
      path: '/fileManager',
      name: 'file-manager',
      component: () => import('../views/FileManagerView.vue'),
      redirect: {name: 'file.empty'},
      children: [
        {
          path: '',
          name: 'file.empty',
          component: FileInfoEmptyView
        },
        {
          path: ':pathId',
          name: 'file.info',
          component: FileInfoView
        },

      ]
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import('../views/NotFoundView.vue')
    },
  ]
})

export default router
