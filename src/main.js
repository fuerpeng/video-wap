// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './store'
import router from './router'
import VueLazyload from 'vue-lazyload'
import { ToastPlugin } from 'vux'
Vue.use(VueRouter)
Vue.use(VueLazyload, {
  error: 'src/assets/img/404.jpg'
})

FastClick.attach(document.body)
Vue.use(ToastPlugin)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
