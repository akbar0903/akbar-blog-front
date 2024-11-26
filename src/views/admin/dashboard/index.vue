<script setup>
import DashboardCard from '@/components/admin/DashboardCard.vue'
import { getLogListService } from '@/api/log.js'
import { ref } from 'vue'

// 表格加载状态
const loading = ref(false)
// 分页参数
const paginationParams = ref({
  pageNum: 1,
  pageSize: 10,
})
// 默认总条数
const total = ref(0)

// 更改每页显示的总条数
const handleSizeChange = (size) => {
  paginationParams.value.pageNum = 1
  paginationParams.value.pageSize = size
  getLogList()
}

// 更改当前页
const handleCurrentChange = (page) => {
  paginationParams.value.pageNum = page
  getLogList()
}

const logList = ref([])
const getLogList = async () => {
  loading.value = true
  const result = await getLogListService(paginationParams.value)
  logList.value = result.data.records
  total.value = result.data.total
  loading.value = false
}
getLogList()
</script>

<template>
  <!--卡片组-->
  <div class="grid grid-cols-12 gap-6 mb-6">
    <DashboardCard value="567" title="用户">
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

  <!--日志列表-->
  <el-card class="table-box bg-white">
    <template #header>
      <span class="text-base text-zinc-500 dark:text-white font-bold">日志列表</span>
    </template>
    <el-table :data="logList" class="!w-full" v-loading="loading">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="operationType" label="操作类型">
        <template v-slot="scope">
          <el-tag :type="scope.row.logLevel">
            {{ scope.row.operationType }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="details" label="详情" />
      <el-table-column prop="operator" label="操作人" />
      <el-table-column prop="operatedTime" label="操作时间" />
      <el-table-column prop="ipAddress" label="IP地址" />
    </el-table>

    <!--分页-->
    <el-pagination
      class="!mt-4 justify-self-end"
      v-model:current-page="paginationParams.pageNum"
      v-model:page-size="paginationParams.pageSize"
      :page-sizes="[10, 20, 30, 40, 50]"
      size="default"
      background
      layout="total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<style scoped>
.table-box {
  box-shadow: var(--my-base-box-shadow) !important;
}
</style>
