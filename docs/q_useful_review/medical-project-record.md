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
上述想法可能是错误的，直接使用openSetting可能找不到对应的权限设置。

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

因为后端返回的数据都是分页数据，所以我们得做分页处理。我们还得做下拉刷新、上啦加载跟多、日期筛选等处理。

一般都是要用到scroll-view组件的。

先看看别人是怎么做的：

假设有一个请求列表的接口，可传page、size、time等参数

法一：
```js
// 定义数据结构
const swiperData = reactive<SwiperItemType[]>([
  {
    name: $vm.$t('待评价'),
    current:1,
    loading:true,
    isAuth:true,
    list:[],
    firstLoad:true
  },
  {
    name:$vm?.$t('i18n_gj7dtk49_1651741146226_info'),
    current:1,
    loading:true,
    isAuth:true,
    list:[],
    firstLoad: true
  }
])

// 有一个请求列表方法， index代表请求哪个列表（SwiperItem）的数据，flag代表请求下一页数据还是刷新（1是下一页，2是刷新）
async function requestEvaluateList(index, flag = 1) { 
  let requestPage // 定义请求的页码。
  if(flag === 1) { // 1，请求下一页数据；2，刷新
    // @ts-ignore
    requestPage = swiperData[index].current + 1
  } else { // 刷新
    requestPage = 1
  }

  // @ts-ignore
  const {code, data} = await apiService.get(`episode/evaluation/list`,{
    params:{
      patientRelationId: selectedPatient.value.patientRelationId,
      searchMethod: index + 1,
      current: requestPage,
      size:swiperData[index].size
    }
  })
  if(code === 0 ) { // 请求成功了
    if(flag === 1) { // 是追加数据
      swiperData[index].list.push(...data.records ?? [])
    }else { // 是刷新数据
      swiperData[index].list = data.records ?? []
    }
    // @ts-ignore
    swiperData[index].current = requestPage
    //
    swiperData[index].isAuth = true
  } else if(code === 1010103) {
    swiperData[index].isAuth = false
  }
}

```

法二：

```js
// 定义一个state
const state = reactive({
  currentTab: 1, // 当前的tab索引
  listPaging: computed(() => state.currentTab === 1 ? listPaging1 : listPaging2), // 根据currentTab计算出使用哪个listPaging
  ...
})

// 使用usePaging hook。
const listPaging1 = usePaging(
  (paging) => fetchBillList(paging, { searchMethod: 1, patientRelationId: `${state.selectPatient?.patientRelationId}` }),
  {
    manual: true,
  }
)
// listPaging2同理

// usePaging钩子
export function usePaging<T>(
  api: (params: any) => any, // 请求列表的api
  options?: { // 配置选项
    manual?: boolean;
    pageSize?: number;
    transformData?: (data: T) => T[];
  }
): PagingRes<T> {
  // @ts-ignore
  const paging = reactive({
    refreshing: options?.manual ?? true, // 如果不指定manual是true还是false，则默认为true
    isLoadMore: false, // 正在加载更多中
    noMore: false, // 没有跟多了
    dataSource: [], // 数据
    pages: { // 分页参数
      current: 1,
      size: options?.pageSize ?? 8,
    },
    isEmpty: computed(() => !paging.refreshing && paging.dataSource.length <= 0), // 没在刷新中、返回数据源长度小于等于0就为空
    code: 0,
  });

  function loadMore() {
    if (!paging.refreshing && !paging.isLoadMore && !paging.noMore) { // 如果没有正在刷新中、没有正在加载跟多、还有数据，就去请求下一页数据。
      loadData({ current: paging.pages.current + 1 }).catch(catchEmpty);
    }
  }

  async function onRefresh(cb?: Function) { // 刷新就是去请求第一页数据
    try {
      await loadData({ current: 1 });
      // 接口成功回调
      cb?.();
    } catch (e) {
      //
    }
  }

  async function loadData(params: { current: number }) {
    paging.refreshing = params.current === 1; // 如果参数的current为1，就设置刷新状态为true
    paging.isLoadMore = params.current > 1;// 如果参数的current > 1, 就设置 正在加载更多 为true
    try {
      const { code, data = {}, msg } = await api({ ...paging.pages, current: params.current });
      paging.code = code;
      if (isSuccess(code)) { // 成功请求
        if (data) { // 如果有数据
          const { records = [], current, pages } = data;
          if (current === 1) { // 如果请求的第一页数据就就重新赋值
            paging.dataSource = (options?.transformData ? options.transformData(records) : records) ?? [];
          } else { // 请求下一页数据就连接（有可能连接的空数组）
            // 更多
            paging.dataSource = paging.dataSource.concat((options?.transformData ? options.transformData(records) : records) ?? []);
          }
          paging.pages.current = current;    // 将请求的current赋值给前端的current
          paging.noMore = current >= pages; // 当前的页数大于等于总页数，就设置 没有更多 为true
        }
      } else {
         // TODO: [DYLAN] 就应该从 http请求层面去控制是否要显示错误提示,因此要屏蔽这里
        // errorModal(msg);
      }
    } catch (e) {
      //
    } finally { // 最后设置 正在加载跟多、正在刷新中为false
      paging.isLoadMore = false;
      paging.refreshing = false;
    }
  }

  !options?.manual && onRefresh();

  return { paging, loadMore, onRefresh };
}

```

