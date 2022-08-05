# 和睦家医疗项目

## npm i 下载依赖
可能会出现关于node-sass、python27、gyp等错误，这时需要根据node-sass版本切换node版本。

还遇到了在scrpt脚本里写分号`;`的问题。像这种`"postinstall": "patch-package;run-p install:*",`与`"postinstall": "patch-package && run-p install:*",`，前者在windows上npm i会报错。后者就行，`;`和`&&`的作用分别是什么？在mac和windows使用上有区别吗？

## 小程序技巧
```shell
查看当前页面路径：在小程序开发工具的左下角可以查看。
    还可以查看页面参数、场景值。

项目 ->  通用设置 -> 内存限制 填大。

响应式数据可以在AppData里查看，不用再去console重新编译了，耗费时间。

添加编译模式，不用再点好几个页面才到要调试的页面了。
```

## 授权获取位置信息
```js
1、如果用户拒绝授权后，短期内调用不会出现弹窗，而是直接进入 fail 回调。如果是开发环境，请点击开发工具左侧 缓存-清除授权数据；如果是手机，请进入小程序后点击右上菜单-关于xx-右上角菜单-设置中进行权限的手动设置，或删除小程序后重新添加。
```
## `authorize`、`getSetting`、`openSetting`区别和选择使用

我一直对uni.authorize、uni.getSetting、uni.openSetting的使用感到纠结。

以获取位置授权为例，

大多数人判断用户是否授权都是先使用getSetting判断用户已授权的列表，

    如果需要授权的那一项为true可以直接使用uni.getLocation获取用户位置信息；
    
    但如果为false，就使用authorize进行授权，
    
    但因为之前已经拒绝授权，所以会直接走失败回调，
    
    然后我们在失败回调里使用uni.openSetting提示用户打开位置权限。

我就感觉这里有点多余，直接使用uni.authorize或者uni.getSetting判断是否授权，然后是否需要使用uni.openSetting就好了，为什么要判断两次呢？
```js
uni.authorize

如果是第一次，会弹框让用户判断是否授权。
会去判断某个权限是否已经授权。已授权走成功回调，没授权走失败回调。

uni.getSetting

会去获取用户已经授权的权限。成功回调的参数res是授权的列表。

uni.openSetting

是打开设置，开启或关闭某个权限。

微信中在manifest.json中必须配置如下，然后在用户打开小程序时自动弹框提示用户是否授权小程序使用位置信息。
  "mp-weixin": {
    "appid": "wx58a7869155c1d656",
    "permission": {
        "scope.userLocation": {
        "desc": "你的位置信息将用于院区自动选择"
        }
   },

最后我个人认为如果某个功能必须要用户打开某个权限，直接使用uni.authorize即可。

uni.getSetting也行，只不过多一次判断。然后再根据业务需求使用uni.openSetting让用户打开某项设置权限即可。
```


## 在组件上写class属性

## 频繁调用wx.getLocation方法会失败
如题。

微信开发文档如下：

https://developers.weixin.qq.com/community/develop/doc/000aee91a98d206bc6dbe722b51801



## 选择城市组件


首页中的城市选择组件

首页会混入common、city的mixin。

混入里面有：
```js
state: 
    user
    lang 语言
    location
    cityCode
computed：
    lbsId  就是cityCode

openPage方法、
getLabel方法
getDictLabel方法
```

```html
/**
lang: string   zh 或者 en
theme: string   white 或者 black
value:  lbsId   location base servce id（位置id）
openCityPopup   触发混入的事件
*/
<city-picker id="city-picker-1" :lang="lang" theme="white" :value="lbsId" @tap="openCityPopup('city-picker-1')" />
```


## 列表组件。
看似一个简单的列表，里面要涉及的东西可不少。

因为后端返回的数据都是分页数据，所以我们得做下拉刷新、上啦加载跟多，使用scroll-view组件（因为它能触发触顶、触底事件）

组件的最外层是view，宽高是100%。
## 业务逻辑

