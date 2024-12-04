<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getArticleDetailService } from '@/api/article.js'
import { MdPreview, MdCatalog } from 'md-editor-v3'
import BackToTop from '@/components/front/BackToTop.vue'
import 'md-editor-v3/lib/preview.css'

const route = useRoute()
const articleId = route.params.id
const loading = ref(false)
const article = ref(null)
const id = ref('article-preview')

// 添加控制目录显示的状态
const showMobileCatalog = ref(false)

// 切换目录显示状态
const toggleCatalog = () => {
  showMobileCatalog.value = !showMobileCatalog.value
}

// 获取文章数据
const loadArticle = async () => {
  loading.value = true
  try {
    const result = await getArticleDetailService(articleId)
    article.value = result.data
  } catch (error) {
    ElMessage.error('获取文章失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

loadArticle()

const scrollElement = document.documentElement

// 控制回到顶部按钮的显示
const showBackToTop = ref(false)
const scrollThreshold = 300 // 滚动阈值

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
</script>

<template>
  <!-- 加载状态 -->
  <div v-if="loading" class="flex justify-center py-10">
    <div
      class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
    ></div>
  </div>

  <!-- 文章内容 -->
  <div v-else-if="article" class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- 左侧文章内容 -->
    <article class="lg:col-span-9 bg-white rounded-lg shadow-md overflow-hidden">
      <!-- 封面图 -->
      <div class="relative h-[400px]">
        <img :src="article.coverImage" :alt="article.title" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black bg-opacity-30"></div>
        <h1 class="absolute bottom-8 left-8 text-3xl font-bold text-white">
          {{ article.title }}
        </h1>
      </div>

      <!-- 文章信息 -->
      <div class="border-b border-gray-100">
        <div class="container max-w-5xl mx-auto px-6 py-4">
          <div class="flex items-center text-sm text-gray-500 space-x-6">
            <!-- 发布日期 -->
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {{ article.createdTime }}
            </div>

            <!-- 浏览量 -->
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {{ article.viewCount }}
            </div>

            <!-- 评论数 -->
            <div class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {{ article.commentCount }}
            </div>
          </div>

          <!-- 标签 -->
          <div class="flex items-center space-x-2 mt-4">
            <span
              v-for="tag in article.tagNames"
              :key="tag"
              class="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- 文章内容 -->
      <div class="container max-w-5xl mx-auto px-6 py-8">
        <MdPreview
          codeTheme="atom"
          :model-value="article.content"
          previewTheme="cyanosis"
          :id="id"
        />
      </div>
    </article>

    <!-- 右侧目录 -->
    <aside class="hidden lg:block lg:col-span-3">
      <div class="sticky top-4 bg-white rounded-lg shadow-md p-4">
        <h3 class="text-lg font-bold mb-4">文章目录</h3>
        <div class="max-h-[calc(100vh-8rem)] overflow-y-auto">
          <MdCatalog :scrollElement="scrollElement" :editorId="id" />
        </div>
      </div>
    </aside>
  </div>

  <!-- 无数据状态 -->
  <div v-else class="text-center py-10 text-gray-500">文章不存在或已被删除</div>

  <!-- 移动端悬浮按钮和目录 -->
  <template v-if="article">
    <!-- 目录按钮 -->
    <button
      class="lg:hidden fixed right-4 bottom-20 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-blue-600 transition-colors"
      @click="toggleCatalog"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- 回到顶部按钮 -->
    <BackToTop v-show="showBackToTop" class="!fixed !right-4 !bottom-4 !w-12 !h-12" />

    <!-- 移动端目录抽屉 -->
    <div
      v-show="showMobileCatalog"
      class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
      @click="toggleCatalog"
    >
      <div
        class="absolute right-0 top-0 bottom-0 w-64 bg-white p-4 transform transition-transform"
        :class="showMobileCatalog ? 'translate-x-0' : 'translate-x-full'"
        @click.stop
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-bold">文章目录</h3>
          <button class="text-gray-500 hover:text-gray-700" @click="toggleCatalog">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="overflow-y-auto max-h-[calc(100vh-6rem)]">
          <MdCatalog :scrollElement="scrollElement" :editorId="id" />
        </div>
      </div>
    </div>
  </template>
</template>

<style>
/* 目录样式 */
:deep(.md-catalog-link) {
  @apply text-gray-600 hover:text-blue-600 transition-colors;
}

:deep(.md-catalog-link.active) {
  @apply text-blue-600 font-medium;
}

/* 自定义滚动条样式 */
.max-h-\[calc\(100vh-8rem\)\]::-webkit-scrollbar {
  width: 4px;
}

.max-h-\[calc\(100vh-8rem\)\]::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded;
}

.max-h-\[calc\(100vh-8rem\)\]::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded hover:bg-gray-400;
}

.md-editor-catalog-indicator {
  display: none;
}

/* 添加移动端目录动画 */
.transition-transform {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* 移动端目录样式 */
.max-h-\[calc\(100vh-6rem\)\]::-webkit-scrollbar {
  width: 4px;
}

.max-h-\[calc\(100vh-6rem\)\]::-webkit-scrollbar-track {
  @apply bg-gray-100 rounded;
}

.max-h-\[calc\(100vh-6rem\)\]::-webkit-scrollbar-thumb {
  @apply bg-gray-300 rounded hover:bg-gray-400;
}

/* 调整按钮间距 */
.fixed.right-4.bottom-20 {
  margin-bottom: 0.5rem;
}
</style>
