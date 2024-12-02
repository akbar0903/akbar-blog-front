<script setup>
import { useRouter } from 'vue-router'
import { useAdminStore } from '@/stores'
import { ElMessage } from 'element-plus'
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
    ElMessage.error('用户名必须是5到16个字符，且不能包含空格！')
    return
  }

  if (!password || !passwordPattern.test(password)) {
    ElMessage.error('密码至少6位，且必须包含大小写字母和数字！')
    return
  }

  // 启动加载状态
  isLoading.value = true

  try {
    const result = await adminLoginService(formData.value)
    adminStore.setToken(result.data)
    ElMessage.success('登录成功！')
    await router.push({ name: 'adminDashboard' })
  } catch (error) {
    ElMessage.error(error.message)
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
        <el-form-item class="!mb-2">
          <el-button
            @click="login"
            size="large"
            :loading="isLoading"
            type="primary"
            class="!text-base w-full"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  background: url('https://blog-ultimate.oss-cn-beijing.aliyuncs.com/login_bg.jpg') no-repeat;
  background-size: cover;
}
</style>
