import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/word/:id',
    name: 'word',
    component: () => import('../components/WordPreview.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Authentication/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Authentication/Login.vue')
  },
  {
    path: '/help',
    name: 'help',
    component: () => import('../views/Help/Help.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/Content/test.vue')
  },
  {
    path: '/content',
    name: 'content',
    component: () => import('../views/Content/Content.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Content/Welcome.vue')
      },
      {
        path: 'chatRobot',
        component: () => import('../components/ChatRobot.vue')
      },
      {
        path: 'notice',
        component: () => import('../views/NoticeManagement/NoticeList.vue')
      },
      {
        path: 'neo4j',
        component: () => import('../views/NoticeManagement/Neo4j.vue')
      },
      {
        path: 'echarts',
        component: () => import('../views/NoticeManagement/Statistics.vue')
      },
      {
        path: 'fileList',
        component: () => import('../views/FileManagement/FileList.vue')
      },
      {
        path: 'upload',
        component: () => import('../views/FileManagement/UploadFileForm.vue')
      },
      {
        path: 'systemInfo',
        component: () => import('../views/SystemSettings/SystemInfo.vue')
      },
      {
        path: 'dbInfo',
        component: () => import('../views/SystemSettings/DBinfo.vue')
      },
      {
        path: 'corpus',
        component: () => import('../views/SystemSettings/CorpusList.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: () => import('../views/Exception/NotFound.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((from) => {
  const username = localStorage.getItem('username')
  // const token = localStorage.getItem('authorization')
  if (username) {
    store.commit('loginSuccess', username)
  }

  const securityPage = ['home', 'login', 'register', 'notFound', 'help']
  if (store.getters.isLogin || securityPage.indexOf(from.name) !== -1) {
    return true
  } else {
    return { name: 'login' }
  }
})

export default router
