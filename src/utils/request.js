import axios from 'axios'
import { useAdminStore } from '@/stores'
import router from '@/router/index.js'
import { ElNotification } from 'element-plus'

/**
 * axios 请求拦截器
 *
 */

//定义axios示例
const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

//请求拦截器
instance.interceptors.request.use((config) => {
  const adminStore = useAdminStore()

  if (adminStore.token) {
    config.headers.Authorization = adminStore.token
  }
  return config
})

//响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      return response.data
    }
    ElNotification({
      title: '错误',
      message: response.data.message || '操作失败',
      type: 'error',
      duration: 3000,
    })
    return Promise.reject(response.data)
  },

  //错误响应
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          ElNotification({
            title: '认证失败',
            message: 'token失效，请重新登录！',
            type: 'error',
            duration: 3000,
          })
          router.push({ name: 'adminLogin' })
          break
        case 403:
          ElNotification({
            title: '权限错误',
            message: '没有权限！',
            type: 'error',
            duration: 3000,
          })
          break
        case 404:
          ElNotification({
            title: '请求错误',
            message: '请求的资源不存在！',
            type: 'error',
            duration: 3000,
          })
          break
        case 500:
          ElNotification({
            title: '服务器错误',
            message: '服务器错误！',
            type: 'error',
            duration: 3000,
          })
          break
        default:
          ElNotification({
            title: '错误',
            message: '未知错误！',
            type: 'error',
            duration: 3000,
          })
      }
    } else if (error.request) {
      ElNotification({
        title: '网络错误',
        message: '网络请求超时！',
        type: 'error',
        duration: 3000,
      })
    } else {
      ElNotification({
        title: '配置错误',
        message: '请求配置错误！',
        type: 'error',
        duration: 3000,
      })
    }
    return Promise.reject(error)
  },
)

export default instance
