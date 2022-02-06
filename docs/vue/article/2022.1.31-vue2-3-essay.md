# vue2/3随笔
- RFC是什么
    request for comment(征求意见，vue向社区征求意见)

    https://github.com/vuejs/rfcs

- vue3中文文档
    非官方，但有很多学习、面试、实战资料

    https://vue3js.cn/

## tip
- style标签中的scoped改为mudule，然后可以在模板中通过驼峰式写法引用。这样做的好处是会自动给类名添加hash，不怕会起冲突了。

例如
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

- 使用css预处理器

直接使用即可，但记得要`npm i scss`下载
```css
<style lang="scss">
</style>

/* 通过js文件引入也可以 */
import "\./common.scss"
```

- PostCss

为css添加前缀，获取兼容性处理。

Vite自动对*.vue文件和导入的.css文件应用PostCss配置，我们只需要安装必要的插件(比如`postcss`和 `autoprefixer`)和添加并配置`postcss.config.js`文件即可。
```js
module.exports = {
    plugins:[
        require('autoprefixer')
    ]
}
```

- 代码规范和格式化eslint+prettier
我们借助eslint规范项目代码，通过prettier做代码格式化。

首先在项目安装依赖，package.json
```json
{
    "scripts:{
        "lint":"eslint \"src/**/*.{js,vue}\"" // 检查代码规范
    },
    "devDependencies":{
        "@vue/eslint-config-prettier":"^6.0.0",
        "babel-eslint":"^10.1.0",
        "eslint":"^6.7.2",
        "eslint-plugin-prettier":"^3.1.3",
        "eslint-plugin-vue":"^7.0.0-0",
        "prettier":"^1.19.1"
    }
}
```

添加prettier.js文件和.eslintrc.js文件（js文件能进行逻辑判断，json文件有提示。）

- 测试环境搭建

使用gitHook钩子，commit之前执行什么脚本，push之前执行什么脚本。

- vite中使用ts

下载ts包，加上lang=”ts“，引入defineComponent，获得更好的ts提示。
就可以编写ts代码了。

- vite.config.js中配置目录别名，代理，mock数据

- 项目打包，部署，CI/CD
## 父组件获取子组件实例
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

## 共享状态
编写一个公共函数usePromise函数需求如下：

传入一个function类型参数，里面执行异步代码。要求usePromise返回以下属性。

- results : 返回Promise执行结果
- loading： 返回Promise运行状态
  - PENDING :true
  - REJECTED : false
  - RESOLVED: false
- error ： 返回执行错误
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


## reactivity响应式实现
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
## setup原理
index.html中
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script type="module" src="./main.js"></script>
</body>
</html>
```
引入的main.js
```js
import {effectWatch,reactive} from './reactivity.js'

// vue3
// 根组件
const App = {
    // 所谓的上下文，类型就是一个对象
    render(context){
        effectWatch(()=>{
            // 构建view = b
            document.body.innerText = ''
            const div = document.createElement("div");
            div.innerText = context.state.count;
            console.log(context.state.count);
            // root
            document.body.append(div)
        })
        return context
    },
    setup(){
        const state = reactive({
            count:0
        })
        // 方便在浏览器调适
        window.state = state
        setTimeout(()=>state.count++,1000)
        return {state}
    }
}

// 执行渲染函数
App.render(App.setup())
```
换一种方式

目录结构：

- my-test
  - core
    - reactivity.js
    - index.js
  - App.js // 根组件
  - index.html // 模板
  - main.js // 被模板引入

core/index.js
```js
import {effectWatch} from './reactivity.js'

export function createApp(rootComponent){
    return {
        mount(rootContainer){
            
            const context = rootComponent.setup();
            effectWatch(()=>{
                rootContainer.innerHTML = ``
                const element = rootComponent.render(context)

                rootContainer.append(element)
            })
        }
    }
}
```

App.js
```js
import { reactive } from "./core/reactivity.js";
// App根组件  rootComponent
export const App = {
    render(context) {
        // view --> 每次我都需要重新的创建
        // 要计算出最小的更新点 -> vdo
        // js --> diff
        const div = document.createElement("div");
        div.innerText = context.state.count;
        return div
    },
    setup() {
        const state = reactive({
            count: 0
        })
        // 方便在浏览器调适
        window.state = state
        setTimeout(() => state.count++, 1000)
        return { state }
    }
}
```

index.html,就是引入main.js文件

main.js文件
```js
import { App } from './App.js';
import { createApp } from './core/index.js';

