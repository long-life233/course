# Vue2 MongoDB Project

## 涵盖功能模块
商品列表

购物车

地址

结算

订单

登陆

## vue和react区别（生态）
vue，

react，生态更好，web，移动端都可做（native）

## 在npm上查包的作用
比如requier（’chalk‘）

## 将静态资源拆分组件


## vue环境搭建以及vue-cli使用
查看vue-cli环境

`vue --version`

我的是`vue/cli.4.x`


但是项目用的是`vue-cli`老版本，可以在官网找到入口

```shell
# 使用vue命令行初始化一个项目，模板名，项目名
$ vue init <template-name> <project-name>
```

Current available templates include:

```shell
# 完整功能的webpack
webpack - A full-featured Webpack + vue-loader setup with hot reload, linting, testing & css extraction.

# webpack的简单版(只包含vue-loader，只能处理*.vue文件)
webpack-simple - A simple Webpack + vue-loader setup for quick prototyping.

browserify - A full-featured Browserify + vueify setup with hot-reload, linting & unit testing.

browserify-simple - A simple Browserify + vueify setup for quick prototyping.

pwa - PWA template for vue-cli based on the webpack template

simple - The simplest possible Vue setup in a single HTML file
```

老师使用的是webpack完整版

>   我下了vue-cli的代码，回退版本npm run dev的时候出现问题；我猜是webpack版本问题，反正不知道，跳过
>

## vue脚手架配置解读(上)
so good especially the end
```js
# vue2_mongodb_node_project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
```
## vue脚手架配置解读(下)
视频中的build/dev-server.js在这个项目中没有;
但是`vue init pwa xx`的项目就有;
但我没搞懂

## vue基础语法
基础,,,
`cloak`语法,不会被移除标签,直到被解析
```html
[v-cloak] {
  display: none;
}
<div v-cloak>
  {{ message }}
</div>
```
## 路由基础介绍
以前的应用：没有路由，由服务器拦截返回页面，可以利用浏览器缓存；
单页应用：有路由，实际上只有一张页面；

单页引用优点：
加载快；

缺点：
首屏加载慢；
没有合理利用浏览器缓存

使用`vue-router`构建单页应用

## 动态路由
`/pathname/:id`

## 嵌套路由
一个url访问一个页面；
嵌套路由很像根据不同的url，在页面中切换组件

## 编程式路由

this.$router.push

## 命名路由和命名视图
命名路由：
相当于path的别名
命名视图：
一般一个视图对应多个components时,需要命名来确认渲染位置;

引用场景为
```
header
sideNav
main
```

## axios基础介绍
before和拦截器的关系是啥？

## es6简介
## es6常用语法
let，const，解构啥的
## 扩展运算符
## promise讲解
## AMD，CMD，CommonJS和ES6模块化差异
AMD是RequireJS在推广过程中对模块定义的规范化产出

CMD是淘宝团队推出的SeaJS在推广过程中对模块定义的规范化产出

CommonJS规范，module.exports

ES6，export，import

## 商品列表组件拆分
在main.js里引入css文件
```js
// 也可以在app.vue里面引入吧,有什么区别呢?
import './assets/css/base.css'
import './assets/css/checkout.css'
import './assets/css/login.css'
import './assets/css/product.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
```
然后对header,breadNav,footer进行组件拆分

## vue旧版脚手架模拟数据
最新的vue脚手架没有dev-server.js文件，如何进行后台数据模拟？
```
1.
需要下载`npm i express`依赖
webpack-dev-conf.js中
在const portfinder = require(‘portfinder’)后添加

//第一步======模拟请求数据
const express = require('express')
const app = express()//请求server
var appData = require('../mock/goods')//加载本地数据文件
var apiRoutes = express.Router()


#############################
这一步我没看懂?我注释了也能生效
#############################

// app.use('/api', apiRoutes)//通过路由请求数据

2.
然后找到devServer,添加before

    before(app){
      app.get('/goods',(req,res)=>{
          res.json(appData)
      })
    },


3.最后测试数据,成功

    import axios from "axios"

    mounted() {
      axios.get('/goods').then(value => {
        console.log("hello",value)
      })
    }
```


## 商品列表数据渲染实现
axios请求渲染即可

## 小屏幕动态显示价格筛选
当是小屏幕时，点击价格按钮会弹出价格筛选的侧边栏，并显示遮罩；

但是当大屏幕时，点击价格按钮不会弹出侧边栏，但是会显示遮罩；

解决办法：不要遮罩了

还有，媒体查询我不是很懂

## 实现图片懒加载

`npm i vue-lazyload -S`插件；

一开始我还看不懂；

想找个demo的源代码看看；

结果没有；

然后又看文档，发现好简单；

## Linux环境下配置node环境(拦路虎)


