<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div class="go-top" @click="toTop" :class="{'go-top-hidden': isHidden}">
    <div class="arrow"></div>
    <div class="stick"></div>
  </div>
</template>

<script setup>
const { baseURL, cdnURL } = useRuntimeConfig().app
const prefix = cdnURL || baseURL // 优先使用 cdnURL，否则回退到 baseURL

useHead({
  link: [
    { rel: 'shortcut icon', type: 'image/x-icon', href: prefix+'favicon.ico' },
    { rel: 'icon', type: 'image/x-icon', href: prefix+'favicon.ico' },
    { rel: 'stylesheet', href: prefix+'css/style.css' },
    { rel: 'stylesheet', href: prefix+'font-awesome/css/font-awesome.min.css'},
  ],
})

const isHidden = ref(true);
function toTop() {
  document.querySelector(".container-main").scrollIntoView({behavior: 'smooth'})
}
onMounted(() => {
  window.addEventListener("scroll", function(){
    if (window.scrollY > 199) {
      isHidden.value = false;
    } else {
      isHidden.value = true;
    }
  });
})
</script>