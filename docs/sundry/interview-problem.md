# 面试问题

我怎么忘记录音了呀？？
```shell
自我介绍？

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

数组扁平化
flat
低版本浏览器不兼容。。。不过到是

vue的理解：
vue是一个构建用户界面的JavaScript框架。它建立在标准的HTML，CSS，JavaScript之上。并且提供一个声明式的、基于组件的编程模式，以帮助开发人员快速有效的开发用户界面，不管它是简单的还是复杂的。

Vue2实例挂载过程中发生了什么？
首先找到Vue构造函数，传入参数为options，options就是用户传入的配置项，比如props，methods，data
然后执行init方法。
在init方法里面，有个initState方法，作用是初始化用户传入的配置项，然后就可以通过this获取访问到它们。
由此可知在beforeCreate钩子里不能获取到props、methods等配置项。在created钩子里可以获取到。

然后我们点到initState方法里面，可以看到Vue初始化用户传入配置项的顺序依次为props、methods、data、computed、watch。
然后有个初始化data的方法，名叫initData，在initData里面，会判断data的值是一个对象还是一个函数返回一个对象。data的属性名是不是和props、methods重复。最后会将data转换为响应式数据。

然后init方法结尾，会执行mount挂载方法。
在mount方法里，会看到vue不允许将模板直接挂载到body或document标签上。在mount方法里，会把template模板解析为ast虚拟语法树，再将其转换为render语法字符串，并生成render方法。

mount方法最后会去执行mountComponent方法，在里面会触发beforeMount钩子；会定义updateComponent渲染页面视图的方法，主要执行render、update方法，render方法返回虚拟dom，update方法主要功能是调用patch方法，将虚拟dom转为真实dom，并更新到页面；会监听组件数据变化，一旦变化触发beforeUpdate钩子；

vue给对象添加新属性界面不刷新？
vue2使用object.defineProperty实现数据响应式，当获取、修改属性时能被拦截到，但是当动态添加、删除某个属性时不会被拦截到。这时候可以使用Vue.set、$forceUpdate、方法来使页面刷新。

vue底层原理

用过Proxy吗

vue2和vue3有什么区别

说一下uniapp的理解
一个基于Vue的多端开发框架，一套代码，可以发布到H5、小程序、App多个平台。优点是开发快速。

我用uniapp的一些坑：
使用全局混入mixins，为每个页面添加onShareAppMessage生命周期函数，使得可以分享。但是不会起作用。因为这是个bug，后来官方修复了。

uniapp的ui框架，colorUI，uView，graceUI

小程序生命周期钩子
应用生命周期：onLaunch，onShow，onHide，onError
页面生命周期：onLoad，onReady，onShow，onHide，onPullDownRefresh
组件生命周期：beforeCreate，created，beforeMounte，mounted。。。

computed和watch有什么区别，watchEffect
computed有缓存。计算属性。
watch是监视响应式数据，发生改变，更新视图。
watchEffect是第一次就会执行回调函数，后面回调里的响应式数据更新，又会重新触发回调函数，更新视图。

怎么缓存一个组件
keepAlive。组件就不会重建和销毁，也不会触发对应的生命周期钩子
```