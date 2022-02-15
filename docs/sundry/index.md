# 介绍

编程记录中的杂项

vue3文档
- doc/guide/Essentials 
    - Reactivity Fundamentals
    - Components Basics（OK）
    - Components In-Depth / Async Components (OK)

vitepress文档
- Guide/Intorduction
    - Asset Handling(OK)

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

## 使用mitt
@vue/theme文件中，当改变主题时，使用mitt消息订阅传递数据

在这里，为什么要使用高阶函数呢？（调用一个函数返回另一个函数，确保获取到window对象，否则打包时一直报错，window对象不存在！！！）
```vue
<script lang="ts" setup>
import VTSwitch from './VTSwitch.vue'
import VTIconSun from './icons/VTIconSun.vue'
import VTIconMoon from './icons/VTIconMoon.vue'
// 自定义触发changeTheme事件
import mitt from 'mitt'
// window.emitter = mitt() // 打包时会报错，window对象不存在
 
const storageKey = 'vue-theme-appearance'
const toggle = typeof localStorage !== 'undefined' ? useAppearance() : () => {}

function useAppearance() {
  //
  window.emitter = mitt()
  //
  let userPreference = localStorage.getItem(storageKey) || 'auto'
  const query = window.matchMedia(`(prefers-color-scheme: dark)`)
  const classList = document.documentElement.classList
  let isDark =
    userPreference === 'auto' ? query.matches : userPreference === 'dark'
  const setClass = (dark: boolean) => classList[dark ? 'add' : 'remove']('dark')

  query.onchange = (e) => {
    if (userPreference === 'auto') {
      setClass((isDark = e.matches))
    }
  }

  const toggle = () => {
    setClass((isDark = !isDark))
    // 触发一个事件
    window.emitter.emit('changeTheme',isDark)
    localStorage.setItem(
      storageKey,
      (userPreference = isDark
        ? query.matches
          ? 'auto'
          : 'dark'
        : query.matches
        ? 'light'
        : 'auto')
    )
  }

  return toggle
}
</script>

<template>
  <VTSwitch
    class="vt-switch-appearance"
    aria-label="toggle dark mode"
    @click="toggle"
  >
    <VTIconSun class="vt-switch-appearance-sun" />
    <VTIconMoon class="vt-switch-appearance-moon" />
  </VTSwitch>
</template>
```

## algoria搜索框

- vitepress不支持内置搜索框。只有algoria搜索框。可是我不会配置。。
