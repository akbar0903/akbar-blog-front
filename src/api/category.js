import request from '@/utils/request.js'

/**
 * 获取文章分类列表
 * @param paginationParams
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getCategoryListService = (paginationParams) => {
  return request.get('/category/list', { params: paginationParams })
}

/**
 * 获取文章分类列表（不分页）
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getNoPaginationCategoryListService = () => {
  return request.get('/category/noPage')
}

/**
 * 添加文章分类
 * @returns {Promise<axios.AxiosResponse<any>>}
 * @param data
 */
export const addCategoryService = (data) => {
  return request.post('/category', data)
}

/**
 * 删除文章分类
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const deleteCategoryService = (id) => {
  return request.delete(`/category/${id}`)
}

/**
 * 更新文章分类
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const updateCategoryService = (data) => {
  return request.put('/category', data)
}
