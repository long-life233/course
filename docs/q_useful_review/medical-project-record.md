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

```js
// 获取设置
uni.getSetting

// 申请授权
authorize

// 打开授权
openSetting
```


```js
uni.getSetting

会去获取用户已经授权的权限。成功回调的参数res是授权的列表。

uni.authorize

如果是第一次，会弹框让用户判断是否授权。
会去判断某个权限是否已经授权。已授权走成功回调，没授权走失败回调。

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
```
## 频繁调用wx.getLocation方法会失败
如题。

微信开发文档如下：

https://developers.weixin.qq.com/community/develop/doc/000aee91a98d206bc6dbe722b51801

## 列表组件。

看似一个简单的列表，里面要涉及的东西可不少。

因为后端返回的数据都是分页数据，所以我们得做分页处理。我们还得做下拉刷新、上啦加载跟多、日期筛选等处理。

一般都是要用到scroll-view组件的。

先看看别人是怎么做的：

假设有一个请求列表的接口，可传page、size、time等参数

法一：不用分页hook
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

法二：使用分页 hook

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

## 问题
1，登录注册后怎么回到被拦截的页面？

```js
/**
 * 回到首页或者任何进来的地方
 */
export function goBackHomeOrAnywhere() {
  // 进入登录模块前存储的地址
  const redirectUrl = UFHStorage.getStorageData(STORAGE_KEY.REDIRECT_URL);
  UFHStorage.removeStorageData(STORAGE_KEY.REDIRECT_URL);

  if (redirectUrl) {
    const pages = getCurrentPages().reverse();
    let delta = 0;
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].route.startsWith('pages/login') || pages[i].route.startsWith('pages/register')) {
        delta += 1;
      }
    }

    console.log('delta:', delta);
    navigateBack({
      delta: delta,
      success: function () {
        console.log('navigateBack:', 'success');
        navigateTo(redirectUrl);
      },
      fail: function () {
        // 当pages 为1 的时候，会执行失败
        console.log('navigateBack:', 'fail');
        redirectTo(redirectUrl);
      },
      complete: function () {
        console.log('navigateBack:', 'complete');
      },
    });
  } else {
    uni.switchTab({
      url: PAGES.TABS.HOME,
    });
  }
}
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
watch属性监视计算属性。

当计算属性改变时，

此时watch监视属性的回调也会相应执行。
```js
watch: {
  frontKey: {
    async handler(value, oldValue) {
      if (value) {
        // 会等await getPrivateUrl(value)有值了再执行下面这行代码
        this.frontPicUrl = value ? await getPrivateUrl(value) : null;
      }
    },
  },
}

```
比如下面的代码
```js
async function noName() {
    const p = new Promise(resolve => {
        setTimeout(() => {
            resolve(100)
        }, 2000)
    })

    // console.log(await p); // 2s后打印100
}

console.log(noName()); // 值为undefined的Promise
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

其实也就是组件的重建、销毁可以用v-if控制。

7、

mounted 和 onLoad生命周期钩子有什么区别？onLoad和onShow执行的先后顺序？
```shell
onLoad先于onShow执行

1.渲染完成之前，即mounted之前
组件（父子组件都是）生命周期优先于页面生命周期；父组件，子组件直接的顺序是父组件优先于子组件。
执行过程：
父beforeCreate=>父created=>父beforeMount=>子beforeCreate=>子created=>子beforeMount=>页面onLoad=>页面onShow；
2.渲染完成时，即beforeDestroy之前
组件（父子组件都是）生命周期优先于页面生命周期；父组件，子组件直接的顺序是子组件优先于父组件。
子mounted=>父mounted=>页面onReady；
3.销毁过程：
页面生命周期优先于组件生命周期（父子组件都是）；父组件，子组件直接的顺序是子组件优先于父组件
页面onUnload=>子beforeDestroy=>子destroyed=>父beforeDestroy=>父destroyed
————————————————
版权声明：本文为CSDN博主「黄不逗」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/weixin_45172119/article/details/120866068
```

8、
forEach和for循环有什么区别？

forEach里break无效。

9
有时候组件上写一些样式不会生效。

