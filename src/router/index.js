import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Home.vue')
    }
  },
  {
    path: '/images/:id',
    name: 'Images',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Images.vue')
    }
  },
  {
    path: '/about',
    name: 'About',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },

  {
    path: '/registro',
    name: 'Registro',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Registro.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
