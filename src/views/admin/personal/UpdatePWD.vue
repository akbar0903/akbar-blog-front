<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { adminUpdatePasswordService } from '@/api/admin.js'
import { ref } from 'vue'
import { useAdminStore } from '@/stores/index.js'

const passwordModel = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

//校验新密码
const newPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
const validateNewPassword = () => {
  //判断是否空
  if (
    !passwordModel.value.newPassword ||
    !passwordModel.value.confirmPassword ||
    !passwordModel.value.oldPassword
  ) {
    ElMessage.error('密码不能为空！')
    return false
  }
  if (!newPasswordPattern.test(passwordModel.value.newPassword)) {
    ElMessage.error('密码至少包含大小写字母和数字，长度至少6位！')
    return false
  }
  if (passwordModel.value.newPassword !== passwordModel.value.confirmPassword) {
    ElMessage.error('两次输入的密码不一致！')
    return false
  }
  return true
}

// 更新密码
const updatePassword = async () => {
  if (!validateNewPassword()) {
    return
  }

  try {
    await ElMessageBox.confirm('确认修改密码吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    const result = await adminUpdatePasswordService(passwordModel.value)
    ElMessage.success(result.message)
    const adminStore = useAdminStore()
    adminStore.removeToken()
    adminStore.setAdmin({})
    document.documentElement.classList.remove('dark')
    location.reload() // 刷新页面
  } catch (error) {
    if (error === 'cancel') {
      ElMessage.info('已取消操作！')
    } else {
      // 网络或其他错误
      ElMessage.error(error.message || '密码更新失败！')
    }
  }
}
</script>

<template>
  <el-card shadow="never" class="card-box !border-none !rounded-xl">
    <el-form label-width="80" class="max-w-sm">
      <el-form-item label="原密码">
        <el-input v-model="passwordModel.oldPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="passwordModel.newPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="passwordModel.confirmPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updatePassword">更新密码</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
.card-box {
  box-shadow: var(--my-base-box-shadow) !important;
}
</style>
