import store from '@/store/index'
export default {
  baseUrl(){
    return 'http://127.0.0.1:8081/'   //这里是我们的域名API接口
  },
  
  common() {
    return {
      header: {
        
        // Authorization: "Bearer " + uni.getStorageSync('token')
        'content-type': 'application/json;charset=UTF-8'
      },
      data: {},
      method: 'GET',
      dataType: 'json'
    }
  },
  //请求 返回promise
  request (options = {}) {
    //参数
    const common = this.common();
    options.url = this.baseUrl() + options.url
    options.header = options.header || common.header
    options.data = options.data || common.data
    options.method = options.method || common.method
    options.dataType = options.dataType || common.dataType
    //请求
    return new Promise((res, rej) => {
      //请求前
      uni.request({
        ...options,
        success: (result) => {
          let data = result.data
          // 统一拦截请求，如果返回状态码不等于200，直接return
		  console.log(data)
		  
		  if(data.code!=null){
		  if (data.code != 200) { 
			  uni.showToast({
			  	title: "登录已失效",
			  	icon: 'none'
			  })
			  uni.removeStorage({
			      key: 'token',
			  });
			  uni.removeStorage({
			      key: 'user',
			  });
		   setTimeout(()=>{
		   return uni.reLaunch({
		       url: '../index/login'
		   });},1000)
			  }}
		  
          res(data)
        },
        
        fail: (error) => {
          uni.showToast({
            title: error.msg || '请求失败',
            icon: 'none'
          })
          return rej()
        }

      })
    })
  },
  // get请求
  get (url, data = {},header={}, options = {}) {
    options.url = url
    options.data = data
	options.header = header
    options.method = 'GET'
    return this.request(options)
  },
  // post请求
  post (url, data = {},header={}, options = {}) {
    options.url = url
    options.data = data
	options.header = header
    options.method = 'POST'
    return this.request(options)
  },
  put (url, data = {}, options = {}) {
    options.url = url
    options.data = data
    options.method = 'PUT'
    return this.request(options)
  },
  delete (url, data = {}, options = {}) {
    options.url = url
    options.data = data
    options.method = 'DELETE'
    return this.request(options)
  },
}