法三：
```js
// tab
```

## 业务逻辑

1、v-patient-filter-menu-v2组件怎么使用？
```shell

```

2、怎么判断是否授权，申请授权是跳到哪个页面？
```shell
返回的code为·1010103·
```

3、体检预约模块：
```shell

  垂直导航（模仿colorUI，之前写的一个demo）

  预约医生页面的分页、医生擅长和语言筛选、日期筛选

  日期组件的使用

  预约确认页面的带入参数、表单检查

  预约体检要涉及到支付吗？

  预约成功申请发送消息

  预约改期页面
```

4、微店订单预约模块：
```shell
预约医生列表页面，好好看看
```

5、会员权益模块：
```shell
生成条形码、二维码库。
```

6、优惠券模块：
```shell
登录注册流程
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
添加新的历史搜索，重新触发组件的销毁重建生命周期，再mounted里重新计算

7、

mounted 和 onLoad生命周期钩子有什么区别？onLoad和onShow执行的先后顺序？
```shell
onLoad先于onShow执行
```

8
forEach和for循环有什么区别？

forEach里break无效。

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

12、不要在模板上做太多判断，可能会意想不到的出现问题。

13、scroll-view组件可以覆盖原生组件。也就是说，scroll-view可以配合背景使用。

14、scroll-view组件可能出现子元素显示不全的问题。？当scroll-view设置高度100%的时候，就会有问题。。。唉。

解决办法：我知道原因了，scroll-view是可以使用100%高度的，只不过当scroll-view的父容器里还有另外固定高度的元素时，scroll-view的百分比高度不会考虑兄弟元素的。这时可以使用flex弹性盒，flex：1 1 auto解决高度不确定问题。

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

23、替换多语言变量方式：
```shell
<text class="top-tips">{{ $t('i18n_7webnuhg_1651741146219_info', { var: buyNum }) }}</text>

<view class="tw-font-300 tw-text-28 tw-text-333333 tw-ml-16 tw-mt-8">{{$t('%{var}可用').replace('%{var}', hospitalNameSetString)}}</view>

# 含有样式
msgBoxRef.value
        .show({
          pTitle: $vm.$t('i18n_y5vq3a6c_1651741146206_info'),
          content: `<div style="font-size: 16px;line-height: 21px;color: #333333;">
                ${$vm
                  .$t('i18n_kjqsu98d_1651741146215_info')
                  .replace('%{var1}', `<span style="color: var(--primary-color-hex)">${patient.hisMergeMrn}</span>`)
                  // @ts-ignore
                  .replace('%{var2}', patient.hisMergeMrn)}
                </div>`,
          confirmText: $vm.$t('i18n_xncf6jez_1651741146211_info'),
          showCancelButton: true,
          html: true,
        })



