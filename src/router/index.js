import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/index/index' //单独的导航页面 不能用懒加载引入
// import Index from '../views/index/index';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    hidden: true, //在导航栏不显示  作为参数传过去控制
    meta: {
      title: 'commen.logintitle'
    }
  },
  {
    path: '/home',
    name: 'commen.indextitle',
    leaf: true, //只有一个节点 点击即跳转
    component: () => import('../views/home/home.vue'),
    iconCls: require('../assets/commen/indexlogo.png'),
    children: [{
      path: '/index',
      component: index,
      name: 'commen.indextitle',
      meta: {
        title: 'commen.indextitle'
      }
    }, ],
    meta: {
      title: 'commen.indextitle'
    }
  },
  {
    path: '/account',
    name: 'commen.operation_management',
    iconCls: require('../assets/commen/indexlogo.png'),
    component: () => import('../views/home/home.vue'), //布局页面
    children: [ //其他导航只跳转children
      {
        path: '/computer',
        name: 'commen.computer_terminal', //通过name值传递渲染侧边导航和面包屑
        iconCls: 'el-icon-s-grid menumedia', //icon图标
        component: () => import('../views/account/computer.vue'),
        meta: {
          title: 'commen.operation_management'
        }
      },
      {
        path: '/mobile',
        name: 'commen.mobile_terminal',
        iconCls: 'el-icon-s-grid menumedia',
        component: () => import('../views/account/mobile.vue'),
        meta: {
          title: 'commen.operation_management'
        }
      },
      {
        path: '/micro',
        name: 'commen.micro_page',
        iconCls: 'el-icon-s-grid menumedia',
        component: () => import('../views/account/micro.vue'),
        meta: {
          title: 'commen.operation_management'
        }
      },
      {
        path: '/comment',
        name: 'commen.comment_management',
        iconCls: 'el-icon-s-grid menumedia',
        component: () => import('../views/account/comment.vue'),
        meta: {
          title: 'commen.operation_management'
        }
      },
    ],
   
  },
  {
    path: '/system',
    name: 'commen.system_configuration',
    iconCls: require('../assets/commen/indexlogo.png'),
    component: () => import('../views/home/home.vue'), //布局页面
    children: [ //其他导航只跳转children

    ],
    meta: {
      title: 'commen.system_configuration'
    }
  },
  {
    path: '/course',
    name: 'commen.course_management',
    iconCls: require('../assets/commen/indexlogo.png'),
    component: () => import('../views/home/home.vue'), //布局页面
    children: [ //其他导航只跳转children

    ],
    meta: {
      title: 'commen.course_management'
    }
  },
  {
    path: '/exam',
    name: 'commen.exam_practice',
    iconCls: require('../assets/commen/indexlogo.png'),
    component: () => import('../views/home/home.vue'), //布局页面
    children: [ //其他导航只跳转children

    ],
    meta: {
      title: 'commen.exam_practice'
    }
  },
  {
    path: '/marketing',
    name: 'commen.marketing_center',
    iconCls: require('../assets/commen/indexlogo.png'),
    component: () => import('../views/home/home.vue'), //布局页面
    children: [ //其他导航只跳转children

    ],
    meta: {
      title: 'commen.marketing_center'
    }
  },
  {
    path: '/user',
    name: 'commen.user_management',
    iconCls: require('../assets/commen/indexlogo.png'),
    component: () => import('../views/home/home.vue'), //布局页面
    children: [ //其他导航只跳转children
        {
          path: '/member',
          name: 'commen.vip', //通过name值传递渲染侧边导航和面包屑
          iconCls: 'el-icon-s-grid menumedia', //icon图标
          component: () => import('../views/member/vip_Member.vue'),
          meta: {
            title: 'commen.user_management'
          }
        },
    ],
    meta: {
      title: 'commen.user_management'
    }
  },
  {
    path: '/transaction',
    name: 'commen.transaction_management',
    iconCls: require('../assets/commen/indexlogo.png'),
    component: () => import('../views/home/home.vue'), //布局页面
    children: [ //其他导航只跳转children

    ],
    meta: {
      title: 'commen.transaction_management'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router