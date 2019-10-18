import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
      },
      component: r => require.ensure([], () => r(require('@/view/login'))),
    },
  ]
})
