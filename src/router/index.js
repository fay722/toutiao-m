import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout', //如果父路由有默认子路由 则name没有意义
    component: () => import('@/views/layout'), // 懒加载
    children: [
      {
        path: '', // 默认路由
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }

    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true // 开启props传参 就是把路由参数映射到组件的props数组中
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user')
  },
  {
    path: '/followNav',
    name: 'followNav',
    component: () => import('@/views/followNav')
  },
  {
    path: '/collectHistory',
    name: 'collectHistory',
    component: () => import('@/views/collect-history')
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile')
  },
  {
    path: '/robot',
    name: 'robot',
    component: () => import('@/views/robot')
  }
]

const router = new VueRouter({
  routes
})

export default router
