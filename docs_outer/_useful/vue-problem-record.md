# vue不懂的问题

- 不懂diff算法/自定义渲染器/函数式组件/vue3初始化渲染流程
- vitepress不支持内置搜索框。只有algoria搜索框。可是我不会配置。。
- hash路由和history路由区别
hash路由兼容性强。history路由需要做一定处理，因为单页应用实际上是没有路由的，会出现刷新404的情况。

- 看了源码也还是不理解它的思想，只感觉像是在死记硬背。
## render函数的使用
作用就是不用写template模板了，其实template模板最后也是转换为render渲染函数。这个h可以理解为createElement。

```html
<!-- <template></template> -->
<script>
import {h} from 'vue'
export default {
  data(){
    return {
      msg:'xx'
    }
  },
  render(){
    return h('h1',{},'xx')
  }
}
</script>
<style>

</style>
```

## 快速开始
https://vuejs.org/guide/quick-start.html#quick-start

带有构建工具

```
网上 https://vite.new/vue

本地 https://vuejs.org/guide/quick-start.html#local

npm init vue@latest
```

不带有构建工具

```js
<script src="https://unpkg.com/vue@3"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

启动服务
```shell
npx serve
```

## app级配置
https://vuejs.org/guide/essentials/application.html#app-configurations

配置全局变量

https://vuejs.org/api/application.html#app-config-globalproperties

```js
app.config.globalProperties.msg = 'hello'
```

组合式api获取全局状态。这段代码只在中文文档有。
```js
import { getCurrentInstance } from 'vue'

setup() {
  const internalInstance = getCurrentInstance()

  internalInstance.appContext.config.globalProperties // 访问 globalProperties
}
```

## 动态参数（动态方法名）
https://vuejs.org/guide/essentials/template-syntax.html#dynamic-arguments

```html
<a v-on:[eventName]="doSomething"> ... </a>

<!-- shorthand -->
<a @[eventName]="doSomething">
```

## 响应式基础
https://vuejs.org/guide/essentials/reactivity-fundamentals.html#declaring-reactive-state

响应式对象是js代理对象并且表现得像普通对象。不同之处是vue能够跟踪响应式对象的属性获取和改变。

## nextTick
https://vuejs.org/guide/essentials/reactivity-fundamentals.html#dom-update-timing

nextTick()会在一个状态改变等待dom更新并完成执行。
```js
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // access updated DOM
  })
}
```
## 代理的代理
```js
const raw = {}
const proxy = reactive(raw)

// proxy is NOT equal to the original.
console.log(proxy === raw) // false

// 代理的代理 与 代理是相同的。。。。
// calling reactive() on the same object returns the same proxy
console.log(reactive(raw) === proxy) // true

// calling reactive() on a proxy returns itself
console.log(reactive(proxy) === proxy) // true
```

## ref简写
https://vuejs.org/guide/essentials/reactivity-fundamentals.html#reactivity-transform

```html
<script setup>
let count = $ref(0)

