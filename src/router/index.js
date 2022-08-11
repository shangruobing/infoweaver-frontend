import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { title: '家' },
    component: () => import('../views/Home/Index.vue')
  },
  {
    path: '/word/:id',
    name: 'word',
    meta: { title: '文件预览' },
    component: () => import('../components/WordPreview.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: '注册' },
    component: () => import('../views/Authentication/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import('../views/Authentication/Login.vue')
  },
  {
    path: '/help',
    name: 'help',
    meta: { title: '帮助' },
    component: () => import('../views/Help/Help.vue')
  },
  {
    path: '/docs',
    name: 'docs',
    meta: { title: '文档' },
    beforeEnter() {
      location.href = 'https://www.infoweaver.cloud/api/docs/'
    }
  },
  {
    path: '/content',
    name: 'content',
    component: () => import('../views/Content/Index.vue'),
    children: [
      {
        path: '',
        meta: { title: '首页' },
        component: () => import('../views/Content/Welcome.vue')
      },
      {
        path: 'chatRobot',
        meta: { title: '聊天机器人' },
        component: () => import('../components/ChatRobot.vue')
      },
      {
        path: 'notice',
        meta: { subMenu: '通知管理', menuItem: '查看文件' },
        component: () => import('../views/NoticeManagement/NoticeList.vue')
      },
      {
        path: 'neo4j',
        meta: { subMenu: '通知管理', menuItem: '文件查询' },
        component: () => import('../views/NoticeManagement/Neo4j.vue')
      },
      {
        path: 'echarts',
        meta: { subMenu: '通知管理', menuItem: '信息统计' },
        component: () => import('../views/NoticeManagement/Statistics.vue')
      },
      {
        path: 'fileList',
        meta: { subMenu: '文件管理', menuItem: '文件预览' },
        component: () => import('../views/FileManagement/FileList.vue')
      },
      {
        path: 'upload',
        meta: { subMenu: '文件管理', menuItem: '文件上传' },
        component: () => import('../views/FileManagement/UploadFileForm.vue')
      },
      {
        path: 'systemInfo',
        meta: { subMenu: '系统设置', menuItem: '运行状况' },
        component: () => import('../views/SystemSettings/SystemInfo.vue')
      },
      {
        path: 'dbInfo',
        meta: { subMenu: '系统设置', menuItem: '数据库监控' },
        component: () => import('../views/SystemSettings/DBinfo.vue')
      },
      {
        path: 'corpus',
        meta: { subMenu: '系统设置', menuItem: '问答语料' },
        component: () => import('../views/SystemSettings/CorpusList.vue')
      },
      {
        path: 'forbidden',
        component: () => import('../views/Exception/Forbidden.vue')
      },
      {
        path: 'help',
        component: () => import('../views/Help/Help.vue')
      },
      {
        path: '/:catchAll(.*)',
        component: () => import('../views/Exception/NotFound.vue')
      }
    ]
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () => import('../views/Exception/Forbidden.vue')
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
  if (username) {
    store.commit('loginSuccess', username)
  }

  const safePage = [
    'home',
    'login',
    'register',
    'notFound',
    'help',
    'test',
    'word',
    'docs',
    'forbidden'
  ]

  if (store.getters.isLogin || safePage.indexOf(from.name) !== -1) {
    return true
  } else {
    return { name: 'login' }
  }
})

export default router