1、v-patient-filter-menu-v2组件怎么使用？
```shell

```

2、怎么判断是否授权，申请授权是跳到哪个页面？
```shell
返回的code为·1010103·
```
## 问题
1
```shell
跳转到注册页面，发请求判断是否登录，然后判断是否注册。留在注册页还是重定向到登录页。

如果重定向到登录页，会发现是先显示从首页跳转到注册页的首页，然后跳转显示登录页。
原因可能是注册页得视图已经关闭了，二js还没关闭。

搜索去往登录页的方式：'PAGES.REGISTER','/pages/register/main'

去往register页面的方式有navigateTo、reLaunch、[redirectTo]
```
2
```shell
   病人信息页面 patient/info/index
        |
        ↓
   点击授权详情
        |
        ↓
   授权详情页面 patient/info/auth/detail/index
        授权详情页面有个授权时间，可以根据此判断，五分钟内不能再授权申请
        |
        ↓
   重新申请授权
        |
        ↓
   申请授权页面(表单) patient/info/auth/index
```
3
```shell
预约医生的地图图标点击进入地图
```

4
```shell
input输入框的focus属性不能自动聚焦。触发了focus事件的打印，但是没有看见闪烁的光标

input点击不能聚焦。。

解决：开发工具上显示有问题。真机调试则没有问题。
```

5
```shell
radio单选框的值只能是string类型吗？

好像是的

```

6
```shell
watch属性监视计算属性。

当计算属性改变时，

此时watch监视属性的回调也会相应执行，此时要注意，如果需要将异步返回的数据赋值给响应式数据，响应式数据可能不只有前后两个状态，还有中间等待异步数据返回的状态。

frontKey: {
  async handler(value, oldValue) {
    if (value) {
      this.frontPicUrl = value ? await getPrivateUrl(value) : null;
    }
  },
},
```

7、
```shell
搜索历史搜索扩展按钮。

一开始去获取本地的搜索历史数据。

再mouted钩子里获取搜索历史节点，判断有几行，是否大于3行，得到第三行最后一个节点的索引。

然后计算截取历史数据slice(0, lastIndex)。

是否展示扩展按钮取决于搜索历史行数。

一开始历史数据是收缩状态，然后点击扩展按钮可以切换收缩、扩展状态。
```

7、
```shell

uniapp获取节点只能在mouted钩子里获取一次吗？

以后当数据改变时，再去获取节点信息，就不会执行？

错误原因：v-if为false，找不到对应节点。但是就算我改为使用v-show，获取到的节点属性很多都是0。

解决思路：我可不可以结合固定高度、和计算行数来判断是否折叠？
```



7
mounted 和 onLoad生命周期钩子有什么区别？onLoad和onShow执行的先后顺序？
```shell
onLoad先与onShow执行
```

8
forEach和for循环有什么区别？

forEach里不能些break；

9
有时候组件上写一些样式不会生效。比如 --tw-mt-24--

10
```shell
reactive结合Object.assign使用不会触发响应式

    const msg = reactive({})

    setTimeout(()=>{
    Object.assign(msg, {a:2})
    },2000)
    
    watch(msg,()=>{
    console.log(1231)
    })
解决：我们项目版本比较低不可以，但最新版可以。
```
11、
```shell
有一些组件样式差不多，可以内部需要渲染的字段不同，该怎么解决呢？

插槽？

12、
常见的新闻列表组件，有多少个tab，就使用多少个swiper-item，不要计算当前显示的列表，后面会很麻烦。
```

12、不要再模板上做太多判断，可能会意想不到的出现问题。

13、scroll-view组件可以覆盖原生组件。也就是说，scroll-view可以配合背景使用。

14、scroll-view组件可能出现子元素显示不全的问题。？当scroll-view设置高度100%的时候，就会有问题。。。唉。

解决办法：我知道原因了，scroll-view是可以配合高度使用的，只不过当scroll-view的父容器里还有另外固定高度的元素时，scroll-view的百分比高度不会考虑兄弟元素的。这时可以使用flex弹性盒，flex：1 1 auto解决高度不确定问题。