// main.js的工作
createApp(App).mount(document.querySelector('#app'))
```

## render原理
h函数的作用

`import { h } from "./core/h.js";`
```js
// 创建一个虚拟节点 vdom vnode
export function h (tag,props,children){
    return {
        tag,
        props,
        children
    }
}
```

更改App.js
```js{10-18}
import { reactive } from "./core/reactivity.js";
import { h } from "./core/h.js";
// App根组件  rootComponent
export const App = {
    render(context) {
        // view --> 每次我都需要重新的创建
        // 要计算出最小的更新点 -> vdo
        // js --> diff

        // const div = document.createElement("div");
        // div.innerText = context.state.count;
        // return div
        // return h("div",{
        //     id:113
        // },String(context.state.count))
        // 创建虚拟节点
        return h("div",{
            id:113
        },[h('p',null,'xx'),h('p',null,'oo')])
    },
    setup() {
        const state = reactive({
            count: 0
        })
        // 方便在浏览器调适
        window.state = state
        setTimeout(() => state.count++, 1000)
        return { state }
    }
}
```
core/index.js 创建虚拟节点
```js{11-12}
import {effectWatch} from './reactivity.js'
import { mountElement } from '../renderer.js';
export function createApp(rootComponent){
    return {
        mount(rootContainer){
            
            const context = rootComponent.setup();
            effectWatch(()=>{
                rootContainer.innerHTML = ``
                // subTree,虚拟节点
                const subTree = rootComponent.render(context)
                mountElement(subTree,rootContainer)

                // rootContainer.append(element)
            })
        }
    }
}
```

core/renderer.js, mountElement函数

将虚拟节点转化为真实dom节点
```js
// vdom --> dom
export function mountElement(vnode,container){
    const {tag,props,children} = vnode;
    // tag
    const el = document.createElement(tag)
    //props:Object
    if(props){
        for(const key in props){
            const val = props[key]
            el.setAttribute(key,val)
        }
    }
    // children
    // 1.可以接受一个string
    if(typeof children === 'string'){
        const textNode = document.createTextNode(children)
        el.append(textNode)
    }else if(Array.isArray(children)){
        // 递归遍历
        children.forEach(v=>{
            mountElement(v,el)
        })
    }
    // 2.可以接受一个数组
    

    // 插入
    container.append(el);
}
```

## diff算法

App.js （根组件）
这种情况下，当state.count变化时，dom会进行全部更新
```js{8}
import { reactive } from "./core/reactivity.js";
import { h } from "./core/h.js";
// App根组件  rootComponent
export const App = {
    render(context) {
        return h("div",{
            id:113
        },[h('p',null,String(context.state.count)),h('p',null,'oo')])
    },
    setup() {
        const state = reactive({
            count: 0
        })
        // 方便在浏览器调适
        window.state = state
        setTimeout(() => state.count++, 1000)
        return { state }
    }
}
```

main.js
```js
import { App } from './App.js';
import { createApp } from './core/index.js';

// vue3

