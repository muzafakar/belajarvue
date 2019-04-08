import Vue from 'vue'
import Router from 'vue-router'
//PAGE
import Login from '@/components/page/Login'
import Home from '@/components/page/Home'
import IntanceManager from '@/components/page/Manager'

//SUB PAGE
import Dashboard from '@/components/subpage/home/Dashboard'
import Instance from '@/components/subpage/home/Instance'
import Detail from '@/components/subpage/manager/Detail'
import Customer from '@/components/subpage/manager/Customer'
import Dusun from '@/components/subpage/manager/Dusun'
import Worker from '@/components/subpage/manager/Worker'
import TableInstance from '@/components/global/TableInstance'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
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
      meta: {
        requiresAuth: true
      },
      children: [{
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/instance',
          name: 'intance',
          component: Instance,
          children: [{
              path: '/instance',
              name: 'table',
              component: TableInstance
            },
            {
              path: '/instance/:id/detail',
              name: 'instance manager',
              component: IntanceManager,
              children: [{
                  path: '/instance/:id/detail',
                  name: 'detail',
                  component: Detail
                },
                {
                  path: '/instance/:id/dusun',
                  name: 'dusun',
                  component: Dusun
                },
                {
                  path: '/instance/:id/worker',
                  name: 'worker',
                  component: Worker
                },
                {
                  path: '/instance/:id/customer',
                  name: 'customer',
                  component: Customer
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isRequiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const isLogedIn = JSON.parse(localStorage.getItem('user'))
  // console.log('isLogedIn: ' + (isLogedIn ? isLogedIn.email : 'no user'))

  if (isRequiresAuth && !isLogedIn) {
    next('/auth')
  } else if (isRequiresAuth && isLogedIn) {
    next()
  } else {
    next()
  }
})
export default router;