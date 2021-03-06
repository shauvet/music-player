// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import Home from './components/HelloFromVux'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home
}]

// const router = new VueRouter({
//   routes
// })

FastClick.attach(document.body)

router.beforeEach((to, from, next) => {
  document.title = to.meta.title + '-葱新科技';
  next()
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
