<template>
	<view class="home">
		<swiper indicator-dots circular>
			<swiper-item v-for="item in swipers" :key="item.goods_id">
				<image :src="item.image_src"></image>
			</swiper-item>
		</swiper>
		<!-- 导航区域 -->
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in navs" :key="index"
				@click="navItemClick(item.path,item.title)">
				<view :class="item.icon"></view>
				<text>{{item.title}}</text>
			</view>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers: [],
				navs: [{
					icon: 'iconfont icon-ziyuan',
					title: '新闻资讯',
					path: '/pages/news/news'
				}, {
					icon: 'iconfont icon-tupian',
					title: '金融业务',
					path: '/pages/business/business'
				}, {
					icon: 'iconfont icon-shipin',
					title: '我的',
					path: '/pages/me/me'
				}, {
					icon: 'iconfont icon-guanyuwomen',
					title: '联系我们',
					path: '/pages/contact/contact'
				}]
			}
		},
		onLoad() {
			this.getSwipers()

		},
		methods: {
			//获取轮播数据 
			async getSwipers() {
				const res = await this.$myRequest({
					url: '/api/public/v1/home/swiperdata'
				})
				this.swipers = res.data.message
			},

			//导航点击处理跳转
			navItemClick(url, title) {
				// console.log('跳转', url)
				if (title === '联系我们') {
					uni.navigateTo({
						url: url
					})
				} else {
					uni.switchTab({
						url: url
					})
				}
			}

		}
	}
</script>

<style lang="scss">
	.home {
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		//导航栏
		.nav {
			display: flex;

			.nav_item {
				width: 25%;
				text-align: center;

				view {
					width: 120rpx;
					height: 120rpx;
					background: $capitalAccount-color;
					border-radius: 60rpx;
					margin: 10rpx auto;
					line-height: 120rpx;
					color: #fff;
					font-size: 50rpx;
				}

				.text {
					font-size: 30rpx;

				}
			}
		}
	}
</style>
