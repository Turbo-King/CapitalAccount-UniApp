<template>
	<view>
		<view class="news_item" v-for='item in history' :key='item.id'>
			<view class="right">
				<view class="tit">
					{{item.type==0?'存款':item.type==1?'取款':'转账'}}
				</view>
				<view class="info">
					<text>交易流水号：{{item.id}}</text>
					<text>交易金额：{{item.money}} 元</text>
					<text>账户号：{{item.accountId}}</text>
					<view v-show="item.type==2">收款人：{{item.byAccount}}</view>
					<text>时间：{{item.createTime}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				history: []
			}
		},
		onLoad() {
			this.getHistory()
		},
		methods: {
			async getHistory() {
				const res = await this.$myRequest({
					url: '/api/capital/history/list?accountId=' + uni.getStorageSync(
						'userId')
				})
				// console.log(res)
				this.history = res.data.data
			}
		},
	}
</script>

<style lang="scss">
	.news_item {
		display: flex;
		padding: 10rpx 20rpx;
		border-bottom: 1px solid $capitalAccount-color;

		.right {
			margin-left: 15rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.tit {
				font-size: 20px;
			}

			.info {
				font-size: 15px;
				float: right;

				text {
					display: block
				}
			}
		}

	}
</style>
