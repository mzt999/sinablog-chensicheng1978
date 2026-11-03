<template>
  <main class="blog-main">
    <p>陈思诚的新浪博客备份</p>
  </main>
</template>

<script setup>
definePageMeta( {
  layout: "page",
});

useSeoMeta({
  title: () => `关于我`,
  description: () => "我的博客文章",
})
</script>