// main.js的工作
createApp(App).mount(document.querySelector('#app'))
```
h.js
```js
// 创建一个虚拟节点 vdom vnode
export function h (tag,props,children){
    return {
        tag,
        props,
        children
    }
}
```

index.js，导出createApp函数
```js
import { effectWatch } from './reactivity.js'
import { mountElement,diff } from '../renderer.js';
export function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            const context = rootComponent.setup();
            let isMounted = false;
            let prevSubTree;

            effectWatch(() => {
                rootContainer.innerHTML = ``

                if (!isMounted) {
                    // init
                    // subTree,虚拟节点
                    isMounted = true
                    const subTree = rootComponent.render(context)
                    mountElement(subTree, rootContainer)
                    prevSubTree = subTree;
                    // rootContainer.append(element)
                }else{
                    // update
                    const subTree = rootComponent.render(context)
                    diff(prevSubTree,subTree)
                    // mountElement(subTree, rootContainer)
                    prevSubTree = subTree;
                }

            })
        }
    }
}
```

renderer.js，导出mountElment和diff函数
```js
// n1 oldVnode
// n2 newVnode
export function diff(n1,n2){
    // 1. tag
    if(n1.tag !== n2.tag){
        n1.el.replaceWith(document.createElement(n2.tag));

    }else{
        // 小细节
        const el = n2.el = n1.el;
        // 2. props
        // new: {id:"foo",class:"bar",a}
        // old: {id:"foo",class:"bar1",a,b}
        const {props:newProps} = n2;
        const {props:oldProps} = n1;

        if(newProps && oldProps){
            Object.keys(newProps).forEach(key=>{
                const newVal = newProps[key];
                const oldVal = oldProps[key];
                if(newVal !== oldVal){
                    el.setAttribute(key,newVal)
                }
            })
        }

        if(oldProps){
            Object.keys(oldProps).forEach(key=>{
                if(!newProps[key]){
                    el.removeAttribute(key);
                }
            })
        }

        // 3. children --> (暴力解法)
        //      1.newChildren --> string(oldChildren --> string oldChildren --> array)
        //      2.newChildren --> array(oldChildren --> string oldChildren --> array)
        const {children:newChildren} = n2;
        const {children:oldChildren} = n1;
        if(typeof newChildren === "string"){
            if(typeof oldChildren === "string"){
                if(newChildren !== oldChildren){
                    el.textContent = newChildren
                }
            }else if(Array.isArray(oldChildren)){
                el.textContent = newChildren;
            }
        }else if(Array.isArray(newChildren)){
            if(typeof oldChildren === "string"){
                el.innerText = ''
                mountElement(n2,el)
            }else if(Array.isArray(oldChildren)){
                // new {a,b,c,d,f}
                // old {a,e,c,d}

                const length = Math.min(newChildren.length,oldChildren.length)

                // 处理公共的vnode
                for(let index=0;index<length;index++){
                    const newVnode = newChildren[index]
                    const oldVnode = oldChildren[index]
                    diff(oldVnode,newVnode)
                }

                if(newChildren.length>length){
                    // 创建节点
                    for(let index=length;index<newChildren.length;index++){
                        const newVnode = newChildren[index];
                        mountElement(newVnode)
                    }
                }

                if(oldChildren.lenght > length){
                    // 删除节点
                    for(let index = length; index<oldChildren.length;index++){
                        const oldVnode = oldChildren[index];
                        oldVnode.el.parent.removeChild(oldVnode.el)
                    }
                }
            }
        }
    }
    
}


// vdom --> dom
export function mountElement(vnode,container){
    const {tag,props,children} = vnode;
    // tag
    const el = vnode.el = document.createElement(tag)
    //props:Object
    if(props){
        for(const key in props){
            const val = props[key]
            el.setAttribute(key,val)
        }
    }
    // children
    // 1.可以接受一个string
    if(typeof children === 'string'){
        const textNode = document.createTextNode(children)
        el.append(textNode)
    }else if(Array.isArray(children)){
        // 递归遍历
        children.forEach(v=>{
            mountElement(v,el)
        })
    }
    // 2.可以接受一个数组
    
    console.log(container,el);
    // 插入
    container.append(el);
}
```

## 自定义渲染器
渲染器，有一个createApp方法。

main.js中
```js
import { createApp,createRenderer } from 'vue'
import App from './App.vue'
import CustomApp from './CustomApp.vue'
import {draw,drawBarChart} from "./my-fn.js"
createApp(App).mount('#app')

const customRenderder = createRenderer({
    // 创建元素
    // 先创建外层元素，在创建里面的元素
    /**
     * 
     * @param {string} tag 标签名
     * @param {*} isSVG 
     * @param {*} is 
     * @returns 
     */
    createElement(tag, isSVG, is) {
        return { tag }
    },
    // 插入元素
    // 由外到里创建元素完后，在由里到外插入元素
    /**
     * 
     * @param {Object} child 就是createElement函数的返回值
     * @param {HTMLElement} parent 父元素节点
     * @param {*} anchor 
     */
    insert(child, parent, anchor) {
        console.log(child,parent,"child,parent");
         //draw完成canvas的绘制并返回canvas元素
         const childNode = draw(child);
         //将canvas元素插入到div#app中
         parent.appendChild(childNode);
         //如果组件有绑定事件，则执行
         if (child.onClick) {
             childNode.addEventListener('click', () => {
                 child.onClick();
             })
         }
    },
    // 元素属性比较
    /**
     * 当属性变更时触发
     * @param {Object} el 
     * @param {string} key 属性名
     * @param {*} prevValue 初始值为空
     * @param {*} nextValue 
     */
    patchProp(el, key, prevValue, nextValue) {
        console.log(el,key,"el,key");
        el[key] = nextValue;
    },
    remove: function (el) {
        
    },
    createText: function (text) {
        
        return {"key":"any"}
    },
    createComment: function (text) {
        
        return {"key":"any"}
    },
    setText: function (node, text) {
        
        
    },
    setElementText: function (node, text) {
        
        
    },
    parentNode: function (node)  {
        return null
        
    },
    nextSibling: function (node)  {
        return null
    }
})
function createCustomApp(...args) {
    // 传入根组件
    const app = customRenderder.createApp(...args);
    const {
        mount
    } = app;
    // 重写mount方法，这样就可以直接传入Sting类型的id选择器了
    app.mount = (containerOrSelector) => {
        const container = document.querySelector(containerOrSelector);
        container.innerHTML = ''
        const proxy = mount(container)
        return proxy
    }
    return app
}

