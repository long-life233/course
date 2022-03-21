
# 七牛直播云

## 小程序直播demo
具体文档[https://developer.qiniu.com/pili/4211/small-program-live-access-to-documents]

1. 注册认证账号

2. 下载直播小程序demo[https://github.com/pili-engineering/wxapp-live-demo]

3. 在[七牛开发者平台首页](https://portal.qiniu.com/home)定位到 资源管理 > 直播空间 资源卡片，点击创建直播流
<img src="https://dn-odum9helk.qbox.me/FkjcHcu-caXemFVGVeJYs8MuC2Tz" />

4. (直播域名可以随便填)填写直播空间信息，然后按照步骤创建直播空间。
<img src="https://static01.imgkr.com/temp/5f74f44f78d3482680cdb562a490ea45.png"/>

5. 更改后端参数
<img src="https://sdk-release.qnsdk.com/1545722811576.jpg" />



注意点：

1. server目录下的index.js修改，否则可能连接不成功。然后先`mongod`，开启数据库。再`node index.js`

```js
//                mongodb://mongo:27017
mongoose.connect('mongodb://127.0.0.1:27017/piliwechat').catch((err)=>{console.log("xxxxxx",err,"xxxxx");});
```
## uniapp直播demo
==注意==

1. 测试账号不支持使用直播功能，只有符合条件的appid才可以，具体要求请参考：https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html
2. live-pusher只支持nvue页面

## 搭建一个简单的直播网站
https://developer.aliyun.com/article/706488
## 小程序实时音视频云sdk

微信小程序接入实时音视频RTC产品参考这个文档：https://doc.qnsdk.com/rtn/wxapp/docs/overview.html

-  完成了七牛实时音视频云接入流程(https://doc.qnsdk.com/rtn/docs/rtn_startup)
- 请在微信小程序后台 -> 开发 -> 开发设置 -> 服务器域名配置中，将 wss://rtmpgate.cloudvdn.com 加到 socket 合法域名中，将 https://pili-rtc-qos.qiniuapi.com 添加到 request 合法域名中。
- 在小程序的开发后台打开实时播放音视频流、实时录制音视频流的开关（小程序后台 -> 开发 -> 接口设置）(==两个都显示未符合开通条件，需要在小程序后台添加相应服务类目)[例如 https://developers.weixin.qq.com/miniprogram/dev/component/live-player.html]

> 为什么组件不能正常显示？为什么出现黑屏问题？用户已经存在什么意思？