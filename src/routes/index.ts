import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Starships',
    component: () => import('../pages/StarshipsPage.vue')
  },
  {
    path: '/starship/:starshipId',
    name: 'Starship',
    component: () => import('../pages/StarshipPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFoundPage.vue')
  }
]

export default routes
