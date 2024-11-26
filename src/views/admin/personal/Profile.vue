<script setup>
import UpdateInfo from '@/components/admin/UpdateInfo.vue'
import UpdateAvatar from '@/components/admin/UpdateAvatar.vue'
</script>

<template>
  <div class="card-container bg-white dark:bg-zinc-900 rounded-xl overflow-hidden">
    <div class="block md:flex gap-2 bg-white dark:bg-zinc-900">
      <UpdateInfo />
      <UpdateAvatar />
    </div>
  </div>
</template>

<style scoped>
.card-container {
  box-shadow: var(--my-base-box-shadow) !important;
}
</style>
