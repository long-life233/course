# quasar 学习记录

## why quasar

为什么选择 quasar？因为它很牛逼。

quasar 允许开发者迅速开发一个响应式的网站/app 在许多场景：

- SPAs（Single Page App）
- SSR
- PWA（Progressive Web App）
- BEX（Brower Extension）
- Mobile Apps（Android，IOS，。。。）through Cordova or Capacitor
- Multi-platform Desktop Apps（using Electron）

解决不了的问题，求助社区[https://forum.quasar.dev/]，或者聊天室[https://chat.quasar.dev/]

## Getting Started

开炮！

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

禁用 eslint！

```js
// quasar.config.js
eslint: {
	/* ... */
}
```

使用内置指令，在所有 HTML 元素上都可以使用！例如

```html
<!-- 波纹效果 -->
<div v-ripple>Click Me</div>
```

所有 bool 属性的默认值都为 false！

快捷练习场！

```js
UMD版本

Codepen	https://codepen.quasar.dev

脚手架版本

Codesandbox	https://codesandbox.quasar.dev
```

vscode 必装插件！

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

## Contribution Guide

贡献手册，贡献自己的生命！

## Options & Helpers

内置的$q 对象。举例

```html
<!-- 组合式api -->
<div v-if="$q.platform.is.ios">Gets rendered only on iOS platform.</div>
<script>
	import { useQuasar } from 'quasar';

	export default {
		setup() {
			const $q = useQuasar();

			console.log($q.platform.is.ios);

			// showing an example on a method, but
			// can be any part of Vue script
			function show() {
				// prints out Quasar version
				console.log($q.version);
			}

			return {
				show,
			};
		},
	};
</script>

<!-- 选项式api -->
<script>
// not available here outside
// of the export

export default {
  // inside a Vue component script
  ...,

  // showing an example on a method, but
  // can be any part of Vue script
  methods: {
    show () {
      // prints out Quasar version
      console.log(this.$q.version)
    }
  }
}
</script>

<!-- 非vue文件 -->
import { Quasar } from 'quasar'

console.log(Quasar.platform.is.ios)
```

安装图标

/quasar.config.js
```js
extras: [
  'material-icons',
  'mdi-v6',
  'ionicons-v4', // last webfont was available in v4.6.3
  'eva-icons',
  'fontawesome-v6',
  'themify',
  'line-awesome',
  'bootstrap-icons'
]
```

平台检测！

屏幕插件，响应式的css类

开箱即用的动画！Animate.css

## Style & Identity

样式和一致性。

文字大小！

字体粗细！

字体classes

通过css变量和css classes调色！

颜色展示集合！

quasar使用了间隔类。帮助dom或组件处理间隔问题。
```html
<!-- small padding in all directions -->
<div class="q-pa-sm">...</div>

<!-- medium margin to top, small margin to right -->
<q-card class="q-mt-md q-mr-sm">...</q-card>
```

阴影类！

断点！（屏幕宽度）

可视化相关的css类，比如
```shell
disabled
hidden
invisible
transparent
dimmed
light-dimmed
ellipsis
ellipsis-2-lines
ellipsis-3-lines
z-top
z-max
```

鼠标相关的css类！Mouse Related

滚动相关的css类！比如隐藏滚动条！

尺寸相关！比如设置宽高100%!

定位相关！比如翻转dom元素180°。

边框相关！可惜没有虚线！

## Layout and Grid
布局和网格。

q-layout的view属性（大写表示固定，小写表示不固定）

还不知道align-items和align-content的区别？
```shell
align-items将伸缩项目视为一行，并且将剩余的空间作为自己的一部分。
如果不得已换行，会将剩余空间进行平分计算。

所以align-items能设置的属性只有5个。关键的base-line

items-start，items-end，items-center，items-stretch，items-baseline
```
```shell
align-content就是伸缩项目几行就是几行。能设置6个属性。

content-start
content-end
content-center
content-stretch
content-between
content-around
```

quasar使用12等分系统。
```html
<div class="row">
  <div class="col-8">two thirds</div>
  <div class="col-2">one sixth</div>
  <div class="col-auto">auto size based on content and available space</div>
  <div class="col">fills remaining available space</div>
</div>
<!-- 
    col-auto 根据内容渲染需要的尺寸
    col-grow 至少沾满剩余空间
    col-shrink 至少渲染内容需要的尺寸
    col 沾满剩余空间
 -->
```

self Alignment只有在父元素设置为item-*（start，center，end，baseline）时才会生效。

伸缩项目排序
```css
order-first and order-last
```

响应式设计，移动设备优先！
```html
<div class="row">
  <div class="col-xs-12 col-sm-6 col-md-4">
    col
  </div>
  <div class="col-xs-12 col-sm-6 col-md-4">
    col
  </div>
  <div class="col-xs-12 col-sm-6 col-md-4">
    col
  </div>
</div>
```

将q-layout作为一个容器使用必须设置特定的宽高。

q-header和q-footer的超实用api！
```shell
reveal，boolean值，启用后，向下滚动时header会暂时隐藏，上滑又出现。启用后会使header或footer固定(fixed)

elevated，添加一个阴影，看起来高高在上。
```

q-drawer的超实用属性：
```shell
width，侧边栏宽度
side，在左边还是右边。默认左边。
overlay，是否覆盖页面。不会挤压页面。
mini，是否开启mini模式，抽屉的一般，比如图标。
mini-to-overlay
persistent，路由改变是否关闭侧边栏。
```

q-page和q-page-container
```shell
q-page-container转为包裹q-page的。

q-page的属性。
padding：boolean。给page添加一个默认padding。
```

参观别人写的布局页面！

q-page-stick组件，粘滞效果，并且不会与header、footer重叠。

q-page-scroller组件，滚动页面！回到顶部效果。