<template>
	<view class="contact">
		<image class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
		<view class="info">
			<view @click="phone">联系电话：400-123-123（点击拨打）</view>
			<view>联系地址：江苏省南通市崇川区人民中路89南通职业大学</view>
		</view>
		<map class="map" :longitude="longitude" :latitude="latitude" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 120.900258,
				latitude: 32.014023,
				scale: 15,

				markers: [{
					longitude: 120.900258,
					latitude: 32.014023,
					iconPath: '/static/icon/logo.png',
					width: 60,
					height: 60

				}],

			}
		},
		methods: {
			phone() {
				uni.makePhoneCall({
					phoneNumber: '400-123-123'
				})
			}
		}
	}
</script>

<style lang="scss">
	.contact {
		.img {
			width: 750rpx;
			height: 320rpx;
		}

		.info {
			padding: 10rpx 20rpx;
			font-size: 30rpx;

			view {
				line-height: 70rpx;
				border-bottom: 1px solid #eee;

			}
		}

		.map {
			width: 750rpx;
			height: 750rpx;
		}
	}
</style>