function increment() {
  // no need for .value
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

## 可写计算属性
https://vuejs.org/guide/essentials/computed.html#writable-computed
```js
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

## 组件内哪个元素接收class类
```html
<my-component class="baz"></my-component>


<!-- my-component template using $attrs -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```

## 事件修饰符

https://vuejs.org/guide/essentials/event-handling.html#event-modifiers

```html
<!-- the click event's propagation will be stopped -->
<a @click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a @click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form @submit.prevent></form>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div @click.self="doThat">...</div>

<!-- use capture mode when adding the event listener -->
<!-- i.e. an event targeting an inner element is handled here before being handled by that element -->
<div @click.capture="doThis">...</div>

<!-- the click event will be triggered at most once -->
<a @click.once="doThis"></a>

<!-- the scroll event's default behavior (scrolling) will happen -->
<!-- immediately, instead of waiting for `onScroll` to complete  -->
<!-- in case it contains `event.preventDefault()`                -->
<div @scroll.passive="onScroll">...</div>
```

## 按键修饰符

https://vuejs.org/guide/essentials/event-handling.html#key-modifiers

```html
<!-- only call `vm.submit()` when the `key` is `Enter` -->
<input @keyup.enter="submit" />
```
```shell
.enter
.tab
.delete
.esc
.space
.up
.down
.left
.right

.ctrl
.alt
.shift
.meta

.exact

.left
.right
.middle
```

## 表单修饰符
```js
.lazy
.number
.trim
```

## watch和watchEffect区别
https://vuejs.org/guide/essentials/watchers.html#deep-watchers

watch是监视某个确定的响应式数据。并且只会在数据改变之后触发回调。

watchEffect是只有回调内的响应式数据改变就会重新触发回调。并且初始化的时候会触发一次回调函数。

## watch的回调函数执行时机
https://vuejs.org/guide/essentials/watchers.html#callback-flush-timing

默认情况下，回调函数的触发时机在组件更新之前。这意味着在回调函数内获取组件的数据是还未更新的。

## 获取真实的dom元素
```html
<script setup>
import { ref, onMounted } from 'vue'

// declare a ref to hold the element reference
// the name must match template ref value
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

## 获取真实的dom元素数组
https://vuejs.org/guide/essentials/template-refs.html#refs-inside-v-for

## 组件内触发方法
```html
<script setup>
const emit = defineEmits(['enlarge-text'])

emit('enlarge-text')
</script>

export default {
  emits: ['enlarge-text'],
  setup(props, ctx) {
    ctx.emit('enlarge-text')
  }
}
```

## 动态组件

```html
<!-- Component changes when currentTab changes -->
<component :is="tabs[currentTab]"></component>
```

## 大小写不敏感
html的标签和属性命名是不敏感的。这意味着浏览器会断定任何大写字符为小写字符。

这意味着你在模板内使用大小驼峰命名、v-on事件名，需要将他们转为烧烤串命名法。
```html
// camelCase in JavaScript
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
}

<!-- kebab-case in HTML -->
<blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
```
## 注册全局组件

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

## 组件绑定多个属性
```html
const post = {
  id: 1,
  title: 'My Journey with Vue'
}

<BlogPost v-bind="post" />

<BlogPost :id="post.id" :title="post.title" />
```

## 组件属性接收
```html
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>

export default {
  props: ['foo'],
  setup(props) {
    // setup() receives props as the first argument.
    console.log(props.foo)
  }
}
```

## 单向数据流动
https://vuejs.org/guide/components/props.html#one-way-data-flow
```js
const props = defineProps(['foo'])

// ❌ warning, props are readonly!
props.foo = 'bar'
```

方式一. 将传入数据作为初始值，作为组件内部数据，传入数据改变不会触发视图更新。
```js
const props = defineProps(['initialCounter'])

// counter only uses props.initialCounter as the initial value;
// it is disconnected from future prop updates.
const counter = ref(props.initialCounter)
```

方式二。将传入的数据稍作转换
```js
const props = defineProps(['size'])

// computed property that auto-updates when the prop changes
const normalizedSize = computed(() => props.size.trim().toLowerCase())
```

注意：改变传入的对象、数组类型数据。

虽然子组件不支持直接改变对象、数组的引用地址，但是可以改变对象、数组的属性。

一般还是建议用emit改变。除非父子组件之间有强耦合关系。

## 触发事件验证
https://vuejs.org/guide/components/events.html#events-validation
```html
<script setup>
const emit = defineEmits({
  // No validation
  click: null,

  // Validate submit event
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```
## 处理v-model修饰符
https://vuejs.org/guide/components/events.html#usage-with-v-model

```html
<MyComponent v-model.capitalize="myText" />

const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

console.log(props.modelModifiers) // { capitalize: true }

<MyComponent v-model:title.capitalize="myText">

const props = defineProps(['title', 'titleModifiers'])
defineEmits(['update:title'])

console.log(props.titleModifiers) // { capitalize: true }
```

## v-on监听器继承
https://vuejs.org/guide/components/attrs.html#v-on-listener-inheritance

@click会绑定到组件的根元素上，若触发会触发父组件的onClick方法。若子组件也绑定有方法，那么都会触发。
```html
<MyButton @click="onClick" />
```

## 将属性精确到组件某个元素上
https://vuejs.org/guide/components/attrs.html#disabling-attribute-inheritance 
```html
<script>
// use normal <script> to declare options
export default {
  inheritAttrs: false
}
</script>

<script setup>
// ...setup logic
</script>
```

## 在js中获取落空属性
https://vuejs.org/guide/components/attrs.html#accessing-fallthrough-attributes-in-javascript

```html
<script setup>
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>
```

## 插槽
https://vuejs.org/guide/components/slots.html#slots

## app级provide、inject
https://vuejs.org/guide/components/provide-inject.html#app-level-provide
```js
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* key */ 'message', /* value */ 'hello!')
```

响应式
```html
<!-- inside provider component -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>

<!-- in injector component -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

## 异步组件
https://vuejs.org/guide/components/async.html#async-components

## 现代时间库date-fn
## 自定义指令
https://vuejs.org/guide/reusability/custom-directives.html#custom-directives
## 插件
https://vuejs.org/guide/reusability/plugins.html#plugins

## 过渡组件
transition仅仅支持单元素（组件只有一个根元素）作为它的插槽。
## 自定义过渡类
比如使用animate.css


https://vuejs.org/guide/built-ins/transition.html#custom-transition-classes

```html
<!-- assuming Animate.css is included on the page -->
<Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>
  <p v-if="show">hello</p>
</Transition>
```

## 列表渲染
https://vuejs.org/guide/built-ins/transition-group.html#transitiongroup

```html
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item">
    {{ item }}
  </li>
</TransitionGroup>

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
```

## keepAlive
https://vuejs.org/guide/built-ins/keep-alive.html#keepalive