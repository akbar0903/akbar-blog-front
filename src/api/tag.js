import request from '@/utils/request.js'

/**
 * 获取标签列表
 * @param paginationParams
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getTagListService = (paginationParams) => {
  return request.get('/tag', { params: paginationParams })
}

/**
 * 获取不分页标签列表（不分页）
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getNoPaginationTagListService = () => {
  return request.get('/tag/noPage')
}

/**
 * 添加标签
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const addTagService = (data) => {
  return request.post('/tag', data)
}

/**
 * 更新标签
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const updateTagService = (data) => {
  return request.put('/tag', data)
}

/**
 * 删除标签
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const deleteTagService = (id) => {
  return request.delete(`/tag/${id}`)
}
