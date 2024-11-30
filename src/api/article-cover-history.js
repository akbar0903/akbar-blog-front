import request from '@/utils/request.js'

/**
 * 获取文章封面历史
 * @param paginatedParams
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getArticleCoverHistoryService = (paginatedParams) => {
  return request.get('/articleCoverImageHistory', { params: paginatedParams })
}
