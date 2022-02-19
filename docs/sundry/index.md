# 介绍

编程记录中的杂项

vue3文档
- doc/guide/
    - Reactivity Fundamentals
    - Components Basics（OK）
    - Components In-Depth / Async Components (OK)
    - Reusability / Plugins(OK)
    - Built-in Components / Suspense
    - Scaling Up / Routing (OK)
    -             

vitepress文档
- Guide/Intorduction
    - Asset Handling(OK)

- tip
  - vscode，搜索文件名，ctr+p
  - 搜索字符，ctr+f，ctr+shift+f搜索


## JS生成二维码
https://github.com/davidshimjs/qrcodejs
## 解析marked格式
使用"marked"库
## IntersectionObserver
api `IntersectionObserver`,离开视口区域会触发函数
## Koa
阮一峰入门教程[https://www.ruanyifeng.com/blog/2017/08/koa.html]
## JS媒体查询
主要使用API：
```js
// 媒体查询，系统是否使用深色主题？（return boolean）
// 类似还有当前浏览器窗口是否小于780px？ 还是小于560px？
const query = window.matchMedia(`(prefers-color-scheme: dark)`)

query.onchange = (e) => {
    log(e.matches)
}

// 获取类列表
const classList = document.documentElement.classList
classList[dark ? 'add' : 'remove']('dark')
```
对HTML根元素添加或删除dark类来切换主题。然后对很多元素(body,头部导航等等)来说，使用交集选择器（当html拥有dark类时）,设置背景为
```css
html.dark body{
    /* 定义css变量 */
    --vt-c-bg: var(--vt-c-black);
}
```
[-->了解css变量](https://www.ruanyifeng.com/blog/2017/05/css-variables.html)

还可以用js来操作获取css变量哟！

## 使用mitt
@vue/theme文件中，当改变主题时，使用mitt消息订阅传递数据

在这里，为什么要使用高阶函数呢？（调用一个函数返回另一个函数，确保获取到window对象，否则打包时一直报错，window对象不存在！！！）
```vue
<script lang="ts" setup>
import VTSwitch from './VTSwitch.vue'
import VTIconSun from './icons/VTIconSun.vue'
import VTIconMoon from './icons/VTIconMoon.vue'
// 自定义触发changeTheme事件
import mitt from 'mitt'
// window.emitter = mitt() // 打包时会报错，window对象不存在
 
const storageKey = 'vue-theme-appearance'
const toggle = typeof localStorage !== 'undefined' ? useAppearance() : () => {}

function useAppearance() {
  //
  window.emitter = mitt()
  //
  let userPreference = localStorage.getItem(storageKey) || 'auto'
  const query = window.matchMedia(`(prefers-color-scheme: dark)`)
  const classList = document.documentElement.classList
  let isDark =
    userPreference === 'auto' ? query.matches : userPreference === 'dark'
  const setClass = (dark: boolean) => classList[dark ? 'add' : 'remove']('dark')

  query.onchange = (e) => {
    if (userPreference === 'auto') {
      setClass((isDark = e.matches))
    }
  }

  const toggle = () => {
    setClass((isDark = !isDark))
    // 触发一个事件
    window.emitter.emit('changeTheme',isDark)
    localStorage.setItem(
      storageKey,
      (userPreference = isDark
        ? query.matches
          ? 'auto'
          : 'dark'
        : query.matches
        ? 'light'
        : 'auto')
    )
  }

  return toggle
}
</script>

<template>
  <VTSwitch
    class="vt-switch-appearance"
    aria-label="toggle dark mode"
    @click="toggle"
  >
    <VTIconSun class="vt-switch-appearance-sun" />
    <VTIconMoon class="vt-switch-appearance-moon" />
  </VTSwitch>
</template>
```
## 垂直导航分类
```html
<template>
	<view class="row">
		<!-- verticalNav -->
		<scroll-view class="flex-1" :style="'height:'+scrollH+'px'" scroll-y="true" 
		scroll-with-animation
		:scroll-top="vericalNavTop">
			<view class="border w-100 rowCenCen" style="height: 100rpx;"
			:class="navCur===index?'bg-primary':''"
			@click="navCurChange(index)"
			:data-id="index"
			v-for="(i,index) in 30">
				{{i}}
			</view>
		</scroll-view>
		<!-- main -->
		<scroll-view class="flex-3 bg-primary" :style="'height:'+scrollH+'px'" scroll-y="true" scroll-with-animation
		:scroll-into-view="'main'+mainCur"
		@scroll="onMainScroll"
		id="main">
			<view class="border w-100 rowCenCen" style="height: 500rpx;"
			v-for="(i,index) in 30"
			:id="'main'+index"
			>
				<view class="rounded-circle rowCenCen font-weight-bolder font-lg bg-warning" style="width: 100rpx;height: 100rpx;">
					{{i}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollH: 400,
				// 导航索引
				navCur:0,
				//
				vericalNavTop:0,
				// 主体索引
				mainCur:0,
				list:[],
				first:true
			}
		},
		
		onLoad() {
			// 获取高度
			uni.getSystemInfo({
				success: res => {
					// 可用窗口高度，不包括原生的导航和tabbar。自定义导航栏，状态栏，
					this.scrollH = res.windowHeight-100
				}
			})
		},
		
		methods: {
			navCurChange(index){
				this.mainCur = this.navCur = index;
				this.vericalNavTop = (this.navCur-2)*50
				
			},
			/*
			event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
			*/
			onMainScroll(e){
				// console.log(data.top,data.bottom,"xx");
				if(this.first){
					for (let i=0;i<30;i++) {
						uni.createSelectorQuery().in(this).select("#main"+i).fields({
						  rect: true
						}, data => {
							this.list[i] = {}
							this.list[i].top = data.top
							this.list[i].bottom = data.bottom
							console.log(data.top,data.bottom,"xx"); 
						}).exec();
					}
					this.first = false 
				}
				let scrollTop = e.detail.scrollTop + 10
				console.log(scrollTop);
				for (let i=0;i<30;i++) {
					if(scrollTop > this.list[i].top&&scrollTop<this.list[i].bottom){
						this.navCur = i
						this.vericalNavTop = (this.navCur-2)*50
						return false
					}
				}
				
			}
		}
	}
</script>

<style>
	.class-active {
		border-left: 8rpx solid #fd6801;
	}
	.class-deactive{
		border-left: 8rpx solid #FFFFFF;
	}
</style>

```
## algoria搜索框

- vitepress不支持内置搜索框。只有algoria搜索框。可是我不会配置。。