## 创建httpServer容器
nodeJS官网的入门教程,复制粘贴,加改造
```js
const http = require('http')
const url = require('url')
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
  // 虽然我知道是设置响应的状态码,我设置为其他的可以吗?可以,只不过大家默认了?
  res.statusCode = 200
  // charset=utf-8我是随便写的,居然生效了
  res.setHeader('Content-Type', 'text/plain;charset=utf-8')
  // URL是新版,操作url,全局对象
  const myURL = new URL('https://example.org/aasf');
  // util.inspect() 方法返回用于调试的 object 的字符串表示。
  console.log(myURL.pathname) // aasf
  res.end("嘻嘻嘻")
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
```

## 通过node加载静态页面
引入fs模块
```js
  fs.readFile('./index.html',(err,data)=>{
    if(!err){
      res.end(data.toString())
    }
  })
```

## node发送get请求
```js
const http = require('http')

http.get('http://localhost:8000/', (res) => {
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
  });
})

// 创建本地服务器来从其接收数据
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

server.listen(8000);
```

## 搭建基于Express生成器的运行环境
下载express generator生成器,生成默认项目
```shell script
npx express-generator server
```
views下的jade文件改为.html文件;

1.先删除所有.jade文件

2.npm i ejs

3.在app.js中

`var ejs = require('ejs')`
```shell script
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express)
app.set('view engine', 'html');
```
ok,可以访问了(别忘了npm i下载依赖)

## window平台下MongoDB的安装和环境搭建
使用之前版本的吧

## mongoDB创建用户
张培越课件;

复习之前学习的;
如果只是连接本机，那么不需要设置账号密码；
如果要部署到服务器上，那么肯定要设置账号密码；
操作：
```
1.创建管理员
这样才能给别的数据库设置账号密码，授予权限

2.授权认证

3.给使用的数据库添加用户
```
## mongoDB基本语法
复习之前学习的；
增删改查；
在accumulation里

## 表数据设计和插入
将数据库文件放在了public下

数据库设计如下

数据库名：lukecheng

集合：goods，users

然后导入将数据库文件导入
## express的一级二级路由
假设我们访问/users/test,返回的就是“users/test”
一级路由
```js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use('/', indexRouter);
app.use('/users', usersRouter);
```
二级路由
```js
var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/test', function(req, res, next) {
  res.send('users/test');
});
module.exports = router;
```

## node的启动和调适方式
webstorm里面的run菜单选项就是配置启动方式的。

webstorm旁边的虫按钮

nodejs只能在编辑器里进行调适，在浏览器里是不能调适的；
```js

```
## pm2是什么牛马玩意

什么进程管理？
什么负载均衡？
好像有点类似nodemon,启动了服务器后还能在命令行里输入
## 基于mongoose实现商品列表查询接口
1. 下载mongoose`npm i mongoose -S`

2. 创建数据模型

models/goods.js
```js
var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productschema = new Schema({
  "productId":String,
  "productName":String,
  "salePrice":Number,
  "productImage":String
})

// module.exports = mongoose.model('Good',productschema)
// 第三个参数指定跟哪一个集合进行关联
module.exports = mongoose.model('Good',productschema,'goods')
```
3 .新建goods路由

app.js
```js
var goodsRouter = require('./routes/goods')
app.use('/goods', goodsRouter);
```
routes/goods.js

mongoose负责连接哪个数据库，schema负责增删改查数据，两者互补干扰
```js
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Goods = require('../models/goods')

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/lukecheng')
// 监听连接状况
mongoose.connection.on("connected",()=>{
  console.log("连接成功")
})
mongoose.connection.on("error",()=>{
  console.log("连接失败")
})
mongoose.connection.on("disconnected",()=>{
  console.log("连接断开")
})

router.get('/',(req,res,next)=>{
  // 数据模型直接查询数据
  Goods.find({},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
})
module.exports = router
```
## 前端配置跨域并请求渲染
config/index.js
```js
    proxyTable: {
      '/goods':{
        target:'http://localhost:3000'
      }
    }
```
goodsList.vue
```html
    mounted() {
      axios.get('/goods').then(({data}) => {
        let {status,result} = data
        this.list = result.list
      })
    }
```

## 商品列表分页功能和排序实现（上）
1 .获取分页参数条件

```js
  let page = parseInt(req.param("page"))
  let pageSize = parseInt(req.param("pageSize"))
  let sort = parseInt(req.param("sort"))
  let skip = (page-1)*pageSize
  let params =  {} // 查询限制条件
```
find（）api返回的也是数据模型
```js
let goodsModel = Goods.find(params)
```
将数据模型的数据以json形式取出
```js
 Goods.find({}).exec((err,doc)=>{
     if(err){
        res.json({

       })
     }else{
       res.json({

       })
     }
   })
```
若只是根据params条件取出数据，则可以简写
```js
Goods.find({},(err,doc)=>{
    if(err){
      res.json({
      })
    }else{
      res.json({
      })
    }
  })
```
若还要根据某些条件来筛选、排列数据，则不能简写
```js
let goodsModel = Goods.find(params).skip(skip).limit(pageSize).sort({'salePrice':sort}).exec((err,doc)=>{
    if(err){
      console.log("错误")
    }else{
      res.json({
        status:'0',
        msg:'',
        result:{
          count:doc.length,
          list:doc
        }
      })
    }
  })
```

