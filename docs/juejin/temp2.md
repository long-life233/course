# require.context

API介绍
```js
require.context(directory, useSubdirectories, regExp, mode)

# directory 表示检索的目录

# useSubdirectories 表示是否检索子文件夹

# regExp 匹配文件名的正则表达式

# mode 加载模式，同步/异步 (sync/async)
```

require.context(directory, useSubdirectories, regExp, mode) 会返回一个函数。这个函数可以接收一个key作为参数，返回key的模块。

其实函数也是对象，返回的这个函数对象还具有三个属性。resolve, keys, id。（其中resolve、keys是函数类型。）

简单介绍
```js
/**
假设有文件 @/store/common.js, @/store/message.js
*/

const res = require.context('@/store/', true, /\.js$/, 'sync')

// resolve 是一个函数，它返回 request 被解析后得到的模块 id。
res.resolve() // 执行会报错，不知道是不是要传参的缘故。不过我们重点不是这个，可以跳过。

// keys 也是一个函数，它返回一个由key组成的数组（其实就是路径）
res.keys()

// 返回
['./common.js', './message.js']

// res 本身也可以接收参数
const reqRes = res('./common.js')

// 其中common.js的内容简写如下：
const store = {
  namespaced: true,
  state: {
    lanuage: 'zh'
  },
  getters: {},
  mutations: {
    say()
  },
  actions:{
    say() {}
  }
};
export default store

// reqRes的结果：

{
  default: {
    namespaced: true,
    state: {
      lanuage: 'zh'
    },
    getters: {},
    mutations: {
      say()
    },
    actions:{
      say() {}
    }
  }
}
```

## 应用一: 批量注册store

```js
import Vue from 'vue';
import Vuex from 'vuex';

const res = require.context('@/store/', true, /\.js$/, 'sync')

const storeModules = res.keys().map(item => {
    return {
      moduleName: item.slice(2, -3),
      ...res(item)
    }
  }).filter(item => {
    return item.default
  }).reduce((accumlator, item) => {

    accumlator[moduleName] = item.default

    return accumlator
  }, {})

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    ...storeModules
  }
})

export default store;
```

## 应用二: 组件内引入多个组件

```js
// 从@/components/home目录下加载所有.vue后缀的组件
const files = require.context('@/components/home', false, /\.vue$/);
const components = {};
 
// 遍历files对象，构建components键值
files.keys().forEach(key => {
    components[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
});
 
export default {
    ...
 
    components, // ES6语法糖，代表 components: components,
 
    ...
}

// 摘自：https://blog.csdn.net/pinbolei/article/details/115620728
```

## 应用三: main.js内引入大量公共组件
```js
import Vue from 'vue'
// 自定义组件
const requireComponents = require.context('../views/components', true, /\.vue/)
// 打印结果
// 遍历出每个组件的路径
requireComponents.keys().forEach(fileName => {
  // 组件实例
  const reqCom = requireComponents(fileName)
  // 截取路径作为组件名
  const reqComName =reqCom.name|| fileName.replace(/\.\/(.*)\.vue/,'$1')
  // 组件挂载
  Vue.component(reqComName, reqCom.default || reqCom)

```

## 应用三: 加载所有图片
```html
<template>
	<div id="app">
		<li v-for="item in images">
			<h3>Image: {{ item }}</h3>
			<img :src="imgUrl(item)">
		</li>
	</div>
</template>

<script>
	var imagesContext = require.context('@/assets/kittens/', false, /\.jpg$/);

	export default {
		created: function() {
			this.images = imagesContext.keys();
		},
		name: 'haha',
		data() {
			return {
				images: [],
				msg: 'Welcome to Your Vue.js App'
			}
		},
		methods: {
			imgUrl: function(path) {
				return imagesContext(path)
			}
		}
	}
</script>
```