import Vue from 'vue'
import VueRouter from 'vue-router'
import i18n from '@/js/i18n';
import AppLayout from '@/views/layouts/app'
import index from '@/views/index/index'

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
        path: '/role',
        component: () => import('@/views/role/role'),
        name: 'Role',
        meta: {
          title: 'title.role'
        }
      },
      {
        path: '/addrole',
        component: () => import('@/views/role/create'),
        name: 'Addrole',
        meta: {
          title: 'title.role'
        }
      },
      {
        path: '/editrole',
        component: () => import('@/views/role/update'),
        name: 'Editrole',
        meta: {
          title: 'title.role'
        }
      },
      {
        path: '/orderlist',
        component: () => import('@/views/order/orderlist'),
        name: 'Orderlist',
        meta: {
          title: 'title.order'
        }
      },
      {
        path: '/promocode',
        component: () => import('@/views/order/promocode'),
        name: 'Promocode',
        meta: {
          title: 'title.promocode'
        }
      },
      {
        path: '/system/config',
        component: () => import('@/views/system/config'),
        name: 'SystemConfig',
        meta: {
          title: 'title.config'
        }
      },
      {
        path: '/administrator/change-password',
        component: () => import('@/views/administrator/change-password'),
        name: 'AdministratorChangePassword',
        meta: {
          title: 'title.administrator.change-password'
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