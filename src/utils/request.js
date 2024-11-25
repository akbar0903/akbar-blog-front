import axios from 'axios'
import { useAdminStore } from '@/stores'
import { ElMessage } from 'element-plus'

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
        401: '认证失败，请先登录！',
        403: '没有权限！',
        404: '请求的资源不存在！',
        500: '服务器错误！',
      }
      const message = messageMap[status] || '未知错误！'

      // 判断是否重复通知
      if (!error.isHandled) {
        ElMessage.error(message)
        error.isHandled = true // 标记已处理
      }
      // 处理401错误，当token过期的时候，清除token信息，这样路由守卫就可以自动跳转到登陆页面了
      if (status === 401) {
        const adminStore = useAdminStore()
        adminStore.setAdmin({})
        adminStore.removeToken()
        location.reload()
      } else if (error.request) {
        ElMessage.error('网络请求超时！')
      } else {
        ElMessage.error(message)
      }
      return Promise.reject(error)
    }
  },
)

export default instance
