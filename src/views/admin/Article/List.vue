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
  pageSize: 8,
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

// 搜索
const handleSearch = () => {
  if (
    params.value.state === null &&
    params.value.categoryId === null &&
    params.value.tagId === null
  ) {
    ElMessage.warning('请选择搜索条件！')
    return
  }
  params.value.pageNum = 1
  loadArticleList()
}

// 重置
const handleReset = () => {
  params.value = {
    pageNum: 1,
    pageSize: 8,
    state: null,
    categoryId: null,
    tagId: null,
  }
  loadArticleList()
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
        <div class="flex items-center space-x-4">
          <el-select clearable v-model="params.state" placeholder="状态">
            <el-option label="发布" value="发布" />
            <el-option label="草稿" value="草稿" />
          </el-select>
          <CategorySelect v-model="params.categoryId" />
          <TagSelect v-model="params.tagId" />
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button type="primary" plain @click="handleReset">重置</el-button>
        </div>
        <el-button class="!ml-auto" type="success" @click="addArticle">
          <icon-mdi-plus />
          添加文章
        </el-button>
      </div>
    </template>
    <template #body>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <el-card
          v-for="article in articleList"
          :key="article.id"
          shadow="hover"
          class="!rounded-lg space-y-4"
        >
          <el-image :src="article.coverImage" fit="cover" lazy class="rounded-lg w-full h-48">
            <template #error>
              <div class="flex justify-center items-center w-full h-48 bg-gray-200">
                <icon-mdi-image-broken-variant class="text-xl text-gray-400" />
              </div>
            </template>
          </el-image>
          <div class="flex flex-col space-y-2">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold text-slate-700 dark:text-white truncate">
                {{ article.title }}
              </h3>
              <el-tag :type="article.state === '发布' ? 'success' : 'warning'">
                {{ article.state }}
              </el-tag>
            </div>
            <div>
              <p class="text-sm text-slate-600 dark:text-white">分类: {{ article.categoryName }}</p>
            </div>
            <div class="flex items-center gap-2">
              <p class="text-sm text-slate-600 dark:text-white text-nowrap">标签:</p>
              <span
                v-for="(tagName, index) in article.tagNames"
                :key="index"
                class="flex items-center"
              >
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
        </el-card>
      </div>

      <el-pagination
        class="mt-6 justify-self-end"
        v-model:current-page="params.pageNum"
        v-model:page-size="params.pageSize"
        :page-sizes="[8, 16, 32, 48]"
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
