import { createSSRApp } from "vue";
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  // 封装全局toast函数
  app.config.globalProperties.$toast = (title,duration=1500)=>{
	  uni.showToast({
		  icon:'none',
		  title,
		  duration
	  })
  }
  // 封装全局路由跳转函数
  app.config.globalProperties.$navigateTo = (url)=>{
	  uni.navigateTo({
		  url:'/pages'+url,
		  animationType:"slide-in-left", // 跳转动画
		  animationDuration: 800
	  })
  }
  // 封装云函数请求
  app.config.globalProperties.$uniCloud = async (name,data)=>{
	  uni.showLoading()
		try{
			let res = await uniCloud.callFunction({
				name, // 云函数名字
				data // 传输数据
			})
			return res
		} catch(e) {
			return e
		} finally{ 
			uni.hideLoading()
		}
  }
  return {
    app,
  };
}
