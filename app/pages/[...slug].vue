<script setup lang="ts">
// const route = useRoute()

// const { data: page } = await useAsyncData('page-' + route.path, () => {
//   return queryCollection('content').path(route.path).first()
// })

// if (!data.value) {
//   throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
// }

// 所有匹配到的路径都不存在，直接抛出 404
throw createError({ statusCode: 404, message: '页面未找到' })
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
