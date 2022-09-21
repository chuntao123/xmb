<template>
	<view>
		<view>
		<u-navbar title="意见反馈" :backTextStyle="{color:'#ffffff'}" :background="background"></u-navbar>
		</view>
	<uni-easyinput type="textarea" autoHeight v-model="value" placeholder="请输入你要反馈的内容"></uni-easyinput>
	
	<view class="tx">
	<u-button type="success" :ripple=true >提交</u-button>
	</view>
	</view>
</template>
<script>
export default {
  data () {
    return {
		value:"",
		background: {
			'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
		},
		}
		}
		}
</script>
<style scoped>
	.tx{
		padding: 60px 0px 0px 0px;
	}
</style>