小程序组件不支持直接在外部写class

https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E5%A4%96%E9%83%A8%E6%A0%B7%E5%BC%8F%E7%B1%BB

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

插槽。
```

12、
常见的新闻列表组件，有多少个tab，就使用多少个swiper-item，不要计算当前显示的列表，后面会很麻烦。

不一定，用计算当前的列表可能也很简单。

13、scroll-view组件可以覆盖原生组件。也就是说，scroll-view可以配合背景使用。

14、scroll-view组件可能出现子元素显示不全的问题。

解决办法：scroll-view是可以使用100%高度的，只不过当scroll-view的父容器里还有另外固定高度的元素时，scroll-view的百分比高度不会考虑兄弟元素的。这时可以使用flex弹性盒，flex：1 1 auto解决高度不确定问题。

15、screenHeight和windowHeight区别？

```js
https://blog.csdn.net/tangyuan97/article/details/103604680

1.作用域不同：screenHeight是整合手机屏幕的高度，windowHeight是webview（不包括手机通知栏、小程序标题栏和tabBar）的高度；

2.单位不同：screenHeight的单位是rpx，windowHeight的单位是px；
```

16、lodash的uniq函数，去重。


18、上啦加载跟多、下拉刷新的内在逻辑是什么？

是刷新：请求第一页、列表数据赋值第一页数据

是加载跟多：请求下一页、列表追加数据

19、跳转页面传递参数使用stringfyUrl

`import { stringifyUrl } from 'query-string';`

20、页面怎么复用？

直接跳转到当前页面。。

其实页面也可以看作是一个组件。

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
```html
<text class="top-tips">{{ $t('i18n_7webnuhg_1651741146219_info', { var: buyNum }) }}</text>

<view class="tw-font-300 tw-text-28 tw-text-333333 tw-ml-16 tw-mt-8">{{$t('%{var}可用').replace('%{var}', hospitalNameSetString)}}</view>
```
```js
//  含有样式
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

有时候想到这个问题，其实好像知道了意义也不是很大。

setup应该是比filter早。

26、搜索中文正则

`[\u4e00-\u9fa5].*`

27、flex布局下省略号css样式不生效问题

文本的父元素需要固定宽度，所以可以使用flex：1；width：0；配和使用

28、100%和calc(100%)有什么不一样？

后者可以计算。

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

参考27

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

42、uniapp获取安全区域的bottom

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

text组件适合包裹文本，有长按选择文本等属性

46、为什么tui-icon组件，将它作为伸缩项目会不显示？

图标组件的父元素应用flex，图标组件就不显示了。

48、一行文字，横向与一个居中图标对齐，很简单。但是多行文字，只有第一行与文字居中对齐，有没有什么普适性方案呢？

分为两列，第一列的高度与第二列第一行的高度一样。

51、scroll-view组件能作为绝对定位的父组件吗？

可以

52、box-sizing：box-border对scroll-view有用吗？

有

55、小程序富文本解析，原生的rich-text组件有很多限制，不能点击图片 , 有<等特殊字符格式会解析失败。
```js
    // 避免开头为特殊字符，解析失败
    const desc = computed(() => {
      return checkupDetail.value.selectItem.commentDetail?.replaceAll('<', '＜')
    })
```
这种方法时错误的，应该使用社区通用的小程序富文本解析组件。


56、v-visibilty指令。使用css的v-visibilty实现？

感觉在某些场景下应该会很方便？

小程序暂不支持自定义指令

57、一般的登录注册逻辑是什么样的？

58、怎么做到用户去往某页面时，若未登录，去登录页登录成功后自动跳转到目标页面？

先记录用户要去的页面。登录成功后在跳往记录的页面。

59、事件总线的替代解决方案为？

感觉和混入有点类似，数据来源不清晰。希望有一个更好的替代方案。

好像没有，还是少用。追查数据来源比较麻烦。

60、哪些东西适合封装为hook？

有setInterval定时器的操作，需要再组件或页面卸载时清除定时器。

比如处理一个列表。

把对列表的增删改查操作都封装为方法，再导出去。


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

这个暂时做不了。。。以后吧。

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
