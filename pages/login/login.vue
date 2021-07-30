<template>
	<view class="content">
		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="/static/icon/logo.png" mode="widthFix"></image>
				<text class="text">南通职业大学金融</text>
			</view>
		</view>
		<view class="form">
			<view class="inputWrapper">
				<input @input="record" id="username" class="input" type="text" value="" placeholder="请输入用户名" />
			</view>
			<view class="inputWrapper">
				<input @input="record" id="password" class="input" type="password" value="" placeholder="请输入密码" />
			</view>
			<view class="loginBtn">
				<text class="btnValue" @click="login">登录</text>
			</view>
			<view class="forgotBtn">
				<text class="telephoneLogin" :class="{active:telephoneLoginFlag}" @click="clickChange(1)">手机号登陆</text>
				<text class="forgetPassword" :class="{active:forgetPasswordFlag}" @click="clickChange(2)">找回密码</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				telephoneLoginFlag: false,
				forgetPasswordFlag: false,
				username: '',
				password: ''

			}
		},
		onLoad() {

		},
		methods: {
			//手机号登陆和找回密码点击事件
			clickChange(flag) {
				console.log(flag)
				if (flag === 2) {
					this.forgetPasswordFlag = true;

					setTimeout(() => {
						this.forgetPasswordFlag = false;
					}, 300);
				} else if (flag === 1) {
					this.telephoneLoginFlag = true;

					setTimeout(() => {
						this.telephoneLoginFlag = false;
					}, 300);
				}

			},

			//捕获用户名与密码
			record(e) {
				// console.log(e.currentTarget.id)
				if (e.currentTarget.id === 'username') {
					this.username = e.detail.value
				} else if (e.currentTarget.id === 'password') {
					this.password = e.detail.value
				}
			},

			//登陆
			async login() {
				// const res = await this.$myRequest({
				// 	url: 'url'
				// })
				// console.log(res)

				uni.switchTab({
					url: '../index/index'
				})
			}


		}
	}
</script>

<style lang="scss">
	.content {
		background: #377EB4;
		width: 100vw;
		height: 100vh;
	}

	.avatorWrapper {
		height: 30vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.avator {
		width: 500rpx;
		height: 200rpx;
		overflow: hidden;
		position: relative;

		.img {
			width: 150rpx;
			height: 150rpx;
			display: inline-block;

		}

		.text {
			position: absolute;
			top: 26px;
			padding-left: 5px;
			font-size: 20px;
			font-weight: 25px;
			color: #e6cb83;
		}
	}


	.form {
		padding: 0 100upx;
		margin-top: 80px;
	}

	.inputWrapper {
		width: 100%;
		height: 80upx;
		background: white;
		border-radius: 20px;
		box-sizing: border-box;
		padding: 0 20px;
		margin-top: 25px;

		.input {
			width: 100%;
			height: 100%;
			text-align: center;
			font-size: 15px;
		}
	}

	//登陆按钮
	.loginBtn {
		width: 100%;
		height: 80upx;
		background: #77B307;
		border-radius: 50upx;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;


		.btnValue {
			color: white;
		}
	}


	//忘记密码按钮
	.forgotBtn {
		color: #EAF6F9;
		font-size: 15px;
		margin-top: 20px;

		.telephoneLogin {
			margin-left: 30px;
			float: left;
		}

		.forgetPassword {
			margin-right: 30px;
			float: right;
		}
	}

	//点击特效
	.active {
		color: red;
	}
</style>
