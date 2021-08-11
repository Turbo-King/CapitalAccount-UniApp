<template>
	<view class="news-detail">
		<text class="title">{{detail.title}}</text>
		<view class="info">
			<text>发表时间：{{detail.createTime}}</text>
			<text>浏览人数：{{detail.browseNum}}</text>
		</view>
		<view class="content">
			<image :src="detail.img"></image>
			<rich-text class="richText" :nodes="detail.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				detail: {}
			}
		},

		methods: {
			//获取资讯详情
			async getNewDetail() {
				const res = await this.$myRequest({
					url: 'http://localhost:9999/api/capital/news/details?id=' + this.id
				})
				// console.log(res)
				this.detail = res.data.data
			}
		},

		onLoad(option) {
			// console.log(option)
			this.id = option.id
			this.getNewDetail()
		}
	}
</script>

<style lang="scss">
	.news-detail {
		font-size: 30rpx;
		padding: 0 20rpx;

		.title {
			text-align: center;
			width: 710rpx;
			font-size: 20px;
			font-weight:20px;
			display: block;
			margin: 20rpx 0;
		}

		.info {
			display: flex;
			justify-content: space-between;
		}
		
		.content{
			margin-top: 20px;
			// width: 750rpx;
			
			
			image{
				width: 100%;
				height: 250px;
				margin-bottom: 20px;
			}
			
			richText{
				
			}
		}
	}
</style>
