import axios from 'axios'
import { useAdminStore } from '@/stores'
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

//请求拦截
instance.interceptors.request.use((config) => {
  const adminStore = useAdminStore()

  if (adminStore.token) {
    config.headers.Authorization = adminStore.token
  }
  return config
})

//响应拦截
instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 0) {
      return response.data
    }
    return Promise.reject(response.data)
  },

  //错误响应
  (error) => {
    if (error.response) {
      const { status } = error.response
      const messageMap = {
        401: '认证失败，请重新登录！',
        403: '没有权限！',
        404: '请求的资源不存在！',
        500: '服务器错误！',
      }
      const message = messageMap[status] || '未知错误！'

      // 判断是否重复通知
      if (!error.isHandled) {
        ElNotification({
          title: '错误',
          message,
          type: 'error',
          duration: 3000,
        })
        error.isHandled = true // 标记已处理
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
    }
  },
)

export default instance
