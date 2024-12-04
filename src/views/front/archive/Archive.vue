<script setup>
const archives = [
  {
    year: '2024',
    months: [
      {
        month: '03',
        posts: [
          {
            id: 1,
            title: '2024年前端开发趋势展望',
            date: '2024-03-15',
            views: 1234,
          },
          {
            id: 2,
            title: 'Vue3 + TypeScript 实战指南',
            date: '2024-03-10',
            views: 2156,
          },
        ],
      },
      {
        month: '02',
        posts: [
          {
            id: 3,
            title: '深入浅出Tailwind CSS',
            date: '2024-02-25',
            views: 1789,
          },
        ],
      },
    ],
  },
  {
    year: '2023',
    months: [
      {
        month: '12',
        posts: [
          {
            id: 4,
            title: '构建高性能React应用：最佳实践',
            date: '2023-12-20',
            views: 3267,
          },
        ],
      },
    ],
  },
]
</script>

<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h1 class="text-2xl font-bold mb-6">文章归档</h1>
    <div class="space-y-8">
      <!-- 年份循环 -->
      <div v-for="year in archives" :key="year.year" class="space-y-4">
        <h2 class="text-xl font-bold text-gray-800">{{ year.year }}</h2>
        <!-- 月份循环 -->
        <div v-for="month in year.months" :key="`${year.year}-${month.month}`" class="ml-4">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">{{ month.month }}月</h3>
          <!-- 文章列表 -->
          <div class="space-y-3 ml-4">
            <div
              v-for="post in month.posts"
              :key="post.id"
              class="flex items-center space-x-4 group cursor-pointer"
            >
              <div class="text-sm text-gray-500">{{ post.date }}</div>
              <div class="text-gray-700 group-hover:text-blue-600">{{ post.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
