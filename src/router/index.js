import { createRouter, createWebHistory } from 'vue-router'
import { useAdminStore } from '@/stores/index.js'
import { ElMessage } from 'element-plus'

/*---------------------------------前台组件导入---------------------------------*/
const frontLayout = () => import('@/layout/front/index.vue')
const dashboard = () => import('@/views/front/dashboard/index.vue')

/*---------------------------------后台组件导入------------------------------- */
const adminLayout = () => import('@/layout/admin/index.vue')
const adminLogin = () => import('@/views/admin/login/index.vue')
const adminDashboard = () => import('@/views/admin/dashboard/index.vue')
const articleList = () => import('@/views/admin/Article/List.vue')
const articlePreview = () => import('@/views/admin/Article/Preview.vue')
const articleAdd = () => import('@/views/admin/Article/Add.vue')
const articleEdit = () => import('@/views/admin/Article/Edit.vue')
const categoryList = () => import('@/views/admin/category/List.vue')
const tagList = () => import('@/views/admin/tag/List.vue')
const profile = () => import('@/views/admin/personal/Profile.vue')
const updatePWD = () => import('@/views/admin/personal/UpdatePWD.vue')
const avatarHistory = () => import('@/views/admin/album/AvatarHistory.vue')
const articleCoverList = () => import('@/views/admin/album/ArticleCoverList.vue')
const errorPage = () => import('@/views/admin/error-page/404.vue')

const routes = [
  /*---------------------------------前台路由---------------------------------*/
  {
    path: '/',
    component: frontLayout,
    name: 'frontLayout',
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: dashboard,
        name: 'dashboard',
      },
    ],
  },

  /*---------------------------------后台路由---------------------------------*/
  {
    path: '/admin/login',
    component: adminLogin,
    name: 'adminLogin',
  },
  {
    path: '/admin',
    component: adminLayout,
    name: 'adminLayout',
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        component: adminDashboard,
        name: 'adminDashboard',
      },
      {
        path: 'articleList',
        component: articleList,
        name: 'articleList',
      },
      {
        path: 'articlePreview/:id',
        component: articlePreview,
        name: 'articlePreview',
      },
      {
        path: 'articleAdd',
        component: articleAdd,
        name: 'articleAdd',
      },
      {
        path: 'articleEdit/:id',
        component: articleEdit,
        name: 'articleEdit',
      },
      {
        path: 'category',
        component: categoryList,
        name: 'categoryList',
      },
      {
        path: 'tag',
        component: tagList,
        name: 'tagList',
      },
      {
        path: 'avatarHistory',
        component: avatarHistory,
        name: 'avatarHistory',
      },
      {
        path: 'articleCoverList',
        component: articleCoverList,
        name: 'articleCoverList',
      },
      {
        path: 'profile',
        component: profile,
        name: 'profile',
      },
      {
        path: 'updatePWD',
        component: updatePWD,
        name: 'updatePWD',
      },
      {
        path: '/:pathMatch(.*)*',
        component: errorPage,
        name: 'NotFound',
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const adminStore = useAdminStore()
  const token = adminStore.token
  const isAdminPage = to.path.startsWith('/admin') && to.name !== 'adminLogin'

  if (isAdminPage && !token) {
    // 访问后台页面但没有token
    ElMessage.error('认证失败，请先登录！')
    next({ name: 'adminLogin' })
    return
  }

  // 如果已登录且要访问登录页，重定向到后台首页
  if (token && to.name === 'adminLogin') {
    next({ name: 'adminDashboard' })
    return
  }

  // 其他情况放行
  next()
})

export default router
