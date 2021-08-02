<template>
	<view>

		<!-- 照相机 -->
		<!-- <u-navbar :is-back="false" title="　" :border-bottom="false">
			<view class="u-flex u-row-right" style="width: 100%;">
				<view class="camera u-flex u-row-center">
					<u-icon name="camera-fill" color="#000000" size="48"></u-icon>
				</view>
			</view>
		</u-navbar> -->

		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">魏志豪</view>
				<view class="u-font-14 u-tips-color">账号:weizhihao</view>
			</view>
		</view>


		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="rmb-circle" title="个人账户"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20" @click="personalDetails">
			<u-cell-group>
				<u-cell-item icon="setting" title="个人信息"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20" @click="logout">
			<u-cell-group>
				<u-cell-item icon="man-add-fill" title="切换账号"></u-cell-item>
			</u-cell-group>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				pic: 'https://uviewui.com/common/logo.png',
				show: true
			}
		},
		onLoad() {

		},
		methods: {
			// 个人信息详细信息
			personalDetails() {
				setTimeout(() => {
					uni.navigateTo({
						url: '../personalDetails/personalDetails'
					})
				}, 300)

			},
			// 切换账号
			logout() {
				setTimeout(() => {
					uni.navigateTo({
						url: '../login/login'
					})
				}, 300)
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #ededed;
	}

	.camera {
		width: 54px;
		height: 44px;

		&:active {
			background-color: #ededed;
		}
	}

	.user-box {
		background-color: #fff;
	}
</style>
