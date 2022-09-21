<template>
  <view class="content">
    <!-- 加载动画 -->
    <orange-fullloading
      text="加载中"
      :loadshow="loadingStatus">
    </orange-fullloading>
	 <view>
		 <u-navbar title="需求发布" :backTextStyle="{color:'#ffffff'}" :background="background"></u-navbar>
     </view>
	 <view >
		 <u-notice-bar type="success" :list="list1" ></u-notice-bar>
		 	<u-toast ref="uToast" />
		 	<u-upload ref="uUpload" :action="action" :auto-upload="false" max-count=5></u-upload>
		  <u-form :model="form" ref="uForm">
		 	<u-field v-model="form.title" label-width=50 maxlength=10 placeholder="描述你的标题"></u-field>
		 	<u-field v-model="form.intro" label-width=50 type="textarea" maxlength=30 placeholder="描述一下你需要的宝贝,准确的描述能更快得到回复哦~"></u-field>
		 	<u-select v-model="show" :list="list" @confirm="classification"></u-select>
		 	<u-field v-model="form.classification" :disabled=true label-width=100 icon="grid" label="分类" input-align="right" placeholder="选择你的分类" @click="show=true"></u-field>
		 	<u-field v-model="form.pirce" maxlength=5 label-width=100 icon="rmb" label="价格" input-align="right" placeholder="你期望的商品价格" ></u-field>
			<u-field v-show="qq" v-model="form.qq" maxlength=11 label-width=100 icon="qq-fill" label="QQ" input-align="right" placeholder="输入QQ号码" ></u-field>
			<view style="padding: 0px 0px 0px 15px;">
			<u-checkbox-group>
			<u-checkbox @change="radioGroupChange" v-model="cek">允许通过QQ联系我</u-checkbox>
			</u-checkbox-group></view>
			<view style="padding: 30px 0px 0px 0px;">
		 	<u-button type="success" shape="circle" :ripple=true  @click="onclick">发布</u-button></view>
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
		list1: ["建议勾选QQ联系，以便第一时间联系您！"
						],
		list: [
			{
				value: '1',
				label: '江'
			},
			{
				value: '2',
				label: '湖'
			}
			],
		list2: [
			{
				text:"男"
			},
			{
				text:"女"
			}
						],
		form: {
			title: "",
			intro: "",
			classification: "",
			pirce:"",
			qq:"",
		},
		
		radio: '',
		switchVal: false,
		title:"商品买卖",
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
				label: '网课服务',
				value: '网课服务',
			},
			{
				label: '王者服务',
				value: '王者服务',
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
		  if(this.value==""){return;}
		  if(this.value=="商品买卖"){
		  			  this.$u.route({
		  			  url: 'pages/release/release',		
		  			  })
		  }
		  if(this.value=="跑腿做事"){
			   
			  this.$u.route({
			  url: 'pages/release/view/running',		
			  })
		  }
		  if(this.value=="网课服务"){
		      this.$u.route({
		      url: 'pages/release/view/network_class',		
		      })
		  }
		  if(this.value=="王者服务"){
		      this.$u.route({
		      url: 'pages/release/view/kpl',		
		      })
		  }
		  if(this.value=="发布需求"){
		      this.$u.route({
		      url: 'pages/release/view/demand',		
		      })
		  }
		  if(this.value=="发布出租"){
		      this.$u.route({
		      url: 'pages/release/view/rent',		
		      })
		  }
		  this.value="";
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
