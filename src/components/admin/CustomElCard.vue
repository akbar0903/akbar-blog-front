<script setup>
</script>

<template>
  <el-card class="table-box !rounded-xl">
    <template #header>
      <slot name="header"> </slot>
    </template>

    <slot name="body"> </slot>
  </el-card>
</template>

<style scoped>
.table-box {
  box-shadow: var(--my-base-box-shadow) !important;
}
</style>
