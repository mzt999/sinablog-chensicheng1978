<template>
  <main class="blog-main">
    <h1>
      标签: {{myTag}}
    </h1>
    <p>
      <span class="blog-tag">
        <nuxt-link to="/post">
          <i class="fa fa-list" style="color:inherit;"></i>
          所有文章
        </nuxt-link>
      </span>
    </p>
    <div v-for="(blogs,blog_arr_i) in blog_by_year" :key="blog_arr_i">
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
const myTag = route.params.tag
const { data } = await useAsyncData(
  `blog-tag-${myTag}`, // 缓存键，可自定义
  async () => {
    return await queryCollection('blog').where('tags', 'LIKE', `%"${myTag}"%`).select('title','slug','meta','description').all()
  }
)
const blogs = data.value;
const tempObj = {};
const blog_by_year = [];
for (let m = blogs.length; m > 0 ; m--) {
  const year = blogs[m-1].meta.date.substring(0,4);
  if (!tempObj[year]) {
    tempObj[year] = [];
  }
  tempObj[year].push(blogs[m-1]);
}
const key_arr = Object.keys(tempObj);
for (let n = key_arr.length; n > 0; n--) {
  blog_by_year.push(tempObj[key_arr[n-1]]);
}
definePageMeta( {
  layout: "post",
});

useSeoMeta({
  title: () => `陈思诚|文章标签:${myTag}`,
  description: () => `陈思诚|文章标签:${myTag}`,
})
</script>
