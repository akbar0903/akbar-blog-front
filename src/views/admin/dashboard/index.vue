<script setup>
import DashboardCard from '@/components/admin/DashboardCard.vue'
</script>

<template>
  <div class="grid grid-cols-12 gap-6 mb-4">
    <DashboardCard value="567" title="用户" >
      <template #icon>
        <icon-mdi-account-supervisor />
      </template>
      <template #img>
        <img src="@/assets/svgs/blue.svg" class="w-full" alt="blue-svb" />
      </template>
    </DashboardCard>
    <DashboardCard
      value="1076"
      title="文章"
      text-class="text-orange-500"
      icon-class="text-orange-500 group-hover:bg-orange-500"
    >
      <template #icon>
        <icon-mdi-text-box />
      </template>
      <template #img>
        <img src="@/assets/svgs/orange.svg" class="w-full" alt="orange-svb" />
      </template>
    </DashboardCard>
    <DashboardCard
      value="7890"
      title="评论"
      text-class="text-green-500"
      icon-class="text-green-500 group-hover:bg-green-500"
    >
      <template #icon>
        <icon-mdi-message-processing />
      </template>
      <template #img>
        <img src="@/assets/svgs/green.svg" class="w-full" alt="green-svb" />
      </template>
    </DashboardCard>
    <DashboardCard
      value="100056"
      title="访问"
      text-class="text-purple-500"
      icon-class="text-purple-500 group-hover:bg-purple-500"
    >
      <template #icon>
        <icon-mdi-gesture-double-tap />
      </template>
      <template #img>
        <img src="@/assets/svgs/purple.svg" class="w-full" alt="purple-svb" />
      </template>
    </DashboardCard>
  </div>
</template>
