<template>
	<view class="goods_list">
		<view class="goods_item" v-for="item in goods" :key="item.id">
			<image :src="item.img_url"></image>
			<view class="goods_name">
				{{item.title}}
			</view>
			<view class="time">
				<text>{{item.add_time | formatDate}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['goods']
	}
</script>

<style lang="scss">
	.goods_list {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.goods_item {
			background: #fff;
			width: 355rpx;
			margin: 10rpx 0;
			padding: 15rpx;
			box-sizing: border-box;

			image {
				width: 80%;
				height: 150px;
				display: block;
				margin: auto;
			}

			.price {
				color: $capitalAccount-color;
				font-size: 36rpx;
				margin: 20rpx 0 5rpx 0;

				text:nth-child(2) {
					color: #ccc;
					font-size: 28rpx;
					margin-left: 17rpx;
					text-decoration: line-through;
				}
			}

			.goods_name {
				font-size: 28rpx;
				line-height: 50rpx;
				padding-bottom: 15rpx;
				padding-top: 10rpx;
			}
		}
	}

	//热门新闻时间展示
	.time {
		float: right;
		font-size: 20rpx;
	}
</style>
