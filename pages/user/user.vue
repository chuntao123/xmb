<template>
	<view class="page">
		<view class="my-top bg-topic-theme">
			<!-- head -->
           
			<view class="user-info" >
				<view class="portrait">
					<image :src="user.src"></image>
				</view>
				<view class="info">
					<view class="nickname">
						<text style="font-size: 20px;">{{user.name}}</text>
					</view>
				</view>
				
			</view>
		</view>

		<!-- 九宫格-begin -->
		<view class="myoperate" >
			<u-grid :col="3" :border=false>
				<u-grid-item bg-color="#F8D347">
					<u-icon name="grid" :size="46"></u-icon>
					<view class="grid-text">我的闲置</view>
				</u-grid-item>
				<u-grid-item bg-color="#F8D347">
					<image src="/static/image/icon/hot5.png" class="badge-icon"></image>
					<u-icon name="clock" :size="46"></u-icon>
					<view class="grid-text">待送达</view>
				</u-grid-item>
				<u-grid-item bg-color="#F8D347">
					<u-icon name="checkmark-circle" :size="46"></u-icon>
					<view class="grid-text">已完成</view>
				</u-grid-item>
			</u-grid>
		</view>
		<!-- 九宫格-end -->
		<!-- 订单信息 -->
		<view  class="order-info">
			<view class="desc-text">
				<text class="text-black text-bold text-lg">我有需求</text>
				<text class="text-gray text-sm">拿快递？找跑腿？闲置出售？</text>
			</view>
			<view class="issueView">
				<button class="cu-btn round lg bg-topic-theme" @click="to">立即发布</button>
			</view>
			
		</view>
	
		<!-- 我的服务 -->
		<view  class="my-service">
			<view class="title">
				<text>我的服务</text>
			</view>
			<view class="service-list">
				<view class="list" @click="opinion">
					<view class="thumb">
						<u-icon name="email" size="40"></u-icon>
					</view>
					<view class="name">
						<text>意见反馈</text>
					</view>
				</view>
				<view class="list" @click="kefu">
					<view class="thumb">
						<u-icon name="kefu-ermai" size="40"></u-icon>
					</view>
					<view class="name">
						<text>客服交流</text>
					</view>
				</view>
				<view class="list" @click="information">
					<view class="thumb">
						<u-icon name="chat" size="40"></u-icon>
					</view>
					<view class="name">
						<text>我的信息</text>
					</view>
				</view>
			</view>
		</view>
		<view class="my-service" >
		<u-cell-item  title="许可使用协议" @click="token"></u-cell-item>
		<u-cell-item  title="隐私条款" ></u-cell-item>
		</view>
	</view>
</template>

<script>

	export default {
		
		data() {
			return {
				user:{
					src:"",//头像图片
					name:""
				},
				

			}
	},
	    onLoad() {
			
	    	this.user.name=uni.getStorageSync('user').nickName
			console.log(this.user.name)
	    },
		
		methods: {
			token(){
				uni.removeStorage({
				    key: 'token',
				});
			},
			information(){
				uni.navigateTo({
				    url: '/pages/information/information'
				});
			},
			opinion(){ //意见反馈
				uni.navigateTo({
				    url: '/pages/user/opinion'
				});
			},
			kefu(){ //联系客服
				uni.navigateTo({
				    url: '/pages/user/kefu'
				});
			},
			to(){ //立即发布
				uni.switchTab({
					url: '/pages/release/release'
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	@import 'my.scss';
    .bg-topic-theme{
    	background-color: rgb(25, 190, 107);
    	color: #5e5e5e;
    }
	.badge-icon {
		position: absolute;
		top: 14rpx;
		right: 40rpx;
		width: 30rpx;
		height: 30rpx;
	}
	
	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
	.lg {
		font-size: 16px;
	}
	.text-lg {
		font-size: 32upx;
	}
	.text-bold {
		font-weight: bold;
	}
	.text-black,
	.line-black,
	.lines-black {
		color: #333333;
	}
	.round {
		border-radius: 5000upx;
	}
	.marginLeft {
		margin-left: 2px;
	}
	.myoperate{
		 width: 94%;
		 margin: 20rpx auto;
		 margin-left: 3%;
		 border-radius: 20rpx;
		 overflow: hidden;
	}
</style>