100%和calc(100%)有什么不一样？

不要做无用功了，最后还是要确定高度，费了10个小时。。最后。。



15、screenHeight和windowHeight区别？

https://blog.csdn.net/tangyuan97/article/details/103604680

16、lodash的uniq函数，去重。

17、

分享时带上activeTab的索引。

在useOnLoad里改变tab的索引值，然后tuiTab组件的当前激活item的下划线没有对应索引值的位置。

18、上啦加载跟多、下拉刷新的内在逻辑是什么？

是刷新：请求第一页、列表数据赋值第一页数据

是加载跟多：请求下一页、列表追加数据

19、跳转页面传递参数使用stringfyUrl

`import { stringifyUrl } from 'query-string';`

20、页面怎么复用？
直接跳转到当前页面。。

21、vue的template模板上不能使用可选链.

然后我选择使用lodash的get方法。例如
```vue
<view v-if="get(couponDetailState, 'coupon.couponUseUserName')"></view>
```
但是这好像会导致触发不了响应式。

22、uniapp使用wx自定义组件
```
根或src创建wxcomponents目录，pages.json配置useComponents
```

## 路由跳转规则
方法：

跳转路由必须使用封装的路由跳转方法: navigateTo、openPage

路由URL必须使用constants.ts文件里的常量, 禁止手写。

## 数据通信
1、跳转路由时，携带参数。

2、全局事件总线eventBus（main.js文件里全局注册）

3、全局混入（mixins/mixin.js）

4、全局仓库store。仓库的方法最好直接触发mutation，改变仓库的数据更方便。

5、本地存储

## 排版问题
居中对齐
```shell
1、利用flex布局，合理利用align-items、justify-content属性。
    有些文本不确定宽高，但要使他们的起始行对齐，可以设置他们的父元素一个固定宽或高，并设置overflow: visible；

2、文字对齐
    利用行高。
```
## 全局仓库store
```js
// main.js
import './utils/store';

// ./utils/store
在这个文件中，会使用require.context实现对其他目录下store仓库的自动导入
以及vue安装vuex
```

## 地址管理

## src\composition\logic.ts文件
里面写有一些发请求逻辑功能的函数
## src\composition\http.ts文件
有个useHttp函数，传入要执行的函数，返回需要使用到的data、loading、error。

可以选择是否手动执行api，默认是自动。
```ts
export function useHttp<T extends any>(
    api: (params?: any) => Promise<BaseResponseBody<T>>,
    options?: UseHttpOptions<T>
): UseHttpResult<T> {
    const state = reactive<HttpState<T>>({
        data: (options?.initialValue ?? []) as any,
        loading: !options?.manual,
        error: null,
    });
    
    async function reload(params?: any) {
        state.error = null;
        state.loading = true;
        try {
            const { code, data, msg } = await api(params);
            if (isSuccess(code)) {
                // @ts-ignore
                state.data = data;
            } else {
                state.error = { code, data, msg };
            }
        } catch (e) {
            //
        } finally {
            state.loading = false;
        }
    }

    !options?.manual && reload();

    return {
        ...toRefs(state),
        // @ts-ignore
        state,
        reload,
    };
}
```
## src/http/misc.ts文件

里面有个函数`callWithFeedback`, 在请求到请求成功之间会toast提示

有回馈的调用一个函数
```js
// msg: fn函数执行成功后的提示。
export const callWithFeedback = async (fn: () => Promise<void>, msg?: string) => {
    await wx.showToast({
        title: "",
        icon: "loading",
    });
    try {
        await fn();
        await wx.hideToast();
        if (msg) {
            await wx.showToast({
                title: msg,
                icon: "success",
            });
        }
    } catch (e: any) {
        await wx.hideToast();
        await wx.showModal({
            content: stringOf(e.message ?? e.msg ?? e),
            showCancel: false,
            ...ModelStyle,
        });
    }
};
```

## 验收

