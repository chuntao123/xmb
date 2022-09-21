<template>
	<view>
		<view class="loding" v-if="show">
			<u-loading mode="flower" ></u-loading>
		</view>
		<scroll-view enable-flex="true"> </scroll-view>
		<view class="wrap page" v-if="datashow">
			<view>
				<u-toast ref="uToast" />
				<u-navbar :custom-back="message" backIconName="chat" :backTextStyle="{color:'#ffffff'}"
					:background="background" titleColor="#fff">
					<u-search placeholder="请输入关键词" :clearabled="true" :animation="true" :clear="clear" v-model="keyword"
						@custom="TO" @search="TO"></u-search>
				</u-navbar>
				<u-sticky>
					<fy-dropdown :menuList="menuList">
						<fy-dropdown-item v-model="synthesisValue" dropdownKey="synthesis" :options="columnOptions"
							@change="handlerColumnChange"></fy-dropdown-item>
						<fy-dropdown-item v-model="feileiValue" dropdownKey="classification"
							:options="classificationOptions" @change="handlerTypeChange"></fy-dropdown-item>
					<!-- 	<fy-dropdown-item v-model="salesValue" dropdownKey="arrangement" :options="arrangementOptions"
							@change="handlerarrangementChange"></fy-dropdown-item> -->
					</fy-dropdown>
				</u-sticky>
			</view>
			
			<u-waterfall v-model="flowlist" ref="uWaterfall" v-if="waterfallshow">
				<template v-slot:left="{leftList}">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index"
						@click="datalist(item.goodsId)">
						<u-lazy-load  threshold="200" border-radius="10" :image="item.gImageOne" ></u-lazy-load>
						<view class="demo-title">
							{{item.gTitle}}
						</view>
						<view class="demo-tag-text">
							{{item.gFloor}}
						</view>
						<view class="demo-price">
							￥{{item.gPrice}}
						</view>
						<view class="demo-shop">
							{{item.uId}}
						</view>

					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index"
						@click="datalist(item.goodsId)">
						<u-lazy-load threshold="-200"  border-radius="10" :image="item.gImageOne"></u-lazy-load>
						<view class="demo-title">
							{{item.gTitle}}
						</view>
						<view class="demo-tag-text">
							{{item.gFloor}}
						</view>
						<view class="demo-price">
							￥{{item.gPrice}}
						</view>
						<view class="demo-shop">
							{{item.uId}}
						</view>
					</view>
				</template>
			</u-waterfall>
			<u-loadmore bg-color="rgb(240, 240, 240)"  :load-text="loadText" :status="loadStatus"></u-loadmore>
		
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				waterfallshow:true,
				show: true,
				datashow: false,
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				menuList: [{
					title: '闲置物品',
					dropdownKey: 'synthesis'
				}, {
					title: '分类',
					dropdownKey: 'classification'
				}, 
				// {
				// 	title: '综合排序',
				// 	dropdownKey: 'arrangement'
				// },
				],
				synthesisValue: '闲置物品', //服务选项
				columnOptions: [], //服务列表
				feileiValue: "全部", //分类选项
				classificationOptions: [], //分类
				salesValue: '', //排列选项
				arrangementOptions: [], //排序
				keyword: "",//搜索框输入的信息
				loadText: { //慢加载状态
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				loadStatus: 'loadmore', //默认慢加载状态为轻轻上拉
				list: [], //商品列表
				numb: 0,
				flowlist:[]
			}
		},
		onLoad() { //加载数据
			this.fuwulist();
		},
		onReachBottom() { //懒加载状态

			this.loadStatus = 'loading';
			this.gdata()
		},

		methods: {
			onPullDownRefresh() { //下拉刷新时触发的事件
			this.waterfallshow=false
				this.numb=0;
				this.list=[];
				this.feileiValue="全部"
				this.gdata()
				this.menuList= [{
					title: '闲置物品',
					dropdownKey: 'synthesis'
				}, {
					title: '分类',
					dropdownKey: 'classification'
				}, {
					title: '综合排序',
					dropdownKey: 'arrangement'
				}],
				setTimeout(()=>{
				this.waterfallshow=true
				uni.stopPullDownRefresh();
				},200)
			},
			handlerTypeChange() {         //分类选项触发事件
			this.menuList[1].title = this.feileiValue
			 this.waterfallshow=false
			 this.list=[];
			 this.flowlist=[]
			 this.numb=0 
			 this.gdata();
			 setTimeout(()=>{
				 this.waterfallshow=true
			 },250)
			
			},
			// handlerarrangementChange() { //排列选项触发事件
   //          this.menuList[2].title = this.salesValue
			// if(this.menuList[2].title=="综合排序"){
			// 	this.waterfallshow=false
			// 	this.gdata()
			// 	setTimeout(()=>{
			// 	this.waterfallshow=true
			// 	},200)
			// }
			// if(this.menuList[2].title=="时间最近"){
			// 	this.waterfallshow=false
			//     this.flowlist=this.sortBykey(this.flowlist, "gData")
			// 	setTimeout(()=>{
			// 	this.waterfallshow=true
			// 	},200)
			// }
			// if(this.menuList[2].title=="价格由低到高"){
			// 	this.waterfallshow=false
			// 	this.flowlist=this.sortkey(this.flowlist, "gPrice")
			// 	console.log(this.flowlist)
			// 	setTimeout(()=>{
			// 	this.waterfallshow=true
			// 	},200)
			// }
			// if(this.menuList[2].title=="价格由高到低"){
			// 	this.waterfallshow=false
			// 	this.flowlist=this.sortBykey(this.flowlist, "gPrice")
			// 	setTimeout(()=>{
			// 	this.waterfallshow=true
			// 	},200)
			// }
			// },
			// sortBykey(ary, key) {//倒叙排列(大到小)
			//  	return ary.sort(function (a, b) {
			//     	let x = a[key]
			//     	let y = b[key]
			//     	return ((x > y) ? -1 : (x < y) ? 1 : 0)
			//   	})
			// },
			// sortkey(ary, key) {//正序排列（小到大）
			//  	return ary.sort(function (a, b) {
			//     	let x = a[key]
			//     	let y = b[key]
			//     	return ((x < y) ? -1 : (x > y) ? 1 : 0)
			//   	})
			// },
			handlerColumnChange() { //第一个选项发生改变触发
			    
				if (this.synthesisValue == "闲置物品") {
					this.menuList[0].title = "闲置物品"
				}
				if (this.synthesisValue == "校园跑腿") {
					this.synthesisValue = "闲置物品"
				uni.navigateTo({
				    url: '../release/running'
				});	
				}
				if (this.synthesisValue == "废品回收") {
					this.synthesisValue = "闲置物品"
					uni.navigateTo({
					    url: '../release/recycling'
					});
				}
			},
			TO() { //点击搜索触发事件
			this.waterfallshow=false
			let a = this.list.filter( v => {
			  return JSON.stringify(v.gTitle).indexOf(this.keyword) !== -1   //JSON.stringify()是必须的
			});
			this.flowlist=a
				setTimeout(()=>{
				this.waterfallshow=true
				},250)
			},
			clear() { //清除输入框
				this.keyword = ""
			},
			datalist(idx) { //获取商品的id
				uni.navigateTo({
				    url: '../store/store?goodsid='+idx
				});
			},
			message() { //左上角跳转到会话界面
				uni.navigateTo({
				    url: '../information/information'
				});
			},
			gdata() { //获取商品的信息
				let a;
				this.flowList=[];
				this.$R.get("almighty/goods/list", {
					classification:this.feileiValue,
					num: this.numb
				}, {
					Authorization: "Bearer " + uni.getStorageSync('token')
				}).then(res => {
					a = res.rows.length
					if (a == 0) {
						this.loadStatus = 'nomore';
						this.show = false;
						this.datashow = true;
						return
					} else {
						for (let i = 0; i < a; i++) {
							this.list.push(res.rows[i])	
						}	
						this.flowlist=this.list;
						setTimeout(()=>{
							this.numb = this.numb + 10;
							this.show = false;
							this.datashow = true;
						},200)
					}
				});

			},
			fuwulist() { //服务列表请求  排列请求
				if (uni.getStorageSync('user') == "") { //如果没有存进用户信息进入缓存则请求
					this.$R.get('getInfo', {}, {
						Authorization: "Bearer " + uni.getStorageSync('token')
					}).then(res => {
						uni.setStorage({
							key: 'user',
							data: res.user,
						});
					});
				}
				this.$R.get("almighty/goodslist/list", {}, {
					Authorization: "Bearer " + uni.getStorageSync('token')
				}).then(res => {
					this.columnOptions = [];
					this.arrangementOptions = []
					if(res.rows==null){return}
					for (let i = 0; i < res.rows.length; i++) {
						if (res.rows[i].adminlist == null) {
							this.goodlist();
							break
						}
						this.columnOptions.push({
							label: res.rows[i].adminlist,
							value: res.rows[i].adminlist
						})
					}
					for (let i = 0; i < res.rows.length; i++) {
						if (res.rows[i].pailielist == null) {
							return
						}
						this.arrangementOptions.push({
							label: res.rows[i].pailielist,
							value: res.rows[i].pailielist
						})
					}
				});
			},
			goodlist() { //请求分类
				this.$R.get("almighty/goodslist/list", {}, {
					Authorization: "Bearer " + uni.getStorageSync('token')
				}).then(res => {
					this.classificationOptions = [];
						for (let i = 0; i < res.rows.length; i++) {
							if (res.rows[i].goodslist == null) {
								this.gdata();
								return
							}
							this.classificationOptions.push({
								label: res.rows[i].goodslist,
								value: res.rows[i].goodslist
							})
						}
					

				});
			},
		}
	}
</script>

<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>

<style lang="scss" scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		width: 36px;
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 5px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}

	.loding {
		padding: 50%;
	}
</style>
