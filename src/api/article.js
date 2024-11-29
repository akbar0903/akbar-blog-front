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
 * 添加文章
 * @param data
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const addArticleService = (data) => {
  return request.post('/article', data)
}
