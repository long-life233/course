# 翼支付

## 调试
index.html。调试相关的cdn
```html
    <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
    <script>eruda.init();</script>
```

## 交互3.0 sdk
交互3.0的sdk cdn
```html
<script src="https://h5.test.bestpay.net/common/js/bestpay-html5-3.0.js"></script>
```
然后再main.js里初始化
```js
// cancelWxJsSDKConfig设置为true，不使用微信的sdk，而使用自己的sdk。
BestpayHtml5.config('0', false, '45', '4500', true, { cancelWxJsSDKConfig: true });
```

## 分享
1
```
可视化编辑小程序海报

利用的是Painter库。

https://github.com/lingxiaoyi/painter-custom-poster
```

2
```
埋点工具地址：https://gy4em3.csb.app/

埋点说明文档：https://www.yuque.com/pigskin/lbgmwy/msgaxam10l6g60fx/edit

埋点工具源代码：https://codesandbox.io/s/mai-dian-shu-ju-zhuang-huan-gy4em3?file=/src/event.js
```



## uni-simple-router
安装。
```shell
# 注意下载的是2.0.7版本。
npm install uni-simple-router
# 配置uni-read-pages，自动读取pages.json文件来生成路由表。
npm install uni-read-pages
```
在vue.config.js中配置
```js
const TransformPages = require('uni-read-pages');
const { webpack } = new TransformPages();

// vue.config.js
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                // 定义一个全局变量
                ROUTES: webpack.DefinePlugin.runtimeValue(() => {
                    const tfPages = new TransformPages({
                        
                        // 这样解析后的路由表就可以直接使用。
                        // 。。。
                        includes: ['path', 'name', 'aliasPath', 'meta']
                    });
                    return JSON.stringify(tfPages.routes);
                }, true)
            })
        ]
    }
};

```
新建写入router.js
```js
// router.js
import {RouterMount,createRouter} from 'uni-simple-router';

const router = createRouter({
    platform: process.env.VUE_APP_PLATFORM,  
    routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
    next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

export {
    router,
    RouterMount
}
```
main.js中引入
```js
import {router,RouterMount} from './router.js'  //路径换成自己的
Vue.use(router)

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
    RouterMount(app,router,'#app')
// #endif

// #ifndef H5
    app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
```
然后在`pages.json`中配置路由：
```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "name": "首页",
      "aliasPath": "/",
      "meta": {
        "testData": "hello, world"
      },
      "style": {
        "navigationBarTitleText": "",
        "navigationStyle": "custom",
        // 支付宝、H5、app。总是透明。
        "transparentTitle": "always"
      }
    }
  ],
}
```
跳转动态路由
```js
// 跳转到 "/page2/:id"
this.$Router.push({
    name:'page2',
    params:{
        id:12
    }
})
// 跳转到 /:name/page3/:id
this.$Router.push({
    name:'page3',
    params:{
        name:'hhyang',
        id:12
    }
})
```
在页面下获取参数
```js
        onLoad(...options){
            //  自己打印来看看咯
            console.log(options)
            console.log(this.$Route)
        },
```
编程式导航：https://hhyang.cn/v2/start/cross/codeRoute.html
```js
// 字符串
this.$Router.push('/pages/router/router1')

// 对象
this.$Router.push({path:'/pages/router/router1'})

// 命名的路由
this.$Router.push({ name: 'router1', params: { userId: '123' }})

// 带查询参数，变成 /router1?plan=private
this.$Router.push({ path: 'router1', query: { plan: 'private' }})

// 后退 2 步记录
this.$Router.back(2,{
    success:(...arg)=>{
        console.log(arg)
    }
})
```
组件式导航：https://hhyang.cn/v2/start/cross/link.html

命名路由（name）：https://hhyang.cn/v2/start/cross/nameRoute.html#%E9%85%8D%E7%BD%AE%E5%91%BD%E5%90%8D%E8%B7%AF%E7%94%B1

aliasPath 重写H5端的别名

路由传参（建议通过$Route获取传递的参数）：https://hhyang.cn/v2/start/cross/params.html#%E9%9D%9E%E6%B7%B1%E5%BA%A6%E5%AF%B9%E8%B1%A1%E4%BC%A0%E9%80%92
```js
// 获取方式
this.$Route.query.userId;
```

路由守卫
```js
//全局路由前置守卫'
router.beforeEach((to, from, next) => {
    store.commit('common/set', { name: 'routeEnter', value: { to: to, from: from } });
    next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    store.commit('common/set', { name: 'routeLeave', value: { to: to, from: from } });
});
```

提前想用生命周期（意思是onLoad、onShow里都可以获取到上个页面传递过来的参数。）
```js
export default {
    onLoad(options){
        console.log(options)  // {name: "hhyang", ages: "23", msg: "%E4%BD%A0%E5%A5%BD"}
        console.log(this.$Route.query)  // {name: "hhyang", ages: "23", msg: "你好"}
    },
    onShow(options){
        console.log(options)    // undefined
        console.log(this.$Route.query)  // {name: "hhyang", ages: "23", msg: "你好"}
    }
}
```

## mobx

## 年终终结

年终总结

我于 2022 年 11 月 16 日 正式入职于翼支付，很庆幸能在客户端业务部与大家相遇。

入职第一天，玲梅姐就向我介绍客户端业务部的人员情况，让我认识了今后一起工作奋斗的伙伴。
之后我又作了自我介绍，真的很高兴能与大家在此相遇，还请以后在工作上多多指教。

之后几天，玲梅姐安排施雪茹带着我做 consume-day、invite-h5 这两个项目，主要是做接口迁移升级。之后遇到问题我不懂就问，
遇到不能解决的问题及时反馈。虽然过程不是那么平坦，但好在有了王亚磊、施雪茹的帮助，我知道并完成了将以往老项目的接口 2.0 升级到接口 3.0，token 改为 sessionKey 校验，埋点升级。

通过这两个项目，让我明白了公司一部分的业务和技术栈，项目启动环境的选择，公司网络环境的使用，测试机账号的申请等等。

大概工作了一周，我又跟着刘东做项目了。做了分省频道的 h5 项目和后台项目，加油卡项目。

在写分省频道的 h5 项目和后台项目的过程时候，在刘东的帮助下，我得以快速把项目跑起来，修改并测试，以及理解项目的业务逻辑，与测试不断的沟通，完成产品的需求。
在 2022 年12 月 15 日星期四，在刘东的协助下，我完成了工单的提交，项目在当日 12 点左右顺利完成发版。

在写加油卡项目的时候，由于是新项目，在环境的启动及选择，项目整体架构的搭建，技术选型，路由封装，TS 支持，测试方法，刘东都给我作了解释，我自己也在不断的学习这个项目，理解业务。

在跟着刘东写项目的时候，遇到的很多困难他教会了我如何解决，比如测试方法，VPN 连接，工单提交申请，协调测试产品。在技术方面的规范、书写也是提供了很多建议，纠正一些不太好的书写习惯，让项目变得更易维护。

最后，来到翼支付客户端业务部门快一个月了，这期间除了我自己的努力，也实在离不开同事给予我的支持。我也自觉自己知道的还是太少，会在以后的工作中努力理解更多的业务，不断完善自己的技术，保质按时完成领导派发的任务需求。
