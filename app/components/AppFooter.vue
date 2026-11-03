<template>
  <footer>
    <p>陈思诚的新浪博客备份<br>
    	查看
    	<a href="https://mzt999.github.io/weibo-chensicheng1978" class="no-decor-link">
    		<strong>陈思诚的微博</strong>
	    	<i class="fa fa-weibo font-20"></i>
	    </a><br>
	    如有任何疑问，欢迎 <a href="https://wj.qq.com/s2/14668810/d2da/" target="_blank">联系我<i class="fa fa-external-link"></i></a>
    </p>
    <div class="go-top" @click="toTop" :class="{'go-top-hidden': isHidden}">
        <div class="arrow"></div>
        <div class="stick"></div>
    </div>
  </footer>
</template>

<script setup>
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
