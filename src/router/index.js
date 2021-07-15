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
        path: '/order/index',
        component: () => import('@/views/order/index'),
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
        path: '/order/code-import',
        component: () => import('@/views/order/code-import'),
        name: 'CodeImport',
        meta: {
          title: 'title.promocode_import'
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
        component: () => import('@/views/system/administrator/index'),
        name: 'SystemAdministrator',
        meta: {
          title: 'title.system-administrator'
        }
      },
      {
        path: '/system/administrator/create',
        component: () => import('@/views/system/administrator/create'),
        name: 'AdministratorCreate',
        meta: {
          title: 'title.createadmin'
        }
      },
      {
        path: '/system/administrator/update',
        component: () => import('@/views/system/administrator/update'),
        name: 'AdministratorUpdate',
        meta: {
          title: 'title.updateadmin'
        }
      },
      {
        path: '/system/adminroles',
        component: () => import('@/views/system/adminroles/index'),
        name: 'SystemAdminroles',
        meta: {
          title: 'title.system-adminroles'
        }
      },
      {
        path: '/system/adminroles/create',
        component: () => import('@/views/system/adminroles/create'),
        name: 'AdminrolesCreate',
        meta: {
          title: 'title.createadminroles'
        }
      },
      {
        path: '/system/adminroles/update',
        component: () => import('@/views/system/adminroles/update'),
        name: 'AdminrolesUpdate',
        meta: {
          title: 'title.updateadminroles'
        }
      },
      {
        path: '/course/vod/index',
        component: () => import('@/views/course/vod/index'),
        name: 'Vod',
        meta: {
          title: 'title.course.vod.index'
        }
      },
      {
        path: '/course/vod/create',
        component: () => import('@/views/course/vod/create'),
        name: 'VodCreate',
        meta: {
          title: 'title.course.vod.create'
        }
      },
      {
        path: '/course/vod/category/index',
        component: () => import('@/views/course/vod/category/index'),
        name: 'CourseCategories',
        meta: {
          title: 'title.course.vod.category.index'
        }
      },
      {
        path: '/course/vod/category/create',
        component: () => import('@/views/course/vod/category/create'),
        name: 'CategoriesCreate',
        meta: {
          title: 'title.course.vod.category.create'
        }
      },
      {
        path: '/course/vod/category/update',
        component: () => import('@/views/course/vod/category/update'),
        name: 'CategoriesUpdate',
        meta: {
          title: 'title.course.vod.category.update'
        }
      },
      {
        path: '/course/vod/chapter/index',
        component: () => import('@/views/course/vod/chapter/index'),
        name: 'CourseChapters',
        meta: {
          title: 'title.course.vod.chapter.index'
        }
      },
      {
        path: '/course/vod/chapter/create',
        component: () => import('@/views/course/vod/chapter/create'),
        name: 'ChaptersCreate',
        meta: {
          title: 'title.course.vod.chapter.create'
        }
      },
      {
        path: '/course/vod/chapter/update',
        component: () => import('@/views/course/vod/chapter/update'),
        name: 'ChaptersUpdate',
        meta: {
          title: 'title.course.vod.chapter.update'
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
        path: '/member/:userId/remark',
        component: () => import('@/views/member/remark'),
        name: 'MemberRemark',
        meta: {
          title: 'title.member.remark'
        }
      },
      {
        path: '/member/:userId/credit1',
        component: () => import('@/views/member/credit1'),
        name: 'MemberCredit1',
        meta: {
          title: 'title.member.credit1'
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