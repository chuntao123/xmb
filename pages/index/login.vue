<template>
	<view class="page">
		<u-navbar title="登录" :is-back=false :backTextStyle="{color:'#ffffff'}" :background="background"></u-navbar>

		<!-- 动态商城图标和商城名 -->
		<!-- <view class="row-a-j-fc" style="width: 100%;height: 300rpx;">
			<u-image :src="logo"  style="width:160rpx;height: 160rpx;"></u-image>
			<view class="mt-3 font-s-7 font-w text-light-grey">奥利给</view>
			
		</view> -->
		<view style="width: 60%;margin: auto;padding: 20px 0px 0px 0px;">
			<u-subsection :list="list" :current="index" @change="login"></u-subsection>
		</view>
		<view class="p-5">
			<!-- 		<view  v-if="index==0?true:false">
			<view class="mb-4 d-f align-stretch">
				<view class="border-bottom row px-2">+86</view>
				<u-input type="text" placeholder="请输入手机号码" maxlength="11" v-model="user.username" class="border-bottom p-3 flex-1 pl-0" placeholder-class="text-light-muted" />
			</view>
			<view class="d-f align-stretch mb-5">
				<u-input type="text" v-model="user.password" maxlength="6" placeholder="输入验证码" class="border-bottom p-3 flex-1" placeholder-class="text-light-muted" />
				<view class="border bg-color row rounded" style="width: 180rpx;" @click="getCode" :class="user.passwordtime > 0 ? 'bg-disabled-color' : 'bg-color'">
					{{ user.passwordtime > 0 ? user.passwordtime + 's' : '获取验证码' }}
				</view>
			</view>
			<view class="d-f align-stretch mb-5">
				<u-input type="text" v-model="user.code" maxlength="6" placeholder="输入验证码" class="border-bottom p-3 flex-1" placeholder-class="text-light-muted" />
				<view class="login-code" @click="codedata">
				  <img :src="codeUrl" class="login-code-img" />
				</view >
			</view>
			</view> -->

			<view>
				<view class="d-f align-stretch mb-5">
					<u-input type="text" v-model="user.username" maxlength="80" placeholder="请输入账号"
						class="border-bottom p-3 flex-1" placeholder-class="text-light-muted" />

				</view>
				<view class="d-f align-stretch mb-5">
					<u-input type="password" v-model="user.password" maxlength="80" placeholder="请输入密码"
						class="border-bottom p-3 flex-1" placeholder-class="text-light-muted" />

				</view>
				<!-- <view class="d-f align-stretch mb-5">
					<u-input type="text" v-model="user.code" maxlength="6" placeholder="输入验证码"
						class="border-bottom p-3 flex-1" placeholder-class="text-light-muted" />
					<view class="login-code" @click="codedata">
						<img :src="codeUrl" class="login-code-img" />
					</view>
				</view> -->
			</view>

			<view class="py-2 w-100 row bg-color rounded mb-4" :disabled="disabled"
				:class="disabled ? 'bg-disabled-color' : 'bg-color'" @click="submit" :loading="loading">
				<u-loading mode="flower" color="success" :show="loading"></u-loading>
				{{ loading ? '登陆中..' : '登陆' }}
			</view>
			<view class="text-light-muted w-100 row-ac" style="height: 30rpx;">
				<view class="check-box row iconfont icon-gouxuan mr-2  border text-white rounded-50 font-s-1"
					@click="clickCheck" :class="checkIndex == true ? 'bg-color' : ''"></view>
				<view>登陆表示已阅读并同意《协议》</view>
			</view>
			<!-- 快捷登录图标 -->
			<view class="quilc-login-group w-100 row">
				<button class="bottom-btn" @click="wxlogin">
					<view class="iconfont icon-weixin1 font-s-8 row text-white rounded-50"></view>
				</button>
			</view>
			<!-- 快捷登录图标 -->
		</view>

	</view>
</template>

