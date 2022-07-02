# tailwind记录

## CDN安装
```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```

## 安装vscode插件

PostCSS Language Support，防止vscode警告

Tailwind CSS IntelliSense，语法提示

## 条件功能类
例如，悬浮时颜色变深
```html
<button class="bg-sky-600 hover:bg-sky-700 ...">
  Save changes
</button>
```
```shell
伪类
    like :hover, :focus, :first-child, and :required
伪元素
     like ::before, ::after, ::placeholder, and ::selection
媒体查询
    like responsive breakpoints, dark mode, and prefers-reduced-motion
属性选择器
    like [dir="rtl"] and [open]
```
可以被堆积到一块
```html
<button class="dark:md:hover:bg-fuchsia-600 ...">
  Save changes
</button>
```

## Hover, focus, and active
Hover, focus, and active

例子
```html
<button class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 ...">
  Save changes
</button>
```

还有更多伪类:visited, :focus-within, :focus-visible, and more.

更多伪类链接地址：https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-class-reference

## First, last, odd, and even
第一个，最后一个，奇数，偶数
```html
<li class="flex py-4 first:pt-0 last:pb-0" v-for="item in list">
    <img class="h-10 w-10 rounded-full" src="{person.imageUrl}" alt="" />
    <div class="ml-3 overflow-hidden">
        <p class="text-sm font-medium text-slate-900">{person.name}</p>
        <p class="text-sm text-slate-500 truncate">{person.email}</p>
    </div>
</li>
```
其它：:only-child, :first-of-type, :empty, and more.

更多：https://tailwindcss.com/docs/hover-focus-and-other-states#pseudo-class-reference

## 表单状态
https://tailwindcss.com/docs/hover-focus-and-other-states#form-states

required, invalid, and disabled

:read-only, :indeterminate, :checked, and more.

## 基于父类状态
给父类添加`group`类，子元素添加`group-*`类
```html
<a href="#" class="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
  <div class="flex items-center space-x-3">
    <svg class="h-6 w-6 stroke-sky-500 group-hover:stroke-white" fill="none" viewBox="0 0 24 24"><!-- ... --></svg>
    <h3 class="text-slate-900 group-hover:text-white text-sm font-semibold">New project</h3>
  </div>
  <p class="text-slate-500 group-hover:text-white text-sm">Create a new project from a variety of starting templates.</p>
</a>
```

## 基于兄弟元素
https://tailwindcss.com/docs/hover-focus-and-other-states

给某个元素添加`peer`类，另一个兄弟元素添加`peer-*`类
```html
<form>
  <label class="block">
    <span class="block text-sm font-medium text-slate-700">Email</span>
    <input type="email" class="peer ..."/>
    <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
      Please provide a valid email address.
    </p>
  </label>
</form>
```
Won't work, only previous siblings can be marked as peers
```html
<label>
  <span class="peer-invalid:text-red-500 ...">Email</span>
  <input type="email" class="peer ..."/>
</label>
```

## 伪元素
https://tailwindcss.com/docs/hover-focus-and-other-states#before-and-after


::before and ::after
```html
<label class="block">
  <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
    Email
  </span>
  <input type="email" name="email" class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
</label>

<blockquote class="text-2xl font-semibold italic text-center text-slate-900">
  When you look
  <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
    <span class="relative text-white">annoyed</span>
  </span>
  all the time, people think that you're busy.
</blockquote>
```

## Placeholder text
Placeholder文本

```html
<label class="relative block">
  <span class="sr-only">Search</span>
  <span class="absolute inset-y-0 left-0 flex items-center pl-2">
    <svg class="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"><!-- ... --></svg>
  </span>
  <input class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
</label>
```

## 文件选择按钮
```html
<form class="flex items-center space-x-6">
  <div class="shrink-0">
    <img class="h-16 w-16 object-cover rounded-full" src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80" alt="Current profile photo" />
  </div>
  <label class="block">
    <span class="sr-only">Choose profile photo</span>
    <input type="file" class="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "/>
  </label>
</form>
```

## 列表项的标记
```html
<ul role="list" class="marker:text-sky-400 list-disc pl-5 space-y-3 text-slate-500">
  <li>5 cups chopped Porcini mushrooms</li>
  <li>1/2 cup of olive oil</li>
  <li>3lb of celery</li>
</ul>
```

## 高亮选中文本
会应用到所有高亮元素上

