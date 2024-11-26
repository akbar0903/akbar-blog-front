import request from '@/utils/request.js'

/**
 * 获取管理员头像历史列表
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */

export const adminGetAvatarListService = (params) => {
  return request.get('/userAvatarHistory', { params })
}

/**
 * 删除管理员头像历史
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const adminDeleteAvatarService = (id) => {
  return request.delete(`/userAvatarHistory/${id}`)
}