## 商品列表分页功能和排序实现（下）
GoodsList.vue
定义data
```js
sortFlag:true,
page:1,
pageSize:8
```
获取商品方法和改变排序标识方法
```js
getGoodsList(){
    let param = {
      page:this.page,
      pageSize:this.pageSize,
      sort:this.sortFlag?1:-1
    }
    axios.get('/goods',{
      params:param
    }).then(({data}) => {
      let {status,result} = data
      this.list = result.list
    })
  },
  sortGoods(){
    this.sortFlag = !this.sortFlag
  }
}
```
使用vue-infinite-scroll插件

1. 官网下载,然后,当这个元素的底部距离视口多少px时,执行load方法
```
 <div style="text-align: center" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      {{loadText}}
    </div>

  loadMore(){
    this.page++
    this.isAppend = true
    this.busy = true
    setTimeout(()=>{
      this.getGoodsList()
    },500)
  }

  getGoodsList(){
    let param = {
      page:this.page,
      pageSize:this.pageSize,
      sort:this.sortFlag?1:-1
    }
    axios.get('/goods',{
      params:param
    }).then(({data}) => {
      let {status,result} = data
      if(this.isAppend){
        this.list = [...this.list,...result.list]
        this.busy = false
        if(result.list.length === 0){
          this.busy = true
          this.loadText = "没有更多"
        }
      }else{
        this.list = result.list
      }

    })
  },
```
## 价格过滤功能实现
data
```js
priceFilter:["All","0 - 100","100 - 500","500 - 1000","1000 - 2000"],
```
模板
```html
  <dd v-for="(item,index) in priceFilter">
    <a  @click="setPriceFilter(index)" href="javascript:void(0)">{{item}}</a>
  </dd>
```
方法
```js
  setPriceFilter(index){
    this.priceChecked = index
    this.page = 1;
    this.isAppend = false
    this.getGoodsList()
  }
```
服务器
```js
  let params =  {}
  let priceLevel = req.param("priceLevel")
  let priceGt = '',priceLt = ''
  if(priceLevel !== '0'){
    switch (priceLevel) {
      case '1':priceGt=0;priceLt=100;break;
      case '2':priceGt=100;priceLt=500;break;
      case '3':priceGt=500;priceLt=1000;break;
      case '4':priceGt=1000;priceLt=2000;break;
    }
    params={
      salePrice:{
        $gt:priceGt,
        $lte:priceLt
      }
    }
  }

  let goodsModel = Goods.find(params).exec((err,doc)=>{

  })
```
## loading动画svg
这些动画素材可以在github上搜索，别人付出了心血，就尊重下别人付出的心血

## 加入购物车功能实现
1 .新建用户的mongoose数据模型

models/user.js
```js
let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":Array,
  "cartList":[
    {
      "productId":String,
      "productName":String,
      "salePrice":String,
      "productImage":String,
      "checked":String,
      "productNum":String
    }
  ],
  "addressList":Array
})

module.exports = mongoose.model("User",userSchema,"users")
```
2. 书写添加到购物车路由
```js
// 添加商品到购物车
router.post("/addCart",(req,res,next)=>{
  ...
}
```
3 .添加到购物车路由内容实现
```js
// 获取前端传来的商品id
let productId = req.body.productId;
// 假设一个用户id
let userId = "100000077";
// 引入User数据模型
let User = require('../models/user')
// 根据用户id查找用户
User.findOne({userId},(err,userDoc)=>{
    // 根据商品id查找商品
    Goods.findOne({productId},(err1,doc)=>{
          // 假设用户没有添加商品;
          // 然后计算用户已添加的商品,若有则数量加一;若无则添加该商品
          let goodsItem = ''
          userDoc.cartList.forEach(item=>{
            if(item.productId === doc.productId){
              item.productNum ++
              goodsItem = item
            }
          })
          // 其实用户已添加了商品,只需要加数量,然后进行保存
          if(goodsItem){
             userDoc.save((err,doc)=>{
               if(err){
                 res.json({
                   status:"1",
                   msg:"err.message"
                 })
               }else{
                 res.json({
                   status:"0",
                   msg:"",
                   result:"success"
                 })
               }
             })
          }else{
            // 如果用户从未添加过该商品,则把该商品添加到用户的购物车列表
            userDoc.cartList.push({
              "productId":doc.productId,
              "productName":doc.productName,
              "salePrice":doc.salePrice,
              "productImage":doc.productImage,
              "productNum":1,
              "checked":1
            });
            userDoc.save(function (err2,doc2) {
              if(err2){
                res.json({
                  status:"1",
                  msg:err2.message
                })
              }else{
                res.json({
                  status:'0',
                  msg:'',
                  result:'suc'
                })
              }
            })
          }


    })
})
```
小结:获取到的文档对象是什么?

