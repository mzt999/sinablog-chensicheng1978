<template>
  <main class="blog-main">
    <h1>
      分类: {{myCategory}}
    </h1>
    <p>
      <span class="blog-tag">
        <nuxt-link to="/post">
          <i class="fa fa-list"></i>
          所有文章
        </nuxt-link>
      </span>
    </p>
    <div v-for="(blogs,blog_arr_i) in blog_by_year_cat" :key="blog_arr_i">
      <h2 style="margin-bottom: 0px;"
      :id="blogs[0].meta.date.substring(0,4)+'('+blogs.length+')'">
        {{blogs[0].meta.date.substring(0,4)}}({{blogs.length}})
      </h2>
      <p v-for="(blog, index) in blogs" :key="index">
        <span class="blog-date">
          {{blog.meta.date.substring(0,10)}}
        </span>&nbsp;
        <nuxt-link :to="'/post/' + blog.slug" class="blog-link"
        :title="blog.description">
         {{blog.title}}
        </nuxt-link>
      </p> 
    </div>
  </main>
</template>


<script setup>
const route = useRoute()
const myCategory = route.params.category
const { data } = await useAsyncData(
  `blog-category-${route.params.category}`, // 缓存键，可自定义
  async () => {
    return await queryCollection('blog').where('categories', 'LIKE', `%"${myCategory}"%`).select('title','slug','meta','description').all()
  }
)
const blogs = data.value;
const tempObj = {};
const blog_by_year_cat = [];
for (let m = 0; m < blogs.length; m++) {
  const year = blogs[m].meta.date.substring(0,4);
  if (!tempObj[year]) {
    tempObj[year] = [];
  }
  tempObj[year].push(blogs[m]);
}
const key_arr = Object.keys(tempObj);
for (let n = 0; n < key_arr.length; n++) {
  blog_by_year_cat.push(tempObj[key_arr[n]]);
}
definePageMeta( {
  layout: "post",
});

useSeoMeta({
  title: () => `陈思诚|博客分类:${myCategory}`,
  description: () => `陈思诚|文章分类:${myCategory}`,
})
</script>