createCustomApp(CustomApp).mount("#test")
```
画canvas的两个方法
```js
// 以下是方法

/**
 * @description: 柱状图绘制
 * @param {*} canvas canvas元素
 * @param {*} props 即前文的child对象，表示tag标签名和数据或者事件
 * @return {*}
 */
export const drawBarChart = (canvas, props) => {
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    const OriginPos = {
        x: 50,
        y: 100,
    };
    const step = 20;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    const {
        data
    } = props;
    data.forEach((chartDatas, index) => {
        ctx.fillStyle = chartDatas.color;
        ctx.fillRect(OriginPos.x + step * index, OriginPos.y, 10, chartDatas.count);
    });
}
/**
 * @description: 通过传递过来的创建canvas需要的tag标签名和数据或者事件
 * @param {*} child 一个对象，表示tag标签名和数据或者事件
 * @return {*} canvas元素
 */
export const draw = (child) => {
    let canvas;
    if (child.tag == 'bar-chart') {
        canvas = document.createElement('canvas');
    }
    drawBarChart(canvas, child);
    return canvas;
}
```
自定义的根组件
```vue
<script setup lang="ts">
    import { ref } from "vue"
    const chartData = [{
        title: '青铜',
        count: 200,
        color: 'brown'
    },
    {
        title: '砖石',
        count: 300,
        color: 'skyblue'
    },
    {
        title: '王者',
        count: 50,
        color: 'gold'
    },
    ]
    const dataRef = ref(chartData)
    const add = () => {
        console.log(234);
        dataRef.value.push({
            title: '青铜',
            count: 200,
            color: 'brown'
        })
    }
</script>

<template>
    <bar-chart :data="dataRef" @click="add"></bar-chart>
</template>

<style>

</style>
```

## 定义全局组件

```js
import { createApp,createRenderer, h } from 'vue'


createApp(App).component('comp',{
    render(){
        return h('div','ddd')
    }
}).mount('#app')
```

## 函数式组件
函数式组件变化较大，主要有以下几点：
- 性能提升在vue3中可忽略不记，所以vue3中推荐使用状态组件
- 函数式组件仅能通过纯函数形式声明，接收props和context两个参数
- sfc中<template></template>不能添加functional特性声明函数是组件
- {functional:true}组件选项移出

声明一个函数式组件，Functional.js
```js
import {h} from 'vue'

const Heading = (props,context)=>{
    return h(`h${props.level}`,context.attrs,context.slots)
}

Heading.props = ['level']

export default Heading
```

## 异步组件要求使用defineAsyncComponent方法创建
由于vue3中函数式组件必须定义为纯函数，异步组件定义时有如下变化：
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

## 自定义组件白名单
vue3中自定义元素检测发生在模板编译时，如果要添加一些vue之外的自定义元素，需要在编译器选项中设置iscustomELement选项

使用构建工具时，模板都会用vue-loader预编译，设置它提供的comilerOptions即可：vue.config.js
```js
rules:[
    {
        test:/\.vue$/,
        use:'vue-loader',
        options:[
            compilerOptions:{
                isCustomElement:tag=>tag==='plastic-button'
            }
        ]
    }
]
```

在vite.config.js中配置vueCompilerOptions即可：
```js
module.exports = {
    vueCompilerOptions:{
        isCustomElement:tag=>tag==='piechart'
    }
}
```

## is属性与v-is
is属性只能用在component标签上了。

dom内模板解析使用v-is代替

## 自定义指令API和组件保持一致

## transition类名变更
- v-enter --》 v-enter-from
- v-leave --》 v-leave-from

## vue2、3的mount
vue2.x应用程序根容器的outerHtml会被根组件的模板替换（或被编译为template），vue3.x现在使用跟容器的innerHTML取代。

## $on,$off,$once移除
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

## todos案例巩固vue3特性

## vue-router变化


