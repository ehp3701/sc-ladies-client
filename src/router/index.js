import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Members from '../views/Members.vue'
import Games from '../views/Games.vue'
import Winners from '../views/Winners.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Members',
    name: 'Members',
    component: Members
  },
  {
    path: '/Games',
    name: 'Games',
    component: Games
  },
  {
    path: '/Winners',
    name: 'Winners',
    component: Winners
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
