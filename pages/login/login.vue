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
			<view class="image-content">
				<image :src="captchaImage" @click="refreshCaptcha" mode="widthFix"></image>
			</view>
			<view class="inputWrapper">
				<input @input="record" id="captchaCode" class="input" type="text" placeholder="请输入验证码"
					v-model="this.captchaCode" />
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
				
				username: 'admin',
				password: 'admin',
				captchaKey: 'key',
				captchaCode: '',
				captchaImage: 'data:image/png;base64,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'
			}
		},

		methods: {
			async refreshCaptcha() {
				const result = await captcha.create();
				this.captchaKey = result.data.data.key;
				this.captchaCode = result.data.data.code;
				this.captchaImage = result.data.data.image;
			},

			//手机号登陆和找回密码点击事件
			clickChange(flag) {
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
							uni.closeAuthView()

							// 在得到access_token后，通过callfunction调用云函数
							// uniCloud.callFunction({
							// 	name: 'uni-login', // 你的云函数名称
							// 	data: {
							// 		'access_token': res.authResult.access_token, // 客户端一键登录接口返回的access_token
							// 		'openid': res.authResult.openid // 客户端一键登录接口返回的openid
							// 	}
							// }).then(res => {
							// 	res.result = {
							// 	  code: code,
							// 	  message: message
							// 	}
							// 	登录成功，可以关闭一键登录授权界面了
							// 	uni.closeAuthView()
							// }).catch(err => {
							// 	// 处理错误
							// 	this.title = '网络出现问题，请稍后再试'
							// 	this.showTips
							// })

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
					// })

					//验证账号密码
					// const res = await this.$myRequest({
					// 	url: 'url'
					// })
					// console.log(res)
				}, 300);
				
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
					captchaKey: this.captchaKey,
					captchaCode: this.captchaCode
				}

				const res = await user.login(data);

				if (res.statusCode == 200) {
					uni.hideLoading();
					console.log(res.data);
					if (res.data.code == 200) {
						uni.showToast({
							title: '登陆成功'
						});
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

	.image-content {
		font-size: 0;
		width: 100%;
		height: 80upx;
		margin-top: 10px;
		text-align: center;
		vertical-align: middle;

		image: {
			height: 10upx;
			display: inline-block;
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
