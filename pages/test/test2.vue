<template>
	<view class="page">
	 <view>
		 <u-navbar :backTextStyle="{color:'#ffffff'}" :background="background"></u-navbar>
     </view>
	<view class="my-top">
		<view class="user-info" @click="onUserInfo">
			<view class="portrait">
				<image :src="src"></image>
				<view class="userLevel round shadow">
				</view>
			</view>
			<view>
				<view class="title">
					iPhone12
				</view>
					<view>
						2021-09-01  15:20:16 发布于A12
					</view>	
			</view>
		</view>
	</view>
	<view class="abc">
		<text class="rmb">￥</text>
		<text class="price">16</text>
	</view>
	<view class="abc">
		我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹我是你爹
	</view>
	<view class="image">
		<u-image width="100%" height="888rpx" :src="src"></u-image><br>
		<u-image width="100%" height="888rpx" :src="src"></u-image><br>
		<u-image width="100%" height="888rpx" :src="src"></u-image><br>
		<u-image width="100%" height="888rpx" :src="src"></u-image><br>
		<u-image width="100%" height="888rpx" :src="src"></u-image><br><br><br>
	</view>
	<view class="nav">
	<uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </view>
</view>
</template>

<script>
	import uniGoodsNav from '../../components/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		components: {uniGoodsNav},
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				src: 'http://192.168.137.1:1020/2021-09-112Ci500s236UM1hCFSyjTgTfhtaUkBdrq1.png',
				isLogin: false,
				options: [{
				            icon: 'chat',
				            text: '留言'
				        },{
				            icon: 'qq',
				            text: 'QQ',  
				        }],
				        buttonGroup: [{
				          text: '我想要',
				          backgroundColor: '#ff0000',
				          color: '#fff'
				        },
				        ]

			}
		},
		methods: {
        onClick (e) {
        uni.showToast({
          title: `点击${e.content.text}`,
          icon: 'none'
        })
      },
      buttonClick (e) {
        console.log(e)
        this.options[2].info++
      }
    }


		
	}
</script>
<style>
	page{
		background-color: #f0f0f0;
	}
</style>

<style scoped lang="scss">
	.nav{	
		display: flex;
		background-color: #FFFFFF;
		 text-align: center; 
		 width: 100%; 
		 position: fixed; 
		 bottom: 1rpx; 
		 flex-direction: row;
	}
	.image{
		padding: 10px;
	}
	.abc{
		padding: 0px 20px 5px 20px;
		font-size: 15px;
	}
     .price{
		 color: #ff0000;
		 font-size: 23px;
	 }
	 .rmb{
	 		 color: #ff0000;
	 		 font-size: 18px;
	 }
	.title {
		color: #303133;
		font-size: 18px;
	}
	.my-top {
		.user-info {
			display: flex;
			align-items: center;
			padding: 0 5%;
			height: 120rpx;
			margin-top: 30rpx;

			.portrait {
				position: relative;
				width: 88rpx;
				height: 88rpx;
				margin-right: 20rpx;
				box-sizing: border-box;

				image {
					width: 100%;
					height: 100%;
					border-radius: 100%;
					border: 4rpx solid #FFFFFF;
					background-color: #FFFFFF;
					box-sizing: border-box;
				}

			}
		}
	}
</style>