```
24、中英文替换
```js
再setup里的返回对象里访问不到$t
set() {
    return {
        // @ts-ignore
        // text1: $vm?.$t(`非常感谢您选择和睦家医疗为您提供医疗服务，我们将竭诚守护您和家人的健康！`),
        // text2: $vm?.$t('为了改善患者的就医体验，我们真诚的希望了解到您就医的真实感受，我们感谢您就近期的就诊给予我们反馈。')
        text1: 'asdf',
        text2: 'fasdf'
    }
}
```

25、vue中的setup，computed，filters，props，methods等执行顺序
setup应该是比filter早。


26、搜索中文正则

`[\u4e00-\u9fa5].*`

27、flex布局下省略号css样式不生效问题

文本的父元素需要固定宽度，所以可以使用flex：1；width：0；配和使用

<!-- 28、100%和calc(100%)有什么不一样？ -->

29、微信小程序模态框换行
```js

wx.showModal({
      title:'提示',
      content:'第一行内容\r\n第二行内容\r\n第三行内容\r\n第四行内容',
      success:function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })1
```

30、滚动条影响页面宽度

在最外层盒子加：margin-right: calc(100% - 100vw);即可。

31、1px像素问题

高清屏幕下 1px 对应更多的物理像素，所以 1 像素边框看起来比较粗，解决方法如下

1. 边框使用伪类选择器，或者单独的元素实现。例如底部边框

```css
.box2::after {
  content: "";
  height: 1px;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  background: #000;
}
```

2. 在高清屏幕下设置

```css
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .box2::after {
    transform: scaleY(0.5);
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .box2::after {
    transform: scaleY(0.33333);
  }
}
```

或者只缩小0.5倍，0.3倍太小了，手机上根本看不出来。



32、安全区域

```shell
iPhoneX 的出现将手机的颜值带上了一个新的高度，它取消了物理按键，改成了底部的小黑条，但是这样的改动给开发者适配移动端又增加了难度。

这些手机和普通手机在外观上无外乎做了三个改动：圆角（corners）、刘海（sensor housing）和小黑条（Home Indicator）。为了适配这些手机，安全区域这个概念变诞生了：安全区域就是一个不受上面三个效果的可视窗口范围。

为了保证页面的显示效果，我们必须把页面限制在安全范围内，但是不影响整体效果。

viewport-fit
   viewport-fit 是专门为了适配 iPhoneX 而诞生的一个属性，它用于限制网页如何在安全区域内进行展示。

   ![image-20201003143632994](http://qn.chinavanes.com/qiniu_picGo/WIVOie19qaN6yT8.png)contain: 可视窗口完全包含网页内容

   cover：网页内容完全覆盖可视窗口

   默认情况下或者设置为 auto 和 contain 效果相同。

```

33、几倍图


```css
.avatar {
    background-image: url(sample.png);
    width: 300px;
    height: 200px;
}
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
    .avatar {
    	background-image: url(sample@2x.png);
    }
}
@media only screen and (-webkit-min-device-pixel-ratio:3){
    .avatar{
    	background-image: url(sample@3x.png);
    }
}
```

34、设置省略号的简单css属性

一个css属性搞定
```css
text-overflow: ellipsis;
```

35、关于小程序精确的高度的问题

```js
// 1. 小程序的胶囊按钮到屏幕顶部的距离：
    const menuButtonRect =wx.getMenuButtonBoundingClientRect()
        menuButtonRect.top + menuButtonRect.height
```

36、直接再自定义组件上设置style高度可以生效。。


38、rpx、px互转
```js
/**
 * px to rpx
 * @param {number} px
 * @returns {number}
 */
export function px2rpx(px: number) {
  const systemInfo = getApp()!.globalData!.systemInfo as UniApp.GetSystemInfoResult;
  return px * (750 / systemInfo.windowWidth);
}

