<template>
  <view class="content">
    <!-- 加载动画 -->
    <orange-fullloading
      text="加载中"
      :loadshow="loadingStatus">
    </orange-fullloading>
	<u-modal @confirm="confirm" @cancel="cancel" v-bind:content="content" v-model="modalshow" :show-cancel-button=true confirm-text="我的订单" cancel-text="继续发布" cancel-color="#2979ff" :title-style="{color: 'red'}">
	</u-modal>
	 <view  >
		 <u-navbar title="校园跑腿" :backTextStyle="{color:'#ffffff'}" :background="background"></u-navbar>
     </view>
	 <view >
		 <u-notice-bar type="success" :list="list1" ></u-notice-bar>
		 	<u-toast ref="uToast" />
		 	<u-upload :max-size="5 * 1024 * 1024" ref="uUpload" :action="action"  max-count=2></u-upload>
		  <u-form :model="running" ref="uForm">
		 	<u-field v-model="running.list" label-width=50 type="textarea" maxlength=50 placeholder="描述一下跑腿的内容,可以是帮拿快递,帮打饭,帮买东西,帮拿外卖等,送货上宿舍!" @blur="board"></u-field>
		 	<u-select v-model="classificationshow" :list="list" @confirm="classification"></u-select>
		 	<u-field v-model="running.classification" :disabled=true label-width=100 icon="grid" label="分类" input-align="right" placeholder="选择跑腿类型" @click="classificationshow=true" ></u-field>
		 	<u-field v-model="running.price" :disabled="pri" maxlength=5 label-width=100 icon="rmb" label="价格" input-align="right" :placeholder="placeholder" type="number" @blur="board" ></u-field>
			<u-field v-model="running.phone" maxlength=11 label-width=100 icon="phone" label="电话" input-align="right" placeholder="输入电话号码" type="number" @blur="board"></u-field>
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
		modalshow:false,//是否显示模态框
		content:"提交成功",//提示内容
		pri:true,
		background: {
			'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
		},
		action: 'http://192.168.137.1:8081/image/upload',//上传服务器地址
		classificationshow: false,
		list1: ["跑腿只限校园内以及周边，只要您需要，随叫随到！"],//广播标题
		list: [],//跑腿分类
		placeholder:"",//佣金
		running: {  //表格内容
			list: "",
			price: "",
			classification: "",
			phone:"",
			data:""
		},

      loadingStatus: true
    }
  },
  onLoad () {
    this.loadData()
	this.class();
  },
  methods: {
	  board(){
	  		 uni.pageScrollTo({
	  		 scrollTop: 0,
	  		 duration: 0
	  		 });
	  },
    class(){//获取跑腿分类
		this.$R.get("almighty/goodslist/list",{},{Authorization: "Bearer " + uni.getStorageSync('token')}).then(res => {
			  console.log(res.rows)
			  this.list=[];
			  for(let i=0;i<res.rows.length;i++){
				if(res.rows[i].paotuilist==null){return}
				this.list.push({label: res.rows[i].paotuilist, value: res.rows[i].paotuilist}
				)
			}
		}); 
	},
    async loadData () {  
      setTimeout(() => {
        this.loadingStatus = false
      }, 100)
    },  
	 classification(e){   //价格判断
	 	this.running.classification=e[0].label
		if(e[0].label=="快递代领"){
			this.running.price=2;
			this.pri=true;
		}
		if(e[0].label=="其它"){
			this.running.price="";
			this.pri=false;
			this.placeholder="请输入佣金"
		}
	 },
	 onclick(){//做对图片的上传表格的判断
	 if(this.running.list==""||this.running.pirce==""||this.running.classification==""||this.running.phone==""){
	 	this.$refs.uToast.show({
	 		title: '喔哦！还有内容没有填呢。',
	 		type:"warning"
	 	})
	 	return;
	 }
	 let files = [];
	 // 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
	 
	 files = this.$refs.uUpload.lists.filter(val => {
	 	return val.progress == 100;
	 })
	 var src="http://192.168.137.1:1020/"   //iis服务器地址
	 var filesone=null
	 var filestwo=null
	 if(files.length!=0){
	 filesone=src+files[0].response
	 filestwo=files.length>=2?src+files[1].response:null
	 }
	var runninglists={
			 rImageone:filesone,
			 rImagetwo:filestwo,
	} 
	var aData = new Date();
	this.running.data = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate()+ " " + aData.getHours()+ ":" + aData.getMinutes();
	runninglists.rList=this.running.list
	runninglists.rPrice=this.running.price
	runninglists.rClassification=this.running.classification
	runninglists.rPhone=this.running.phone
	runninglists.rData=this.running.data
	runninglists.uId=uni.getStorageSync('user').userId
	console.log(runninglists)
	this.$R.post("almighty/running",runninglists,{Authorization: "Bearer " + uni.getStorageSync('token')}).then(res => {
		 if(res.code==200){
			  this.modalshow=true}
	});
	 },
	 confirm(){//前往订单触发的方法
	 		 uni.switchTab({
	 		 	url: '/pages/user/user'
	 		 });
	 },
	 cancel(){
	  uni.reLaunch({
	      url:'/pages/release/running',
	   })
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
