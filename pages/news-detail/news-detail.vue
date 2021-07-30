<template>
	<view class="news-detail">
		<text class="title">标题</text>
		<view class="info">
			<text>发表时间：</text>
			<text>浏览人数：</text>
		</view>
		<view class="content">
			内容
			<!-- <rich-text :nodes="detail.content"></rich-text> -->
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
					url: '' + this.id
				})
			}
		},

		onLoad(option) {
			console.log(option)
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
			display: block;
			margin: 20rpx 0;
		}

		.info {
			display: flex;
			justify-content: space-between;
		}
	}
</style>
