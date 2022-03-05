<template>
	<form action="">
		  userName
		  <input type="text" v-model="form.userName" /><br/>
		  passWord
		  <input type="text" v-model="form.passWord" /><br/>
		  <button @click="regist">注册</button>
	</form>
</template>

<script setup lang="ts">
import {reactive} from 'vue'
const form = reactive({
	userName:"",
	passWord:""
})

const regist = async ()=>{
	 // 这里我们使用原始写法
	let res = await uniCloud.callFunction({
		name: 'user',
							// 因为登录注册都属于 use表，感觉index文件可能代码混杂，加个type加以区分，登录的type是get
		data: Object.assign({},form, {
			type: 'add'
		})
	})
	if (res.result.code === 0) {
		uni.showToast({
			title:'注册成功'
		})
		// 跳转
		setTimeout(() =>{
			uni.navigateBack()
		}, 1500)
	} else {
		uni.showToast({
			title:res.result.msg+''
		})
	}

}
</script>

<style>

</style>
