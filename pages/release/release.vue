<template>
  <view class="content">
    <!-- 加载动画 -->
		<u-modal @confirm="confirm" @cancel="cancel" v-bind:content="content" v-model="modalshow" :show-cancel-button=true confirm-text="我的订单" cancel-text="继续发布" cancel-color="#2979ff" :title-style="{color: 'red'}">
		</u-modal>
	 <view  class="page">
		 <view style="height: 30px;"></view>
			<u-dropdown @close="close" active-color="#19be6b">
				<u-dropdown-item v-model="value" :title="title" :options="options" ></u-dropdown-item>
			</u-dropdown>
     </view>
	 <view >
		 <u-notice-bar type="success" :list="list1" ></u-notice-bar>
		 	<u-toast ref="uToast" />
		 	<u-upload :max-size="5 * 1024 * 1024" ref="uUpload" :action="action"  max-count=5></u-upload>
		  <u-form :model="goods" ref="uForm">
		 	<u-field v-model="goods.title" label-width=50 maxlength=15 placeholder="描述你的标题" @blur="board"></u-field>
		 	<u-field v-model="goods.intro" label-width=50 type="textarea" maxlength=50 placeholder="描述一下你要卖的宝贝,准确的描述能更快卖出哦~" @blur="board"></u-field>
		 	<u-select v-model="listshow" :list="list" @confirm="classification"></u-select>
			<u-select v-model="list2show" :list="list2" @confirm="dormitory"></u-select>
		 	<u-field v-model="goods.classification" :disabled=true label-width=100 icon="grid" label="分类" input-align="right" placeholder="选择你的分类" @click="listshow=true"></u-field>
			<u-field v-model="goods.dormitory" :disabled=true label-width=100 icon="home" label="宿舍" input-align="right" placeholder="选择你的宿舍" @click="list2show=true"></u-field>
		 	<u-field type="number" v-model="goods.pirce" maxlength=5 label-width=100 icon="rmb" label="价格" input-align="right" placeholder="输入商品价格" @blur="board" ></u-field>
			<u-field type="number" v-show="qq" v-model="goods.qq" maxlength=11 label-width=100 icon="qq-fill" label="QQ" input-align="right" placeholder="输入QQ号码" @blur="board" ></u-field>
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
		modalshow:false,//是否显示模态框
		content:"发布成功",//提示内容
		action: 'http://192.168.137.1:8081/image/upload',//上传服务器地址
		listshow: false,  //是否显示分类选择框
		list2show: false,  //是否显示宿舍选择框
		qq:false,//是否允许QQ联系
		cek:false,
		list1: ["建议勾选QQ联系，以便第一时间联系您！"],//顶部提示
		list: [],//商品分类
		list2: [],//宿舍分类
		goods: {
			title: "",//标题
			intro: "",//内容
			classification: "",//分类
			dormitory:"",//宿舍
			pirce:"",//价格
			qq:null,//联系QQ
			data:"",//日期
		},
		title:"闲置物品",
		value:"",   //点击选择的值
		options: [],//服务列表类型
      loadingStatus: true
    }
  },
  onLoad () {//钩子函数，页面加载后触发
    this.loadData()
	this.adminlist()
  },
  methods: {
	  board(){
		 uni.pageScrollTo({
		 scrollTop: 0,
		 duration: 0
		 });
	  },
	  adminlist(){  //请求服务分类
		this.$R.get("almighty/goodslist/list",{},{Authorization: "Bearer " + uni.getStorageSync('token')}).then(res => {
			  this.options=[];
			  for(let i=0;i<res.rows.length;i++){
				if(res.rows[i].adminlist==null){this.goodlist();return}
				this.options.push({label: res.rows[i].adminlist, value: res.rows[i].adminlist}
				)
			}
		});  
	  },
	  goodlist(){//请求商品分类和宿舍分类
	  	this.$R.get("almighty/goodslist/list",{},{Authorization: "Bearer " + uni.getStorageSync('token')}).then(res => {
	  		  this.list=[];
			  this.list2=[];
	  			 for(let i=0;i<res.rows.length;i++){
	  			  if(res.rows[i].goodslist==null){break}
	  			 	this.list.push({label: res.rows[i].goodslist, value: res.rows[i].goodslist}
	  			 	)
	  			 }
	  		  for(let i=0;i<res.rows.length;i++){
	  		   if(res.rows[i].sushelist==null){return}
	  		  	this.list2.push({label: res.rows[i].sushelist, value: res.rows[i].sushelist}
	  		  	)
	  		  }
	  		  
	  	});
	  },
	  radioGroupChange(detail){ //设置QQ输入框是否可见
		  
		  if(detail.value){this.qq=true;this.cek=true}else{this.qq=false;this.cek=false}
	  },
	  close(){    //点击服务类型跳转页面
		  if(this.value==""){return;}
		  if(this.value=="闲置物品"){
			  uni.navigateTo({
			      url: '../release/release'
			  });
		  			
		  }
		  if(this.value=="校园跑腿"){
			   uni.navigateTo({
			       url: '../release/running'
			   });
			
		  }
		  if(this.value=="废品回收"){
			  uni.navigateTo({
			      url: '../release/recycling'
			  });
		     
		  }
	
		  this.value="闲置物品";
	  },
    async loadData () {
      setTimeout(() => {
        this.loadingStatus = false
      }, 100)
    },  
	 classification(e){   //选择后对分类赋值
	 	this.goods.classification=e[0].label
	 },
	 dormitory(e){   //选择后对分类赋值
	 	this.goods.dormitory=e[0].label
	 },
	 onclick(){//做对图片的上传表格的判断
	 if(this.goods.title==""||this.goods.pirce==""||this.goods.classification==""||this.goods.intro==""||this.goods.dormitory==""){
	 	this.$refs.uToast.show({
	 		title: '喔哦！还有内容没有填呢。',
	 		type:"warning"
	 	})
	 	return;
	 }
	 if(this.qq==true&&this.goods.qq==""){
		 this.$refs.uToast.show({
		 	title: '请填写QQ！',
		 	type:"warning"
		 })
		 return;
	 }
	 let files = [];
	 // 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
	 
	 files = this.$refs.uUpload.lists.filter(val => {
	 	return val.progress == 100;
	 })
	 if(files.length==0){
		 this.$refs.uToast.show({
		 	title: '请选择照片！',
		 	type:"warning"
		 })
		 return;
	 }
	var src="http://192.168.137.1:1020/"   //iis服务器地址
	 var filesone=src+files[0].response
	 var filestwo;
	 var filesthree;
	 var filesfour;
	 var filefive;
	 filestwo=files.length>=2?src+files[1].response:null
	 filesthree=files.length>=3?src+files[2].response:null
	 filesfour=files.length>=4?src+files[3].response:null
	 filefive=files.length>=5?src+files[4].response:null
	var goodslists={
			 gImageOne:filesone,
			 gImageTwo:filestwo,
			 gImageThree:filesthree,
			 gImageFour:filesfour,
			 gImageFive:filefive,
	} 
	var aData = new Date();
	this.goods.data = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate();
	goodslists.gTitle=this.goods.title  //标题
	goodslists.gDetail=this.goods.intro//内容
	goodslists.gData=this.goods.data  //日期
	goodslists.gPrice=this.goods.pirce//价格
	goodslists.gFloor=this.goods.dormitory//宿舍
	goodslists.gQq=this.goods.qq//联系QQ
	goodslists.gClassification=this.goods.classification//分类
    goodslists.uId=uni.getStorageSync('user').userId //获取用户id
	 this.$R.post("almighty/goods",goodslists,{Authorization: "Bearer " + uni.getStorageSync('token')}).then(res => {
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
		         url:'/pages/release/release',
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
  	 background-color:rgb(25, 190, 107);
  }
</style>
