<template>
	<view class="content">
		<!-- 消息提示 -->
		<view class="u-demo-wrap">
			<view class="u-demo-area">
				<u-top-tips ref="uTips"></u-top-tips>
			</view>
		</view>

		<view class="avatorWrapper">
			<view class="avator">
				<image class="img" src="/static/icon/logo.png" mode="widthFix"></image>
				<text class="text">南通职业大学金融</text>
			</view>
		</view>

		<view class="form">
			<view class="inputWrapper">
				<input @input="record" id="username" class="input" type="text" placeholder="请输入用户名"
					v-model="this.username" />
			</view>
			<view class="inputWrapper">
				<input @input="record" id="password" class="input" type="password" placeholder="请输入密码"
					v-model="this.password" />
			</view>
			<view class="verification-input">
				<input @input="record" id="captchaCode" class="input" type="text" placeholder="请输入验证码" />
			</view>
			<view class="verification-code">
				<image :src="captchaImage" @click="refreshCaptcha" mode="widthFix"></image>
			</view>
			<button class="loginBtn" @click="login" :class="{loginActive:loginFlag}">
				<text class="btnValue">登录</text>
			</button>
			<view class="forgotBtn">
				<text class="telephoneLogin" :class="{active:telephoneLoginFlag}" @click="clickChange(1)">一键登陆</text>
				<text class="forgetPassword" :class="{active:forgetPasswordFlag}" @click="clickChange(2)">找回密码</text>
			</view>
		</view>

	</view>
</template>

