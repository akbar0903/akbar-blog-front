import { defineStore } from 'pinia'
import { adminGetInfoService } from '@/api/admin.js'
import { ref } from 'vue'

/**
 * 设置token，移除token，获取用户信息，设置用户信息
 */

export const useAdminStore = defineStore(
  'blog-front-ultimate',
  () => {
    const token = ref('')
    const admin = ref({})
    const theme = ref('')

    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const getAdmin = async () => {
      const result = await adminGetInfoService()
      admin.value = result.data
    }

    //清除用户信息
    const setAdmin = (obj) => {
      admin.value = obj
    }

    const setTheme = (newTheme) => {
      theme.value = newTheme
    }

    const getTheme = () => {
      return theme.value
    }

    return {
      token,
      setToken,
      removeToken,
      admin,
      getAdmin,
      setAdmin,
      theme,
      setTheme,
      getTheme,
    }
  },
  {
    persist: true,
  },
)
