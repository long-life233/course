# 有用的东西

## 调适

- 打断点的时候，可以查看调用栈，理清思路。

## vue相关
###  CSS Modules
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
###  vue脚手架可以直接使用css预处理器
直接使用即可，但记得要`npm i scss`下载
```css
<style lang="scss">
</style>

/* 通过js文件引入也可以 */
import "\./common.scss"
```

### PostCss

为css添加前缀，获取兼容性处理。

Vite自动对*.vue文件和导入的.css文件应用PostCss配置，我们只需要安装必要的插件(比如`postcss`和 `autoprefixer`)和添加并配置`postcss.config.js`文件即可。
```js
module.exports = {
    plugins:[
        require('autoprefixer')
    ]
}
```

### vue优雅使用use插件
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

### 父组件获取子组件实例
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

### usePromise函数（封装状态）
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


### 响应式数据实现的大致原理
> 一个响应式数据对应一个Dep类实例。
获取、设置这个响应式数据会分别触发get、set钩子。
get钩子的作用是收集依赖（可以理解为一个函数，里面会执行一些逻辑，比如更新视图）
set钩子的作用是触发依赖（更新视图）

ref就是一个响应式数据。reactive就是一个对象里面有很多ref。
一开始，简单点
```ts
// v1

// let a = 10;
// let b = a + 10;
// console.log(b);

// a = 20;
// b = a + 10;
// console.log(b);


// v2

// let a = 10;
// let b
// update()
// function update() {
//     b = a + 10;
//     console.log(b);
// }

// a = 20;
// update()

```
使用官方api
```ts
import  {effect, reactive} from "@vue/reactivity"

let a = reactive({
    value:19
})

let b;
// effect函数，当回调里面的响应式数据发生变化时，再次执行回调
effect(()=>{
    b = a.value + 10
    console.log(b);
})

a.value = 29
```

名为reactivity.ts，导出effectWatch函数，reactivity函数
```ts
// 当前dep实例是否有依赖函数
let currentEffect:Function|null;
// dep类
class Dep {
    // 依赖函数集合
    effects: Set<Function>;
    // 当前dep的值（dep也就是一个响应式数据）
    _val:any;
    // 获取当前dep的值
    get value(){
        this.depend()
        return this._val
    }
    // 设置当前dep的值
    set value(newVal){
        this._val = newVal;
        this.notice()
    }
    // 实例dep时做两个操作，创建一个空的依赖集合，初始化值
    constructor(val:any){
        this.effects = new Set()
        this._val = val
    }
    // 1. 收集依赖
    depend(){
        if(currentEffect){
            this.effects.add(currentEffect)
        }
    }

    // 2. 触发依赖
    notice(){
        // 触发一下我们之前收集到的依赖
        this.effects.forEach(effect=>effect())
    }
}
export function effectWatch(effect:Function) {
    // 收集依赖
    currentEffect = effect
    effect()
    currentEffect = null
}
```
测试一下
```ts
// 测试
ref --> 很像了。
const dep = new Dep(10)

let b;

effectWatch(()=>{
    b = dep.value + 10
    // console.log(b);
})

// 值发生变更
dep.value = 20
```
最后，继续在这个文件中实现reactivity
```ts
// reactive
// dep -> number string
// object -> key -> dep

// 1.这个对象在什么时候改变的
// object.a -> get
// object.a = 2 -> set

// vue2 defineProperty
// vue3 proxy
const depsMap = new Map();

function getDep(target:any, key:any) {
    // let depsMap = targetMap.get(target)
    // if(!depsMap){
    //     depsMap = new Map()
    //     targetMap.set(target,depsMap)
    // }
    let dep = depsMap.get(key)
    if(!dep){
        dep = new Dep(target[key]);
        depsMap.set(key,dep);
    }
    return dep;
}
export function reactive(raw:Object){
    return new Proxy(raw,{
        get(target,key){
            // key - dep
            // dep 我们存储在哪里
            const dep = getDep(target,key);

            // 依赖收集
            dep.depend();

            // return target[key]
            return Reflect.get(target,key)
            // return dep.value // 这里返回的是dep的值，那么改变代理的值时也要改变对应dep的值。
        },
        set(target,key,value){
            // 触发依赖
            // 要获取到dep
            const dep = getDep(target,key);
            const result = Reflect.set(target,key,value)
            dep.notice(result);            
            return result
        }
    })
}
```
测试
```ts
let user  = reactive({
    age:19
})

effectWatch(()=>{
    console.log(user.age);
})
```

### 不懂diff算法/自定义渲染器/函数式组件

### 异步组件要求使用defineAsyncComponent方法创建

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


### is属性与v-is
is属性只能用在component标签上了。

dom内模板解析使用v-is代替

### $on,$off,$once移除
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
