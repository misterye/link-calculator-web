import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LinkEfficiency from '../views/LinkEfficiency.vue'
import PowerConverter from '../views/PowerConverter.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/link-efficiency',
      name: 'link-efficiency',
      component: LinkEfficiency
    },
    {
      path: '/power-converter',
      name: 'power-converter',
      component: PowerConverter
    }
  ]
})

export default router
