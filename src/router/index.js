import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _import = require('./_import_' + process.env.NODE_ENV)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'recommend',
      component: _import('views/recommend/recommend'),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/class/:type/:typeName',
      component: _import('views/class-video/class-video'),
      name: 'classVideo',
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/search',
      component: _import('views/search/search'),
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    {
      path: '/favorite',
      component: _import('views/favorite/favorite'),
      meta: {
        keepAlive: false // 需要被缓存
      }
    },
    {
      path: '/hotVideo',
      component: _import('views/hot-video/hot-video'),
      meta: {
        keepAlive: false // 需要被缓存
      }
    }
  ]
})
