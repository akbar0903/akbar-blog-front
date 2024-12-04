<script setup>
import ProfileCard from '@/components/front/ProfileCard.vue'
import RecentPosts from '@/components/front/RecentPosts.vue'
import TableOfContents from '@/components/front/TableOfContents.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const isArticleDetail = ref(false)

watch(
  () => route.name,
  (newName) => {
    isArticleDetail.value = newName === 'frontArticleDetail'
  },
  { immediate: true },
)
</script>

<template>
  <main class="container mx-auto px-4 py-4">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- 文章列表-->
      <div class="lg:col-span-9">
        <router-view />
      </div>

      <!-- 侧边栏 -->
      <div class="hidden lg:block lg:col-span-3">
        <ProfileCard />
        <RecentPosts />
        <div v-if="isArticleDetail" class="mt-6">
          <TableOfContents />
        </div>
      </div>
    </div>
  </main>
</template>
