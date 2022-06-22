# 简历


## 问题
```shell

```

博客地址：https://long-life233.github.io/

gitee仓库：https://gitee.com/Lukechenggg
## 小程序
```js
时间: 6个月，2021.9 - 2022.5。

介绍: 该小程序的功能是为车主、消费者、运营人员提供服务。

人员周期: 前端2个，UI2个，后端1个。

技术体系：uniApp


技术要点：
    1.瀑布流页面开发;
    2.分享指定页面开发;
    3.轮播图动态指示点组件的开发;

1，瀑布流页面开发思路：将获取到的列表数据分为两组，每一组数据都定义两个变量，一个记录的这组的总高度、一个记录这组的列表数据。
然后将获取到的图片url赋值给display为none的image标签。这里之所以这么做是为了防止图片在加载过程中拉伸变形，用户体验不好。
然后当图片加载完成的时候会触发一个函数，这个函数的作用就是判断这张图片是该放到左边这个数组还是右边这个数组。最后就是将两组保存图片url的数组使用v-for渲染到页面上。这时候因为之前已经请求加载了图片，有了缓存，所以不会出现图片拉伸变形的情况。

2，分享指定页面开发思路：使用mixin全局混入的技术，定义分享路径。但因为要分享指定页面，而有些页面第一次加载时要在onLoad生命周期里获取参数。比如某个详情页要根据id获取数据。这时候就可以用一个变量来保存这个参数，当用户分享的时候再在路径后面加上这个参数。

3，轮播图动态指示点开发思路：就是根据传入数据动态生成指定数量的指示点，然后就是根据当前激活的指示点，来为每个指示点书写不同的css样式和动画。

4，请求的封装与拦截思路；因为使用uniapp的原生请求不太方便，而axios使用的是XHR的原因所以也不能使用。所以使用了一个请求库lauch-request。实现对请求的封装与拦截。

5，用户授权及登录的Token认证思路：
先在前端通过uni.login获取js_code，请求接口带上js_code，拿到openId，然后在通过uni.getUserProfile获取用户信息，将用户信息和openId作为参数，发请求保存在服务器上，这样就登录成功了。
```

### 瀑布流页面开发
```html
<movable-area style="height:50vh">
    <movable-view direction="vertical" @change="change">
        <!-- 瀑布流 -->
        <scroll-view style="height:50vh" scroll-y="true" @scrolltolower="onScrollToLower" refresher-enabled
            :refresher-triggered="triggered" :refresher-threshold="100" @refresherpulling="onPulling"
            @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort">
            <view class="rowStaBet">
                <view>
                    <site-list-item v-for="(item,index) in leftArr" :item="item" :key="index"></site-list-item>
                </view>
                <view>
                    <site-list-item v-for="(item,index) in rightArr" :item="item" :key="index"></site-list-item>
                </view>
            </view>
        </scroll-view>
    </movable-view>
</movable-area>

<script>
    const siteList = ref([])
    let page = 0 // 第一次获取营地列表
    // 下拉加载更多，加载中，没有更多了
	const MORE = 'more'
	const LOADING = 'loading'
	const NOMORE = 'noMore'
    let state = ref(LOADING)
	const stateText = computed(() => {
		let obj = {
			[MORE]: '上拉加载更多',
			[LOADING]: '加载中...',
			[NOMORE]: '没有更多了亲'
		}
		return obj[state.value]
	})
    // 第一次获取列表数据
	getSiteList({
		page
	}).then(({
		code,
		total,
		data
	}) => {
		siteList.value = data
		setTimeout(() => state.value = MORE, 1000)
	})
    // 左边瀑布流的高度
	let leftH = 0
	let leftArr = reactive([])
	// 右边瀑布流的高度
	let rightH = 0
	let rightArr = reactive([])
	const onImgLoad = (e, item) => {
		const rate = e.detail.height / e.detail.width
		const imgWidth = 350
		const rateHeight = imgWidth * rate
		if (leftH > rightH) { // 如果左边高，就往右边添加图片
			rightArr.push(item)
			rightH += rateHeight
		} else { // 如果右边高或者一样高，就往左边添加图片
			leftArr.push(item)
			leftH += rateHeight
		}
	}
</script>
```


### 分享指定页面开发
```js
// 全局混入,可以分享;点击分享的小程序会跳到制定页面
Vue.mixin({
  data(){
	return {
		sharePath:""
	}  
  },
  onReady() {
  	this.sharePath = '/'+this.__route__
  },
  onShareAppMessage() {
  	return {
  		title: '',
  		path: this.sharePath
  	}
  },
  onShareTimeline(){
	  return {
	  	title: '',
	  	path: this.sharePath
	  }
  }
})

// 详情页重写方法
onShareAppMessage() {
    return {
        title: '',
        path: `${this.sharePath}?roomId=${this.roomId}&productId=${this.productId}`
    }
},
onShareTimeline(){
        return {
        title: '',
        path: `${this.sharePath}?roomId=${this.roomId}&productId=${this.productId}`
        }
},
```

