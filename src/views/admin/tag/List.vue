<script setup>
import { addTagService, deleteTagService, getTagListService, updateTagService } from '@/api/tag.js'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const loading = ref(false)

// 分页
const paginationParams = ref({
  pageNum: 1,
  pageSize: 10,
})
const total = ref(0)
const handleCurrentChange = (page) => {
  paginationParams.value.pageNum = page
  loadTagList()
}
const handleSizeChange = (size) => {
  paginationParams.value.pageNum = 1
  paginationParams.value.pageSize = size
  loadTagList()
}

// 加载标签列表
const tagList = ref([])
const loadTagList = async () => {
  loading.value = true
  try {
    const result = await getTagListService(paginationParams.value)
    tagList.value = result.data.records
    total.value = result.data.total
  } catch (error) {
    ElMessage.error(error.message)
  } finally {
    loading.value = false
  }
}
loadTagList()

const formModel = ref({
  tagName: '',
})

const dialogVisible = ref(false)

const addTag = () => {
  formModel.value = { tagName: '' }
  dialogVisible.value = true
}

const editTag = (row) => {
  formModel.value = { ...row }
  dialogVisible.value = true
}

// 1到10位非空字符
const validPattern = /^\S{1,10}$/

// 确认新增/编辑标签
const handleConfirm = async () => {
  if (!formModel.value.tagName) {
    ElMessage.error('标签名称不能为空！')
    return
  }

  if (!validPattern.test(formModel.value.tagName)) {
    ElMessage.error('标签名称长度必须在1到10位之间，且不能包含空格！')
    return
  }

  const isEdit = formModel.value.id
  loading.value = true
  try {
    if (isEdit) {
      await updateTagService(formModel.value)
      ElMessage.success('编辑标签成功！')
    } else {
      await addTagService(formModel.value)
      ElMessage.success('新增标签成功！')
    }
    dialogVisible.value = false
    await loadTagList()
  } catch (error) {
    ElMessage.error(error.message)
  } finally {
    loading.value = false
  }
}

// 删除标签
const deleteTag = async (id) => {
  await ElMessageBox.confirm('确定删除该标签吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    loading.value = true
    try {
      await deleteTagService(id)
      ElMessage.success('删除成功！')
      await loadTagList()
    } catch (error) {
      ElMessage.error(error.message)
    } finally {
      loading.value = false
    }
  })
}
</script>

<template>
  <el-card class="table-box !rounded-xl">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="text-base text-zinc-500 dark:text-white font-bold">标签管理</span>
        <el-button class="!ml-auto" type="success" @click="addTag">新增标签</el-button>
      </div>
    </template>
    <el-table :data="tagList" class="!w-full" v-loading="loading">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column prop="tagName" label="标签名称">
        <template v-slot="scope">
          <el-tag type="success">{{ scope.row.tagName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" />
      <el-table-column prop="updatedTime" label="更新时间" />
      <el-table-column prop="operator" label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" plain @click="editTag(scope.row)"> 修改</el-button>
          <el-button type="danger" @click="deleteTag(scope.row.id)"> 删除</el-button>
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

  <el-dialog v-model="dialogVisible" :title="formModel.id ? '编辑标签' : '新增标签'" width="350">
    <el-form>
      <el-form-item label="标签名称">
        <el-input v-model="formModel.tagName" placeholder="请输入标签名称" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
    </template>
  </el-dialog>
</template>

<style scoped></style>