## 存cookie
写cookie呢，一定是往res响应里面写，写进去之后前端才能拿到cookie；

不然前端拿不到；

cookie,session有点像storage呀,也是存键值对...
```js
res.cookie("userId",doc.userId,{
    path:"/", // path指定cookie要放在哪（放在服务器根目录，域名根目录，而不是子域名）
    maxAge:1000*60*60, //指定周期（过期时间）
})
```
## 存session
session要通过req请求存；

因为session是客户端发过来的请求；
```js
req.session.user = doc;
```

为什么session存入失败？

因为express必须通过插件使用session
## 登陆功能实现
服务器接口
```js
// 先引入数据库模型
// 数据库模型
let User = require('../models/user')

// 登陆接口
router.post("/login",(req,res,next)=>{
  // 拿到前端传来的用户名，密码
  var param = {
    userName:req.body.userName,
    userPwd:req.body.userPwd
  }
  // 用户数据模型根据条件进行查找
  User.findOne(param).exec((err,doc)=>{
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
        // 如果找到了，就往服务器里写如cookie（）
        // 并返回result：{userName：doc.userName}
      if(doc){
        // 服务器存cookie
        res.cookie("userId",doc.userId,{
          path:'/',
          maxAge:100*60*60
        })
        // 请求会话
        // req.session.user = doc;
        res.json({
          status: '0',
          msg:'',
          result:{
            userName:doc.userName
          }
        })
      }
    }
  })
})
```
前端部分
```html
通过状态和class来控制登陆框的显示隐藏
<!--     登陆框-->
    <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginModalFlag}">

    <!--    遮罩-->
    <div class="md-overlay" v-if="loginModalFlag"></div>

// 点击登陆按钮，发送请求，并根据返回的status进行下一步操作
      login(){
        if(!this.userName || !this.userPwd){
          this.errorTip = true
          return
        }
        axios.post("/users/login",{
          userName:this.userName,
          userPwd:this.userPwd
        }).then(response=>{
          let res = response.data
          if(res.status === "0"){
            this.errorTip = false;
            this.loginModalFlag = false
            this.nickName = res.result.userName
          }else{
            this.errorTip = true
          }
        })
      }
```

## 退出功能实现
相对简单很多，不用查数据库；

服务端
```js
// 退出登陆接口
router.post('/logout',(req,res,next)=>{
  // 还可以通过res.clearCookie方式清楚cookie
  res.cookie("userId","",{
    path: '/',
    maxAge: -1,
  })
  res.json({
    status:"0",
    msg:'',
    result:""
  })
})
```
前端

如果请求退出登陆接口成功（返回的状态为0），那么就只是把nickName给清除了（很简单）
```html
      loginOut(){
        axios.post("/users/logout").then(response=>{
          let res = response.data;
          if(res.status === "0"){
            this.nickName = ''
          }
        })
      },
```
## 服务端登陆拦截
在app.js中，所有的请求之前进行拦截判断（不需要匹配路径）

有些请求只有用户有身份了才能进行操作

但需要对某些请求放行：登陆请求，登出请求，不需要身份验证的请求（比如列表展示数据）
```js
// 服务端请求拦截判断
app.use((req,res,next)=>{
  // 通过cookies的userId判断是否登陆；
  // 用户登陆了需要保存的信息很多；
  // 可以拿其中一个来判断用户是否登陆
  if(req.cookies.userId){
    next();
  }else{
    // req.path,请求url的路径
    // req.originalUrl,请求的路径+参数
    if(req.originalUrl === '/users/login' || req.originalUrl === '/users/logout' || req.originalUrl.indexOf("/goods/list")>-1){
      next()
    }else{
      res.json({
        status:'10001',
        msg:"当前未登陆",
        result:''
      })
    }
  }
})
```

## 静默登陆

在打开应用的时候，还可以发个请求判断cookie有无过期或者是否存在；

避免用户在短时间内频繁登陆，影响体验；

