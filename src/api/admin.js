import request from '@/utils/request'

/**
 * 管理员登录
 * @param loginData
 * @returns {*}
 */
export const adminLoginService = (loginData) => {
  const params = new FormData()
  params.append('username', loginData.username)
  params.append('password', loginData.password)

  return request.post('/admin/login', params)
}

/**
 * 获取管理员信息
 * @returns {*}
 */
export const adminGetInfoService = () => {
  return request.get('/admin')
}
