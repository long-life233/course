# 项目记录

## 介绍
2022.2.11开始，大概最多做半个到一个月吧！！


- 服务对象
    - 公司
- 功能点
    - 微信小程序可查看
    - 打包为app
- 技术栈
    - uniapp
    

## question

## sundry

```shell
可发布到iOS、Android、Web（响应式）、以及各种小程序、快应用等多个平台

HTML 5Plus是什么？
HTML调用APP api的能力
https://www.cnblogs.com/gzhjj/p/11903773.html


安卓模拟器，有手机的模样

打包为原生app

hash路由和history路由区别

为什么history route用户在浏览器中直接访问 https://example.com/user/id，就会得到一个 404 错误？因为单页应用，只有一个页面，你想跳到哪个页面呢？

使用使用Vue3/Vite版创建uniapp项目

三方培训机构视频

uniapp社区https://ask.dcloud.net.cn/explore/

uniCloud的学习资料
详见：https://uniapp.dcloud.io/uniCloud/learning

uni-app 使用vue的语法+小程序的标签和API。

为兼容多端运行，建议使用flex布局进行开发

css、less/scss 等资源不要放在 static 目录下，建议这些公用的资源放在自建的 common 目录下。

static 目录下的 js 文件不会被编译

<!-- 绝对路径，/static指根目录下的static目录，在cli项目中/static指src目录下的static目录 -->
<image class="logo" src="/static/logo.png"></image>
<image class="logo" src="@/static/logo.png"></image>

自HBuilderX 2.6.6起template内支持@开头路径引入静态资源，旧版本不支持此方式


js文件引入
// 绝对路径，@指向项目根目录，在cli项目中@指向src目录
import add from '@/common/add.js'


js文件不支持使用/开头的方式引入


css引入静态资源
css文件或style标签内引入css文件时（scss、less文件同理），可以使用相对路径或绝对路径（HBuilderX 2.6.6）

/* 绝对路径 */
@import url('/common/uni.css');
@import url('@/common/uni.css');

uLink组件是navigator组件的增强版，样式上自带下划线，功能上支持打开在线网页、其他App的schema、mailto发邮件、tel打电话。

如何引入字体图标？看文档

pprocess.env.NODE_ENV



uni-app 有两种页面路由跳转方式：使用navigator组件跳转、调用API跳转。

uni-app 可通过 pprocess.env.NODE_ENV 判断当前环境是开发环境还是生产环境。一般用于连接测试服务器或生产服务器的动态切换。

开发环境和生产环境判断
uni-app 可通过 pprocess.env.NODE_ENV 判断当前环境是开发环境还是生产环境。一般用于连接测试服务器或生产服务器的动态切换。

判断平台
平台判断有2种场景，一种是在编译期判断，一种是在运行期判断。

nvue样式
https://uniapp.dcloud.io/nvue-css

nvue的uni-app编译模式下，App.vue 中的样式，会编译到每个 nvue文件

nvue中，uni-app 模式可以使用 px 、rpx，表现与 vue 中基本一致，另外启用 dynamicRpx 后可以适配屏幕大小动态变化。

默认设计稿750px
如果设计稿不是750px，HBuilderX提供了自动换算的工具，详见：https://ask.dcloud.net.cn/article/35445。

page 相当于 body 节点   

uni-app 提供内置 CSS 变量
系统状态栏高度  

小程序不支持在css中使用本地文件，包括本地的背景图和字体文件。需以base64方式方可使用。

本地背景图片的引用路径推荐使用以 ~@ 开头的绝对路径。
 .test2 {
     background-image: url('~@/static/logo.png');
 }
 为方便开发者，在背景图片小于 40kb 时，uni-app 编译到不支持本地背景图的平台时，会自动将其转化为 base64 格式；

 字体文件的引用路径推荐使用以 ~@ 开头的绝对路径。
 @font-face {
     font-family: test1-icon;
     src: url('~@/static/iconfont.ttf');
 }

 nvue中不可直接使用css的方式引入字体文件，需要使用以下方式在js内引入。nvue内不支持本地路径引入字体，请使用网络链接或者base64形式。src字段的url的括号内一定要使用单引号。

var domModule = weex.requireModule('dom');
domModule.addRule('fontFace', {
  'fontFamily': "fontFamilyName",
  'src': "url('https://...')"
})

<style>
    @font-face {
        font-family: 'iconfont';
        src: url('https://at.alicdn.com/t/font_865816_17gjspmmrkti.ttf') format('truetype'); // format('truetype')是啥意思？？为了浏览器识别？识别什么？
    }
    .test {
        font-family: iconfont;
        margin-left: 20rpx;
    }
</style  >

<block/> 在不同的平台表现存在一定差异，推荐统一使用 <template/>。

直接从 npm 下载库很容易只兼容H5端。

关于ui库的获取，详见多端UI库https://ask.dcloud.net.cn/article/35489

小程序自定义组件支持

vant weapp 轻量、可靠的小程序 UI 组件库

vue-cli 建立的工程 wxcomponents 文件夹在 src 目录下

当需要在 vue 组件中使用小程序组件时，注意在 pages.json 的 globalStyle 中配置 usingComponents，而不是页面级配置。

WXS
WXS是一套运行在视图层的脚本语言，微信端的规范详见。

它的特点是运行在视图层。当需要避免逻辑层和渲染层交互通信折损时，可采用wxs。

以下是一些使用 WXS 的简单示例，要完整了解 WXS 语法，请参考WXS 语法参考。本示例使用wxs响应touchmove事件，减少视图层与逻辑层通信，使滑动更加丝滑。

renderjs

nvue教程

首页使用nvue页面，子页使用vue页面
nvue的组件和API写法与vue页面一致，其内置组件还比vue页面内置组件增加了更多，详见。

static 目录的条件编译

cli创建的项目可以在package.json中添加参数--minimize

分包优化

为提升开发效率，HBuilderX将 uni-app 常用代码封装成了以 u 开头的代码块，如在 template 标签内输入 ulist 回车，会自动生成如下代码：

注意需保障uni-list组件在项目的components目录下。比较简单的方式，是新建项目时，选 uni ui项目模板，在里面即可随便敲所有u开头的代码块。如果不是 uni ui项目模板，那么需要去插件市场手动把uni ui组件下载到工程里。

一切为了好维护，升级，迭代
```