后端检查登陆方法：
```js
// 检查是否登陆接口
router.get("/checkLogin",(req,res,next)=>{
  if(req.cookies.userId){
    res.json({
      status:'0',
      msg:'',
      result:req.cookies.userName || ''
    })
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    })
  }
})
```
前端发请求判断
```js
    mounted() {
      this.checkLogin()
    }

      checkLogin(){
        axios.get("/users/checkLogin").then(response=>{
          let res = response.data;
          if(res.status === '0'){
            this.nickName = res.result.userName
          }
        })
      },
```
## 全局模态框组件实现
模态框全局封装。。参考colorUI
## 购物车列表功能实现
前端：
```js
1 .首先将header，breadNav，footer部分代码进行组件封装
2 .等后端把接口写完
3 .请求接口，渲染
      init() {
        axios.get("/users/cartList").then(response => {
          let res = response.data;
          this.cartList = res.result
        })
      }
```



后端：
```js
1 .写一个查询用户购物车数据的接口
// 查询当前用户的购物车数据
router.get("/cartList",(req,res,next)=>{
  let userId = req.cookies.userId;
  User.findOne({userId},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      if(doc){
        res.json({
          status:'0',
          msg:'',
          result:doc.cartList
        })
      }
    }
  })
})
```
## 商品删除功能实现
前端:
```js
1. 删除点击事件,window的alert方法

2.  发送删除请求

  deleteGoods({productId}){
    if (window.confirm("你确定要删除这件商品吗?")) {
      axios.post('/users/cart/del',{
        productId
      }).then(response=>{
        let res = response.data;
        if(res.status === '0'){
          alert("删除成功")
          this.init()
        }
      })
    }
  }
```

后端

删除接口,操作数据库
```js
// 购物车删除
router.post("/cart/del",(req,res,next)=>{
  let userId = req.cookies.userId
  let productId = req.body.productId
  User.update({userId},{
    $pull:{
      cartList:{productId}
    }
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'success'
      })
    }
  })
})
```
## 商品删除功能实现的第二种方式
主要是后端，

查找出要修改的那个用户的文档对象userDoc

然后把它当成一个数组进行增删改查

再然后使用save的api保存一下即可
```js
router.post("/cart/del",(req,res,next)=>{
  let userId = req.cookies.userId
  let productId = req.body.productId
  User.findOne({userId},(err,userDoc)=>{
    let productIndex = userDoc.cartList.findIndex(item=>item.productId === productId)
    userDoc.cartList.splice(productIndex,1)
    userDoc.save((err2,userDoc2)=>{
      res.json({
        status:'0',
        msg:'',
        result:'success'
      })
    })
  })
}
```
## 商品修改功能实现
前端：修改数量，是否选中
```js
      editCart(type,item){
        if(type === 'plus'){
          item.productNum ++
        }else if(type === 'minu'){
          if( item.productNum <=1) return
          item.productNum --
        }else{
          item.checked = item.checked==="true"?item.checked="false":item.checked="true"
        }
        axios.post("/users/cartEdit",{
          productId:item.productId,
          productNum:item.productNum,
          checked:item.checked
        }).then(({data})=>{
          if(data.status === '0'){
            this.init()
          }
        })
      },
```
后端：操作数据库，修改数量、是否选中
```js
// 购物车数量，是否选中编辑
router.post("/cartEdit",(req,res,next)=>{
  let userId = req.cookies.userId,
      productId = req.body.productId,
      checked = req.body.checked,
      productNum = req.body.productNum;
  User.update({userId,"cartList.productId":productId},{
    "cartList.$.productNum":productNum,
    "cartList.$.checked":checked
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'success'
      })
    }
  })
})
```

## 购物车全选和商品实时计算功能实现
前端，

全选按钮触发事件
```js
      toggleCheckAll(){
        this.checkAllFlag = !this.checkAllFlag
        // 数据库同步改变
        axios.post('/users/editCheckAll',{
          checkAll:this.checkAllFlag
        }).then(({data})=>{
          if(data.status === '0'){
            console.log("ok")
          }
        })
      },
```
计算属性checkAllFlag
```js
      checkAllFlag:{
        get(){
          return this.checkedCount === this.cartList.length
        },
        set(newVal,oldVal){
          this.cartList.forEach(item=>item.checked = newVal)
        }
      },
```

后端：操作数据库，编辑全选，全不选

```js
// 编辑全选，全不选
router.post("/editCheckAll",(req,res,next)=>{
  let userId = req.cookies.userId,
      checkAll = req.body.checkAll;
  User.findOne({userId},(err,user)=>{
      if(err) {
        res.json({
          status:'1',
          msg:err.message,
          result:''
        })
      }else {
        if(user){
          user.cartList.forEach(item=>{
            item.checked = checkAll
          })
          user.save((err,doc)=>{
            if(err){
              res.json({
                status:'1',
                msg:err.message,
                result:''
              })
            }else{
              res.json({
                status:'0',
                msg:'',
                result:'success'
              })
            }
          })
        }
      }

  })
})
```

获得启发：在vuex的仓库示例里面，有个shop-cart，

