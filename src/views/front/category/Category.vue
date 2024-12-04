<template>
  <div class="space-y-6">
    <!-- 分类列表 -->
    <div class="bg-white rounded-lg shadow p-4">
      <h2 class="text-lg font-bold mb-4">文章分类</h2>
      <div class="flex flex-wrap gap-2">
        <button
          class="px-4 py-2 rounded-full text-sm transition-colors"
          :class="[
            !selectedCategory
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
          @click="handleCategorySelect(null)"
        >
          全部
        </button>
        <button
          v-for="category in categories"
          :key="category.id"
          class="px-4 py-2 rounded-full text-sm transition-colors"
          :class="[
            selectedCategory?.id === category.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
          @click="handleCategorySelect(category)"
        >
          {{ category.categoryName }}
          <span class="ml-1 text-xs opacity-75">{{ category.articleCount }}</span>
        </button>
      </div>
    </div>

    <!-- 文章列表 -->
    <div class="bg-white rounded-lg shadow p-4">
      <h2 class="text-lg font-bold mb-4">
        {{ selectedCategory ? selectedCategory.categoryName : '全部' }}文章
      </h2>

      <!-- 加载状态 -->
      <div v-if="loading" class="flex justify-center py-10">
        <div
          class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        ></div>
      </div>

      <!-- 文章列表 -->
      <template v-else>
        <div v-if="articles.length" class="space-y-4">
          <div
            v-for="article in articles"
            :key="article.id"
            class="flex gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            @click="$router.push({ name: 'frontArticleDetail', params: { id: article.id } })"
          >
            <!-- 文章封面 -->
            <img
              :src="article.coverImage"
              :alt="article.title"
              class="w-32 h-24 object-cover rounded-lg"
            />

            <!-- 文章信息 -->
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{{ article.title }}</h3>
              <p class="text-gray-600 text-sm mb-2 line-clamp-2">{{ article.summary }}</p>
              <div class="flex items-center text-sm text-gray-500 space-x-4">
                <span class="flex items-center">
                  <icon-mdi-calendar class="w-4 h-4 mr-1" />
                  {{ article.createdTime }}
                </span>
                <span class="flex items-center">
                  <icon-mdi-eye class="w-4 h-4 mr-1" />
                  {{ article.viewCount }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 无数据状态 -->
        <div v-else class="text-center py-10 text-gray-500">该分类下暂无文章</div>
      </template>

      <!-- 分页 -->
      <div v-if="totalPages > 1" class="mt-6">
        <Pagination
          v-model:currentPage="currentPage"
          :total-pages="totalPages"
          @change="handlePageChange"
        />
      </div>
    </div>
  </div>

  <!-- 回到顶部按钮 -->
  <BackToTop v-show="showBackToTop" class="!fixed !right-4 !bottom-4 !w-12 !h-12" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getNoPaginationCategoryListService } from '@/api/category'
import { getArticleListService } from '@/api/article'
import { ElMessage } from 'element-plus'
import BackToTop from '@/components/front/BackToTop.vue'
import Pagination from '@/components/front/Pagination.vue'

const router = useRouter()
const route = useRoute()

// 分类数据
const categories = ref([])
const selectedCategory = ref(null)
const loading = ref(false)

// 文章列表数据
const articles = ref([])
const currentPage = ref(1)
const totalPages = ref(0)

// 从 URL 参数中恢复状态
const initPage = parseInt(route.query.page) || 1
const initCategoryId = route.query.categoryId ? parseInt(route.query.categoryId) : null
currentPage.value = initPage

// 获取分类列表
const loadCategories = async () => {
  try {
    const result = await getNoPaginationCategoryListService()
    categories.value = result.data
  } catch (error) {
    ElMessage.error('获取分类列表失败：' + error.message)
  }
}

// 获取文章列表
const fetchArticles = async (page = 1) => {
  try {
    loading.value = true
    const result = await getArticleListService({
      pageNum: page,
      pageSize: 10,
      state: '发布',
      categoryId: selectedCategory.value?.id,
    })
    articles.value = result.data.records
    totalPages.value = Math.ceil(result.data.total / result.data.size)
  } catch (error) {
    ElMessage.error('获取文章列表失败：' + error.message)
  } finally {
    loading.value = false
  }
}

// 选择分类
const handleCategorySelect = (category) => {
  selectedCategory.value = category
  currentPage.value = 1
  // 更新 URL 参数
  router.push({
    query: {
      categoryId: category?.id || '',
      page: 1,
    },
  })
  fetchArticles(1)
}

// 监听页码变化
const handlePageChange = (page) => {
  currentPage.value = page
  // 更新 URL 参数
  router.push({
    query: {
      ...route.query,
      page,
    },
  })
  fetchArticles(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 回到顶部功能
const showBackToTop = ref(false)
const scrollThreshold = 300

const handleScroll = () => {
  showBackToTop.value = window.scrollY > scrollThreshold
}

// 初始加载
onMounted(async () => {
  await loadCategories()
  // 如果有初始分类ID，设置选中的分类
  if (initCategoryId) {
    const category = categories.value.find((c) => c.id === initCategoryId)
    if (category) {
      selectedCategory.value = category
    }
  }
  fetchArticles(currentPage.value)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
