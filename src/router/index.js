import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from '@/js/i18n';
import AppLayout from '@/views/layouts/app'
import index from '@/views/index/index'
import vip from '@/views/vip/vip'
import addvip from '@/views/vip/dialogMemberAdd'
import editvip from '@/views/vip/dialogMemberEdit'
import orderlist from'@/views/order/orderlist'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      title: 'title.login'
    }
  },
  {
    path: '/Home',
    component: AppLayout,
    children: [
      {
        path: '/dashboard',
        component: index,
        name: 'Dashboard',
        meta: {
          title: 'title.dashboard'
        }
      },
      {
        path: '/vip',
        component: vip,
        name: 'Vip',
        meta: {
          title: 'title.vip'
        }
      },
      {
        path: '/addvip',
        component: addvip,
        name: 'Addvip',
        meta: {
          title: 'title.vip'
        }
      },
      {
        path: '/editvip',
        component: editvip,
        name: 'Editvip',
        meta: {
          title: 'title.vip'
        }
      },
      {
        path: '/orderlist',
        component: orderlist,
        name: 'Order',
        meta: {
          title: 'title.order'
        }
      }
    ]
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/test/test.vue'),
    meta: {
      title: 'Test'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 设置标题
  document.title = i18n.t(to.meta.title);
  next();
});

export default router