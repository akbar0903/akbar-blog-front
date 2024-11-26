<script setup>
import { adminUpdateAvatarService } from '@/api/admin.js'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useAdminStore } from '@/stores/index.js'
import { fileUploadService } from '@/api/upload.js'
import { adminGetAvatarListService } from '@/api/avatar-history.js'

// 分页
const paginationParams = ref({
  pageNum: 1,
  pageSize: 10,
})
const total = ref(0)
const handleCurrentChange = (page) => {
  paginationParams.value.pageNum = page
  loadAvatarHistory()
}
const handleSizeChange = (size) => {
  paginationParams.value.pageNum = 1
  paginationParams.value.pageSize = size
  loadAvatarHistory()
}

// 打开抽屉
const drawerVisible = ref(false)
const openDrawer = () => {
  loadAvatarHistory()
  drawerVisible.value = !drawerVisible.value
}

// 获取头像列表
const avatarHistory = ref([])
const loadAvatarHistory = async () => {
  try {
    const result = await adminGetAvatarListService(paginationParams.value)
    avatarHistory.value = result.data.records
    total.value = result.data.total
  } catch (error) {
    ElMessage.error(error.message)
  }
}

const adminStore = useAdminStore()
const avatarUrl = ref(adminStore.admin.avatar)
const selectedFile = ref(null)
const isHistoryAvatar = ref(false) // 是否是历史头像

// 预览头像
const onSelectFile = (uploadFile) => {
  avatarUrl.value = URL.createObjectURL(uploadFile.raw)
  selectedFile.value = uploadFile.raw // Save the selected file
  isHistoryAvatar.value = false // 选择本地头像时，默认不是历史头像
  drawerVisible.value = false
}

// 选择历史头像
const selectHistoryAvatar = (historyAvatarUrl) => {
  avatarUrl.value = historyAvatarUrl
  selectedFile.value = null
  isHistoryAvatar.value = true // 选择的是历史头像
  drawerVisible.value = false
}

// 修改头像
const uploadAvatar = async () => {
  if (avatarUrl.value === adminStore.admin.avatar) {
    // 如果没有选择新的头像
    ElMessage.warning('请选择一个新的头像！')
    return
  }

  try {
    let updatedAvatarUrl = avatarUrl.value
    if (!isHistoryAvatar.value && selectedFile.value) {
      const uploadResult = await fileUploadService(selectedFile.value)
      updatedAvatarUrl = uploadResult.data
    }
    await adminUpdateAvatarService({ avatar: updatedAvatarUrl })
    adminStore.admin.avatar = updatedAvatarUrl
    avatarUrl.value = updatedAvatarUrl
    ElMessage.success('头像修改成功！')
  } catch (error) {
    ElMessage.error('头像更新失败！' + error.message)
  }
}
</script>

<template>
  <el-card shadow="never" class="card-box flex-1 !border-none !rounded-xl">
    <template #header>
      <span class="text-base text-zinc-500 dark:text-white font-bold">上传头像</span>
    </template>
    <div class="mt-10 h-full flex justify-center items-center">
      <div
        @click="openDrawer"
        class="w-44 h-44 relative flex justify-center items-center border-[1px] border-dashed border-gray-300 hover:border-[var(--el-color-primary)] rounded-lg cursor-pointer overflow-hidden group transition-colors duration-300 ease-in-out"
      >
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          alt="头像"
          class="w-44 h-44 object-cover transition-opacity duration-300 ease-in-out"
        />
        <span v-else class="text-gray-500">点击选择头像</span>
        <!-- 遮罩层 -->
        <div
          class="absolute inset-0 bg-gray-500 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex justify-center items-center"
        >
          <icon-mdi-cloud-upload class="text-white text-4xl" />
        </div>
      </div>
    </div>
    <div class="text-center mt-12">
      <el-button @click="uploadAvatar" type="success">确认修改</el-button>
    </div>
  </el-card>

  <!-- 抽屉组件 -->
  <el-drawer v-model="drawerVisible" size="50%" direction="rtl">
    <template #header>
      <span class="text-base text-zinc-500 dark:text-white font-bold">选择头像</span>
    </template>
    <div class="flex flex-wrap flex-shrink-0 gap-4 p-4">
      <el-upload action="" :show-file-list="false" :on-change="onSelectFile" :auto-upload="false">
        <icon-mdi-cloud-upload class="text-xl text-center text-zinc-500 dark:text-white" />
      </el-upload>
      <div v-for="item in avatarHistory" :key="item.id" class="w-24 h-24 overflow-hidden">
        <img
          :src="item.avatarUrl"
          alt="历史头像"
          class="w-full h-full object-cover rounded-lg cursor-pointer"
          @click="selectHistoryAvatar(item.avatarUrl)"
        />
      </div>
    </div>
    <template #footer>
      <el-pagination
        v-model:current-page="paginationParams.pageNum"
        v-model:page-size="paginationParams.pageSize"
        :page-sizes="[5, 10, 15, 20]"
        size="default"
        background
        layout="total,sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </el-drawer>
</template>

<style scoped>
:deep(.el-upload) {
  @apply relative left-1/2 top-0 transform -translate-x-1/2 w-24 h-24;
  @apply border-[1px] border-dashed border-gray-300 rounded-md overflow-hidden;
  @apply transition-colors duration-300 ease-in-out;
  @apply hover:border-[var(--el-color-primary)];
}
</style>
