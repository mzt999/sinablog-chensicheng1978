<template>
  <div class="page-container">
  	<div style="text-align: center;">第{{currentPage}}页，共{{totalPages}}页</div>
  	<div class="pagination">
  		<span v-if="currentPage == 1" :class="disabledStyle">
		  首页
		</span>

		<nuxt-link
		  v-else
		  to="/"
		  :class="buttonStyles"
		>
		  首页
		</nuxt-link>

		<span class="page-prev-next-container">
		<span v-if="currentPage == 1" :class="disabledStyle">
		  上一页
		</span>
		<nuxt-link
		  v-else
		  :to="'/page/'+prevPage"
		  :class="buttonStyles"
		>
		  上一页
		</nuxt-link>
		<span v-if="currentPage == totalPages" :class="disabledStyle">
		  下一页
		</span>
		<nuxt-link
		  v-else
		  :to="'/page/'+nextPage"
		  :class="buttonStyles"
		>
		  下一页
		</nuxt-link>
		</span>

		<span v-if="currentPage == totalPages" :class="disabledStyle">
		  尾页
		</span>

		<nuxt-link
		  v-else
		  :to="'/page/'+totalPages"
		  :class="buttonStyles"
		>
		  尾页
		</nuxt-link>
  	</div>
  </div>
</template>

<script setup>
const buttonStyles = ref("page-prev-next");
const disabledStyle = ref("page-prev-next-disabled");
const props = defineProps({
  totalPages: {
    type: Number,
    default: 0,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  perPage: {
    type: Number,
    default: 5,
  },
});
const prevPage = props.currentPage > 1 ? props.currentPage - 1 : 1;
const nextPage = props.currentPage < props.totalPages
				        ?props.currentPage - 0 + 1
				        :props.totalPages;
</script>

<style>
.page-container {
	margin-top: 40px;
}
.pagination {
	display: flex;
	justify-content: space-between;
}
.page-prev-next {
	padding: 4px;
	text-decoration: none;
}
.page-prev-next:hover {
	color: black;
}
.page-prev-next-disabled {
	padding: 4px;
	color: #ddd;
}
.page-prev-next-container {
	transform: translateY(4px);
}
</style>
