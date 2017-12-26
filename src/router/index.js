import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Payment from '@/views/Payment'
import PayFinish from '@/views/PayFinish'
import Share from '@/views/Share'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Payment,
      meta: {
        title: '支付'
      }
    },
    {
      path: '/payFinish',
      name: 'PayFinish',
      component: PayFinish,
      meta: {
        title: '支付完成'
      }
    },
    {
      path: '/share',
      name: 'Share',
      component: Share,
      meta: {
        title: '分享'
      }
    }
  ]
})
