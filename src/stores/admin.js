import { defineStore } from 'pinia'
import { adminGetInfoService } from '@/api/admin.js'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

/**
 * 设置token，移除token，获取用户信息，设置用户信息
 */

export const useAdminStore = defineStore(
  'blog-front-ultimate',
  () => {
    const token = ref('')
    const admin = ref({
      avatar:
        'https://blog-ultimate.oss-cn-beijing.aliyuncs.com/f7eb7354-d3a7-42f7-ac17-590a6ed6c671.jpg',
    })
    const theme = ref('')

    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const getAdmin = async () => {
      try {
        const result = await adminGetInfoService()
        admin.value = result.data
      } catch (error) {
        ElMessage.error('管理员信息获取失败：' + error.message)
      }
    }

    //设置管理员信息
    const setAdmin = (obj) => {
      // 这里真的是一个很巧妙的做法，如果...obj里面的属性跟admin.value原来的属性相同的化，...obj会覆盖掉admin.value原来的属性。
      admin.value = { ...admin.value, ...obj }
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