### 轮播图动态指示点组件的开发

```vue
<template>
	<view class="dot-wrapper-box" 
		  :style="'transform:translateX('+translateX+'px);width:'+dot_distance+'px;height:'+dot_distance+'px;bottom:'+dotBoxBottom+'rpx'">
		<block v-for="(item,index) in resdata" :key="index">
			<view class="dot-wrapper">
				<view class="dot" 
					  :class="index===currentIndex-2?'prew_2_dot':
							  index===currentIndex-1?'prew_1_dot':
							  index===currentIndex?'current-dot':
							  index===currentIndex+1?'next_1_dot':
							  index===currentIndex+2?'next_2_dot':''">
				</view>
			</view>
		</block>
	</view> 
</template>

<script>
	export default {
		name:"swiper-dynamic-bullets",
		props:{
			// 轮播图数据
			resdata:{
				type:Array
			},
			// 指示点的中心距离,相当于指示点之间的距离
			dot_distance:{
				type:[Number,String],
				default:20
			},
			// 当前指示点索引
			currentIndex:{
				type:[Number,String],
				default:0
			},
			// 指示点宽高
			dotWidth:{
				type:[Number,String],
				default:10
			},
			// 指示点盒子bottom
			dotBoxBottom:{
				type:[Number,String],
				default:1
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			translateX(){
				return -(+this.currentIndex)*(+this.dot_distance) - (+this.dot_distance)/2
			}
		},
	}
</script>
 
<style>
	.dot-wrapper-box{
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		
		left: 50%;
		transition: .3s;
	}
	.dot-wrapper{
		flex-shrink: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.dot{
		border-radius: 50%;
		
		transition: .3s;
	}
	.prew_2_dot,.next_2_dot{
		width:3px;
		height: 3px;
		background-color: rgba(255,255,255,.8)
	}
	.prew_1_dot,.next_1_dot{
		width:6px;
		height: 6px;
		background-color: rgba(255,255,255,.8)
	}
	.current-dot{
		width:9px;
		height: 9px;
		background-color: #ffffff
	}
</style>

```



## 官网
```js
时间:2021.9-2022.3

介绍：在该官网上展示不同系列的房车、公司简介、职位招聘等信息

人员周期：前端1个，UI2个，首期3个月

技术体系：Nuxt、Axios、Html、Css、JavaScript。

技术要点：移动端适配。
```

## 前台电商网站
```js
时间：2021.02 - 2021。07

技术体系：Vue

三级分类事件委派处理。

swiper轮播图的使用

下单支付流程
去结算 ==> 获取订单交易数据
提交订单 ==>提交下单请求, 得到订单ID
根据订单ID获取支付信息
金额
支付url
支付
根支付Url生成支付二维码图片显示, 使用qrcode
扫码支付
轮询请求获取订单状态
分页显示订单列表

登陆流程(不在本地保存用户数据，始终用token去获取最新的用户数据)
前台: 输入登陆需要的相关信息(用户名/密码), 进行前台表单校验, 如果不通过, 提示错误
前台: 发送登陆的ajax请求(post), 携带登陆接口需要的相关数据(用户名/密码)
后台: 获取到登陆请求携带的参数, 去数据库中查询看是否存在
如果不存在, 返回登陆失败的信息
如果存在, 生成一个新的token字符串, 将token与用户信息一起返回
前台: 接收到响应
如果是不成功的数据, 提示
如果是成功的数据,
将用户信息和token都保存到vuex中
将token保存到localStorage中 ==> 不保存用户信息
跳转到首页或redirect页面

自动登陆流程
简单说: 页面一加载时, 发送请求根据token获取用户信息
利用全局前置守卫:
一旦发再当前没有登陆, 但前面登陆过(有token, 没有用户信息)
发送请求根据token获取用户信息
成功了, 保存用户信息及token
失败了(说明token过期了): 清除token, 强制跳转到登陆页面
```

- 后台管理
```js
项目名称：后台管理系统

项目介绍：该系统为小程序的配套后台管理系统，实现对小程序的数据管理，并提供相应的数据分析与统计报表。

人员周期：前端2个，首期4个月，迭代周期为1-2周。

技术体系：Vue全家桶、Axios、ElementUI、Restful Api、Webpack、Echarts

技术要点：Mixins通常代码的抽离；状态管理数据持久化；用户权限及登录的Token认证；Echarts图表
```


## 后台管理系统

```js
时间: 6个月，2020.2 - 2022.2。

介绍: 为运营人员提供后台管理服务。

人员周期: 前端2个，UI2个，后端1个。

技术体系：Vue3、Quasar、Echarts

技术要点：
    1.自定义日历组件开发。
	2.根据图片颜色动态生成渐变背景色
```

