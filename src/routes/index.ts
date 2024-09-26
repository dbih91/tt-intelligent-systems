import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Spaceships',
    component: () => import('../pages/SpaceshipsPage.vue')
  },
  {
    path: '/spaceship/:spaceshipId',
    name: 'Spaceship',
    component: () => import('../pages/SpaceshipPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFoundPage.vue')
  }
]

export default routes