```html
<div class="selection:bg-fuchsia-300 selection:text-fuchsia-900">
  <p>
    So I started to walk into the water. I won't lie to you boys, I was
    terrified. But I pressed on, and as I made my way past the breakers
    a strange calm came over me. I don't know if it was divine intervention
    or the kinship of all living things but I tell you Jerry at that moment,
    I <em>was</em> a marine biologist.
  </p>
</div>
```

## 第一行和第一个字母
https://tailwindcss.com/docs/hover-focus-and-other-states#first-line-and-first-letter

```html
<p class="first-line:uppercase first-line:tracking-widest
  first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
  first-letter:mr-3 first-letter:float-left
">
  Well, let me tell you something, funny boy. Y'know that little stamp, the one
  that says "New York Public Library"? Well that may not mean anything to you,
  but that means a lot to me. One whole hell of a lot.
</p>
```

## 对话框背景
https://tailwindcss.com/docs/hover-focus-and-other-states#dialog-backdrops

不知道啥意思

## 媒体查询-响应式断点
移动端渲染3列，中型屏幕渲染4列，大屏幕渲染6列
```html
<div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
  <!-- ... -->
</div>
```

## 喜欢的颜色主题
https://tailwindcss.com/docs/hover-focus-and-other-states#prefers-color-scheme

```html
<div class="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
  <div>
    <span class="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
      <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><!-- ... --></svg>
    </span>
  </div>
  <h3 class="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
  <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
</div>
```

## 竖屏、横屏媒体查询
https://tailwindcss.com/docs/hover-focus-and-other-states#viewport-orientation  

```html
<div>
  <div class="portrait:hidden">
    <!-- ... -->
  </div>
  <div class="landscape:hidden">
    <p>
      This experience is designed to be viewed in landscape. Please rotate your
      device to view the site.
    </p>
  </div>
</div>
```

## 响应式设计
断点

https://tailwindcss.com/docs/responsive-design

## 暗黑模式
https://tailwindcss.com/docs/dark-mode


## 可复用样式
https://tailwindcss.com/docs/reusing-styles

## 自定义主题
https://tailwindcss.com/docs/adding-custom-styles#customizing-your-theme

## 使用精确值
https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values

```html
<div class="top-[117px]">
  <!-- ... -->
</div>

<div class="bg-[#bada55] text-[22px] before:content-['Festivus']">
  <!-- ... -->
</div>
```

## 使用任意属性
```html
<div class="[--scroll-offset:56px] lg:[--scroll-offset:44px]">
  <!-- ... -->
</div>
```

## 处理空白

用`_`代替空白
```html
<div class="grid grid-cols-[1fr_500px_2fr]">
  <!-- ... -->
</div>

<div class="bg-[url('/what_a_rush.png')]">
  <!-- ... -->
</div>

<!-- 转义 -->
<div class="before:content-['hello\_world']">
  <!-- ... -->
</div>
```

## 处理模棱两可的css
https://tailwindcss.com/docs/adding-custom-styles#resolving-ambiguities 
```html
<!-- Will generate a font-size utility -->
<div class="text-[length:var(--my-var)]">...</div>

<!-- Will generate a color utility -->
<div class="text-[color:var(--my-var)]">...</div>
```
## 使用css和@layer

https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer

没看

## 功能和指令
https://tailwindcss.com/docs/functions-and-directives

没看

## 自定义颜色
调色板

https://tailwindcss.com/docs/customizing-colors

## 布局

### 长宽比
https://tailwindcss.com/docs/aspect-ratio

### 容器类
https://tailwindcss.com/docs/container
感觉文档有错误呀

有最大宽度

加上mx-auto元素会居中。
```html
<div class="container mx-auto bg-black">
  <!-- ... -->ddd
</div>
```

### 控制元素列数
https://tailwindcss.com/docs/columns

```html
<div class="columns-3 ...">
  <img class="w-full aspect-video ..." src="..." />
  <img class="w-full aspect-square ..." src="..." />
  <!-- ... -->
</div>
```
### break after
https://tailwindcss.com/docs/break-after

### break before
https://tailwindcss.com/docs/break-before

### break inside
https://tailwindcss.com/docs/break-inside

### Box Decoration Break 
https://tailwindcss.com/docs/box-decoration-break

### 盒模型
控制盒模型

https://tailwindcss.com/docs/box-sizing

```shell
Class          Properties
             
box-border	box-sizing: border-box;
box-content	box-sizing: content-box;
```

### display属性
https://tailwindcss.com/docs/display

