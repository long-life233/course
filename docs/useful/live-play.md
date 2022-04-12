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

## 七牛直播操作手册

### MCN主播如何开直播间
1.  使用谷歌浏览器，打开地址`https://live.youinsh.com/livestream/qiniulogin`。可能需要注册登陆。

    ![image-20220329162608070](TyporaImg/image-20220329162608070.png)
  
2.  点击新建直播

    ![image-20220329163423397](TyporaImg/image-20220329163423397.png)

    下面对直播设置做出解释：

    -   直播名称：直播的房间名字
    
    -   直播时间：。。。
    
    - 直播类型：有横屏直播和竖屏直播两种方式。感觉竖屏直播更类似淘宝抖音的带货直播。创建后就无法再修改直播类型了，只能另开一个直播间。
    
        横屏
    
        ![image-20220329163950556](TyporaImg/image-20220329163950556.png)
    
        竖屏
    
        ![image-20220329164015444](TyporaImg/image-20220329164015444.png)
    
    -   直播方式
    
        `直播类型`为横屏直播时，`直播方式`不能选择手机直播。`直播类型`为`竖屏直播`时，不能选择单人网页直播、连麦直播。
    
        ```shell
        单人网页直播：一个人使用谷歌浏览器就可以直播。
        
        连麦直播：场景为将多个用户的直播画面放在一个屏幕上。
        
        推流直播：自己使用第三方推流软件直播。
        
        定时推流直播：将录制好的视频，设置到时间后开始直播。
        
        拉流直播：拉取服务器已有的直播内容
        
        手机直播：适用于竖屏带货直播场景。使用指定的APP直播，支持聊天互动、商品管理。扫码下载连接：
        		https://qncdn.youinsh.cn/saas_pro/publicFile/image/appDownloadQRcode.png
        ```
    
    -   封面图
    
        未点进直播间的直播封面图
    
    -   微信分享缩略图
    
        分享至微信时带的图片
    
    -   是否公开
    
        在您的企业门户页面，显示本场直播。（企业门户是什么？？）
    
    -   指定讲师
    
        本场直播也会出现在指定的讲师（主播）的后台首页，讲师也能进行直播。
    
3.  直播测试

    直播类型选择竖屏直播；直播方式选择手机直播（需要下载app，https://qncdn.youinsh.cn/saas_pro/publicFile/image/appDownloadQRcode.png）；最后到手机app有因中开启直播

    

### 如何通知消费者打开直播间观看

方式一：直播开播后，在后台会生成一个观看链接。观众点击这个链接就可以打开直播间观看。



方式二：多平台同步直播，将本场直播推流到第三方平台同步播出，如视频号、bilibili等






















