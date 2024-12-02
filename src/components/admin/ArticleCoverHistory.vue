<script setup>
import { getArticleCoverHistoryService } from '@/api/article-cover-history.js'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'

const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false,
  },
  sendOnSelectFile: {
    type: Function,
  },
  sendSelectCoverHistory: {
    type: Function,
  },
})
const emit = defineEmits(['update:dialogVisible'])
const myDialogVisible = ref(props.dialogVisible)
watch(
  () => props.dialogVisible,
  (newVal) => {
    myDialogVisible.value = newVal
  },
)
const closeDialog = () => {
  myDialogVisible.value = false
  emit('update:dialogVisible', false)
}

// 获取文章封面历史记录
const coverHistory = ref([])
const paginationParams = ref({ pageNum: 1, pageSize: 14 })
const total = ref(0)
const loadCoverHistory = async () => {
  try {
    const result = await getArticleCoverHistoryService(paginationParams.value)
    coverHistory.value = result.data.records
    total.value = result.data.total
  } catch (error) {
    ElMessage.error(error.message)
  }
}
loadCoverHistory()

// 分页处理
const handleSizeChange = (size) => {
  paginationParams.value.pageSize = size
  loadCoverHistory()
}
const handleCurrentChange = (currentPage) => {
  paginationParams.value.pageNum = currentPage
  loadCoverHistory()
}
</script>

<template>
  <el-dialog
    v-model="myDialogVisible"
    @close="closeDialog"
    id="article-cover-history-dialog"
    width="610"
  >
    <template #header>
      <span class="text-base text-zinc-500 dark:text-white font-bold">选择文章封面</span>
    </template>
    <div class="flex flex-wrap flex-shrink-0 gap-4 p-4">
      <el-upload
        action=""
        :show-file-list="false"
        :on-change="sendOnSelectFile"
        :auto-upload="false"
      >
        <icon-mdi-cloud-upload class="text-xl text-center text-zinc-500 dark:text-white" />
      </el-upload>
      <div v-for="item in coverHistory" :key="item.id" class="w-24 h-24 overflow-hidden">
        <el-image
          :src="item.coverUrl"
          alt="历史封面"
          class="w-full h-full rounded-lg cursor-pointer"
          @click="sendSelectCoverHistory(item.coverUrl)"
          fit="cover"
        />
      </div>
    </div>
    <el-empty v-if="!coverHistory.length" />
    <template #footer>
      <el-pagination
        v-model:current-page="paginationParams.pageNum"
        v-model:page-size="paginationParams.pageSize"
        size="default"
        background
        layout="total, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </el-dialog>
</template>

<style scoped>
:deep(.el-upload) {
  @apply relative left-1/2 top-0 transform -translate-x-1/2 w-24 h-24;
  @apply border-[1px] border-dashed border-gray-400 rounded-md overflow-hidden;
  @apply transition-colors duration-300 ease-in-out;
  @apply hover:border-[var(--el-color-primary)];
}
</style>
