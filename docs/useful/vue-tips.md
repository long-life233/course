
# vue技巧


## 编辑器
  - vscode，搜索文件名，ctr+p
  - 搜索字符，ctr+f，ctr+shift+f搜索

## JS生成二维码
https://github.com/davidshimjs/qrcodejs

## JS媒体查询
主要使用API：
```js
// 媒体查询，系统是否使用深色主题？（return boolean）
// 类似还有当前浏览器窗口是否小于780px？ 还是小于560px？
const query = window.matchMedia(`(prefers-color-scheme: dark)`)

query.onchange = (e) => {
    log(e.matches)
}

// 获取类列表
const classList = document.documentElement.classList
classList[dark ? 'add' : 'remove']('dark')
```
对HTML根元素添加或删除dark类来切换主题。然后对很多元素(body,头部导航等等)来说，使用交集选择器（当html拥有dark类时）,设置背景为
```css
html.dark body{
    /* 定义css变量 */
    --vt-c-bg: var(--vt-c-black);
}
```
[-->了解css变量](https://www.ruanyifeng.com/blog/2017/05/css-variables.html)

还可以用js来操作获取css变量哟！

## 解析marked格式
使用"marked"库

## IntersectionObserver
api `IntersectionObserver`,离开视口区域会触发函数

## Gitee Image Hosting
https://product.mdnice.com/article/developer/gitee-image-hosting/

##   CSS Modules
通过$style访问css
```vue
<template>
    <div :class="$style.messageBox">
        ddd
    </div>
</template>
<style module>
    .message-box{
        padding:10px;
        color:#fff;
    }
</style>
```
##   vue脚手架可以直接使用css预处理器
直接使用即可，但记得要`npm i scss`下载
```css
<style lang="scss">
</style>

/* 通过js文件引入也可以 */
import "\./common.scss"
```

##  PostCss

为css添加前缀，获取兼容性处理。

Vite自动对*.vue文件和导入的.css文件应用PostCss配置，我们只需要安装必要的插件(比如`postcss`和 `autoprefixer`)和添加并配置`postcss.config.js`文件即可。
```js
module.exports = {
    plugins:[
        require('autoprefixer')
    ]
}
```

##  vue优雅使用use插件
main.ts
```ts{7}
import { createApp } from 'vue'
import App from './App.vue'
import usePlugins from "@/plugins"

const app = createApp(App)

usePlugins(app) // 传递app

app.mount("#app")
```
usePlugins.ts
```ts{11}
import { App, Plugin } from 'vue'
import router from '@/router'
import store from '@/store'
import componentsPlugin from "./components"

const plugins: Plugin[] = [ // 使用插件
    componentsPlugin, // 自定义插件，本质是一个函数，接受app参数
    store,
    router
]
const usePlugins = (app: App) => plugins.forEach(app.use, app)

export default usePlugins
```
componentsPlugin.ts
```ts{10}
import cButton from "./c-button.vue"
import cIcon from "./c-icon.vue"
import { Component, Plugin } from "vue"

const components: Map<string, Component> = new Map([
    ["c-button", cButton],
    ["c-icon", cIcon],
])

const componentsPlugin: Plugin = app => {
    components.forEach(
        // item,index
        (component, name) => app.component(name, component)
    )
}

export default componentsPlugin
```

##  父组件获取子组件实例
关键点：需要使用defineExpose

父组件
```vue
<script setup lang="ts">
import {ref,onMounted} from "vue"
import HelloWorld from "./components/HelloWorld.vue"

const helloComp = ref<HTMLElement|null>(null)

onMounted(()=>{
  console.log(helloComp,"xxx");
  helloComp.value.sayHello()
})
</script>

<template>
  hello
  <HelloWorld ref="helloComp" msg="wocao"></HelloWorld>
</template>

<style>

</style>
```
子组件
```vue
<script setup lang="ts">
  import { ref } from 'vue'

  defineProps < { msg: string } > ()
  
  const sayHello = ()=>{
    console.log("i'm helloworld,hello!!!!!");
  }
  // 使用setup语法糖后，子组件默认不会向父组件暴露变量，方法。需要使用defineExpose暴露
  defineExpose({sayHello})
</script>

<template>
  helloasfdsdf
</template>

<style scoped>

</style>
```

##  usePromise函数（封装状态）
问题：什么是promise？promise可以理解为一个会变化的结果。

编写一个公共函数usePromise函数需求如下：

传入一个function类型参数，里面执行异步代码。要求usePromise返回以下属性。

- results : 返回Promise执行结果
- loading： 返回Promise运行状态
  - PENDING :true
  - REJECTED : false
  - RESOLVED: false
- error ： 返回执行错误

在promise变化前后，封装的响应式数据loading，results，error也会做出响应改变。
```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
// 输入框值
let input = ref("")
// 根据输入框值，搜索函数
const searchInput = (str: String) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(str.length)
    }, 1000)
  })
}
// 使用Promise，
// promise是什么？状态集
let res = usePromise(searchInput)

watch(input, (newValue) => {
  if (newValue === '') {
    res.results.value = ''
  } else {
    res.createPromise(newValue)
  }
})
// 使用状态集
function usePromise(fn: Function) {
  let loading = ref(false)
  let error = ref(null)
  let results = ref('')
  // 一个方法,改变状态集，也属于状态集,
  async function createPromise(...args: any[]) {
    loading.value = true
    error.value = null
    results.value = ''
    try {
      results.value = await fn(...args)
    } catch (error: any) {
      error.value = error.value
    } finally {
      loading.value = false
    }
  }
  // 返回状态集
  return { loading, error, results, createPromise }
}

</script>

<template>
  输入：
  <input type="text" v-model="input" />
  <div></div>
  loading：{{ res.loading }}
  <div></div>
  error:{{ res.error }}
  <div></div>
  results:{{ res.results }}
</template>

<style scoped>
</style>
```


##  异步组件要求使用defineAsyncComponent方法创建

- 必须明确使用defineAsyncComponent包裹
- component选项重命名为loader
- Loader函数不再接收resolve and reject且必须返回一个Promise

定义一个异步组件
```js
import {defineAsyncComponent} from 'vue'
// 不带配置的异步组件
const asyncPage = defineAsyncComponent(()=>import('./NextPage.vue'))

// 带配置的异步组件，loader选项是以前的component
import ErrorComponent from '.comp/xx'
import LoadingComponent from '.comp/xx'

const asyncPageWithOptions = defineAsyncComponent({
    loader:()=>import('./NextPage.vue'),
    delay:200,
    timeout:3000,
    errorComponent:ErrorComponent,
    loadingComponent:LoadingCOmponent
})
```


##  is属性与v-is
is属性只能用在component标签上了。

dom内模板解析使用v-is代替

##  $on,$off,$once移除
上述三个方法被认为不应该由vue提供，因此被移除了，可以使用其他三方库实现。
```js
<script src="https://unpkg.com/mitt/dist/mitt.umd.js"></script>

// 创建
const emitter = mitt()

// 发送
emitter.emit('foo','ffooooo')

// 监听
emitter.on('foo',msg=>log(msg))
```
