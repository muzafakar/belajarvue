import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Login from '../views/Login.vue'
import TVKabelP from '../views/TVKabel.vue'
// Dashboard (PAGE)
import Main from '@/components/page/dashboard/Main'
import Owner from '@/components/page/dashboard/Owner'
import TVKabel from '@/components/page/dashboard/TVKabel'

// TVKabel (PAGE)
import Detail from '@/components/page/tvkabel/Detail'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/dashboard/main'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/dashboard/main',
          name: 'Dashboard',
          component: Main,
        },
        {
          path: '/dashboard/owner',
          name: 'Owner',
          component: Owner,
        },
        {
          path: '/dashboard/tvkabel',
          name: 'TV Kabel',
          component: TVKabel
        }
      ]
    },
    {
      path: '/tvkabel',
      name: 'TV Kabel',
      component: TVKabelP,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/tvkabel/main',
          name: 'TV Kabel Detail',
          component: Detail
        },
        {
          path: '/tvkabel/dusun',
          name: 'TV Kabel Detail',
          component: Detail
        },
        {
          path: '/tvkabel/customer',
          name: 'TV Kabel Detail',
          component: Detail
        },
        {
          path: '/tvkabel/worker',
          name: 'TV Kabel Detail',
          component: Detail
        },
      ]
    }

  ]
})

router.beforeEach((to, from, next) => {
  const isRequiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const isLogedIn = JSON.parse(localStorage.getItem('user'))
  console.log('isLogedIn: ' + (isLogedIn ? isLogedIn.email : 'no user'))

  if (isRequiresAuth && !isLogedIn) {
    next('/login')
  } else if (isRequiresAuth && isLogedIn) {
    next()
  } else {
    next()
  }
})
export default router;