import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
// SEPARATED
import Dashboard from '@/components/Dashboard'
import Owner from '@/components/Owner'
import Instance from '@/components/Instance'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: '/owner',
          name: 'Owner',
          component: Owner,
        },
        {
          path: '/instance',
          name: 'Instance',
          component: Instance,
        }
      ]
    },

  ]
})

router.beforeEach((to, from, next) => {
  const isRequiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const isLogedIn = sessionStorage.getItem('user')
  // const isLogedIn = false
  console.log("logedIn: " + isLogedIn)
  if (isRequiresAuth && !isLogedIn) {
    next('/login')
  } else if (isRequiresAuth && isLogedIn) {
    next()
  } else {
    next()
  }
})
export default router;