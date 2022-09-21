<template>
  <view class="content">
    <!-- 加载动画 -->
    <orange-fullloading
      text="加载中"
      :loadshow="loadingStatus">
    </orange-fullloading>
	 <view>
		 <u-navbar title="王者服务" :backTextStyle="{color:'#ffffff'}" :background="background"></u-navbar>
     </view>
	 <view >
		 <u-notice-bar type="success" :list="list1" ></u-notice-bar>
		 	<u-toast ref="uToast" />
		  <u-form :model="form" ref="uForm">
			  <u-select v-model="show" :list="list" @confirm="classification"></u-select>
		 	<u-field v-model="form.intro" label-width=50 type="textarea" maxlength=30 placeholder="描述一下你的要求,更好的为你服务呦!"></u-field>
		 	<u-field v-model="form.classification" @click="show=true" label-width=100 :disabled=true icon="grid" label="分类" input-align="right" placeholder="请选择区服"></u-field>
		 	<u-field v-model="form.pirce" maxlength=5 label-width=100 :disabled=true icon="rmb" label="价格" input-align="right" ></u-field>
			<u-field v-model="form.qq" maxlength=11 label-width=100 icon="qq-fill" label="QQ" input-align="right" placeholder="输入您的QQ号码,方便联系您" ></u-field>
	
			<view style="padding: 30px 0px 0px 0px;">
		 	<u-button type="success" shape="circle" :ripple=true  @click="onclick">提交</u-button></view>
		 </u-form>
		
		
	 </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
		background: {
			'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
		},
		action: '',//上传服务器地址
		show: false,
		qq:false,
		cek:false,
		
		list1: ["专业代打，提交后我们会第一时间联系您哦！"],
		list: [
			{
				value: '安卓',
				label: '安卓'
			},
			{
				value: '苹果',
				label: '苹果'
			}
			],
		form: {
			title: "",
			intro: "",
			classification: "",
			pirce:"待定",
			qq:"",
		},
		
		radio: '',
		switchVal: false,
		title:"跑腿做事",
		value:"",
		options: [{
				label: '商品买卖',
				value: '商品买卖',
			},
			{
				label: '跑腿做事',
				value: '跑腿做事',
			},
			{
				label: '代刷网课',
				value: '代刷网课',
			},
			{
				label: '王者服务',
				value: '王者服务',
			},
			{
				label: '发布兼职',
				value: '发布兼职',
			},
			{
				label: '发布需求',
				value: '发布需求',
			},
			{
				label: '发布出租',
				value: '发布出租',
			}
			],
      nopictures: this.$Management.nopictures,
      tabarIndex: 0,
      scrollInto: '',
      category: [],
      rightMenu: [],
      allRightMenu: [],
      loadingStatus: true
    }
  },
  onLoad () {
    this.loadData()
  },
  methods: {
	  radioGroupChange(detail){
		  
		  if(detail.value){this.qq=true;this.cek=true}else{this.qq=false;this.cek=false}
	  },
	  close(index){
		  if(this.value!=""){this.title=this.value;}
	  },
    async loadData () {
      setTimeout(() => {
        this.loadingStatus = false
      }, 100)
    },  
	 classification(e){
	 	this.form.classification=e[0].label
	 },
	 onclick(){//做对图片的上传表格的判断
	 if(this.form.title==""||this.form.pirce==""||this.form.classification==""||this.form.intro==""){
	 	this.$refs.uToast.show({
	 		title: '喔哦！还有内容没有填呢。',
	 		type:"warning"
	 	})
	 	return;
	 }
	 	console.log(this.form)
	 }
},
}
</script>
<style lang="scss">
  .content {
    height: 100%;
  }
  .page{
  	 background-color: rgb(28, 187, 180);
  }
</style>
