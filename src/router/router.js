import Vue from 'vue'
import Router from 'vue-router'
//PAGE
import Login from '@/components/page/Login'
import Home from '@/components/page/Home'
import IntanceManager from '@/components/page/Manager'

//SUB PAGE
import Dashboard from '@/components/subpage/home/dashboard'
import Instance from '@/components/subpage/home/instance'
import Detail from '@/components/subpage/manager/detail'
import Customer from '@/components/subpage/manager/customer'
import Dusun from '@/components/subpage/manager/dusun'
import Worker from '@/components/subpage/manager/worker'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/auth',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/dahsboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/instance',
          name: 'intance',
          component: Instance
        }
      ]
    },
    {
      path: '/instance/detail',
      name: 'instance manager',
      component: IntanceManager,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/instance/detail',
          name: 'detail',
          component: Detail
        },
        {
          path: '/instance/dusun',
          name: 'dusun',
          component: Dusun
        },
        {
          path: '/instance/worker',
          name: 'worker',
          component: Worker
        },
        {
          path: '/instance/customer',
          name: 'customer',
          component: Customer
        }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   const isRequiresAuth = to.matched.some(x => x.meta.requiresAuth)
//   const isLogedIn = JSON.parse(localStorage.getItem('user'))
//   console.log('isLogedIn: ' + (isLogedIn ? isLogedIn.email : 'no user'))

//   if (isRequiresAuth && !isLogedIn) {
//     next('/login')
//   } else if (isRequiresAuth && isLogedIn) {
//     next()
//   } else {
//     next()
//   }
// })
export default router;