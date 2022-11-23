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


