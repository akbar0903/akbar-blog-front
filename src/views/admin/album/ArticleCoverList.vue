<script setup>
import { deleteArticleCoverHistoryService, getArticleCoverHistoryService } from '@/api/article-cover-history.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import CustomElCard from '@/components/admin/CustomElCard.vue'

const loading = ref(false)

// 分页
const paginationParams = ref({
  pageNum: 1,
  pageSize: 10,
})
const total = ref(0)
const handleCurrentChange = (page) => {
  paginationParams.value.pageNum = page
  loadArticleCoverHistory()
}
const handleSizeChange = (size) => {
  paginationParams.value.pageNum = 1
  paginationParams.value.pageSize = size
  loadArticleCoverHistory()
}

// 获取文章封面历史
const articleCoverHistory = ref([])
const loadArticleCoverHistory = async () => {
  loading.value = true
  try {
    const result = await getArticleCoverHistoryService(paginationParams.value)
    articleCoverHistory.value = result.data.records
    total.value = result.data.total
  } catch (error) {
    ElMessage.error(error.message)
  } finally {
    loading.value = false
  }
}
loadArticleCoverHistory()

// 删除封面
const handleDeleteArticleCover = async (coverId) => {
  await ElMessageBox.confirm('确认删除该封面吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true
      try {
        await deleteArticleCoverHistoryService(coverId)
        await loadArticleCoverHistory()
        ElMessage.success('删除成功')
      } catch (error) {
        ElMessage.error(error.message)
        loading.value = false
      } finally {
        loading.value = false
      }
    })
    .catch(() => {
      ElMessage.info('操作已取消！')
    })
}

// 图片预览器
const isViewerVisible = ref(false)
// 存储当前预览的图片URL列表
const imageUrlList = ref([])
// 当前预览图片的索引
const imageIndex = ref(0)
const handlePreviewImage = (url) => {
  imageUrlList.value = [url]
  imageIndex.value = 0
  isViewerVisible.value = true
}
</script>

<template>
  <CustomElCard>
    <template #header>
      <span class="text-base text-zinc-500 dark:text-white font-bold">头像列表</span>
    </template>
    <template #body>
      <el-table :data="articleCoverHistory" class="!w-full" v-loading="loading">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column prop="coverUrl" label="封面" align="center">
          <template v-slot="scope">
            <el-image
              @click="handlePreviewImage(scope.row.coverUrl)"
              class="w-20 h-20 cursor-pointer"
              :src="scope.row.coverUrl"
              fit="cover"
              lazy
            />
          </template>
        </el-table-column>
        <el-table-column prop="uploadedTime" label="上传时间" align="center" />
        <el-table-column prop="operation" label="操作" align="center">
          <template #default="scope">
            <el-button type="danger" @click="handleDeleteArticleCover(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="!mt-4 justify-self-end"
        v-model:current-page="paginationParams.pageNum"
        v-model:page-size="paginationParams.pageSize"
        :page-sizes="[5, 10, 20, 30]"
        size="default"
        background
        layout="total,sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </CustomElCard>

  <el-image-viewer
    v-if="isViewerVisible"
    :url-list="imageUrlList"
    :initial-index="imageIndex"
    @close="isViewerVisible = false"
  />
</template>
