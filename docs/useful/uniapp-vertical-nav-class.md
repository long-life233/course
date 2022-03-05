
# uniapp垂直导航分类
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