对价格的小数点，货币符号，逗号分隔进行了操作，非常nice
```js
// 这是vuex仓库中示例的对价格进行取小数点后几位以及给价格加上货币的前缀符号

// 可以使用过滤器，计算属性
const digitsRE = /(\d{3})(?=\d)/g

export function currency (value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}

```

## 地址列表渲染实现（上）
购物车页面点击结算按钮，去往选择地址页面
```js
      checkOut(){
        if(this.checkedCount === 0)return;
        this.$router.push("/address")
      }
```
注册路由
```js
    {
      path:'/address',
      name:'Address',
      component:address
    }
```
页面抽离成组件
```html
components: {Header, BreadNav, Footer},
```
## 地址列表渲染功能实现（下）
前端部分，发请求
```js
      init() {
        axios.get("/users/addressList").then(({data}) => {
          this.addressList = data.result
        })
      }
```
后端部分写接口，从数据库中读取数据
```js
//查寻用户地址接口
router.get("/addressList",(req,res,next)=>{
  let userId = req.cookies.userId;
  User.findOne({userId},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:doc.addressList
      })
    }
  })
})
```
## 地址列表切换和展开功能实现
前端：
使用状态limit，

计算属性addressListFilter来控制列表是否展开

```html
v-for="(item,index) in addressListFilter"
```
```js
// 状态limit

      addressListFilter(){
          return this.addressList.slice(0,this.limit)
      }

// 点击事件，切换limit
      expand(){
        if(this.limit === 3){
          this.limit = this.addressList.length
        }else{
          this.limit = 3
        }
      }
```
还有个利用索引标记当前选中的状态

## 地址设置默认功能实现
前端：

如果isDefault为true，就显示默认地址
```html
  <div class="addr-opration addr-set-default" v-show="!item.isDefault">
    <a href="javascript:;" class="addr-set-default-btn" ><i>Set default</i></a>
  </div>
  <div class="addr-opration addr-default" v-show="item.isDefault">Default address</div>
```
设置默认地址方法
```js
      setDefault(index,addressId){
        this.checkIndex=index
        axios.post("/users/setDefault",{addressId}).then(({data})=>{
          if(data.status === '0'){
            this.init()
          }
        })
      }
```

后端：

从数据库找到对应用户，找到要设为默认的地址，遍历判断设置，然后save保存数据库
```js
// 设置默认地址接口
router.post("/setDefault",(req,res,next)=>{
  let userId = req.cookies.userId,
      addressId = req.body.addressId;
  if(!addressId){
    res.json({
      status:'1003',
      msg:'addressId is null',
      result:''
    })
  }
  User.findOne({userId},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      let addressList = doc.addressList
      addressList.forEach(item=>{
        if(item.addressId === addressId){
          item.isDefault = true;
        }else{
          item.isDefault = false
        }
      })
      doc.save((err1,doc1)=>{
        if(err1){
          res.json({
            status:'1',
            msg:err.message,
            result:''
          })
        }else{
          res.json({
            status:'0',
            msg:'',
            result:'success'
          })
        }
      })
    }
  })
})
```
## 地址删除功能实现
前端：
绑定删除方法，发请求去数据库删

如过数据库成功删除了，就alert一下删除成功
```js
      delAddress(addressId){
        if(confirm("你确定要删除吗？")){
          axios.post("/users/delAddress",{addressId}).then(({data})=>{
            if(data.status === '0'){
              alert("删除成功")
            }else {
              alert("删除失败")
            }
          })
        }
      }
```

后端：
```js
// 把数据库中的数据给删除了
// 删除地址接口
router.post("/delAddress",(req,res,next)=>{
  let userId = req.cookies.userId,
      addressId = req.body.addressId;
  User.update({userId},{
    $pull:{
      'addressList':{
        'addressId':addressId
      }
    }
  },(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      res.json({
        status:'0',
        msg:'',
        result:'success'
      })
    }
  })
})
```

## next按钮跳转到下一步页面
```html
<router-link class="btn btn--m btn--red" :to="{path:'orderConfirm',query:{'addressId':selectedAddressId}}">Next</router-link>
```
selectedAddressId我是根据计算属性计算的
```js
  selectedAddressId(){
    let selectId = ''
    this.addressList.forEach(item=>{
      if(item.isDefault){
        selectId = item.addressId
      }
    })
    return selectId
  }
```
## 订单确认列表渲染功能实现
orderConfirm订单确认实现

前端:
```js
1 .拆分封装组件
2 .查询购物车列表的选中商品,进行渲染

        axios.get("/users/cartList").then(response => {
          let res = response.data;
          this.cartList = res.result

          this.cartList.forEach(item=>{
            if(item.checked){
              this.subtotal += item.salePrice*item.productNum
            }
          })

          this.orderTotal = this.subtotal + this.shipping - this.discount + this.tax
        })
```

