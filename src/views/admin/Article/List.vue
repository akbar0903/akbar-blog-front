<script setup>
import { getArticleListService } from '@/api/article.js'
import { ElMessage } from 'element-plus'
import CustomElCard from '@/components/admin/CustomElCard.vue'
import CategorySelect from '@/components/admin/CategorySelect.vue'
import TagSelect from '@/components/admin/TagSelect.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const loading = ref(false)

// 文章列表请求参数/分页参数
const params = ref({
  pageNum: 1,
  pageSize: 10,
  state: null,
  categoryId: null,
  tagId: null,
})
const total = ref(0)
const handleCurrentChange = (page) => {
  params.value.pageNum = page
  loadArticleList()
}
const handleSizeChange = (size) => {
  params.value.pageNum = 1
  params.value.pageSize = size
  loadArticleList()
}

// 加载文章列表数据
const articleList = ref([])
const loadArticleList = async () => {
  loading.value = true
  try {
    const result = await getArticleListService(params.value)
    articleList.value = result.data.records
    total.value = result.data.total
  } catch (error) {
    ElMessage.error(error.message)
  } finally {
    loading.value = false
  }
}
loadArticleList()

// 根据逗号分割的标签字符串，获取标签数组
const getTagNames = (tagStr) => {
  if (!tagStr) {
    return []
  }
  return tagStr.split(',')
}

// 新增文章
const addArticle = () => {
  router.push({ name: 'articleAdd' })
}

// 编辑文章
const editArticle = (articleId) => {
  router.push({ name: 'articleEdit', params: { id: articleId } })
}
</script>

<template>
  <CustomElCard>
    <template #header>
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <span class="mr-10 text-base text-zinc-500 dark:text-white font-bold">文章列表</span>
          <div class="flex items-center space-x-4">
            <el-select clearable v-model="params.state"></el-select>
            <CategorySelect v-model="params.categoryId" />
            <TagSelect v-model="params.tagId" />
            <el-button type="primary">搜索</el-button>
            <el-button type="primary" plain>重置</el-button>
          </div>
        </div>
        <el-button class="!ml-auto" type="success" @click="addArticle">
          <icon-mdi-plus />
          添加文章
        </el-button>
      </div>
    </template>
    <template #body>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="article in articleList"
          :key="article.id"
          class="bg-white border border-gray-350 rounded-lg shadow-lg p-4 space-y-4 dark:bg-zinc-900 dark:text-white"
        >
          <el-image :src="article.coverImage" fit="cover" lazy class="rounded-lg w-full h-48" />
          <div class="flex flex-col space-y-2">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold text-slate-700 dark:text-white truncate">
                {{ article.title }}
              </h3>
              <el-tag v-if="article.state === 'published'" type="success">已发布</el-tag>
              <el-tag v-else type="warning">草稿</el-tag>
            </div>
            <div>
              <p class="text-sm text-slate-600 dark:text-white">分类: {{ article.categoryName }}</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="(tagName, index) in getTagNames(article.tagNames)" :key="index">
                <el-tag class="mt-1" size="small">{{ tagName }}</el-tag>
              </span>
            </div>
            <div class="space-y-1 text-xs text-slate-600 dark:text-white">
              <p>创建时间: {{ article.createdTime }}</p>
              <p>更新时间: {{ article.updatedTime }}</p>
            </div>
          </div>

          <div class="flex justify-between mt-4">
            <el-button type="primary" @click="editArticle(article.id)">修改</el-button>
            <el-button type="danger" @click="deleteCategory(article.id)">删除</el-button>
          </div>
        </div>
      </div>

      <el-pagination
        class="mt-6 justify-self-end"
        v-model:current-page="params.pageNum"
        v-model:page-size="params.pageSize"
        :page-sizes="[5, 10, 20, 30]"
        size="default"
        background
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </CustomElCard>
</template>
