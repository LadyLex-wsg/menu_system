import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login.vue'
import adminHome from '@/views/adminHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'admin',
    component:adminHome
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
