//状态储存

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userToken:'',
    userInfoVuex:{},
    //默认登陆状态
    loginStatus: false,
    //存储用户信息
    user: {},
    shopCartNum: 0,
    toPayHttpObj:{},
    // 仅保存一次的地址
    onceChooseAddress:{},
    // 商城基本配置
    appConfig:{},
    indexPopStatus:true,
    // 分享进来的分销商id，用于登录的绑定
    shareDistributeId:0,
    // 选择优惠券的信息
    chooseCouponInfo:{},
    // 通过创建订单页面进入优惠券页面的订单信息
    beforeCreateOrderGoods:[],
    redEnvelopeDialogStatus:true
  },
  mutations: {
    // 订单页面到支付页面的状态
    toPayHttpObjChange(state,toPayHttpObj){
      state.toPayHttpObj = toPayHttpObj
    },
    // 仅保存一次的地址
    toOnceChooseAddressChange(state,addressInfo){
      state.onceChooseAddress = addressInfo
    },
    // 选择优惠券的id
    chooseCouponInfoMutations(state,couponInfo){
      state.chooseCouponInfo = couponInfo
    },
    // 通过创建订单页面进入优惠券页面的订单信息
    changeBeforeCreateOrderGoodsMutations(state,goodsList){
      state.beforeCreateOrderGoods = goodsList
    },
    shopCartNumChange (state, goodsCount) {
      state.shopCartNum = goodsCount
    },
    // 设置用户token
    setUserToken(state,token){
      state.userToken = token
    },
    // 改变首页首屏弹窗
    changeIndexPopStatus(state){
      state.indexPopStatus = false
    },
    // 改变分销商id
    changeShareDistributeId(state,shareDistributeId){
      state.shareDistributeId = shareDistributeId
    },

    // 设置用户信息
    setUserInfo(state,userInfo){
      state.userInfoVuex = userInfo
    },
    login (state, user) {
      state.loginStatus = true
      state.user = user
      uni.setStorageSync('user', JSON.stringify(user))
    },
    //初始化状态
    initUser (state) {
      let user = uni.getStorageSync('user')
      if (user) {
        this.user = JSON.parse(user)
        state.loginStatus = true
      }
    },
    //退出登陆
    logout (state) {
      state.loginStatus = false
      state.user = {}
      uni.removeStorageSync('user')
    },
    setAppConfigMutations(state,appInfo){
      state.appConfig = appInfo
    },
    // 修改首页红包显示状态
    redEnvelopeDialogStatus(state){
      state.redEnvelopeDialogStatus = false
    },
  },
	actions:{
		getShopCartShopCount(context){
			this.$R.get(getCartListUrl)
				.then((res) => {
					context.commit('shopCartNumChange',res.data.list.length)
					console.log(this.cartList)
				})
		}
	},
  getters:{
    showShopCartNum: state => {
      return state.shopCartNum
    },
  }
})
