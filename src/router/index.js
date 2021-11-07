import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Tours from '../views/Tours.vue'
import Offers from '../views/Offers.vue'
import TourRegister from '../views/TourRegister.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tours',
    name: 'Tours',
    component: Tours
  },
  {
    path: '/offers',
    name: 'Offers',
    component: Offers
  },
  {
    path: '/tours/register',
    name: 'TourRegister',
    component: TourRegister
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
