<template>
	<view class="home">
		<!-- 消息提示 -->
		<view class="u-demo-area">
			<u-toast :type="type" ref="uToast"></u-toast>
			<text class="no-mode-here"></text>
		</view>
		<!-- 轮播图 -->
		<swiper indicator-dots circular>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.img_url"></image>
			</swiper-item>
		</swiper>
		<!-- 导航区域 -->
		<view class="nav">
			<view class="nav_item" v-for="(item,index) in navs" :key="index"
				@click="navItemClick(item.path,item.title)">
				<view>
					<image class="item_img" :src="item.icon"></image>
				</view>
				<text>{{item.title}}</text>
			</view>
		</view>

		<!-- 页面回到顶部 -->
		<view class="top" :style="{'display':(topState===true? 'block':'none')}">
			<image :src="topIcon" class="topc" @click="top"></image>
		</view>

		<!-- 热门新闻区 -->
		<view class="hot_news">
			<view class="tit">热门新闻</view>
			<goods-list :goods="news"></goods-list>
		</view>



	</view>
</template>

<script>
	//导入新闻显示组件
	import goodsList from '../../components/goods-list/goods-list.vue'

	export default {
		data() {
			return {
				topState: false,
				topIcon: '/static/icon/top.png',
				pageInde: 1,
				news: [],
				swipers: [{
						"id": 1,
						"img_url": '/static/icon/swiper1.jpg',
					},
					{
						"id": 2,
						"img_url": '/static/icon/swiper2.jpg',
					},
					{
						"id": 3,
						"img_url": '/static/icon/swiper3.jpg',
					},
					{
						"id": 4,
						"img_url": '/static/icon/swiper4.jpg',
					}
				],

				navs: [{
					icon: '/static/icon/news.png',
					title: '新闻资讯',
					path: '/pages/news/news'
				}, {
					icon: '/static/icon/business.png',
					title: '金融业务',
					path: '/pages/business/business'
				}, {
					icon: '/static/icon/jiaoyijilu.png',
					title: '交易记录',
					path: '/pages/transactionRecord/transactionRecord'
				}, {
					icon: '/static/icon/lianxiwomen.png',
					title: '联系我们',
					path: '/pages/contact/contact'
				}],

				// 消息提示
				type: 'success',
				title: '成功',
				icon: true,
				position: 'center',
			}
		},
		onLoad() {
			//获取轮播图数据
			// this.getSwipers()

			//获取热门新闻
			this.getNews()
			console.log(uni.getStorageSync('loginId'))
		},

		//导入组件 
		components: {
			'goods-list': goodsList
		},

		//检测页面位置
		onPageScroll(e) { //根据距离顶部距离是否显示回到顶部按钮
			if (e.scrollTop > 600) { //当距离大于600时显示回到顶部按钮
				this.topState = true
			} else { //当距离小于600时显示回到顶部按钮
				this.topState = false
			}
		},

		methods: {
			//获取轮播数据 
			// async getSwipers() {
			// 	const res = await this.$myRequest({
			// 		url: '/api/public/v1/home/swiperdata'
			// 	})
			// 	this.swipers = res.data.message
			// },

			// 获取热门新闻
			async getNews(callBack) {
				const res = await this.$myRequest({
					url: 'https://api.apiopen.top/getWangYiNews?page=' + this.pageInde
				})
				// console.log(res)
				this.news = [...this.news, ...res.data.result]
				callBack && callBack()
			},

			//滚动条触底触发事件
			onReachBottom() {
				// console.log('触底了')
				this.pageInde++
				this.getNews()
			},

			//监听下拉刷新事件
			onPullDownRefresh() {
				// console.log('下拉刷新了')
				this.pageInde = 1
				this.news = []
				setTimeout(() => {
					this.getNews(() => {
						uni.stopPullDownRefresh()
					})
				}, 1000)
			},

			//导航点击处理跳转
			navItemClick(url, title) {
				// console.log('跳转', url)
				if (title === '联系我们' || title === '交易记录') {
					uni.navigateTo({
						url: url
					})
				} else {
					uni.switchTab({
						url: url
					})
				}
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
			},

			// 页面回到顶部
			top() { //回到顶部  
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			}

		}
	}
</script>

<style lang="scss">
	/* 回到顶部 */
	.top {
		position: relative;
		display: none;
		/* 先将元素隐藏 */
	}

	.topc {
		position: fixed;
		width: 40px;
		height: 100px;
		z-index: 10;
		right: 15px;
		top: 80%;
		height: 50px;
		line-height: 50px;
	}

	// 消息提示
	.no-mode-here {
		color: $u-tips-color;
		font-size: 28rpx;
	}

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

					.item_img {
						width: 60rpx;
						height: 60rpx;
						margin-top: 30rpx;
					}
				}

				.text {
					font-size: 30rpx;

				}
			}
		}
	}

	//热门新闻
	.hot_news {
		background: #eee;
		overflow: hidden;
		margin-top: 10px;

		.tit {
			height: 50px;
			line-height: 50px;
			color: $capitalAccount-color;
			text-align: center;
			letter-spacing: 20px;
			background: #fff;
			margin: 7rpx 0;
		}


	}
</style>
