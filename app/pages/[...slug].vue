<template>
  <main class="blog-main">
    <ContentRenderer :value="page"/>
  </main>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug;

const {data} = await useAsyncData(
  `landingpage-${slug[0]}`,
  async () => {
    return await queryCollection('landingpage').where('slug', '=', slug[0]).first()
  },
)
const page = data.value;

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

// 所有匹配到的路径都不存在，直接抛出 404
// throw createError({ statusCode: 404, message: '页面未找到' })
const config = useRuntimeConfig()
const author = config.app.author;

definePageMeta( {
  layout: "page",
});
useSeoMeta({
  title: () => author+"|"+page.title,
  description: () => author+"|"+page.description,
})
</script>