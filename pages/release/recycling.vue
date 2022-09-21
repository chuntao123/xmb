<template>
  <view class="content">
    <!-- 加载动画 -->
    <orange-fullloading
      text="加载中"
      :loadshow="loadingStatus">
    </orange-fullloading>
	<u-modal @confirm="confirm" @cancel="cancel" v-bind:content="content" v-model="modalshow" :show-cancel-button=true confirm-text="我的订单" cancel-text="继续发布" cancel-color="#2979ff" :title-style="{color: 'red'}">
	</u-modal>
	 <view>
		 <u-navbar title="废品回收" :backTextStyle="{color:'#ffffff'}" :background="background"></u-navbar>
     </view>
	 <view >
		 <u-notice-bar type="success" :list="list1" ></u-notice-bar>
		 	<u-toast ref="uToast" />
		  <u-form :model="recycling" ref="uForm">
			  <u-select v-model="show" :list="list" @confirm="classification"></u-select>
			  <u-select v-model="show1" :list="list2" @confirm="dormitory"></u-select>
		 	<u-field v-model="recycling.list" label-width=50 type="textarea" maxlength=30 placeholder="其它类型的废品,请在这里备注一下哦~" @blur="board"></u-field>
		 	<u-field v-model="recycling.classification" @click="show=true" label-width=100 :disabled=true icon="grid" label="分类" input-align="right" placeholder="请选择废品类型"></u-field>
			<u-field v-model="recycling.dormitory" @click="show1=true" label-width=150 :disabled=true icon="home" label="宿舍楼" input-align="right" placeholder="请选择宿舍楼"></u-field>
			<u-field v-model="recycling.dormitoryno" label-width=150  icon="home-fill" label="宿舍号" input-align="right" placeholder="请输入宿舍号" @blur="board"></u-field>
		 	<u-field v-model="recycling.pirce" maxlength=10 label-width=100 :disabled=true icon="rmb" label="价格" input-align="right"  ></u-field>
			<u-field type="number" v-model="recycling.phone" maxlength=11 label-width=100 icon="phone" label="电话" input-align="right" placeholder="输入您的手机号码,方便联系您" @blur="board"></u-field>
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
		background: {
			'background-image': 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
		},
		show: false,
		show1:false,
		list2:[],//宿舍分类
		list1: ["无需出门，上门回收废品哦！"],
		list: [],//回收分类
		recycling: {
			list:"",
			dormitory:"",
			dormitoryno: "",
			data: "",
			classification: "",
			pirce:"上门回收,面议",
			phone:"",
		},
      loadingStatus: true
    }
  },
  onLoad () {
    this.loadData()
	this.class()
  },
  methods: {
	  board(){//回正
	  		 uni.pageScrollTo({
	  		 scrollTop: 0,
	  		 duration: 0
	  		 });
	  },
   class(){//获取分类
		this.$R.get("almighty/goodslist/list",{},{Authorization: "Bearer " + uni.getStorageSync('token')}).then(res => {
			  this.list=[];
			  this.list2=[];
			  for(let i=0;i<res.rows.length;i++){
				if(res.rows[i].jianzhilist==null){break}
				this.list.push({label: res.rows[i].jianzhilist, value: res.rows[i].jianzhilist}
				)
			}
			for(let i=0;i<res.rows.length;i++){
				if(res.rows[i].sushelist==null){return}
				this.list2.push({label: res.rows[i].sushelist, value: res.rows[i].sushelist}
				)
			}
		}); 
	},
    async loadData () {
      setTimeout(() => {
        this.loadingStatus = false
      }, 100)
    },  
	 classification(e){
	 	this.recycling.classification=e[0].label
	 },
	 dormitory(e){
	 	this.recycling.dormitory=e[0].label
	 },
	 onclick(){//做对图片的上传表格的判断
	 if(this.recycling.dormitory==""||this.recycling.dormitoryno==""||this.recycling.classification==""||this.recycling.phone==""){
	 	this.$refs.uToast.show({
	 		title: '喔哦！还有内容没有填呢。',
	 		type:"warning"
	 	})
	 	return;
	 }

	 var aData = new Date();
	 this.recycling.data = aData.getFullYear() + "-" + (aData.getMonth() + 1) + "-" + aData.getDate()+ " " + aData.getHours()+ ":" + aData.getMinutes();
	var recyclinglists={
			 rList:this.recycling.list,
			 rDormitory:this.recycling.dormitory,
			 rDormitoryno:this.recycling.dormitoryno,
			 rData:this.recycling.data,
			 rClassification:this.recycling.classification,
			 rPhone:this.recycling.phone,
			 uId:uni.getStorageSync('user').userId
	} 
	console.log(recyclinglists)
	this.$R.post("almighty/recycling",recyclinglists,{Authorization: "Bearer " + uni.getStorageSync('token')}).then(res => {
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
	 		 location.reload();
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
