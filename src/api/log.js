import request from '@/utils/request'

/**
 * 获取日志列表
 * @param params
 * @returns {*}
 */
export const getLogListService = (params) => {
  return request.get('/log', { params })
}
