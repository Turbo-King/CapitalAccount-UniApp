<template>
	<view>
		<!-- 消息提示 -->
		<view class="u-demo-area">
			<u-toast :type="type" ref="uToast"></u-toast>
			<text class="no-mode-here"></text>
		</view>
		<!-- 弹窗提示 -->
		<u-modal ref="uModal" v-model="tipShow" :show-cancel-button="true" :show-title="showTitle" @confirm="confirm"
			:content="content">
		</u-modal>
		<!-- 个人信息 -->
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20">{{userInfo.realName}}</view>
				<view class="u-font-14 u-tips-color">账号:{{userInfo.username}}</view>
			</view>
		</view>


		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="rmb-circle" @click='business' title="个人账户"></u-cell-item>
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
	import user from '../../api/module/user.js'

	export default {
		data() {
			return {
				userId: uni.getStorageSync('userId'),
				userInfo: {},
				pic: 'https://uviewui.com/common/logo.png',

				// 消息提示
				type: 'success',
				title: '推出成功',
				icon: false,
				position: 'center',

				// 弹窗显示
				tipShow: false,
				content: '确定推出登陆么？',
				contentSlot: true,
				showTitle: true,
			}
		},
		onShow() {
			this.userId = uni.getStorageSync('userId')
			this.getUserInfo()
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
				this.tipShow = true
			},

			// 个人账户
			business() {
				uni.switchTab({
					url: '../business/business'
				})
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

			// 弹出提示
			async confirm() {
				setTimeout(() => {
					this.show = false;
				}, 1000)
				this.show()
				//清空登陆信息
				uni.clearStorageSync()
				this.userInfo = {}
				this.userId = ''

				const res = await user.logout;
				setTimeout(() => {
					uni.navigateTo({
						url: '../login/login'
					})
				}, 1000)
			},

			// 获取用户信息
			async getUserInfo() {
				const res = await this.$myRequest({
					url: '/api/capital/user/info',
					data: {
						id: this.userId
					}
				})
				this.userInfo = res.data.data
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
