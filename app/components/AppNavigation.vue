<template>
  <nav>
    <div class="nav-wrap">
      <header> 
        <nuxt-link class="no-decor-link nav-home" to="/">
          陈思诚的博客
        </nuxt-link>
        <div class="nav-subtitle">
          新浪博客内容备份
        </div>
      </header>
      <ul class="nav-ul">
        <li class="nav-link" v-for="(link, index) in friendSites"
        :key="index">
          <nuxt-link v-if="link.target=='internal'"
          :to="link.path" class="no-decor-link">
            <i class="fa" :class="link.fa_class"></i>
            {{link.title}}
          </nuxt-link>
          <a v-if="link.target=='otherSite'" target="_blank"
          :href="link.path" class="no-decor-link">
            <i class="fa" :class="link.fa_class"></i>
            {{link.title}}
          </a>
          <a v-if="link.target=='external'" target="_blank"
          :href="link.path" class="no-decor-link">
            {{link.title}}
            <i class="fa fa-external-link"></i>
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
const friendSites = ref([{
    path: "/",
    title: "博客首页",
    target: "internal",
    fa_class: "fa-home"
  },
  {
    path: "/about",
    title: "关于",
    target: "internal",
    fa_class: "fa-user"
  },
  {
    path: "/post",
    title: "归档",
    target: "internal",
    fa_class: "fa-archive"
  },
  {
    path: "/gallery",
    title: "相册",
    target: "internal",
    fa_class: "fa-image"
  },
  {
    path: "https://mzt999.github.io/weibo-chensicheng1978",
    title: "微博备份",
    target: "otherSite",
    fa_class: "fa-weibo"
  },
])
</script>
