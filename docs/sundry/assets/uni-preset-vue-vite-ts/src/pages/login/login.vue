<template>
  <form action="">
	  userName
	  <input type="text" v-model="form.userName" /><br/>
	  passWord
	  <input type="text" v-model="form.passWord" /><br/>
	  <button @click="login">去登录</button>
  </form>
  <button @click="loginWithWeChat">小程序登录</button>
</template>

<script setup lang="ts">
import {reactive,getCurrentInstance} from 'vue'
const globalProperties = getCurrentInstance().appContext.config.globalProperties;
// 表单，包含填写的用户名，密码
const form = reactive({
	userName:"",
	passWord:"",
	openId:""
})
// 登录方法
const login = async ()=>{
	if(!form.openId){ // 不是微信登录，判断输入是否正确
		if(!form.userName || !form.passWord){
			globalProperties.$toast('请输入用户名或密码！')
			return;
		}
	}else{ // 是微信登录，清空
		form.userName = ''
		form.passWord = ''
	}
	let res = await globalProperties.$uniCloud('user',Object.assign({},form,{type:'get'}))
	if (res.result.code === 0) {
		globalProperties.$toast('登陆成功')
	} else {
		globalProperties.$toast(res.result.msg+'')
	}
}

// 微信登录方法
const loginWithWeChat = async ()=>{
	await uni.login({
		async success(res) {
			// 拿到openId
			let result = await globalProperties.$uniCloud('loginWithWeChat', {
				js_code: res.code
			})
			// 拿到openId
			form.openId = result.result.data.openid
			// 执行登录方法
			login()
		}
	})
}
</script>

<style>

</style>
