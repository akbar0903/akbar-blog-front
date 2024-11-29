<script setup>
import { MdEditor } from 'md-editor-v3'
import { useAdminStore } from '@/stores/index.js'
import { getNoPaginationCategoryListService } from '@/api/category.js'
import { ElMessage } from 'element-plus'
import { getNoPaginationTagListService } from '@/api/tag.js'
import { ref, watch } from 'vue'
import { addArticleService } from '@/api/article.js'

// 切换编辑器主题
const adminStore = useAdminStore()
const editorTheme = ref(adminStore.getTheme() || 'light')
watch(
  () => adminStore.theme,
  (newTheme) => {
    editorTheme.value = newTheme || 'light'
  },
)

// 自定义工具栏(删除不需要的工具)
const toolbarsExclude = ['github', 'htmlPreview', 'fullscreen', 'preview', 'prettier']

const drawerVisible = ref(false)

// 数据
const params = ref({
  title: '',
  summary: '',
  content: 'hello world...',
  coverImage: '',
  state: '',
  isTop: '',
  canComment: '',
  categoryId: '',
  tagIds: [],
})

// 保存为草稿
const saveAsDraft = () => {
  drawerVisible.value = !drawerVisible.value
}

// 发布文章
const submit = async () => {
  drawerVisible.value = true
  try {
    await addArticleService(params.value)
    ElMessage.success('文章发布成功！')
    drawerVisible.value = false
  } catch (error) {
    ElMessage.error(error.message)
  }
}

// 获取分类列表
const categoryList = ref([])
const loadCategoryList = async () => {
  try {
    const result = await getNoPaginationCategoryListService()
    categoryList.value = result.data
  } catch (error) {
    ElMessage.error(error.message)
  }
}
loadCategoryList()

const openDrawer = () => {
  drawerVisible.value = true
}

// 获取标签列表
const tagList = ref([])
const loadTagList = async () => {
  try {
    const result = await getNoPaginationTagListService()
    tagList.value = result.data
  } catch (error) {
    ElMessage.error(error.message)
  }
}
loadTagList()

// 上传文章封面
// 上传文章封面
const selectedFile = ref(null)
const onSelectFile = (uploadFile) => {
  // 保存文件的 URL 以便展示图片
  const fileUrl = URL.createObjectURL(uploadFile.raw)
  params.value.coverImage = fileUrl
  selectedFile.value = fileUrl
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
    <MdEditor
      v-model="params.content"
      :theme="editorTheme"
      :toolbarsExclude="toolbarsExclude"
      noPrettier
    />
  </div>

  <el-drawer v-model="drawerVisible" size="500px" direction="rtl">
    <template #header>
      <span class="text-base text-zinc-500 dark:text-white font-bold">发布文章</span>
    </template>
    <div class="space-y-4">
      <!-- 文章分类-->
      <div class="space-y-2">
        <span class="text-base text-zinc-500 dark:text-white font-bold">分类</span>
        <div class="bg-gray-100 p-4 rounded-md">
          <el-radio-group v-model="params.categoryId">
            <span v-for="category in categoryList" :key="category.id" class="m-1">
              <el-radio :value="category.id" :label="category.categoryName" border />
            </span>
          </el-radio-group>
        </div>
      </div>

      <!-- 文章标签-->
      <div class="space-y-2">
        <span class="text-base text-zinc-500 dark:text-white font-bold">标签</span>
        <div class="bg-gray-100 p-4 rounded-md">
          <el-checkbox-group v-model="params.tagIds">
            <span v-for="tag in tagList" :key="tag.id">
              <el-checkbox :label="tag.tagName" :value="tag.id" border class="m-1" />
            </span>
          </el-checkbox-group>
        </div>
      </div>

      <!-- 文章摘要-->
      <div class="space-y-2">
        <span class="text-base text-zinc-500 dark:text-white font-bold">摘要</span>
        <el-input v-model="params.summary" type="textarea" placeholder="请输入文章摘要" />
      </div>

      <!-- 文章封面-->
      <div class="space-y-2">
        <span class="text-base text-zinc-500 dark:text-white font-bold">封面</span>
        <el-upload action="" :show-file-list="false" :on-change="onSelectFile" :auto-upload="false">
          <icon-mdi-cloud-upload
            v-if="!selectedFile"
            class="text-xl text-center text-zinc-500 dark:text-white"
          />
          <img v-else :src="selectedFile" class="w-full h-full object-cover" alt="文章封面" />
        </el-upload>
      </div>

      <!-- 文章状态-->
      <div class="space-y-2">
        <span class="text-base text-zinc-500 dark:text-white font-bold">状态</span>
        <div class="bg-gray-100 p-4 rounded-md">
          <el-radio-group v-model="params.state">
            <el-radio value="draft" label="草稿" border />
            <el-radio value="published" label="发布" border />
          </el-radio-group>
        </div>
      </div>

      <!-- 置顶-->
      <div class="space-y-2">
        <span class="text-base text-zinc-500 dark:text-white font-bold">置顶</span>
        <div class="bg-gray-100 p-4 rounded-md">
          <el-radio-group v-model="params.isTop">
            <el-radio value="1" label="置顶" border />
            <el-radio value="0" label="不置顶" border />
          </el-radio-group>
        </div>
      </div>

      <!-- 评论-->
      <div class="space-y-2">
        <span class="text-base text-zinc-500 dark:text-white font-bold">评论</span>
        <div class="bg-gray-100 p-4 rounded-md">
          <el-radio-group v-model="params.canComment">
            <el-radio value="1" label="允许评论" border />
            <el-radio value="0" label="禁止评论" border />
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
</template>

<style scoped>
.editor-box {
  box-shadow: var(--my-base-box-shadow);
}

:deep(.el-upload) {
  @apply relative left-1/2 top-0 transform -translate-x-1/2 w-28 h-28;
  @apply border-[1px] border-dashed border-gray-400 rounded-md overflow-hidden;
  @apply transition-colors duration-300 ease-in-out;
  @apply hover:border-[var(--el-color-primary)];
}
</style>
