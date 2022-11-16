# 面试问题

## 自动介绍
```shell
我差不多进入前端领域3年，以往的工作让我对自身所拥有的技术有了更深的理解。我觉得技术和业务是相辅相成的，抛开业务空谈技术没有任何意义；而业务又能够驱动技术的进步。

作为一个前端工程师，我对HTML5、CSS3、JavaScript的使用非常熟悉，还原设计稿，完善页面的交互和动画效果是我的基本职责，也是我擅长的。

我熟悉js的执行进程，es6的新语法、api，操作基本数据类型、数组、对象的api，
比如操作数组的常见方法比如forEach、map、reduce、filter、some、every、find、findindex、flat、concat等等
比如操作对象的常见方法比如Object.keys、values、entries、hasOwnProperty
能熟练的使用Promise、async、await将异步代码转化为同步代码。

前端脚手架这块，我接触vue的时间更长，对vue的语法，api，组件化开发思维，脚手架的创建，周边生态vue-router、vuex、pinia、一些第三方库都比较了解。
曾经我也看过vue的源码，对vue的初始化渲染过程，响应式，组件更新，nextTick方法的原理有了更深的理解。


除了开发PC端项目，移动端的H5，微信小程序我也有开发过。我一般使用uniapp来快速开发上线小程序。

除了这些，我一般使用git进行团队协作，对git的工作流比较熟，

```
## 其它
http://caibaojian.com/vue-design/

https://vue3js.cn/interview/

