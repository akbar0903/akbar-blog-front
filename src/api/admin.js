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

/**
 * 更新管理员密码
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const adminUpdatePasswordService = (data) => {
  const params = new FormData()
  params.append('oldPassword', data.oldPassword)
  params.append('newPassword', data.newPassword)
  params.append('confirmPassword', data.confirmPassword)

  return request.patch('/admin', params)
}

/**
 * 更新管理员信息
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */

export const adminUpdateInfoService = (data) => {
  const params = new FormData()
  params.append('nickname', data.nickname)
  params.append('githubUrl', data.githubUrl)
  params.append('giteeUrl', data.giteeUrl)
  params.append('biliUrl', data.biliUrl)

  return request.patch('/admin/updateInfo', params)
}

/**
 * 更新管理员头像
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const adminUpdateAvatarService = (data) => {
  const formData = new FormData()
  formData.append('avatar', data.avatar)

  return request.patch('/admin/updateAvatar', formData)
}

/**
 * 获取管理员头像历史列表
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */

export const adminGetAvatarListService = (params) => {
  return request.get('/userAvatarHistory', { params })
}
