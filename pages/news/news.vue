<template>
	<view class="news">
		<news-item @itemClik="goDetail" :list="newsList"></news-item>
	</view>
</template>

<script>
	import newsItem from '../../components/news-item/news-item.vue'
	export default {
		data() {
			return {
				newsList: []
			}
		},
		methods: {
			//获取新闻资讯
			async getNews() {
				const res = await this.$myRequest({
					url: '/api/capital/news/list'
				})
				// console.log(res)
				this.newsList = res.data.data
			},

			//点击新闻详情
			goDetail(id) {
				uni.navigateTo({
					url: '/pages/news-detail/news-detail?id=' + id
				})
			}
		},


		components: {
			"news-item": newsItem
		},

		onShow() {
			this.getNews()
		}
	}
</script>

<style lang="scss">
	.news {}
</style>
