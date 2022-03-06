# uniapp实现下拉刷新
```html
<template>
	<movable-area class="w-100 movable-area bg-gradual-red">
		<movable-view class="w-100 movable-view bg-grey"
		direction="vertical"
		inertia
		out-of-bounds
		:y="y"
		@change="onChange"
		@touchend="end">
			{{status}}
			<view style="height: 50px;" class="bg-gradual-blue position-absolute w-100 bottom-0">
				dd
			</view>
		</movable-view>
	</movable-area>
</template>

<script setup>
	import {ref} from 'vue'
	const REFRESHING = "正在刷新中"
	const REFRESHMORE = "下拉刷新"
	const LEAVEREFRESH = "松手刷新"
	
	const y = ref(-50)
	const status = ref(REFRESHMORE)
	let oldY = 0
	
	function onChange(e){
		if(status.value === REFRESHING){
			return
		}
		oldY = e.detail.y
		if(	e.detail.y > 0){
			status.value = LEAVEREFRESH
		}else{
			status.value = REFRESHMORE
		}
	}
	// touchend函数也是一个关键
	function end(){
		// 关键的一步，否则设置y不会生效。把记录值赋给当前值
		y.value = oldY
		if(oldY > 0 && status.value === LEAVEREFRESH){
			status.value = REFRESHING
			setTimeout(()=>{
				status.value = REFRESHMORE
				y.value = -50
			},1000)
		}else{
			setTimeout(()=>y.value = -50)
		}
	}
</script>

<style>
.movable-area{
	height: 50vh;
}
.movable-view{
	height: calc(50vh + 50px);
}
</style>


```