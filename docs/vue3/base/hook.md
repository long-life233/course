

# 自定义hook
相当于vue2中的mixin(其实就相当于把setup中的一部分代码抽离出去，可以进行复用)

需求1: 收集用户鼠标点击的页面坐标

hooks/useMousePosition.ts
```js
import { ref, onMounted, onUnmounted } from 'vue'
/* 
收集用户鼠标点击的页面坐标
*/
export default function useMousePosition () {
  // 初始化坐标数据，注意这里是响应式的
  const x = ref(-1)
  const y = ref(-1)

  // 用于收集点击事件坐标的函数
  const updatePosition = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  // 挂载后绑定点击监听
  onMounted(() => {
    document.addEventListener('click', updatePosition)
  })

  // 卸载前解绑点击监听
  onUnmounted(() => {
    document.removeEventListener('click', updatePosition)
  })

  return {x, y}
}
```
在其它页面中引入这个hook,然后使用
```html
<template>
<div>
  <h2>x: {{x}}, y: {{y}}</h2>
</div>
</template>
<script>
import {ref} from "vue"
import useMousePosition from './hooks/useMousePosition'
export default {
  setup() {
    // 这里的x，y是响应式数据；改变x，y会触发视图更新；
    const {x, y} = useMousePosition()
    return {
      x,
      y,
    }
  }
}
</script>
```