## 创建订单功能实现
前端: 从路由的query参数获取addressID,

然后发请求
```js
      payMent(){
        let addressId = this.$route.query.addressId
        axios.post("/users/payMent",{
          addressId,
          orderTotal:this.orderTotal
        }).then(({data})=>{
          if(data.status === '0'){
            this.$router.push({
              path:'/orderSuccess?orderId='+data.orderId
            })
          }
        })
      },
```
后端: 模拟支付接口

还学到了一个时间工具方法, 非常的nice
```js
/**
 * Created by jacksoft on 17/4/26.
 */
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

module.exports = {};

```
不是特别难
```js
// 支付接口
router.post("/payMent",(req,res,next)=>{
  let userId = req.cookies.userId,
      addressId = req.body.addressId,
      orderTotal = req.body.orderTotal;
  User.findOne({userId},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      let address = '',
          goodsList = []
      // 获取当前用户的地址信息
      doc.addressList.forEach(item=>{
        if(addressId === item.addressId){
          address = item
        }
      })
      // 获取当前用户购物车的购买商品
      doc.cartList.filter(item=>{
        if(item.checked ){
          goodsList.push(item)
        }
      })
      let platform = '622'
      let r1 = Math.floor(Math.random()*10);
      let r2 = Math.floor(Math.random()*10);
      let sysDate = new Date().Format("yyyyMMddhhmmss")
      const orderId = platform+r1+sysDate+r2

      let createDate = new Date().Format("yyyy-MM-dd hh:mm:ss")

      let order = {
        orderId,
        orderTotal,
        addressInfo:address,
        goodsList,
        orderStatus:'1',
        createDate
      }

      doc.orderList.push(order);
      doc.save((err1,doc1)=>{
        if(err1){
          res.json({
            status:'1',
            msg:err.message,
            result:''
          })
        }else{
          res.json({
            status:'0',
            msg:'',
            result:{
              orderId:order.orderId,
              orderTotal:order.orderTotal
            }
          })
        }
      })
    }
  })
})
```
## 订单成功页面功能实现
前端:
```html
      mounted() {
        // 接收来自query参数的orderId
        let queryOrderId = this.$route.query.orderId
        // 根据queryOrderId请求订单详情(是否orderID存在?是否有效?)
        axios.get("/users/orderDetail",{
          params:{
            orderId:queryOrderId
          }
        }).then(({data})=>{
        // 确实存在,将服务器返回的数据渲染到前端页面上
          if(data.status === '0'){
            this.orderId = data.result.orderId
            this.orderTotal = data.result.orderTotal
          }
        })
      }
```
后端:

查询订单详情接口(有很多if判断)
```js
// 根据订单id查询订信息
router.get("/orderDetail",(req,res,next)=>{
  let userId = req.cookies.userId,
      orderId = req.param("orderId");
  User.findOne({userId},(err,userInfo)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      let orderList = userInfo.orderList;
      if(orderList.length>0){
        let orderTotal = 0;
        orderList.forEach(item=>{
          if(item.orderId === orderId){
            orderTotal = item.orderTotal
          }
        })
        if(orderTotal>0){
          res.json({
            status:'0',
            msg:'',
            result:{
              orderId,
              orderTotal
            }
          })
        }else{
          res.json({
            status:'120002',
            msg:'无此订单',
            result:''
          })
        }
      }else{
        res.json({
          status:'120001',
          msg:'当前用户未创建订单',
          result:''
        })
      }
    }
  })
})
```
## vuex的基本介绍
略
## vuex的语法讲解
略
## 通过vuex实现登录和购物车数量(上)
vuex是vue的状态集中管理工具
前端:

第一次加载header组件时检查一次是否登录
```js
    mounted() {
      this.checkLogin()
    },
    methods:{
      checkLogin(){
        axios.get("/users/checkLogin").then(response=>{
          let res = response.data;
          if(res.status === '0'){
            // 将nickName放在vuex中,而不是header组件内,所以不用赋值了
            // this.nickName = res.result.userName
            this.$store.commit("updateUserInfo",res.result.nickName)
            this.getCartCount()
          }
        })
      }
    }
```
登录登出的时候都要进行状态管理
```js
      loginOut(){
        axios.post("/users/logout").then(response=>{
          let res = response.data;
          if(res.status === "0"){
            // this.nickName = ''
            this.$store.commit("updateUserInfo","")
            this.$store.commit("updateCartCount",0)
          }
        })
      },
      login(){
        if(!this.userName || !this.userPwd){
          this.errorTip = true
          return
        }
        axios.post("/users/login",{
          userName:this.userName,
          userPwd:this.userPwd
        }).then(response=>{
          let res = response.data
          if(res.status === "0"){
            this.errorTip = false;
            this.loginModalFlag = false
            this.getCartCount()
            this.$store.commit("updateUserInfo",res.result.nickName)
          }else{
            this.errorTip = true
          }
        })
      },
```
获取购物车数量的请求方法
```js
      getCartCount(){
        axios.get("/users/getCartCount").then(({data})=>{
          this.$store.commit("updateCartCount",data.result)
        })
      }
```
对了,仓库在这里
```js
const store = new Vuex.Store({
  state:{
    nickName:'',
    cartCount:0
  },
  mutations:{
    updateUserInfo(state,nickName){
      state.nickName = nickName
    },
    updateCartCount(state,cartCount){
      state.cartCount = cartCount
    }
  }
})
```

