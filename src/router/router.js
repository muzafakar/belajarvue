import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import TVKabelDetail from '../views/TVKabelDetail.vue'
// SEPARATED (PAGE)
import Dashboard from '@/components/page/Dashboard'
import Owner from '@/components/page/Owner'
import TVKabel from '@/components/page/TVKabel'

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
      meta: { requiresAuth: true },
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
          path: '/tvkabel',
          name: 'TV Kabel',
          component: TVKabel,
        }
      ]
    },
    {
      path: '/tvkabeldetail',
      name: 'TV Kabel',
      component: TVKabelDetail,
      meta: { requiresAuth: true },
      children: [

      ]
    }

  ]
})

router.beforeEach((to, from, next) => {
  const isRequiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const isLogedIn = JSON.parse(localStorage.getItem('user'))
  console.log('isLogedIn: ' + isLogedIn)
  if (isRequiresAuth && !isLogedIn) {
    next('/login')
  } else if (isRequiresAuth && isLogedIn) {
    next()
  } else {
    next()
  }
})
export default router;