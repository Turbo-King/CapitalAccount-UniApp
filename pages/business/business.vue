<template>
	<view class="u-demo">
		<!-- 消息提示 -->
		<view class="u-demo-wrap">
			<view class="u-demo-area">
				<u-top-tips ref="uTips"></u-top-tips>
			</view>
		</view>

		<!-- 业务选择 -->
		<view class="u-demo-wrap">
			<view class="u-demo-area">
				<u-subsection v-if="change" :bold="bold" :active-color="activeColor" :current="current" :mode="mode"
					:list="['存款', '取款', '转账']" @change="changeBusiness"></u-subsection>
			</view>
		</view>
		
		<view class="u-demo-wrap">
			余额
			<view id="balance">{{ this.balance }}</view>
		</view>

		<!-- 转账 -->
		<view class="transfer-accounts">
			<view>
				<view class="inputWrapper" :class="transferFlag?'show':'hiden'">
					<input @input="record" id="account" class="input" type="number" value="" placeholder="请输入对方用户名" />
				</view>
				<view class="inputWrapper">
					<input @input="record" id="money" class="input" type="number" value="" placeholder="请输入金额" />
				</view>
			</view>
			<view class="u-padding-40">
				<u-button type="success" @click="showPop(true)">
					<u-icon name="red-packet"></u-icon>
					<text class="u-padding-left-10">{{buttonTitle}}</text>
				</u-button>
			</view>
			<u-keyboard default="" ref="uKeyboard" mode="number" :mask="true" :mask-close-able="false"
				:dot-enabled="false" v-model="show" :safe-area-inset-bottom="true" :tooltip="false" @change="onChange"
				@backspace="onBackspace">
				<view>
					<view class="u-text-center u-padding-20 money">
						<text>{{money}}</text>
						<text class="u-font-20 u-padding-left-10">元</text>
						<view class="u-padding-10 close" data-flag="false" @tap="showPop(false)">
							<u-icon name="close" color="#333333" size="28"></u-icon>
						</view>
					</view>
					<view class="u-flex u-row-center">
						<u-message-input mode="box" :maxlength="6" :dot-fill="true" v-model="password"
							:disabled-keyboard="true" @finish="finish"></u-message-input>
					</view>
					<view class="u-text-center u-padding-top-10 u-padding-bottom-20 tips">支付键盘</view>
				</view>
			</u-keyboard>
		</view>
	</view>
</template>

<script>
	import account from '../../api/module/account.js';
	
	export default {
		data() {
			return {
				mode: 'button',
				current: 0,
				activeColor: this.$u.color['success'],
				bold: true,
				change: true,
				//转账显示
				transferFlag: false,
				// 交易类型
				transferType: 0, 
				account: '',
				money: 0,
				balance: 999,

				buttonTitle: '存款',
				//支付显示与密码
				show: false,
				password: '',

				//消息显示
				duration: 2000,
				title: '请检查输入是否正确',
				type: 'warning'
			}
		},
		methods: {
			//业务状态发生选择
			changeBusiness(current) {
				this.transferType = current;
				if (current === 0) {
					console.log('存款');
					this.transferFlag = false;
					this.buttonTitle = '存款';
				} else if (current === 1) {
					console.log('取款');
					this.buttonTitle = '取款';
					this.transferFlag = false;
				} else if (current === 2) {
					console.log('转账');
					this.buttonTitle = '转账';
					this.transferFlag = true;
				}
			},

			//捕获用户名与密码
			record(e) {
				// console.log(e.currentTarget.id)
				if (e.currentTarget.id === 'account') {
					this.account = e.detail.value
				} else if (e.currentTarget.id === 'money') {
					this.money = e.detail.value
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

			//支付步骤
			onChange(val) {
				if (this.password.length < 6) {
					this.password += val;
				}

				if (this.password.length >= 6) {
					this.pay();
				}
			},
			onBackspace(e) {
				if (this.password.length > 0) {
					this.password = this.password.substring(0, this.password.length - 1);
				}
			},
			async pay() {
				this.show = false;
				uni.showLoading({
					title: '支付中'
				})
				
				const transferType = this.transferType;
				const money = this.money;
				const userId = uni.getStorageSync('userId');
				
				console.log('交易类型（0-存款1-取款2-转账）: ' + transferType);
				console.log('money: ' + money);
				console.log("userId: " + userId);
				// todo 验证 userId 不为空
				
				let res = null;
				if (transferType == 0) {
					res = await account.deposit({
						userId: userId,
						money: money
					});
				} else if (transferType == 1) {
					res = await account.withdrawal({
						userId: userId,
						money: money
					});
				} else if (transferType == 2) {
					console.log(this.account);
					
					res = await account.transfer({
						curUserId: userId,
						transferUsername: this.account,
						money: money
					})
				}
				
				if (res.statusCode == 200) {
					uni.hideLoading();
					console.log(res);
					
					if (res.data.code == 200) {
						uni.showToast({
							title: res.data.msg
						});
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'error'
						});
					}
					
					// 更新余额
					this.getBalance();
				}
			},
			showPop(flag = true) {
				this.password = '';
				if (this.transferFlag) {
					if (this.account !== '' && this.money !== '' && this.money !== 0) {
						this.show = flag;
					} else {
						this.showTips()
					}
				} else {
					if (this.money !== '' && this.money !== 0) {
						this.show = flag;
					} else {
						this.showTips()
					}
				}

			},
			finish() {
				console.log('完成')
			},
			// 获取余额
			async getBalance() {
				console.log('获取余额');
				console.log(uni.getStorageSync('userId'));
				
				const res = await account.detail({
					userId: uni.getStorageSync('userId')
				});
				console.log(res);
				
				if (res != null && res.statusCode == 200 && res.data.code == 200) {
					this.balance = res.data.data.money;
				}
			}
		},
		onLoad() {
			this.getBalance();
		},
	}
</script>

<style lang="scss" scoped>
	.u-demo {
		width: 100vw;
		height: 100vh;
	}

	.u-demo-wrap {
		margin-top: 20rpx;
	}

	.money {
		font-size: 80rpx;
		color: $u-type-warning;
		position: relative;

		.close {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
			line-height: 28rpx;
			font-size: 28rpx;
		}
	}

	.tips {
		color: $u-tips-color;
	}

	.transfer-accounts {
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
		background: #eee;
		margin-top: 25px;

		.input {
			width: 100%;
			height: 100%;
			text-align: center;
			font-size: 15px;
		}
	}

	.show {
		display: block;
	}

	.hiden {
		display: none;
	}
</style>