/**
 * rpx to px
 * @param {number} rpx
 * @returns {number}
 */
export function rpx2px(rpx: number) {
  return rpx / (750 / uni.getSystemInfoSync().windowWidth);
}

```
39、展示医生信息卡片的地方：
```shell
pages/appt/apptConfirm/index

pages/evaluation/evaluationDetail

pages/evaluation/evaluationSubmit
```

40、插槽里写v-if判断，v-if只会判断一次，数据更新视图不会更新

应该是低版本vue的bug。

解决办法：在最外层包一层view标签，不要写v-if指令。
```html
  <ufh-form-item-v2
    v-model="state.invoiceForm.buyerName"
    show-bottom-border
    disable-default-padding
    style="--form-text-empty-body-fw: bold"
    :label="$t('i18n_ikenc67y_1651741146223_info')"
    border-radius-type="top"
    :placeholder="$t('i18n_pr49wht2_1651741146207_info')"
    :type="FORM_ITEM_TYPE.INPUT"
    layout="vertical"
  >
    <template #labelRightIcon>
      <view v-if="state.invoiceForm.buyerType == INVOICE_TYPE_ENUM.COMPANY" @click="getInvoiceHeaderFromWechat">
        <text class="tw-text-28-42 tw-text-333333">{{ $t('i18n_ikenc67y_1651741146223_info') }}</text>
      </view>
    </template>
  </ufh-form-item-v2>
```

41、通过正则表达式换行
```shell
$t('i18n_tfpa568q_1651741146222_info').replace(/\\n/g, '\n')
```
42、uniapp获取安全区域的bottom为负数的bug
```shell
3.4.8.20220428-alpha

微信小程序平台 修复 uni.getSystemInfoSync() 获取的 safeAreaInsets.bottom 为负数的Bug。

另一种方法也可以获取到安全区域：

    // 手机底部的非安全区域高度
    this.globalData.safeBottom = systemInfo.screenHeight - systemInfo.safeArea.bottom;
```

43、js字符串添加空格
```js
 '\xa0\xa0\xa0'
```

44、使用多余内容用省略号显示的css，注意高度不能确定，否者省略号后面还有内容。
```css
.tw-line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-all;
}
```

45、view和text标签里写文本，有什么区别？

46、为什么微店订单预约main页中的tui-icon组件，将它作为伸缩项目会不显示？

47、匹配`t('中文')`或`t("中文")`的正则是什么样子？

48、一行文字，横向与一个居中图标对齐，很简单。但是多行文字，只有第一行与文字居中对齐，有没有什么普适性方案呢？

49、怎么用数据字典？

50、i18n的简单使用？

51、scroll-view组件能作为绝对定位的父组件吗？

52、box-sizing：box-border对scroll-view有用吗？

53、设置scroll-view的margin，padding，style的字符串形式不生效，对象形式才生效？

54、有这样一个场景，一行文字，和一个"+"符号，设置它们得行高相等，然后设置flex布局的align-items: center, 但是却发现副轴并不居中对齐。

为什么会这样子呢？

55、小程序富文本解析，原生的rich-text组件有很多限制，不能点击图片 , 有<等特殊字符格式会解析失败。
```js
    // 避免开头为特殊字符，解析失败
    const desc = computed(() => {
      return checkupDetail.value.selectItem.commentDetail?.replaceAll('<', '＜')
    })