```shell
block	        display: block;
inline-block	display: inline-block;
inline	      display: inline;
flex	        display: flex;
inline-flex	  display: inline-flex;

...等等
```
### 浮动
https://tailwindcss.com/docs/float

```shell
float-right	  float: right;
float-left	  float: left;
float-none	  float: none;
```

### 清楚浮动
https://tailwindcss.com/docs/clear

```shell
clear-left	    clear: left;
clear-right	    clear: right;
clear-both	    clear: both;
clear-none	    clear: none;
```

### Isolation
https://tailwindcss.com/docs/isolation

```shell
isolate	          isolation: isolate;
isolation-auto	  isolation: auto;
```

### Object Fit
https://tailwindcss.com/docs/object-fit

### Object Position
https://tailwindcss.com/docs/object-position

### Overflow属性
https://tailwindcss.com/docs/overflow

控制内容溢出

### Overscroll Behavior属性
https://tailwindcss.com/docs/overscroll-behavior

控制滚动条的行为

### Position属性
https://tailwindcss.com/docs/position

定位相关类

### Top / Right / Bottom / Left

https://tailwindcss.com/docs/top-right-bottom-left

### Visibility
https://tailwindcss.com/docs/visibility

### Z-Index 
https://tailwindcss.com/docs/z-index

## Flexobx & Grid

### Flex Basis
https://tailwindcss.com/docs/flex-basis

控制flex项的初始大小

```shell
basis-0	flex-basis: 0px;
basis-1	flex-basis: 0.25rem; /* 4px */
basis-2	flex-basis: 0.5rem; /* 8px */
basis-3	flex-basis: 0.75rem; /* 12px */

。。。等等
```

```html
<div class="flex flex-row">
  <div class="basis-1/4">01</div>
  <div class="basis-1/4">02</div>
  <div class="basis-1/2">03</div>
</div>
```

### Flex Direction
https://tailwindcss.com/docs/flex-direction

控制flex项的排列顺序

```shell
flex-row	flex-direction: row;
flex-row-reverse	flex-direction: row-reverse;
flex-col	flex-direction: column;
flex-col-reverse	flex-direction: column-reverse;
```

### Flex Wrap
https://tailwindcss.com/docs/flex-wrap

怎么包裹flex项

```shell
flex-wrap	flex-wrap: wrap;
flex-wrap-reverse	flex-wrap: wrap-reverse;
flex-nowrap	flex-wrap: nowrap;
```

### Flex
https://tailwindcss.com/docs/flex

控制flex项的伸和缩
```shell
flex-1	flex: 1 1 0%;
flex-auto	flex: 1 1 auto;
flex-initial	flex: 0 1 auto;
flex-none	flex: none;
```

### Flex Grow
https://tailwindcss.com/docs/flex-grow

Utilities for controlling how flex items grow.  

### Flex Shrink
https://tailwindcss.com/docs/flex-shrink

Utilities for controlling how flex items shrink.

### Order
https://tailwindcss.com/docs/order

Utilities for controlling the order of flex and grid items.

### Grid Template Columns
https://tailwindcss.com/docs/grid-template-columns

在网格布局中指定列数
```shell
grid-cols-1	grid-template-columns: repeat(1, minmax(0, 1fr));
grid-cols-2	grid-template-columns: repeat(2, minmax(0, 1fr));
grid-cols-3	grid-template-columns: repeat(3, minmax(0, 1fr));
grid-cols-4	grid-template-columns: repeat(4, minmax(0, 1fr));
grid-cols-5	grid-template-columns: repeat(5, minmax(0, 1fr));
```
```html
<div class="grid grid-cols-4 gap-4">
  <div>01</div>
  <!-- ... -->
  <div>09</div>
</div>
```

### Grid Column Start / End
https://tailwindcss.com/docs/grid-column

```shell
col-span-1	grid-column: span 1 / span 1;
col-span-2	grid-column: span 2 / span 2;
col-span-3	grid-column: span 3 / span 3;
col-span-4	grid-column: span 4 / span 4;
```
```html
<div class="grid grid-cols-3 gap-4">
  <div class="...">01</div>
  <div class="...">02</div>
  <div class="...">03</div>
  <div class="col-span-2 ...">04</div>
  <div class="...">05</div>
  <div class="...">06</div>
  <div class="col-span-2 ...">07</div>
</div>
```

