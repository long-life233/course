# Nuxt1

## 什么是服务端渲染
服务器获取数据填充到页面上然后返回给浏览器。

相比客户端渲染，是通过发ajax请求获取数据
## 服务端渲染VS客户端渲染
看场景
## vue服务器端渲染
下载那个vue-server-renderer包
然后要配置很多，然后，就没有然后呢。
## Nuxt安装
npx create-nuxt-app <name>

为什么要选择single-page，而不是universal-ssr？
其它随意

## Nuxt-目录结构
- assets（会经过webpack编译）和static（不会经过webpack编译）。
大概有个印象
## Nuxt-配置
nuxt.config.js

以css举例，安装sass；

出现缩进的坑

## Nuxt-路由
根据目录自动生成路径。

动态路由。

扩展，中间件，主要做权限相关的逻辑
## Nuxt视图
配置header

## Nuxt异步数据
asyncData，类似生命周期。

执行时机是什么时候？加载页面时还是页面未加载之前？
## Nuxt资源文件
assets，会被编译，比如小图片会被转为base64
static
## Nuxt插件
不仅要在plugin下注册，还要在配置文件中配置

## Nuxt模块
应该不是经常用到

## nuxt-vuex状态树
内置vuex

## nuxt命令和部署
静态部署和动态部署。哪个好呢。

# Nuxt2

## 框架安装
npx create-nuxt-app xx。改版了。

## 生命周期


## nuxtServerInit_middleware_validate
新版没搜到nuxtServerInit。

# 领券联盟web版

## 创建项目，导入ElementUI

## 编写头部，底部公共部分
.nuxt/layouts/default.vue

没难点

## 添加axios依赖
查文档

## 对请求进行封装
## 渲染分类菜单
使用asyncData。应该会在很多地方用到。