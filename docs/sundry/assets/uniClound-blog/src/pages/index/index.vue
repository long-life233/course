<template>
  index
  <button @click="login">去登录</button>
  <button @click="regist">去注册</button>
</template>

<script setup lang="ts">
import {getCurrentInstance} from 'vue'
const globalProperties = getCurrentInstance().appContext.config.globalProperties;

// 登录方法
const login = ()=>{
	globalProperties.$navigateTo('/login/login')
}
// 注册方法
const regist = ()=>{
	globalProperties.$navigateTo('/regist/regist')
}
</script>

<style>

</style>
