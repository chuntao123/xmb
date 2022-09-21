<template>
	<view class="category-like row-af-js-fw" >
		<view class="goods-list">
			<view class="cate-like" v-for="(item,index) in goodsList.leftArr" :key="index" @click="toProduct(item)">
				<image :src="item.slide_list.img" class="cate-like" lazy-load></image>
				<view class="cate-text in2line">{{ item.title }}</view>
				<view class="cate-item">
					<view class="cate-price">￥{{item.price}}</view>
					<view class="cate-tariff">原价￥{{item.marketPrice || item.market_price || ''}}</view>
				</view>
				<view class="cate-comment">评论 {{ item.reviewCount || item.review_count || 0 }} 条<text class="ml-3">已有{{ item.soldCount || item.sold_count || 0 }}购买</text></view>
			</view>
		</view>
		<view class="goods-list">

			<view class="cate-like" v-for="(item,index) in goodsList.rightArr" :key="index" @click="toProduct(item)">
				<image :src="item.slide_list.img" class="cate-like" lazy-load></image>
				<view class="cate-text in2line">{{ item.title }}</view>
				<view class="cate-item">
					<view class="cate-price">￥{{item.price}}</view>
					<view class="cate-tariff">原价￥{{item.marketPrice || item.market_price || ''}}</view>
				</view>
				<view class="cate-comment">评论 {{ item.reviewCount || item.review_count || 0 }} 条<text class="ml-3">已有{{ item.soldCount || item.sold_count || 0 }}购买</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: 'productList',
		data(){
			return{

			}
		},
		props:{
			list: {
				item:Object,
				type: Array,
				default() {
					return []
				}
			}
		},
		methods:{
			toProduct(item){
				if(item.productId){
					uni.navigateTo({
						url: '/pages/product/product?productId='+item.productId
					});
				}else {
					uni.navigateTo({
						url: '/pages/product/product?productId='+item.id
					});
				}

			},
			// 把商品列表分割成两份，用作瀑布流
			waterfallFlow (arr) {
			  if (arr.length <= 0) {
			    return false
			  }
				let allArr={
					leftArr:[],
					rightArr:[]
				}
			  let leftArr = []
			  arr.forEach((item,index)=>{
					if(index%2==0){
						allArr.leftArr.push(item)
					}else{
						allArr.rightArr.push(item)
					}
				})
			  return allArr
			}
		},
		computed:{
			goodsList(){
				let allArr = this.waterfallFlow(this.list)
				return allArr
			}
		},

	}
</script>

<style lang="scss">
	.category-like{
		width: 720rpx;
		margin: 0 15rpx;
		.cate-like{
			position: relative;
			width: 352rpx;
			height: 550rpx;
			background: #FFFFFF;
			margin-bottom: 15rpx;
			border-radius: 12rpx;
			image{
				height: 352rpx;
				width: 352rpx;
				border-radius: 12rpx;
			}
			.cate-text{
				height: 72rpx;
				margin-left: 12rpx;
				font-size: 28rpx;
				margin-top: -17rpx;
			}
			.in2line {
				display: -webkit-box !important;
				overflow: hidden;
				text-overflow: ellipsis;
				word-break: break-all;
				-webkit-box-orient: vertical !important;
				-webkit-line-clamp: 2;
			}
			.cate-item{
				display: flex;
				align-items: center;
				.cate-price{
					margin-top: 16rpx;
					margin-left: 8rpx;
					color: #f83434;
					font-size: 32rpx;
				}
				.cate-tariff{
					margin-top: 16rpx;
					margin-left: 16rpx;
					font-size: 22rpx;
					color: #676767;
					text-decoration: line-through;
				}
			}
			.cate-comment{
				margin-top: 8rpx;
				margin-left: 14rpx;
				font-size: 24rpx;
				color: #676767;
			}

		}
	}
</style>
