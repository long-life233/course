# quasar 学习记录

## 为什么选择quasar？

为什么选择 quasar？因为它很牛逼。

quasar 允许开发者迅速开发一个响应式的网站/app 在许多场景：

- SPAs（Single Page App）
- SSR
- PWA（Progressive Web App）
- BEX（Brower Extension）
- Mobile Apps（Android，IOS，。。。）through Cordova or Capacitor
- Multi-platform Desktop Apps（using Electron）

解决不了的问题，求助社区[https://forum.quasar.dev/]，或者聊天室[https://chat.quasar.dev/]

## 开始
无脑选择 Quasar's CLI 就对了！

无脑使用 yarn 包管理工具就对了！

```shell
$ yarn global add @quasar/cli
$ yarn create quasar
```

添加脚本，然后就可以大胆`$ yarn dev or $ yarn build`了

```shell
// package.json
"scripts": {
  "dev": "quasar dev",
  "build": "quasar build",
  "build:pwa": "quasar build -m pwa"
}
```

## 禁用eslint
In order for you to disable ESLint later, all you need to do is to:

Comment out (or remove) the key below:

```js
// quasar.config.js
eslint: { /* ... */ }
```
Or, set warnings and errors to false:
```js
// quasar.config.js
eslint: {
  warnings: false,
  errors: false
}
```
## 插件使用
https://quasar.dev/start/how-to-use-vue#using-quasar-plugins

以使用notify通知插件为例。

先在quasar.conf.js里注册
```js
framework: {
  plugins: [ 'Notify', 'BottomSheet' ]
}
```
然后使用就行了
```vue
<q-btn
      @click="$q.notify('My message')"
      color="primary"
      label="Show a notification"
    />
```

## 使用$q对象
https://quasar.dev/options/the-q-object#introduction

```shell
version
platform
screen
lang
iconSet
等等
```

## 图标使用
https://quasar.dev/options/quasar-icon-sets#introduction

只需要在quasar.conf.js里配置一下就行了。

Quasar icon set就是quasar的内置组件使用的图标集合。只能选择某一项。

## js媒体查询
https://quasar.dev/options/screen-plugin#introduction
就是页面响应式的js插件

## 动画的使用
https://quasar.dev/options/animations#introduction

借助于animate.css。

## 字体大小类
https://quasar.dev/style/typography#headings
```css
text-h1
text-h2
...
text-h6
text-subtitle1
text-subtitle2
text-body1
text-body2
text-caption
text-overline
```
## 字体粗细类
https://quasar.dev/style/typography#font-weights
```css
text-weight-thin
text-weight-light
text-weight-regular
text-weight-medium
text-weight-bold
text-weight-bolder
```
## 字体对齐类
指元素内部的字体如何相对它的父元素对齐
```css
text-right 右对齐
text-left  左对齐
text-center 居中
text-justify 类似flex的juastify-between效果。
```
## 字体样式相关类
https://quasar.dev/style/typography#css-helper-classes

方便快速开发，不如粗字体、斜体、字体是否换行、大小写转换
```css
text-bold 字体变粗
text-italic 斜体
text-no-wrap 字体不换行（一行显示完）
text-strike 字体中间划一条线
text-uppercase 字体转大写
text-lowercase 字体转小写
text-capitalize 首字母大写
```


## 颜色相关类
https://quasar.dev/style/color-palette#color-list
```css
light-green-11
grey-5
。。。等等
```
使用text- 或者bg- 前缀改变文字或背景色
```html
<!-- changing text color -->
<p class="text-primary">....</p>

<!-- changing background color -->
<p class="bg-positive">...</p>
```
使用sass、scss变量改变
```html
<!-- Notice lang="scss" -->
<style lang="scss">
div {
  color: $red-1;
  background-color: $grey-5;
}
</style>
```
## 暗黑模式
https://quasar.dev/style/dark-mode#introduction

就是给body添加一个类

## padding/margin相关类
https://quasar.dev/style/spacing#introduction
```css
q-[p|m][t|r|b|l|a|x|y]-[none|auto|xs|sm|md|lg|xl]
    T       D                   S

T - type
  - values: p (padding), m (margin)

D - direction
  - values:
      t (top), r (right), b (bottom), l (left),
      a (all), x (both left & right), y (both top & bottom)

S - size
  - values:
      none,
      auto (ONLY for specific margins: q-ml-*, q-mr-*, q-mx-*),
      xs (extra small),
      sm (small),
      md (medium),
      lg (large),
      xl (extra large)

no-margin  移除所有maring
no-padding 
```

## 阴影相关类
https://quasar.dev/style/shadows#introduction
```css
no-shadow
inset-shadow
inset-shadow-down
shadow-1
shadow-2
shadow-N
```

## 媒体查询相关类
https://quasar.dev/style/breakpoints#introduction

## 可视化相关类
https://quasar.dev/style/visibility#introduction

```js
disabled 鼠标悬浮时变成禁用的样子
hidden  隐藏
invisible	  看不见，但占位置
transparent 透明
dimmed 蒙上一层黑色
light-dimmed	

xs  Display only on extra small windows
sm  	Display only on small windows
md  Display only on medium-sized windows
lg  Display only on large windows
xl  Display only on large windows
``` 
```shell
First of all, let’s define what the breakpoints are:

Extra Small	xs	Up to 599px
Small	sm	600px to 1023px
Medium	md	1024px to 1439px
Large	lg	1440px to 1919px
Extra Large	xl	1920px and up

You can also show some DOM element or component if it’s lower than one of the sizes. Same for greater than one of the sizes. Just attach lt- or gt- prefixes, which come from “lower than” and “greater than”. Example: lt-md (display on xs and sm only), lt-xl (display on xs, sm, md and lg windows only), gt-md (display on greater than medium windows: lg and xl).
```
平台可视化相关类、
```shell
desktop-only
mobile-only
native-mobile-only
等等
```
手机垂直、水平可视化相关类
```shell
orientation-portrait
orientation-landscape
```


## 文字省略号
https://quasar.dev/style/visibility#introduction
```css
ellipsis
ellipsis-2-lines
ellipsis-3-lines
```

## 定位相关类
```css
fullscreen   top,right,bottom,left全设置为零
fixed       position属性设置为fixed，不带top、right、bottom、left
fixed-center 全屏居中（top，50%，left，50%，translate-50%）
absolute    position属性设置为absolute，不带top、right、bottom、left
absolute-center   在设置position：relative的容器中居中
fixed-top, absolute-top
fixed-right, absolute-right
fixed-bottom, absolute-bottom
fixed-left, absolute-left
fixed-top-left, absolute-top-left
fixed-top-right, absolute-top-right	
fixed-bottom-left, absolute-bottom-left
fixed-full, absolute-full,和fullscreen没区别好像，看浏览器的调适都一样
relative-position

float-left	设置左浮动。float：left。
float-right 设置右浮动。float：right

on-left      margin-right: 12px
on-right     margin-left: 12px;

vertical-top   vertical-align:top
vertical-middle	  vertical-align:middle

z-top
z-max
```

## 所有css变量
https://quasar.dev/style/sass-scss-variables#introduction

## 鼠标相关类
https://quasar.dev/style/other-helper-classes#mouse-related
```css
non-selectable   不能选择
no-pointer-events   去除点击事件
all-pointer-events   上面的相反面
cursor-pointer     Change mouse pointer on DOM element to look as if on a clickable link
cursor-not-allowed  Change mouse pointer on DOM element to look as if action will not be carried out
cursor-inherit   Change mouse pointer on DOM element to look as the same as parent option
cursor-none    没有光标
```

## 滚动条相关类
https://quasar.dev/style/other-helper-classes#scroll-related
```css
scroll    	Applies CSS tweaks to make scroll work at its best on ALL platforms
no-scroll   (overflow:hidden)	Hides scrollbars on the DOM node
overflow-auto  Sets overflow to auto
overflow-hidden   overflow: hidden
overflow-hidden-y   overflow-y: hidden !important;
hide-scrollbar        scrollbar-width: none;
```

## 宽高相关类
https://quasar.dev/style/other-helper-classes#size-related
```css
fit   宽高都100%
full-height
full-width
window-height
window-width
block
```

## 旋转、翻转相关类
https://quasar.dev/style/other-helper-classes#orientation-related
```css
rotate-45
rotate-90
rotate-135
...

flip-horizontal  水平翻转
flip-vertical   垂直翻转
```

## 边框相关
https://quasar.dev/style/other-helper-classes#border-related
```css
no-border
no-border-radius
no-box-shadow
no-outline
rounded-borders
border-radius-inherit
```

## flex定位相关类
https://quasar.dev/layout/grid/introduction-to-flexbox#setting-direction

```css
row      display: flex;flex-wrap: wrap;
row inline   行内块
column   Flex column
column inline    Inline Flex column
row reverse     	Flex row with flex-direction set to row-reverse
column reverse    	Flex column with flex-direction set to column-reverse

wrap      换行
no-wrap   不换行
reverse-wrap	   反向换行
```
主轴对齐方式
```css
justify-start
justify-end
justify-center
justify-between
justify-around
justify-evenly
```
副轴对齐方式
```css
items-start
items-end
items-center
items-stretch
items-baseline

self-start, 
self-center, 
self-baseline, 
self-end, 
self-stretch

/* 区别；items-* 将主轴视为一行 */
/* align-items只有一条主轴。align-content不止一条主轴 */
content-start
content-end
content-center
content-stretch
content-between
content-around
```
## 伸缩项目分配宽度
https://quasar.dev/layout/grid/introduction-to-flexbox#distribution-of-size

使用12等分系统。
```html
<div class="row">
  <div class="col-8">two thirds</div>
  <div class="col-2">one sixth</div>
  <div class="col-auto">auto size based on content and available space</div>
  <div class="col">fills remaining available space</div>
</div>
```
```shell
col-[1-12]:占被百分比
col-auto: 占用渲染内容所刚好需要的宽度
col：看情况沾满剩余或收缩
col-grow：占满剩余
col-shrink：收缩
```
## 排序伸缩项目
https://quasar.dev/layout/grid/introduction-to-flexbox#order

order-first and order-last CSS helper classes.
```css
<div class="row">
  <div style="order: 2">Second column</div>
  <div class="order-last">Third column</div>
  <div class="order-first">First column</div>
</div>
```
## flex断点插件
https://quasar.dev/layout/grid/introduction-to-flexbox#flex-addons

## flex的响应式设计
https://quasar.dev/layout/grid/introduction-to-flexbox#responsive-design

## flex偏移
https://quasar.dev/layout/grid/row#offsetting-columns

Move columns to the right using .offset-md-* classes. These classes increase the left margin of a column by * columns. For example, .offset-md-4 moves .col-md-4 over four columns.
```html
<template>
  <div class="q-pa-md">

    <div class="row">
      <div class="col-md-4">.col-md-4</div>
      <div class="col-md-4 offset-md-4">.col-md-4 .offset-md-4</div>
    </div>

    <div class="row">
      <div class="col-md-3 offset-md-3">.col-md-3 .offset-md-3</div>
      <div class="col-md-3 offset-md-3">.col-md-3 .offset-md-3</div>
    </div>

    <div class="row">
      <div class="col-md-6 offset-md-3">.col-md-6 .offset-md-3</div>
    </div>

  </div>
</template>
```

## 伸缩项目间距相关类
https://quasar.dev/layout/grid/gutter#types

`注意！！`使用q-gutter-{size}时父元素不要设置宽度，否则会出现对不齐的状况。
```css
q-gutter-{size}

q-col-gutter-{size}
```
## flex断痕
相当于有个元素占一整行。

https://quasar.dev/layout/grid/flexbox-patterns#flex-row-column-break
```css
.flex-break
  flex: 1 0 100% !important
.row
  .flex-break
    height: 0 !important
.column
  .flex-break
    width: 0 !important
```

## 砌砖样式布局
https://quasar.dev/layout/grid/flexbox-patterns#masonry-like-layout

## 布局配置
https://quasar.dev/layout/layout#introduction


## 指令
### 关闭弹窗指令
https://quasar.dev/vue-directives/close-popup#introduction

### Intersection交叉指令
https://quasar.dev/vue-directives/intersection#introduction

### 波纹指令
https://quasar.dev/vue-directives/material-ripple#introduction

使用内置指令，在所有 HTML 元素上都可以使用！例如

```html
<!-- 波纹效果 -->
<div v-ripple>Click Me</div>
```

###  Mutation Observer API
https://quasar.dev/vue-directives/mutation#introduction

### 插件


所有 bool 属性的默认值都为 false！

## 快捷练习场

```js
UMD版本

Codepen	https://codepen.quasar.dev

脚手架版本

Codesandbox	https://codesandbox.quasar.dev
```

## vscode 必装插件！

```shell
Vue Language Features (Volar)
ESLint
Prettier
EditorConfig

TODO Highlight
GitLens — Git supercharged
Import Cost
npm
VS Code Icons
```
## layout布局组件使用

将 q-layout 作为一个容器使用必须设置特定的宽高。

q-header 和 q-footer 的超实用 api！

```shell
reveal，boolean值，启用后，向下滚动时header会暂时隐藏，上滑又出现。启用后会使header或footer固定(fixed)

elevated，添加一个阴影，看起来高高在上。
```

q-drawer 的超实用属性：

```shell
width，侧边栏宽度
side，在左边还是右边。默认左边。
overlay，是否覆盖页面。不会挤压页面。
mini，是否开启mini模式，抽屉的一般，比如图标。
mini-to-overlay
persistent，路由改变是否关闭侧边栏。
```

q-page 和 q-page-container

```shell
q-page-container转为包裹q-page的。

q-page的属性。
padding：boolean。给page添加一个默认padding。
```

q-page-stick 组件，粘滞效果，并且不会与 header、footer 重叠。

q-page-scroller 组件，滚动页面！回到顶部效果。

## q-table 使用指南

属性
```js
fullscreen  :boolean
  是否全屏展示表格，必须配合v-model:fullscreen="isFullscreen"使用

no-route-fullscreen-exit  :boolean
  更改路由不会退出全屏

virtual-scroll-target
  虚拟滚动目标,暂时不知道什么用

grid  :boolean
  以网格形式展示数据

grid-header   :string
  网格模式下的标题

loading     :boolean
  为true时一直有加载条显示

columns     :array of objects
  设置列。
  属性：
    name：唯一id，识别列，供分页、body-cell-[name]等使用
    label：表头标题
    field：该列下的某个单元格该显示行对象row的属性。
    required：如果我们使用visible-columns，该列将一直显示（实际设置为false也会一直显示）
    align：对齐方式
    sortable：该列是否可以排序
    sort：排序函数，如果你有一些想要自定义排序。小于零，a应该在前面。等于零不变。大于零，b应该在前面。
    sortOrder：设置列排列顺序，具体什么意思？
    format：格式化为你想要的数据。
    style：设置列单元格的样式
    classes：设置列单元格的类
    headerStyle：设置表头样式。有时候设置单元格的宽度不起作用，设置这个起作用。
    headerClasses：设置表头类

visible-columns
  列的name属性字符串数组，定义哪些列可见。

table-colspan
  设置列等宽。需要设置table-layout: fixed，通过css设置table标签。

icon-first-page
  第一页按钮图标

icon-prev-page
  上一页按钮图标

icon-next-page
  下一页按钮图标

icon-last-page
  最后一页按钮图标

grid-header
  grid模式下的标题

title
  标题

hide-header
  隐藏标题

hide-bottom
  隐藏底部

hide-selected-banner
  隐藏选中的条横幅（啥）

hide-no-data
  没有数据时隐藏底部

hide-pagination
  隐藏底部分页

separator
  分隔符。表格的线框，是否有竖线、横线等。

wrap-cells
  允许文章换行。

no-data-label
  没有数据时显示的文字

no-results-label
  没有搜索到数据时显示的文字

loading-label
  正在加载时的文字

expanded
  用扩展的行键保持数组（啥）

filter
  搜索过滤使用的属性

filter-method
  搜索过滤的方法

rows
  行数据

row-key
  每行的唯一key

rows-per-page-label
  分页器的每页行数label。默认值：Records per page:

pagination-label: Function
  分页器显示的label

pagination： Object
  sortBy ：列名
  descending：降序排序？
  page：页数（默认1）
  rowsPerPage：每页有多少条数据，0为无数条
  rowsNumber：用于服务端请求？？

rows-per-page-options
  用户可以选择每页显示多少条数据的数组。

selected-rows-label
  选中行数的标签

selection
  选择类型

selected
  选中的项

binary-state-sort
  跳过未排序状态当用户切换排序顺序。

column-sort-order
  列排序顺序，是列还是行的排序顺序？？

sort-method
  排序方法

color
  颜色

dense
  紧密

dark
  暗黑

flat
  无阴影

bordered 
  无边框

square
  方形

table-style
  table容器的style

table-class

table-header-class

card-container-style

card-container-class

card-style

card-class

title-class

table-header-style

virtual-scroll
  开启虚拟滚动

virtual-scroll-slice-size
  虚拟列表中最小渲染行数

virtual-scroll-slice-ratio-before
  渲染前面的截取率

virtual-scroll-slice-ratio-after
  渲染后面的截取率

virtual-scroll-item-size

virtual-scroll-sticky-size-start

virtual-scroll-sticky-size-end

table-colspan

flat属性：boolean
  加了就没有边框了

```

