# vue不懂的问题

- 不懂diff算法/自定义渲染器/函数式组件/vue3初始化渲染流程
- vitepress不支持内置搜索框。只有algoria搜索框。可是我不会配置。。
- hash路由和history路由区别
hash路由兼容性强。history路由需要做一定处理，因为单页应用实际上是没有路由的，会出现刷新404的情况。

- 看了源码也还是不理解它的思想，只感觉像是在死记硬背。

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