<script>
	export default {
		watch: {
			index: function() {

				deep: true
			}
		},
		data() {
			return {
				user: {
					username: "admin", //账户名	
					password: "admin123", //密码/手机验证码
					nickName: "", //名字
					gender: "", //性别
					avatarUrl: "", //头像url
					passwordtime: 0,
					code: "", //图形校验码
					uuid: "" //每个用户的唯一标识符
				},
				codeUrl: "", //二维码地址
				index: 1, //默认为手机登陆
				list: [ //   头部选项
					{
						name: '手机登录'
					},
					{
						name: '账号密码'
					},
				],
				background: { //顶部导航栏颜色
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},

				distributionPid: 0,
				loading: false,
				checkIndex: true, //登录协议是否同意
				isScan: false,
				scanKey: '',
				scanCode: '',
				timer: ""
			};
		},
		onLoad() {
			this.userInfoBtnClick()
		},
		computed: {
			// 验证用户是否输入账号和密码登陆样式颜色变化
			disabled() {
				if (this.mobile === '' || this.code === '') {
					return true;
				}
				return false;
			}
		},
		beforeDestroy() { //钩子函数，实例销毁触发
			this.loading = false; //结束动画
			clearTimeout(this.timer); //清除定时器
		},
		methods: {
			getUserInfo() {
				console.log("aaaa")

			},

			codedata() {
				this.$R.get('captchaImage').then(res => {
					this.codeUrl = "data:image/gif;base64," + res.img;
					this.user.uuid = res.uuid;
				});
			},
			login(index) {
				if (index == 0) {
					uni.showToast({
						title: '手机登录正在开发中',
						icon: 'none'
					})
					this.index = 1
				}
			},
			initData(options) {
				this.getScanDistributionInfo(options)
				this.getAppConfig()
			},


			//手机表单验证
			validata() {
				//手机号正则
				var mPattern = /^1[345789]\d{9}$/;
				//输出 true
				if (!mPattern.test(this.user.username)) {
					uni.showToast({
						title: '你输入的手机号不正确',
						icon: 'none'
					});
					return true;
				}


				return false
			},

			// 获取验证码
			getCode() {
				//防止重复获取
				if (this.user.passwordtime > 0) {
					return;
				}
				//验证手机号是否符合
				if (this.validata()) {
					return;
				}
				//手机号码符合后发送验证,若发送失败抛出异常
				uni.showToast({
					title: '验证码发送成功'
				});
				this.user.passwordtime = 60;
				let timer = setInterval(() => {
					if (this.user.passwordtime >= 1) {
						this.user.passwordtime--;
					} else {
						this.user.passwordtime = 0;
						clearInterval(timer);
					}
				}, 1000);
				return;
				//
				this.$R.get().then(res => {
						//倒计时
						this.user.passwordtime = 60;
						let timer = setInterval(() => {
							if (this.user.passwordtime >= 1) {
								this.user.passwordtime--;
							} else {
								this.user.passwordtime = 0;
								clearInterval(timer);
							}
						}, 1000);
					})
					.catch(error => {
						uni.showToast({
							title: '发送手机验证码失败'
						});
					});
			},
			// 验证码登录
			submit() {
				if (!this.checkIndex) {
					// 没勾选用户协议
					return uni.showToast({
						title: '请阅读并勾选用户协议',
						icon: 'none'
					})
				}
				if (this.index == 1) { //账号密码模式登录检验
					this.loading = true
					this.$R.post('login', {
						username: this.user.username,
						password: this.user.password,
						// code: this.user.code,
						// uuid: this.user.uuid
					}).then(res => {
						if (res.code == 200) {
							uni.setStorage({ //再添加token
									key: 'token',
									data: res.token,
								}),

								this.timer = setTimeout(() => {
									uni.switchTab({
										url: '/pages/index/index'
									});
								}, 1000)
						} else { //不成功提示
							this.loading = false;
							return uni.showToast({
								title: '错误：' + res.msg,
								icon: 'none'
							})
						}
					})

				}
				//表单验证
				else { //手机登录模式后端校验方法
					if (this.validata()) return;
				}
			},
			clickCheck() { //是否同意登陆协议
				this.checkIndex = !this.checkIndex
			},
			wxlogin() {
				if (!this.checkIndex) { // 没勾选用户协议
					return uni.showToast({
						title: '请阅读并勾选用户协议',
						icon: 'none'
					})
				};
				
				uni.getUserProfile({
					desc: 'Wexin',
					success: res => {
						var Username=uni.getStorageSync('username')
						var NickName = JSON.parse(res.rawData).nickName
						var Gender = JSON.parse(res.rawData).gender
						var AvatarUrl =JSON.parse(res.rawData).avatarUrl
			             uni.removeStorage({
			                 key: 'username',
			             });
						uni.request({
							url: 'http://127.0.0.1:8081/register', //如果没有就注册
							data: {
								username: Username,
								password: Username,
								nickname: NickName,
								avatar: AvatarUrl,
								sex: Gender
							},
							method: "POST",
							success: (res) => {
								uni.request({
									url: 'http://127.0.0.1:8081/login', //仅为示例，并非真实接口地址。
									data: {
										username: Username,
										password: Username,
									},
									method: "POST",
									success: (res) => {
										uni.setStorage({ //再添加token
												key: 'token',
												data: res.data.token,
											}),
											uni.switchTab({
												url: '/pages/index/index'
											});
				
									}
								});
				
							},
							fail: res => {
								return uni
									.showToast({
										title: "用户取消授权！",
										icon: 'none'
									})
							}
						});
					}
				})
			},
			// wx快捷登录
			userInfoBtnClick() {
				//获取用户信息
				uni.login({
					provider: 'weixin',
					success: function(	loginRes) {
						uni.request({
							url: 'http://127.0.0.1:8081/wx/wxLogin',
							data: {
								code: loginRes.code
							},
							success: (res) => {
								var Username = res.data.openid
								uni.request({
									url: 'http://127.0.0.1:8081/username', //查询是否有这个账号
									data: {
										username: Username
									},
									method: "GET",
									success: (res) => {
										if (res.data == "") {
											console.log("未注册")
											uni.setStorage({
												key: 'username',
												data: Username,
											})
											return 
										} else {
											console.log("已经注册")
											uni.setStorage({
												key: 'userid',
												data: res.data.userId,
											})
											console.log("userId：" + uni.getStorageSync('userid'))
											uni.request({
												url: 'http://127.0.0.1:8081/login', //仅为示例，并非真实接口地址。
												data: {
													username: Username,
													password: Username,
												},
												method: "POST",
												success: (res) => {
													uni.setStorage({ //再添加token
															key: 'token',
															data: res.data.token,
														}),
														uni.switchTab({
															url: '/pages/index/index'
														});

												}
											});
										}


									}
								});
							}
						});

					}
				});







			}
		}
	};
</script>
<style>
	page {
		background-color: #f6efff;
	}
</style>

<style lang="scss" scoped>
	.phone-login-pop {
		z-index: 9999;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.9);

		.login-pop-content {
			height: 230rpx;
			width: 480rpx;
			position: absolute;
			left: 100rpx;
			top: 500rpx;
			background: #ffffff;
			padding: 40rpx;

			button {
				background-color: #28A745;
				color: #FFFFFF;
			}

			button:after {
				border: none;
			}
		}
	}

	.check-box {
		width: 33rpx;
		height: 33rpx;
	}

	.quilc-login-group {
		height: 100rpx;
		margin-top: 180rpx;

		.iconfont {
			width: 100rpx;
			height: 100rpx;
			background-color: #00B10A;
		}
	}

	.active .mode-name {
		color: $main-color;
		font-weight: bold;
	}

	.bottom-btn {
		border: none;
		background-color: transparent;
	}

	.bottom-btn:after {
		border: none;
	}

	.login-code {
		width: 33%;
		height: 38px;
		float: right;

		img {
			cursor: pointer;
			vertical-align: middle;
		}

	}

	.login-code-img {
		height: 38px;
	}
</style>
