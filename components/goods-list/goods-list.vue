<template>
	<view>
		<!-- 消息提示 -->
		<view class="u-demo-area">
			<u-toast :type="type" ref="uToast"></u-toast>
			<text class="no-mode-here"></text>
		</view>
		<view class="goods_list">
			<view class="goods_item" v-for="item in goods" :key="item.id" @click="newsDetail()">
				<image :src="item.image"></image>
				<view class="goods_name">
					{{item.title}}
				</view>
				<view class="time">
					<text>{{item.passtime | formatDate}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['goods'],
		data() {
			return {
				// 消息提示
				type: 'warning',
				title: '该内容不可点击哦！',
				icon: false,
				position: 'center',
			}
		},

		methods: {
			// 点击新闻详情
			newsDetail() {
				this.show()
			},

			// 消息提示
			show() {
				this.$refs.uToast.show({
					title: this.title,
					position: this.position,
					type: this.type,
					icon: this.icon,
				});
			},
			hide() {
				this.$refs.uToast.hide();
			}
		}
	}
</script>

<style lang="scss">
	// 消息提示
	.no-mode-here {
		color: $u-tips-color;
		font-size: 28rpx;
	}

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
