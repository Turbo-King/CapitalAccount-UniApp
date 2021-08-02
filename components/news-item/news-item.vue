<template>
	<view>
		<view class="news_item" @click="newsDetail(item.id)" v-for='item in list' :key='item.id'>
			<image :src="item.img_url"></image>
			<view class="right">
				<view class="tit">
					{{item.title}}
				</view>
				<view class="info">
					<text>发表时间：{{item.add_time | formatDate}}</text>
					<text>浏览人数：{{item.click}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['list'],
		// 时间格式化
		filters: {
			formatData(data) {
				console.log(data)
				const newDate = new Date(data)
				const year = newDate.getFullYear()
				const month = newDate.getMonth().toString().padStart(2, 0)
				const day = newDate.getDay().toString().padStart(2, 0)
				return year + '-' + month + '-' + day
			}
		},

		methods: {
			newsDetail(id) {
				this.$emit('itemClik', id)
			}
		}
	}
</script>

<style lang="scss">
	.news_item {
		display: flex;
		padding: 10rpx 20rpx;
		border-bottom: 1px solid $capitalAccount-color;

		image {
			min-width: 200rpx;
			max-width: 200rpx;
			height: 150rpx;
		}

		.right {
			margin-left: 15rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.tit {
				font-size: 30rpx;
			}

			.info {
				font-size: 24rpx;

				text:nth-child(2) {
					margin-left: 50rpx;
				}
			}
		}

	}
</style>
