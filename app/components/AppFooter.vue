<template>
  <footer>
    <p>{{site_description}}<br>
    	查看
    	<a href="https://mzt999.github.io/weibo-chensicheng1978" class="no-decor-link" target="_blank">
    		<strong>微博备份</strong>
	    	<i class="fa fa-weibo font-20"></i>
	    </a><br>
	    如有任何疑问，欢迎 <a href="https://wj.qq.com/s2/14668810/d2da/" target="_blank">联系我<i class="fa fa-external-link"></i></a>
    </p>
    
  </footer>
</template>

<script setup>
const { data: settings } = await useAsyncData('settings', () => {
  return queryCollection('settings').first()
})
const site_description = settings.value.site_description;
</script>