<script>
	import captcha from '../../api/module/captcha.js';
	import user from '../../api/module/user.js';
	import request from '../../api/request.js';

	export default {
		data() {
			return {
				telephoneLoginFlag: false,
				forgetPasswordFlag: false,
				loginFlag: false,
				//消息显示
				duration: 2000,
				title: '请检查输入是否正确',
				type: 'warning',

				username: '',
				password: '',
				captchaCode: '',
				captchaImage: 'http://localhost:9999/system/captcha/generate'
			}
		},

		onShow() {
			if (uni.getStorageSync('userId') !== '')
				uni.switchTab({
					url: '../index/index'
				})
		},

		methods: {
			async refreshCaptcha() {
				console.log('刷新验证码')
				// const result = await captcha.create();
				// console.log(request)
				// this.captchaKey = result.data.data.key;
				// this.captchaCode = result.data.data.code;
				this.captchaImage = 'http://121.89.219.21:1010/system/captcha/generate'

			},

			//手机号登陆和找回密码点击事件
			clickChange(flag) {
				if (flag === 2) {
					this.forgetPasswordFlag = true;

					setTimeout(() => {
						this.forgetPasswordFlag = false;
					}, 300);
					this.type = 'warning'
					this.title = '该功能还没有开放哦！'
					this.showTips()
				} else if (flag === 1) {
					this.telephoneLoginFlag = true;

					setTimeout(() => {
						this.telephoneLoginFlag = false;
					}, 300);
					uni.login({
						provider: 'univerify',
						univerifyStyle: { // 自定义登录框样式
							//参考`univerifyStyle 数据结构`
							"fullScreen": "false", // 是否全屏显示，默认值： "false"
							"backgroundColor": "#ffffff", // 授权页面背景颜色，默认值：#ffffff
							"backgroundImage": "", // 全屏显示的背景图片，默认值："" （仅支持本地图片，只有全屏显示时支持）  
							"icon": {
								"path": "static/icon/logo.png" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo   
							},
							"phoneNum": {
								"color": "#202020" // 手机号文字颜色 默认值：#202020  
							},
							"slogan": {
								"color": "#BBBBBB" //  slogan 字体颜色 默认值：#BBBBBB  
							},
							"authButton": {
								"normalColor": "#3479f5", // 授权按钮正常状态背景颜色 默认值：#3479f5  
								"highlightColor": "#2861c5", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）  
								"disabledColor": "#73aaf5", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）  
								"textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff  
								"title": "本机号码一键登录", // 授权按钮文案 默认值：“本机号码一键登录”  
								"borderRadius": "24px" // 授权按钮圆角 默认值："24px" （按钮高度的一半）
							},
							"otherLoginButton": {
								"visible": "true", // 是否显示其他登录按钮，默认值：true  
								"normalColor": "", // 其他登录按钮正常状态背景颜色 默认值：透明 
								"highlightColor": "", // 其他登录按钮按下状态背景颜色 默认值：透明 
								"textColor": "#656565", // 其他登录按钮文字颜色 默认值：#656565  
								"title": "账号密码登陆", // 其他登录方式按钮文字 默认值：“其他登录方式”  
								"borderColor": "", //边框颜色 默认值：透明（仅iOS支持）  
								"borderRadius": "0px" // 其他登录按钮圆角 默认值："24px" （按钮高度的一半）
							},
							"privacyTerms": {
								"defaultCheckBoxState": "true", // 条款勾选框初始状态 默认值： true
								"uncheckedImage": "", // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)   
								"checkedImage": "", // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)   
								"textColor": "#BBBBBB", // 文字颜色 默认值：#BBBBBB  
								"termsColor": "#5496E3", //  协议文字颜色 默认值： #5496E3  
								"prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”  
								"suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”  
								"privacyItems": [ // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效  
									{
										"url": "https://", // 点击跳转的协议详情页面  
										"title": "用户服务协议" // 协议名称  
									}
								]
							},
							"buttons": { // 自定义页面下方按钮仅全屏模式生效（3.1.14+ 版本支持）
								"iconWidth": "45px", // 图标宽度（高度等比例缩放） 默认值：45px
								"list": []
							}
						},
						success(res) { // 登录成功
							console.log(res.authResult); // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
							// uni.closeAuthView()

							// 在得到access_token后，通过callfunction调用云函数
							uniCloud.callFunction({
								name: 'uni-login', // 你的云函数名称
								data: {
									'access_token': res.authResult
										.access_token, // 客户端一键登录接口返回的access_token
									'openid': res.authResult.openid // 客户端一键登录接口返回的openid
								}
							}).then(res => {
								console.log(res)
								if (res.result.code == 200) {
									// 登录成功，可以关闭一键登录授权界面了
									uni.closeAuthView()

									setTimeout(() => {
										// console.log('执行打印')
										// this.title = '手机号注册成功,手机号为：' + res.result.data
										// this.type = 'success'
										// this.showTips
										uni.showToast({
											title: '手机号注册成功,手机号为：' + res.result.data,
											icon:'none'
										});
									}, 1000)



								}

								res.result = {
									code: code,
									message: message,
									data: data,

								}


							}).catch(err => {
								// 处理错误
								this.title = '网络出现问题，请稍后再试'
								this.showTips
							})


						},
						fail(res) { // 登录失败
							console.log(res.errCode)
							console.log(res.errMsg)
							uni.closeAuthView()
							//显示请求失败信息
							this.title = '网络出现问题，请稍后再试'
							this.showTips
						}
					})
				}

			},

			//捕获用户名与密码
			record(e) {
				// console.log(e.currentTarget.id)
				if (e.currentTarget.id === 'username') {
					this.username = e.detail.value;
				} else if (e.currentTarget.id === 'password') {
					this.password = e.detail.value;
				} else if (e.currentTarget.id === 'captchaCode') {
					this.captchaCode = e.detail.value;
				}
			},

			//消息显示
			showTips() {
				this.$refs.uTips.show({
					duration: this.duration,
					title: this.title,
					type: this.type
				});
			},


			//登陆
			async login() {
				//登陆按钮点击样式
				this.loginFlag = true;
				setTimeout(() => {
					this.loginFlag = false;
					// uni.switchTab({
					// 	url: '../index/index'
				}, 1000)

				// 	//验证账号密码
				// 	// const res = await this.$myRequest({
				// 	// 	url: 'url'
				// 	// })
				// 	// console.log(res)
				// }, 300);

				if (this.username == '') {
					uni.showToast({
						title: '请输入用户名',
						icon: 'error'
					});
				}
				if (this.password == '') {
					uni.showToast({
						title: '请输入密码',
						icon: 'error'
					});
				}

				uni.showLoading({
					title: '正在登陆...'
				})

				const data = {
					username: this.username,
					password: this.password,
					captcha: this.captchaCode
				}

				const res = await user.login(data);

				if (res.statusCode == 200) {
					uni.hideLoading();
					// console.log(res);
					if (res.data.code == 200) {
						uni.showToast({
							title: '登陆成功'
						});
						uni.setStorageSync('userId', res.data.data);
						uni.switchTab({
							url: '../index/index'
						});
					} else {
						uni.showToast({
							title: '登陆失败',
							icon: 'error'
						});
						// 刷新验证码
						this.refreshCaptcha();
					}
				} else {
					uni.hideLoading();
				}
			}
		},

		onLoad() {
			this.refreshCaptcha()
		},
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
		margin-top: 50px;
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

	.verification-input {
		width: 40%;
		height: 80upx;
		background: white;
		border-radius: 20px;
		box-sizing: border-box;
		margin-top: 25px;
		display: inline-block;

		.input {
			width: 100%;
			height: 100%;
			text-align: center;
			font-size: 14px;
			font-weight: 14px;
		}
	}

	.verification-code {
		width: 50%;
		display: inline-block;
		margin-top: 25px;
		float: right;

		image {
			width: 100%;
			// margin-left: 25px;
			border-radius: 20px;
		}
	}

	.captcha {
		width: 50%;

		input {
			width: 50%;
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

	//点击样式
	.active {
		color: red;
	}

	//登陆按钮点击样式
	.loginActive {
		background: red;
	}
</style>
