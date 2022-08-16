import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store/index'

declare module 'vue-router' {
  export interface RouteMeta {
    requireAuth: boolean
    isAdmin?: boolean
    title?: string
    props?: never
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: { requireAuth: false, title: '首页' },
    component: () => import('../views/Home/Index.vue')
  },
  {
    path: '/word/:id',
    name: 'word',
    meta: { requireAuth: true, title: '文件预览' },
    component: () => import('../components/WordPreview.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { requireAuth: false, title: '注册' },
    component: () => import('../views/Authentication/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { requireAuth: false, title: '登录' },
    component: () => import('../views/Authentication/Login.vue')
  },
  {
    path: '/help',
    name: 'help',
    meta: { requireAuth: false, title: '帮助' },
    component: () => import('../views/Help/Help.vue')
  },
  {
    path: '/markdown',
    name: 'markdown',
    meta: { requireAuth: false, title: '资源' },
    component: () => import('../components/MarkdownPreview.vue')
  },
  {
    path: '/docs',
    name: 'docs',
    meta: { requireAuth: false, title: '文档' },
    beforeEnter: () => {
      // href will leave a history, replace will not.
      location.replace('https://www.infoweaver.cloud/api/docs/')
      // location.href = 'https://www.infoweaver.cloud/api/docs/'
    },
    // TypeScript Type Check Error: beforeEnter and redirect are not compatible.
    redirect: ''
  },
  {
    path: '/guide',
    name: 'guide',
    meta: { requireAuth: false, title: '指南' },
    beforeEnter: () => {
      location.replace('https://www.infoweaver.cloud/guide/')
    },
    // TypeScript Type Check Error: beforeEnter and redirect are not compatible.
    redirect: ''
  },
  {
    path: '/content/',
    name: 'content',
    meta: { requireAuth: true, title: '后台' },
    component: () => import('../views/Content/Index.vue'),
    children: [
      {
        path: '',
        name: 'welcome',
        meta: { requireAuth: true, title: '家' },
        component: () => import('../views/Content/Welcome.vue')
      },
      {
        path: 'chatRobot',
        meta: { requireAuth: false, title: '聊天机器人' },
        component: () => import('../components/ChatRobot.vue')
      },
      {
        path: 'notice',
        meta: { requireAuth: true, subMenu: '通知管理', menuItem: '查看文件' },
        component: () => import('../views/NoticeManagement/NoticeList.vue')
      },
      {
        path: 'neo4j',
        meta: { requireAuth: true, subMenu: '通知管理', menuItem: '文件查询' },
        component: () => import('../views/NoticeManagement/Neo4j.vue')
      },
      {
        path: 'echarts',
        meta: { requireAuth: true, subMenu: '通知管理', menuItem: '信息统计' },
        component: () => import('../views/NoticeManagement/Statistics.vue')
      },
      {
        path: 'fileList',
        meta: { requireAuth: true, subMenu: '文件管理', menuItem: '文件预览' },
        component: () => import('../views/FileManagement/FileList.vue')
      },
      {
        path: 'upload',
        meta: { requireAuth: true, subMenu: '文件管理', menuItem: '文件上传' },
        component: () => import('../views/FileManagement/UploadFileForm.vue')
      },
      {
        path: 'markdown',
        meta: { requireAuth: true, subMenu: '文件管理', menuItem: 'Markdown' },
        component: () => import('../components/MarkdownPreview.vue')
      },
      {
        path: 'systemInfo',
        meta: { requireAuth: true, subMenu: '系统设置', menuItem: '运行状况' },
        component: () => import('../views/SystemSettings/SystemInfo.vue')
      },
      {
        path: 'dbInfo',
        meta: { requireAuth: true, subMenu: '系统设置', menuItem: '数据库监控' },
        component: () => import('../views/SystemSettings/DBinfo.vue')
      },
      {
        path: 'corpus',
        meta: { requireAuth: true, subMenu: '系统设置', menuItem: '问答语料' },
        component: () => import('../views/SystemSettings/CorpusList.vue')
      },
      {
        path: 'forbidden',
        meta: { requireAuth: false, title: '未授权' },
        component: () => import('../views/Exception/Forbidden.vue')
      },
      {
        path: 'help',
        meta: { requireAuth: true, title: '帮助' },
        component: () => import('../views/Help/Help.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        meta: { requireAuth: true, title: '未找到' },
        component: () => import('../views/Exception/NotFound.vue')
      }
    ]
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    meta: { requireAuth: false, title: '未授权' },
    component: () => import('../views/Exception/Forbidden.vue')
  },
  {
    path: '/pinia',
    name: 'pinia',
    meta: { requireAuth: false, title: 'pinia' },
    component: () => import('../views/Test/UsePinia.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    meta: { requireAuth: false, title: '未找到' },
    component: () => import('../views/Exception/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  strict: true
})

router.beforeEach((to) => {
  const username = localStorage.getItem('username')
  if (username) {
    store.commit('loginSuccess', username)
  }

  // Auth required and not logged in.
  if (to.meta.requiresAuth && !store.getters.isLogin) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // The page couldn't be found and its path doesn't include "/content".
  if (to.meta.title === '未找到' && to.path.indexOf('/content') === -1) {
    // Next time, the page will not jump to the NotFound page.
    if (to.fullPath !== '/') {
      return { name: 'notFound' }
    }
  }
})

export default router
