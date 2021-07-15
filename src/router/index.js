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
        path: '/createcode',
        component: () => import('@/views/order/create_code'),
        name: 'Createcode',
        meta: {
          title: 'title.promocode'
        }
      },
      {
        path: '/createmulticode',
        component: () => import('@/views/order/createmulti_code'),
        name: 'CreateMulticode',
        meta: {
          title: 'title.promocode'
        }
      },
      {
        path: '/withdrawOrders',
        component: () => import('@/views/order/withdrawOrders'),
        name: 'WithdrawOrders',
        meta: {
          title: 'title.withdrawOrders'
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
        path: '/system/application',
        component: () => import('@/views/system/application'),
        name: 'SystemApplication',
        meta: {
          title: 'title.system-application'
        }
      },
      {
        path: '/administrator/change-password',
        component: () => import('@/views/administrator/change-password'),
        name: 'AdministratorChangePassword',
        meta: {
          title: 'title.administrator.change-password'
        }
      },
      {
        path: '/system/administrator',
        component: () => import('@/views/system/administrator'),
        name: 'SystemAdministrator',
        meta: {
          title: 'title.system-administrator'
        }
      },
      {
        path: '/system/createadmin',
        component: () => import('@/views/system/createadmin'),
        name: 'AdministratorCreate',
        meta: {
          title: 'title.createadmin'
        }
      },
      {
        path: '/system/updateadmin',
        component: () => import('@/views/system/updateadmin'),
        name: 'AdministratorUpdate',
        meta: {
          title: 'title.updateadmin'
        }
      },
      {
        path: '/system/adminroles',
        component: () => import('@/views/system/adminroles'),
        name: 'SystemAdminroles',
        meta: {
          title: 'title.system-adminroles'
        }
      },
      {
        path: '/system/createadminroles',
        component: () => import('@/views/system/createadminroles'),
        name: 'AdminrolesCreate',
        meta: {
          title: 'title.createadminroles'
        }
      },
      {
        path: '/member/index',
        component: () => import('@/views/member/index'),
        name: 'MemberIndex',
        meta: {
          title: 'title.member.index'
        }
      },
      {
        path: '/member/create',
        component: () => import('@/views/member/create'),
        name: 'MemberCreate',
        meta: {
          title: 'title.member.create'
        }
      },
      {
        path: '/member/import',
        component: () => import('@/views/member/user-import'),
        name: 'MemberImport',
        meta: {
          title: 'title.member.import'
        }
      },
      {
        path: '/member/:userId',
        component: () => import('@/views/member/detail'),
        name: 'MemberDetail',
        meta: {
          title: 'title.member.detail'
        }
      },
      {
        path: '/member/:userId/edit',
        component: () => import('@/views/member/edit'),
        name: 'MemberEdit',
        meta: {
          title: 'title.member.edit'
        }
      },
      {
        path: '/member/:userId/tags',
        component: () => import('@/views/member/tag'),
        name: 'MemberTag',
        meta: {
          title: 'title.member.tags'
        }
      },
      {
        path: '/member/tag/index',
        component: () => import('@/views/member/tag/index'),
        name: 'MemberTagIndex',
        meta: {
          title: 'title.member.tag.index'
        }
      },
      {
        path: '/member/tag/create',
        component: () => import('@/views/member/tag/create'),
        name: 'MemberTagCreate',
        meta: {
          title: 'title.member.tag.create'
        }
      },
      {
        path: '/member/tag/:id',
        component: () => import('@/views/member/tag/edit'),
        name: 'MemberTagEdit',
        meta: {
          title: 'title.member.tag.edit'
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