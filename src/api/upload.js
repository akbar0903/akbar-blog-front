import request from '@/utils/request.js'

/**
 * 文件上传
 * @param file
 * @returns {Promise<axios.AxiosResponse<any>>}
 */

export const fileUploadService = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  return request.post('/upload', formData)
}
