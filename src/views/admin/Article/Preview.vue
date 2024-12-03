<script setup>
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getArticleDetailService } from '@/api/article.js'
import { MdPreview, MdCatalog } from 'md-editor-v3'
import { ref } from 'vue'

// 获取路由参数
const route = useRoute()
const articleId = route.params.id

const loading = ref(false)

// 获取文章数据
const article = ref(null)
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

// 目录获取
const id = ref('my-editor')

const scrollElement = document.documentElement
</script>

<template>
  <div class="flex">
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <!-- 文章封面图片 -->
      <div v-if="article" class="relative">
        <img
          :src="article.coverImage"
          alt="文章封面"
          class="w-full h-80 object-cover rounded-lg shadow-md"
        />
        <div
          :class="{
            'bg-blue-500': article.state === '草稿',
            'bg-green-500': article.state === '发布',
          }"
          class="absolute top-4 left-4 text-white py-1 px-3 font-semibold rounded-full text-sm"
        >
          {{ article.state }}
        </div>
      </div>

      <!-- 文章标题 -->
      <h1 v-if="article" class="mt-6 text-3xl font-bold text-gray-900">
        {{ article.title }}
      </h1>

      <div v-if="article" class="flex flex-wrap mt-3 text-gray-600">
        <!-- 文章分类 -->
        <span class="text-sm text-gray-500">
          <icon-mdi-shape class="inline-block text-sm" />
          {{ article.categoryName }}
        </span>

        <!-- 分类标签 -->
        <span
          v-for="(tag, index) in article.tagNames"
          :key="index"
          class="ml-2 bg-blue-100 text-blue-500 text-xs font-semibold py-1 px-3 rounded-full"
        >
          <icon-mdi-tag class="inline" />
          {{ tag }}
        </span>
      </div>

      <!-- 文章创建时间和更新时间 -->
      <div v-if="article" class="mt-4 text-sm text-gray-500">
        <span>创建时间: {{ article.createdTime }}</span>
        <span class="ml-4">更新时间: {{ article.updatedTime }}</span>
      </div>

      <!-- 文章内容 -->
      <div v-if="article" class="mt-8 text-gray-700 text-lg">
        <MdPreview
          codeTheme="atom"
          v-model="article.content"
          previewTheme="cyanosis"
          noImgZoomIn
          :id="id"
        />
      </div>

      <!-- 加载中提示 -->
      <div v-if="loading" class="text-center mt-8">
        <p class="text-gray-500">加载中...</p>
      </div>

      <!-- 返回按钮 -->
      <div class="mt-8 text-center">
        <router-link
          :to="{ name: 'articleList' }"
          class="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
        >
          返回首页
        </router-link>
      </div>
    </div>

    <!-- 目录 -->
    <div v-if="article" class="h-full vh ml-4 p-6 bg-white rounded-lg shadow-lg overflow-y-auto">
      <MdCatalog :scrollElement="scrollElement" :editorId="id" />
    </div>
  </div>
</template>
