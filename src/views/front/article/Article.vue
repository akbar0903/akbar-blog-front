<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Pagination from '@/components/front/Pagination.vue'
import { getArticleListService } from '@/api/article'
import { ElMessage } from 'element-plus'
import BackToTop from '@/components/front/BackToTop.vue'

const router = useRouter()
const route = useRoute()
const currentPage = ref(1)
const totalPages = ref(0)
const articles = ref([])
const loading = ref(false)

// 控制回到顶部按钮的显示
const showBackToTop = ref(false)
const scrollThreshold = 300 // 滚动阈值

// 从 URL 参数中恢复页码
const initPage = parseInt(route.query.page) || 1
currentPage.value = initPage

// 监听滚动
const handleScroll = () => {
  showBackToTop.value = window.scrollY > scrollThreshold
}

// 添加和移除滚动监听
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 获取文章列表
const fetchArticles = async (page = 1) => {
  try {
    loading.value = true
    const result = await getArticleListService({
      pageNum: page,
      pageSize: 10,
      state: '发布'
    })
    articles.value = result.data.records
    totalPages.value = Math.ceil(result.data.total / result.data.size)
  } catch (error) {
    ElMessage.error('获取文章列表失败：' + error.message)
  } finally {
    loading.value = false
  }
}

// 修改页码变化处理函数
const handlePageChange = (page) => {
  currentPage.value = page
  // 更新 URL 参数
  router.push({
    query: { ...route.query, page }
  })
  fetchArticles(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 跳转到文章详情
const goToDetail = (id) => {
  router.push({
    name: 'frontArticleDetail',
    params: { id }
  })
}

// 初始加载时使用 URL 中的页码
onMounted(() => {
  fetchArticles(currentPage.value)
})
</script>

<template>
  <div class="bg-white rounded-lg shadow p-4 sm:p-6">
    <h1 class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">文章列表</h1>

    <!-- 加载状态 -->
    <div v-if="loading" class="flex justify-center py-10">
      <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- 文章列表 -->
    <template v-else>
      <div v-if="articles.length" class="space-y-4 sm:space-y-6">
        <div
          v-for="article in articles"
          :key="article.id"
          class="flex gap-3 sm:gap-6 pb-4 sm:pb-6 border-b border-gray-100 last:border-0 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors p-3"
          @click="goToDetail(article.id)"
        >
          <!-- 文章封面 -->
          <div class="shrink-0">
            <img
              :src="article.coverImage"
              :alt="article.title"
              class="w-[120px] h-[80px] sm:w-[200px] sm:h-[134px] object-cover rounded-lg"
            />
          </div>

          <!-- 文章信息 -->
          <div class="flex flex-col flex-grow min-w-0">
            <!-- 标题 -->
            <h2 class="text-base sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 hover:text-blue-600 line-clamp-2">
              {{ article.title }}
            </h2>

            <!-- 摘要 - 在小屏幕下隐藏 -->
            <p class="hidden sm:block text-gray-600 mb-4 line-clamp-2">{{ article.summary }}</p>

            <!-- 文章元信息 -->
            <div class="mt-auto flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-2 sm:gap-4">
              <!-- 发布日期 -->
              <div class="flex items-center">
                <icon-mdi-calendar class="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {{ article.createdTime }}
              </div>

              <!-- 浏览量 -->
              <div class="flex items-center">
                <icon-mdi-eye class="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {{ article.viewCount }}
              </div>

              <!-- 标签 - 在小屏幕下隐藏 -->
              <div class="hidden sm:flex items-center space-x-2">
                <span
                  v-for="tag in article.tagNames"
                  :key="tag"
                  class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 无数据状态 -->
      <div v-else class="text-center py-10 text-gray-500">
        暂无文章
      </div>
    </template>

    <!-- 分页组件 -->
    <div class="mt-6">
      <Pagination
        v-if="totalPages > 1"
        v-model:currentPage="currentPage"
        :total-pages="totalPages"
        @change="handlePageChange"
      />
    </div>
  </div>

  <!-- 回到顶部按钮 -->
  <BackToTop
    v-show="showBackToTop"
    class="!fixed !right-4 !bottom-4 !w-12 !h-12"
  />
</template>
