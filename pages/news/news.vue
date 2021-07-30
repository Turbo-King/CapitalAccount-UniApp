<template>
	<view class="news">
		<news-item @itemClik="goDetail" :list="newsList"></news-item>
	</view>
</template>

<script>
	import newsItem from '../../components/news-item.vue'
	export default {
		data() {
			return {
				newsList: [{
						"id": 1,
						"img_url": '/static/icon/logo.png',
						"add_time": 'Thu Sep 17 02:39:05 UTC 2015',
						"title": '我们不会收集用户个人隐私信息，只会收集一些简单的产品交互行为',
						"click": 5
					},
					{
						"id": 2,
						"img_url": '/static/icon/logo.png',
						"add_time": 'Thu Sep 17 02:39:05 UTC 2015',
						"title": '我们不会收集用户个人隐私信息，只会收集一些简单的产品交互行为',
						"click": 15
					},
					{
						"id": 3,
						"img_url": '/static/icon/logo.png',
						"add_time": 'Thu Sep 17 02:39:05 UTC 2015',
						"title": '我们不会收集用户个人隐私信息，只会收集一些简单的产品交互行为',
						"click": 25
					},
					{
						"id": 3,
						"img_url": '/static/icon/logo.png',
						"add_time": 'Thu Sep 17 02:39:05 UTC 2015',
						"title": '我们不会收集用户个人隐私信息，只会收集一些简单的产品交互行为',
						"click": 25
					},
					{
						"id": 3,
						"img_url": '/static/icon/logo.png',
						"add_time": 'Thu Sep 17 02:39:05 UTC 2015',
						"title": '我们不会收集用户个人隐私信息，只会收集一些简单的产品交互行为',
						"click": 25
					},
					{
						"id": 3,
						"img_url": '/static/icon/logo.png',
						"add_time": 'Thu Sep 17 02:39:05 UTC 2015',
						"title": '我们不会收集用户个人隐私信息，只会收集一些简单的产品交互行为',
						"click": 25
					},
					{
						"id": 3,
						"img_url": '/static/icon/logo.png',
						"add_time": 'Thu Sep 17 02:39:05 UTC 2015',
						"title": '我们不会收集用户个人隐私信息，只会收集一些简单的产品交互行为',
						"click": 25
					},
					{
						"id": 3,
						"img_url": '/static/icon/logo.png',
						"add_time": 'Thu Sep 17 02:39:05 UTC 2015',
						"title": '我们不会收集用户个人隐私信息，只会收集一些简单的产品交互行为',
						"click": 25
					}
					
				]
			}
		},
		methods: {
			//获取新闻资讯
			async getNews() {
				// const res = await this.$myRequest({
				// 	url: '/api/public/v1/home/swiperdata'
				// })
				// // console.log(res)
				// this.newsList = res.data.message
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

		onLoad() {
			this.getNews()
		}
	}
</script>

<style lang="scss">
	.news {}
</style>