```

56、v-visibilty指令。使用css的v-visibilty实现？

感觉在某些场景下应该会很方便？

57、一般的登录注册逻辑是什么样的？

58、怎么做到用户去往某页面时，若未登录，去登录页登录成功后自动跳转到目标页面？

59、事件总线的替代解决方案为？

感觉和混入有点类似，数据来源不清晰。希望有一个更好的替代方案。

60、哪些东西适合封装为hook？

有setInterval定时器的操作，需要再组件或页面卸载时清除定时器。

61、有哪些封装好比较好用的钩子？

请求钩子，统一封装请求的状态，每一个请求都有对应的加载、错误状态，写起来更方便。
```js
export function useHttp<T extends any>(api: (params?: any) => Promise<BaseResponseBody<T>>, options?: UseHttpOptions<T>): UseHttpResult<T> {
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

分页钩子，封装一些分页请求重复的逻辑。
```js
export function usePaging<T>(
  api: (params: any) => any,
  options?: {
    manual?: boolean;
    pageSize?: number;
    transformData?: (data: T) => T[];
  }
): PagingRes<T> {
  // @ts-ignore
  const paging = reactive({
    refreshing: options?.manual ?? true,
    isLoadMore: false,
    noMore: false,
    dataSource: [], // 数据
    pages: {
      current: 1,
      size: options?.pageSize ?? 8,
    },
    isEmpty: computed(() => !paging.refreshing && paging.dataSource.length <= 0),
    code: 0,
    total: 0
  });

  function loadMore() {
    if (!paging.refreshing && !paging.isLoadMore && !paging.noMore) {
      loadData({ current: paging.pages.current + 1 }).catch(catchEmpty);
    }
  }

  async function onRefresh(cb?: Function) {
    try {
      await loadData({ current: 1 });
      // 接口成功回调
      cb?.();
    } catch (e) {
      //
    }
  }

  async function loadData(params: { current: number }) {
    paging.refreshing = params.current === 1;
    paging.isLoadMore = params.current > 1;
    try {
      const { code, data = {}, msg } = await api({ ...paging.pages, current: params.current });
      paging.code = code;
      if (isSuccess(code)) {
        if (data) {
          const { records = [], current, pages, size, total } = data;
          if (current === 1) {
            paging.dataSource = (options?.transformData ? options.transformData(records) : records) ?? [];
          } else {
            // 更多
            paging.dataSource = paging.dataSource.concat((options?.transformData ? options.transformData(records) : records) ?? []);
          }
          paging.total = total
          paging.pages.current = current;
          paging.noMore = current >= pages;
        }
      } else {
        //  就应该从 http请求层面去控制是否要显示错误提示,因此要屏蔽这里
        // errorModal(msg);
      }
    } catch (e) {
      //
    } finally {
      paging.isLoadMore = false;
      paging.refreshing = false;
    }
  }

  !options?.manual && onRefresh();

  return { paging, loadMore, onRefresh };
}
```
批量请求，可以以对象或疏忽格式
```js
export async function requestEvery(collection: Array<any> | Object) {
  if(Array.isArray(collection)) {
    return await Promise.all(collection)
  } else {
    const valueRes = await Promise.all(Object.values(collection))
    const keys = Object.keys(collection)
    return Object.fromEntries(keys.map((item, index) => {
      return [item, valueRes[index]]
    }))
  }
}
```

反馈请求，在请求过程中显示loading模态框。
```js
export const callWithFeedback = async (fn: () => Promise<void>, msg?: string) => {
  await wx.showToast({
    title: '',
    icon: 'loading',
  });
  try {
    await fn();
    if (msg) {
      await wx.showToast({
        title: msg,
        icon: 'success',
      });
    }
  } catch (e: any) {
    await wx.showModal({
      content: stringOf(e.message ?? e.msg ?? e),
      showCancel: false,
    });
  } finally {
    await wx.hideToast();
  }
};
```

62、公司请求的封装

```js
function createRequest(options) {
  // 使用了launch-request库。
  const instance = new Request({
    ...options,
  });

  // 其实也是请求或者响应拦截
  _applyRefreshExpiredToken(instance);

  // 请求拦截
  instance.interceptors.request.use(
    async (config) => {
      return config;
    },
    (config) => config
  );

  // 响应请求
  instance.interceptors.response.use(
    async (response) => {
      return response?.data;
    },
    (response) => {
      return { code: -10000, error: response };
    }
  );
}

export const apiService = createRequest({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});
```

63、全局状态管理库

就是vuex，然后使用了context.require来批量引入仓库模块。

64、消息订阅与发布的原理？

$on，$once，$off的原理？

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
