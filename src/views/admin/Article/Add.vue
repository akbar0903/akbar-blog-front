<script setup>
import { ElMessage } from 'element-plus'
import { addArticleService } from '@/api/article.js'
import router from '@/router/index.js'
import { fileUploadService } from '@/api/upload.js'
import CategoryLoader from '@/components/admin/CategoryLoader.vue'
import TagLoader from '@/components/admin/TagLoader.vue'
import ArticleCoverHistory from '@/components/admin/ArticleCoverHistory.vue'
import Editor from '@/components/admin/Editor.vue'
import { ref } from 'vue'

const drawerVisible = ref(false)

// 数据
const params = ref({
  title: '',
  summary: '',
  content: 'Hello World...',
  coverImage: '',
  state: '',
  isTop: '',
  canComment: '',
  categoryId: '',
  tagIds: [],
})

// 保存为草稿
const saveAsDraft = async () => {
  if (!params.value.title || !params.value.content) {
    ElMessage.error('请填写文章标题和内容！')
    return
  }
  params.value.state = '草稿'
  params.value.isTop = '1'
  params.value.canComment = '1'
  try {
    await addArticleService(params.value)
    ElMessage.success('文章保存成功！')
    await router.push({ name: 'articleList' })
  } catch (error) {
    ElMessage.error(error.message)
  }
}

// 发布文章
const submit = async () => {
  if (!params.value.title || !params.value.content) {
    ElMessage.error('请填写文章标题和内容！')
    return
  }
  params.value.state = '发布'
  drawerVisible.value = true
  if (
    !params.value.categoryId ||
    !params.value.tagIds.length ||
    !params.value.isTop ||
    !params.value.canComment
  ) {
    ElMessage.error('请填完善文章信息！')
    return
  }
  try {
    if (selectedFile.value && !isHistoryCover.value) {
      params.value.coverImage = await uploadCoverImage(selectedFile.value)
    }
    await addArticleService(params.value)
    ElMessage.success('文章发布成功！')
    drawerVisible.value = false
    await router.push({ name: 'articleList' })
  } catch (error) {
    ElMessage.error(error.message)
  }
}

// 打开发布文章的抽屉
const openDrawer = () => {
  if (!params.value.title) {
    ElMessage.error('请填写文章标题！')
    return
  }
  drawerVisible.value = true
}

// 上传文章封面(函数)
const uploadCoverImage = async (file) => {
  try {
    const result = await fileUploadService(file)
    return result.data
  } catch (error) {
    ElMessage.error(error.message)
  }
}

// 文章封面弹窗
const dialogVisible = ref(false)
const handleDialogVisible = () => {
  dialogVisible.value = !dialogVisible.value
}

// 选择文章封面并预览
const isHistoryCover = ref(false)
const selectedFile = ref(null)
const imagePreview = ref(null)
const getOnSelectFile = (uploadFile) => {
  imagePreview.value = URL.createObjectURL(uploadFile.raw)
  selectedFile.value = uploadFile.raw
  isHistoryCover.value = false
  handleDialogVisible()
}

// 选择文章封面历史记录
const getSelectHistoryCover = (coverUrl) => {
  selectedFile.value = coverUrl
  imagePreview.value = coverUrl
  params.value.coverImage = coverUrl
  isHistoryCover.value = true
  handleDialogVisible()
}
</script>

<template>
  <div class="editor-box p-4 h-full bg-white dark:bg-zinc-900 rounded-xl">
    <div class="h-12 flex justify-between items-center gap-16">
      <el-input v-model="params.title" placeholder="请输入文章标题" />
      <div class="flex items-center gap-2">
        <el-button type="primary" plain @click="saveAsDraft">保存为草稿</el-button>
        <el-button type="primary" @click="openDrawer">发布</el-button>
      </div>
    </div>
    <Editor v-model="params.content" />
  </div>

  <el-drawer v-model="drawerVisible" size="500px" direction="rtl">
    <template #header>
      <span class="text-base text-zinc-500 dark:text-white font-bold">发布文章</span>
    </template>
    <div class="space-y-4">
      <!-- 文章分类 -->
      <CategoryLoader v-model="params.categoryId" />
      <!-- 文章标签 -->
      <TagLoader v-model="params.tagIds" />

      <!-- 文章摘要-->
      <div class="space-y-2">
        <span class="text-base text-zinc-500 dark:text-white font-bold">摘要</span>
        <el-input v-model="params.summary" type="textarea" placeholder="请输入文章摘要" />
      </div>

      <!-- 文章封面-->
      <div class="space-y-2">
        <span class="text-base text-zinc-500 dark:text-white font-bold">封面</span>
        <div class="flex justify-center">
          <div
            @click="handleDialogVisible"
            class="w-36 h-36 relative flex justify-center items-center dark:bg-zinc-800 border-[1px] border-dashed border-gray-300 hover:border-[var(--el-color-primary)] rounded-lg cursor-pointer overflow-hidden group transition-colors duration-300 ease-in-out"
          >
            <img
              v-if="selectedFile"
              :src="imagePreview"
              alt="头像"
              class="w-36 h-36 object-cover transition-opacity duration-300 ease-in-out"
            />
            <span v-else class="text-gray-500 dark:text-gray-300">选择封面</span>
            <!-- 遮罩层 -->
            <div
              class="absolute inset-0 bg-gray-500 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex justify-center items-center"
            >
              <icon-mdi-cloud-upload class="text-white text-4xl" />
            </div>
          </div>
        </div>
      </div>

      <!-- 置顶-->
      <div class="space-y-2">
        <span class="text-base text-zinc-500 dark:text-white font-bold">置顶</span>
        <div class="p-4 bg-gray-100 dark:bg-zinc-800 rounded-md">
          <el-radio-group v-model="params.isTop">
            <el-radio value="0" label="置顶" border />
            <el-radio value="1" label="不置顶" border />
          </el-radio-group>
        </div>
      </div>

      <!-- 评论-->
      <div class="space-y-2">
        <span class="text-base text-zinc-500 dark:text-white font-bold">评论</span>
        <div class="p-4 bg-gray-100 dark:bg-zinc-800 rounded-md">
          <el-radio-group v-model="params.canComment">
            <el-radio value="0" label="允许评论" border />
            <el-radio value="1" label="禁止评论" border />
          </el-radio-group>
        </div>
      </div>

      <!-- 发布按钮-->
      <div class="flex justify-end">
        <el-button type="primary" @click="drawerVisible = false">取消</el-button>
        <el-button type="success" @click="submit">确定并发布</el-button>
      </div>
    </div>
  </el-drawer>

  <!-- 文章封面历史记录 -->
  <ArticleCoverHistory
    v-model="dialogVisible"
    :send-on-select-file="getOnSelectFile"
    :send-select-cover-history="getSelectHistoryCover"
  />
</template>

<style scoped>
.editor-box {
  box-shadow: var(--my-base-box-shadow);
}
</style>