小程序性能优化手段：
https://uniapp.dcloud.io/tutorial/performance.html#%E8%BF%90%E8%A1%8C%E5%8E%9F%E7%90%86
```shell
自我介绍？
我进入前端领域2年多一点，这期间的经历让我对HTMl和css非常熟悉，擅长各种布局。
然后对于原生js，我也能熟练的应用。清楚ES5、ES6特性。
熟练使用一些第三方库，比如animate.css, echarts。
然后我比较擅长公司业务开发，比如各种界面、动效、交互操作。
然后对于MVVM功能性框架Vue、uniApp能够熟练应用，知道大部分UI组件库，比如ElementUI、iView、Quasar等等。
熟悉小程序开发，清楚常用api功能的调用。
然后常用编辑工具vscode，常用的自动化构建工具是webpack、vite。
了解nodejs、mongodb，理解后台开发模式，能够使用restfulApi形式进行接口对接。

html,css
es5,es6,lodash,echarts,animate.css
mvvm,vue,uniapp,elementui,quasar,
nodejs,mongodb,
开源

上家公司业务情况和负责产品。
上家公司主要是做氢能房车销售，然后我负责的产品有官网、小程序、后台管理系统。官网的作用就是展示公司信息、联系方式、地址等，还可以在上面查看房车列表，房车详情。客户在小程序上面可以预约打电话给销售人员来看房车。也可以直接在小程序上查看房车的信息。后台管理系统可以管理房车数量的添加或删除、详情内容的修改。
文zheng公司主要是做广告业务，我负责官网

dom，bom

箭头函数区别

var、let、const

最开始的网页就是可以在网络上浏览的一张张报纸。

怎么理解MVVM呢？

M就是model，模型，处理业务逻辑和与数据库交互的。（可以理解为JS代码）
v就是view，视图，用户看得到的界面。（可以理解为用户看见的界面。）
vm就是view-model，连接视图与模型之间的桥梁。（可以理解为v-model、v-bind等指令）

什么是单页应用？

只有一个页面，通过动态重写当前页面内容来与用户进行交互。
多页应用是有多个页面，每次加载页面都要重新加载html，css，js

                    单页面应用（SPA）	        多页面应用（MPA）
组成	            一个主页面和多个页面片段	 多个主页面
刷新方式	        局部刷新	                整页刷新
url模式	            哈希模式	                历史模式
SEO搜索引擎优化	     难实现，可使用SSR方式改善	容易实现
数据传递	        容易	通过url、cookie、localStorage等传递
页面切换	        速度快，用户体验良好	切换加载资源，速度慢，用户体验差
维护成本	        相对容易	相对复杂

hash路由和history路由区别？
https://blog.csdn.net/weixin_39556702/article/details/110990184

hash路由通过监听hash变化来控制页面，不会发起http请求。因为hash就是一个页面的位置，和游览器有关，与服务器无关。

history路由通过HTML5的histor api来控制页面。地址栏看起来更美观。不过这也导致刷新浏览器页面，可能会出现404，所以需要后端配合重定向到首页。

深克隆、浅克隆。
基本数据类型存放在栈内存中。引用数据类型存放在堆内存中。
你把一个数据赋值给一个变量，修改这个变量，如果原数据也会发生改变，就是浅克隆；如果原数据不发生改变，就是深克隆。

undefined null区别，==是否相等，===是否相等。
undefined表示一个变量自然、最初始的状态值。null则是人为设置的一个空对象；
undefined不会占用任何空间，而null会占用系统内存。

基本数据类型
Number、String、Boolean、Null、Undefined、Symbol。引用数据类型Object、Array、Function

原型链
你可以想象成一条较短的链子，多个较短的链子连接形成一条长的链子。
每个函数都有个prototype属性，指向其原型对象。通过new构造函数实例化出的对象，有一个属性为__proto__，指向其构造函数的原型对象，这样就形成了一个较短的链子。然后原型对象也是对象，它也可以形成一个较短的链子。将这些链子连接起来，就是原型链了。原型链的最上层为Object.prototype,值为null。

路由传参方式？有什么区别？
query传参和params传参。query传刷新不会丢失。params传会丢失。

数组扁平化
flat

去重
`new Set。indexOf(item)`

vue的理解：
vue是一个构建用户界面的JS框架。它建立HTML，CSS，JS之上。并且提供一个声明式的、基于组件的编程模式，以帮助开发人员快速有效的开发用户界面。

Vue2实例挂载过程中发生了什么？
首先找到Vue构造函数，传入参数为options，options就是用户传入的配置项，比如props，methods，data
然后执行init方法。
在init方法里面，有个initState方法，作用是初始化用户传入的配置项，然后就可以通过this获取访问到它们。
由此可知在beforeCreate钩子里不能获取到props、methods等配置项。在created钩子里可以获取到。

# 然后我们点到initState方法里面，可以看到Vue初始化用户传入配置项的顺序依次为props、methods、data、computed、watch。
# 然后有个初始化data的方法，名叫initData，在initData里面，会判断data的值是一个对象还是一个函数返回一个对象。data的属性名是不是和props、methods重复。最后会将data转换为响应式数据。

然后init方法结尾，会执行mount挂载方法。
在mount方法里，会看到vue不允许将模板直接挂载到body或document标签上。
              会把template模板解析为ast虚拟语法树，再将其转换为render语法字符串，并生成render方法。

mount方法最后会去执行mountComponent方法，在里面会触发beforeMount钩子；
在mountComponent里面
会定义updateComponent渲染页面视图的方法，主要执行render、update方法，
render方法返回虚拟dom，update方法主要功能是调用patch方法，将虚拟dom转为真实dom，并更新到页面；
会会new 一个watcher对vm也就是vue实例进行监听，并执行updateComponent方法。
最后调用mounted生命周期钩子，至此vue的组件实例化结束。

vue给对象添加新属性界面不刷新？
vue2使用object.defineProperty实现数据响应式，当获取、修改属性时能被拦截到，但是当动态添加、删除某个属性时不会被拦截到。这时候可以使用Vue.set、$forceUpdate、方法来使页面刷新。

vue底层原理

vue的key的理解

用过Proxy吗

vue2和vue3有什么区别

v-model实现原理

说一下uniapp的理解
一个基于Vue的多端开发框架，一套代码，可以发布到H5、小程序、App多个平台。优点是开发快速。

我用uniapp的一些坑：
使用全局混入mixins，为每个页面添加onShareAppMessage生命周期函数，使得可以分享。但是不会起作用。因为这是个bug，后来官方修复了。

uniapp的ui框架，colorUI，uView，graceUI

小程序生命周期钩子
应用生命周期：onLaunch，onShow，onHide，onError
页面生命周期：onLoad，onReady，onShow，onHide，onPullDownRefresh
组件生命周期：beforeCreate，created，beforeMounte，mounted。。。

v-if和v-show
共同点：控制页面元素是否显示。
不同点：
v-show是为元素添加css--display：none来隐藏元素，dom元素依旧存在。v-if是将整个dom元素添加或删除。
v-if会销毁重建事件监听和子组件，以及生命周期钩子。
v-if有更高的切换性能消耗。v-show有更高的初始渲染性能消耗。

vue性能优化手段：
路由懒加载、使用cdn引入项目组件、gzip压缩（前端使用webpack插件compression-webpack-plugin）

小程序性能优化手段：
https://uniapp.dcloud.io/tutorial/performance.html#%E8%BF%90%E8%A1%8C%E5%8E%9F%E7%90%86

computed和watch有什么区别，watchEffect
computed有缓存。计算属性。
watch是监视响应式数据，发生改变，更新视图。
watchEffect是第一次就会执行回调函数，后面回调里的响应式数据更新，又会重新触发回调函数，更新视图。

怎么缓存一个组件
keepAlive。组件就不会重建和销毁，也不会触发对应的生命周期钩子

你有什么想问我的？
公司使用什么技术栈？我要是去公司能为公司做什么事情呢？公司的发展方向是什么呀？

强缓存和协商缓存

输入url到显示发生了什么
```