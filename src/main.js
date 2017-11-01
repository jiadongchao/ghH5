// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import HelloFromVux from './components/HelloFromVux'
import Home from './components/Home'
import Coredeposits from './pages/Coredeposits'
import store from './store/index'


import {AjaxPlugin} from 'vux'
Vue.use(AjaxPlugin)

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home
},
{
  path: '/Home',
  component: Home
},{
  path: '/Coredeposits',
  component: Coredeposits
}]

const router = new VueRouter({
  mode: 'history',
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store:store,
  render: h => h(App)
}).$mount('#app-box')