后端:
```js
// 查询当前用户的购物车数量
router.get("/getCartCount",(req,res,next)=>{
  if(req.cookies && req.cookies.userId){
    let userId = req.cookies.userId;
    User.findOne({userId},(err,doc)=>{
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        })
      }else{
        let cartList = doc.cartList;
        let cartCount = 0;
        cartList.forEach(item=>{
          cartCount +=parseInt(item.productNum)
        })
        res.json({
          status:'0',
          msg:'',
          result:cartCount
        })
      }
    })
  }
})
```
## 通过vuex实现登录和购物车数量(下)
更改cartCount购物车数量的时候, 有更改缓存和发请求更改之分;

仓库
```js
  mutations:{
    updateUserInfo(state,nickName){
      state.nickName = nickName
    },
    //===============
    updateCartCount(state,cartCount){
      state.cartCount += cartCount
    },
    //===============
    initCartCount(state,cartCount = 0){
      state.cartCount = cartCount
    }
  }
})
```
## webpack基础介绍与推荐视频
与gulp,grunt的区别;(配置,编程)
推荐去看慕课网上的webpack深入与实战,看完再来看这个,ok,没问题;

基本看完了尚硅谷的webpack教程

## 跨域问题
当代码打包后，跨域的问题；

其实只要后端设置了跨域允许就可以了。。不用考虑那么多==

express的设置
```js
var app = express();
//开户跨域访问
app.all("*",function (req,res,next) {
  console.log("123上辈子是不敢")
  res.set("Access-Control-Allow-Origin","*");
  next();
})
```
前端的设置
```js
    document.getElementById("btn")
      .addEventListener("click", () => {
        console.log(123)
        axios.get('http://127.0.0.1:3000/goods', {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
          //带cookie请求,要设置为false，或者不设置，跨域才能开启成功！！
          // withCredentials: false,
        }).then((value) => {
          console.log(value, "123")
        })
      })
```

## 快做完项目的体会（输出）
1.把一个项目做好才能更大提升

2.自己录课输出一下，一开始的目标就要明确，

    大致什么方向，不然后面怎么改、要怎么改都不知道

3.输出！意味着更认真，才更有收获！

## vue-cli4升级版本
```js
vue-cli4升级,webpack配置不再向外暴露,
而是通过vue.config.js配置

```

## vue-cli4的vue ui 使用
只有使用vuecli4创建的项目才能使用ui仪表盘分析

## 代码兼容性调整
老师做的步骤:
```js
1. 下载最新脚手架

2. 下载最新依赖

3. 将原项目的代码复制到脚手架中

4. 运行,根据报错信息搜索修改
```

## v-slot使用
新版的v-slot使用
```js
接收不变

定义的时候要定义在template上, v-slot:[插槽名]
```


## vue.config.js配置使用

vue/cli官网的配置下面

## 优化axios使用
```js
Vue.prototype.axios = axios;
this.axios.get()
```
## 错误拦截
通过axios的请求,响应拦截器;

断网的时候会请求错误...
## 路由模块优化
给每个路由对象添加一个mata对象属性,添加字段`is_login`,

然后使用路由的钩子拦截, 请求每个路由的时候判断是否需要登录和cookie是否有效
```js
// router的钩子拦截
router.beforeEach((to,from,next)=>{
    if(to.meta.login_require){
        next('/goods');
    }esle{
        // 修改浏览器标签标题
        document.title. = to.meta.title;
        next()
    }
})
```

## vuex优化
放在单独文件里

## koa框架搭建

老师是从零开始搭建的

因为不想express有generator

server.js
```js
const Koa = require('Koa');

const app = new Koa();

app.listen(3000)

// node执行server.js, 页面输出hello,koa2
app.use(ctx=>{
    ctx.body = 'hello, Koa2'
}) // 使用中间件

app.on('error',(err,ctx)=>{
    console.error('server err',err)
})
```

## Koa中间件介绍
...

## 我自己找个koa视频学习下koa
然后改造下项目吧...

## 结束!
这门课应该是结束了,最终学完了!!!费时大概20几天,收获还不是特别的大!!

等有时间了再拿这个项目练手呀!!!















