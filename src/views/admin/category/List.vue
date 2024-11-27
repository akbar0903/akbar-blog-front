<script setup>
import {
  addCategoryService,
  deleteCategoryService,
  getCategoryListService,
  updateCategoryService,
} from '@/api/category.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'

const loading = ref(false)

// 分页
const paginationParams = ref({
  pageNum: 1,
  pageSize: 10,
})
const total = ref(0)
const handleCurrentChange = (page) => {
  paginationParams.value.pageNum = page
  loadCategoryList()
}
const handleSizeChange = (size) => {
  paginationParams.value.pageNum = 1
  paginationParams.value.pageSize = size
  loadCategoryList()
}

// 获取文章分类列表
const categoryList = ref([])
const loadCategoryList = async () => {
  loading.value = true
  try {
    const result = await getCategoryListService(paginationParams.value)
    categoryList.value = result.data.records
    total.value = result.data.total
  } catch (error) {
    ElMessage.error(error.message)
  } finally {
    loading.value = false
  }
}
loadCategoryList()

const formModel = ref({
  categoryName: '',
})
const dialogAddVisible = ref(false)

// 新增文章分类
const addCategory = () => {
  formModel.value = { categoryName: '' }
  dialogAddVisible.value = true
}

// 编辑文章分类
const editCategory = (row) => {
  formModel.value = { ...row }
  dialogAddVisible.value = true
}

// 1到10位非空字符
const validPattern = /^\S{1,10}$/

// 确认新增/编辑
const handleConfirm = async () => {
  if (!formModel.value.categoryName) {
    ElMessage.error('分类名称不能为空！')
    return
  }
  if (!validPattern.test(formModel.value.categoryName)) {
    ElMessage.error('分类名称长度必须在1到10位之间，且不能包含空格！')
    return
  }

  const isEdit = formModel.value.id
  loading.value = true
  try {
    if (isEdit) {
      await updateCategoryService(formModel.value)
      ElMessage.success('编辑分类成功！')
    } else {
      await addCategoryService(formModel.value)
      ElMessage.success('新增分类成功！')
    }
    dialogAddVisible.value = false
    await loadCategoryList()
  } catch (error) {
    ElMessage.error(error.message)
  } finally {
    loading.value = false
  }
}

// 删除文章分类
const deleteCategory = async (id) => {
  await ElMessageBox.confirm('确定删除该分类吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async () => {
      loading.value = true
      try {
        await deleteCategoryService(id)
        ElMessage.success('删除分类成功！')
        await loadCategoryList()
      } catch (error) {
        ElMessage.error(error.message)
      } finally {
        loading.value = false
      }
    })
    .catch(() => {
      ElMessage.info('操作已取消！')
    })
}
</script>

<template>
  <el-card class="table-box !rounded-xl">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-base text-zinc-500 dark:text-white font-bold">分类管理</span>
        <el-button class="!ml-auto" type="success" @click="addCategory">新增分类</el-button>
      </div>
    </template>
    <el-table :data="categoryList" class="!w-full" v-loading="loading">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="categoryName" label="分类名称" />
      <el-table-column prop="createdTime" label="创建时间" />
      <el-table-column prop="updatedTime" label="更新时间" />
      <el-table-column prop="operator" label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" plain @click="editCategory(scope.row)"> 修改</el-button>
          <el-button type="danger" @click="deleteCategory(scope.row.id)"> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="!mt-4 justify-self-end"
      v-model:current-page="paginationParams.pageNum"
      v-model:page-size="paginationParams.pageSize"
      :page-sizes="[5, 10, 20, 30]"
      size="default"
      background
      layout="total,sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>

  <el-dialog v-model="dialogAddVisible" :title="formModel.id ? '编辑分类' : '新增分类'" width="350">
    <el-form>
      <el-form-item label="分类名称">
        <el-input v-model="formModel.categoryName" placeholder="请输入分类名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogAddVisible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.table-box {
  box-shadow: var(--my-base-box-shadow) !important;
}
</style>
