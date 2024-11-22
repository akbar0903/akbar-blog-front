import { createRouter, createWebHistory } from 'vue-router'
import { useAdminStore } from '@/stores/index.js'
import { ElNotification } from 'element-plus'

/*---------------------------------前台组件导入---------------------------------*/
const frontLayout = () => import('@/layout/front/index.vue')
const dashboard = () => import('@/views/front/dashboard/index.vue')

/*---------------------------------后台组件导入------------------------------- */
const adminLayout = () => import('@/layout/admin/index.vue')
const adminLogin = () => import('@/views/admin/login/index.vue')
const adminDashboard = () => import('@/views/admin/dashboard/index.vue')
const articleList = () => import('@/views/admin/Article/List.vue')
const articleEdit = () => import('@/views/admin/Article/Edit.vue')
const categoryList = () => import('@/views/admin/category/List.vue')
const tagList = () => import('@/views/admin/tag/List.vue')
const personal = () => import('@/views/admin/personal/Profile.vue')

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
        path: 'articleEdit',
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
        path: 'personal',
        component: personal,
        name: 'personal',
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const adminStore = useAdminStore()
  const token = adminStore.token
  const isAdminPage = to.path.startsWith('/admin') && to.name !== 'adminLogin'

  if (isAdminPage && !token) {
    // 访问后台页面但没有token
    ElNotification({
      title: '访问失败',
      message: '请先登录！',
      type: 'error',
      duration: 3000,
    })
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
