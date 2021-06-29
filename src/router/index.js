import Vue from 'vue'
import VueRouter from 'vue-router'
import demo from '@/views/demo/demo' //单独的导航页面 不能用懒加载引入
// import Index from '../views/index/index';

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    component: () => import('../views/login/login.vue'),
    hidden: true ,//在导航栏不显示  作为参数传过去控制
    meta: {
      title: '首页'
    }
  },
  {
    path: '/demo',
    name: '首页概览',
    leaf: true, //只有一个节点 点击即跳转
    component: () => import('../views/home/home.vue'),
    iconCls: 'el-icon-s-home',
    children: [{
      path: '/index',
      component: demo,
      name: '首页概览'
    }, ],
    meta: {
      title: '首页概览'
    }
  },
  {
    path: '/account',
    name: '账号管理',
    component: () => import('../views/home/home.vue'), //布局页面
    children: [ //其他导航只跳转children
      {
        path: '/staff',
        name: '员工管理', //通过name值传递渲染侧边导航和面包屑
        iconCls: 'el-icon-s-grid menumedia', //icon图标
        component: () => import('../views/account/staff.vue'),
      },
      {
        path: '/user',
        name: '用户管理',
        iconCls: 'el-icon-s-grid menumedia',
        component: () => import('../views/account/user.vue'),
      },
    ],
    meta: {
      title: '账号管理'
    }
  },

  {
    path: '/about',
    name: 'About',
    iconCls: 'el-icon-s-grid menumedia',
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'About'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router