### Grid Template Rows
https://tailwindcss.com/docs/grid-template-rows
```shell
grid-rows-2	grid-template-rows: repeat(2, minmax(0, 1fr));
grid-rows-3	grid-template-rows: repeat(3, minmax(0, 1fr));
grid-rows-4	grid-template-rows: repeat(4, minmax(0, 1fr));
grid-rows-5	grid-template-rows: repeat(5, minmax(0, 1fr));
grid-rows-6	grid-template-rows: repeat(6, minmax(0, 1fr));
```

### Grid Row Start / End
https://tailwindcss.com/docs/grid-row
```shell
row-span-3	grid-row: span 3 / span 3;
row-span-4	grid-row: span 4 / span 4;
row-span-5	grid-row: span 5 / span 5;
```

### Grid Auto Flow
https://tailwindcss.com/docs/grid-auto-flow
```shell
grid-flow-row	grid-auto-flow: row;
grid-flow-col	grid-auto-flow: column;
grid-flow-dense	grid-auto-flow: dense;
grid-flow-row-dense	grid-auto-flow: row dense;
grid-flow-col-dense	grid-auto-flow: column dense;
```
### Grid Auto Columns
https://tailwindcss.com/docs/grid-auto-columns

```shell
auto-cols-auto	grid-auto-columns: auto;
auto-cols-min	grid-auto-columns: min-content;
auto-cols-max	grid-auto-columns: max-content;
auto-cols-fr	grid-auto-columns: minmax(0, 1fr);
```

### Grid Auto Rows
https://tailwindcss.com/docs/grid-auto-rows

```shell
auto-rows-auto	grid-auto-rows: auto;
auto-rows-min	grid-auto-rows: min-content;
auto-rows-max	grid-auto-rows: max-content;
auto-rows-fr	grid-auto-rows: minmax(0, 1fr);
```

### Gap
https://tailwindcss.com/docs/gap

```shell
gap-0	gap: 0px;
gap-x-0	column-gap: 0px;
gap-y-0	row-gap: 0px;
gap-px	gap: 1px;
gap-x-px	column-gap: 1px;
gap-y-px	row-gap: 1px;
gap-0.5	gap: 0.125rem; /* 2px */
gap-x-0.5	column-gap: 0.125rem; /* 2px */
```

### Justify Content
https://tailwindcss.com/docs/justify-content
```css
justify-start	justify-content: flex-start;
justify-end	justify-content: flex-end;
justify-center	justify-content: center;
justify-between	justify-content: space-between;
justify-around	justify-content: space-around;
justify-evenly	justify-content: space-evenly;
```

### Justify Items
https://tailwindcss.com/docs/justify-items
```css
justify-items-start	justify-items: start;
justify-items-end	justify-items: end;
justify-items-center	justify-items: center;
justify-items-stretch	justify-items: stretch;
```

### Justify Self
https://tailwindcss.com/docs/justify-self
```css
justify-self-auto	justify-self: auto;
justify-self-start	justify-self: start;
justify-self-end	justify-self: end;
justify-self-center	justify-self: center;
justify-self-stretch	justify-self: stretch;
```

### Align Content
https://tailwindcss.com/docs/align-content
```css
content-center	align-content: center;
content-start	align-content: flex-start;
content-end	align-content: flex-end;
content-between	align-content: space-between;
content-around	align-content: space-around;
content-evenly	align-content: space-evenly;
```

### Align Items
https://tailwindcss.com/docs/align-items
```css
items-start	align-items: flex-start;
items-end	align-items: flex-end;
items-center	align-items: center;
items-baseline	align-items: baseline;
items-stretch	align-items: stretch;
```

### Align Self
https://tailwindcss.com/docs/align-self
```css
self-auto	align-self: auto;
self-start	align-self: flex-start;
self-end	align-self: flex-end;
self-center	align-self: center;
self-stretch	align-self: stretch;
self-baseline	align-self: baseline;
```

### Place Content
https://tailwindcss.com/docs/place-content
```css
place-content-center	place-content: center;
place-content-start	place-content: start;
place-content-end	place-content: end;
place-content-between	place-content: space-between;
place-content-around	place-content: space-around;
place-content-evenly	place-content: space-evenly;
place-content-stretch	place-content: stretch;
```

### Place Items
https://tailwindcss.com/docs/place-items
```css
place-items-start	place-items: start;
place-items-end	place-items: end;
place-items-center	place-items: center;
place-items-stretch	place-items: stretch;
```

### Place Self
https://tailwindcss.com/docs/place-self
```css
place-self-auto	place-self: auto;
place-self-start	place-self: start;
place-self-end	place-self: end;
place-self-center	place-self: center;
place-self-stretch	place-self: stretch;
```