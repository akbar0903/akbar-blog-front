<script setup>
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores'
import { ElNotification } from 'element-plus'
import { adminLoginService } from '@/api/admin'
import { ref } from 'vue'

const router = useRouter()

const formData = ref({
  username: '',
  password: '',
})

const adminStore = useAdminStore()

// 用于控制按钮的加载状态（防止重复点击）
const isLoading = ref(false)

const login = async () => {
  const { username, password } = formData.value

  if (!username || !usernamePattern.test(username)) {
    ElNotification({
      title: '验证失败',
      message: '用户名必须是5到16个字符，且不能包含空格！',
      type: 'error',
      duration: 3000,
    })
    return
  }

  if (!password || !passwordPattern.test(password)) {
    ElNotification({
      title: '验证失败',
      message: '密码至少6位，且必须包含大小写字母和数字！',
      type: 'error',
      duration: 3000,
    })
    return
  }

  // 启动加载状态
  isLoading.value = true

  try {
    const result = await adminLoginService(formData.value)
    if (result.code === 0) {
      adminStore.setToken(result.data)
      ElNotification({
        title: '登录成功',
        message: result.message,
        type: 'success',
        duration: 3000,
      })
      await router.push({ name: 'adminDashboard' })
    } else {
      ElNotification({
        title: '登录失败',
        message: result.message,
        type: 'error',
        duration: 3000,
      })
    }
  } catch (error) {
    // 捕获任何错误（例如 API 请求失败）
    console.error(error)
    ElNotification({
      title: '请求错误',
      message: '网络或服务器出现问题，请稍后再试。',
      type: 'error',
      duration: 3000,
    })
  } finally {
    // 无论成功或失败，重置按钮状态
    isLoading.value = false
  }
}

// 用户名和密码的正则表达式
const usernamePattern = /^\S{5,16}$/
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
</script>

<template>
  <div class="login-container h-full flex justify-center items-center">
    <el-card class="max-w-xs w-full !rounded-md">
      <h1 class="text-center font-semibold text-2xl text-slate-700 mb-4">管理员登录</h1>

      <el-form>
        <el-form-item>
          <el-input v-model="formData.username" size="large" placeholder="请输入用户名">
            <template #prefix>
              <icon-mdi-account />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="formData.password"
            type="password"
            show-password
            size="large"
            placeholder="请输入密码"
          >
            <template #prefix>
              <icon-mdi-lock />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="!mb-0">
          <el-button @click="login" :loading="isLoading" type="primary" class="!text-base w-full"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  background: url('@/assets/images/login_bg.jpg') no-repeat;
  background-size: cover;
}
</style>
