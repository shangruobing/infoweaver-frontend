import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/Home.vue')
  },
  {
    path: '/notice',
    name: 'notice',
    component: () => import('../components/NoticeList.vue')
  },
  {
    path: '/corpus',
    name: 'corpus',
    component: () => import('../components/CorpusList.vue')
  },
  {
    path: '/word/:id',
    name: 'word',
    component: () => import('../components/WordPreview.vue')
  },
  {
    path: '/neo4j',
    name: 'neo4j',
    component: () => import('../components/Neo4j.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../components/Test.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/chatRobot',
    name: 'chatRobot',
    component: () => import('../components/ChatRobot.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('../components/UploadFileForm.vue')
  },
  {
    path: '/echarts',
    name: 'echarts',
    component: () => import('../components/Statistics.vue')
  },
  {
    path: '/fileList',
    name: 'fileList',
    component: () => import('../components/FileList.vue')
  },
  {
    path: '/content',
    name: 'content',
    component: () => import('../components/Content.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/TestChart.vue')
      },
      {
        path: 'notice',
        component: () => import('../components/NoticeList.vue')
      },
      {
        path: 'neo4j',
        component: () => import('../components/Neo4j.vue')
      },
      {
        path: 'echarts',
        component: () => import('../components/Statistics.vue')
      },
      {
        path: 'fileList',
        component: () => import('../components/FileList.vue')
      },
      {
        path: 'upload',
        component: () => import('../components/UploadFileForm.vue')
      },
      {
        path: 'systemInfo',
        component: () => import('../components/SystemInfo.vue')
      },
      {
        path: 'chatRobot',
        component: () => import('../components/ChatRobot.vue')
      },
      {
        path: 'dbInfo',
        component: () => import('../components/DBinfo.vue')
      },
      {
        path: 'corpus',
        component: () => import('../components/CorpusList.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((from) => {
  const isLogin = store.getters.isLogin

  if (isLogin || from.name === 'login' || from.name === 'home') {
    return true
  } else {
    return { name: 'login' }
  }
})

export default router
