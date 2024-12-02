import request from '@/utils/request.js'

/**
 * 获取文章列表
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getArticleListService = (params) => {
  return request.get('article', { params: params })
}


/**
 * 获取文章详情
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getArticleDetailService = (id) => {
  return request.get(`article/${id}`)
}

/**
 * 添加文章
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const addArticleService = (data) => {
  return request.post('/article', data)
}

/**
 * 删除文章
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const deleteArticleService = (id) => {
  return request.delete(`/article/${id}`)
}

export const updateArticleService = (data) => {
  return request.put('/article', data)
}
