# shallowReactive和shallowRef
shallowReactive与shallowRef
  shallowReactive: 只处理了对象内最外层属性的响应式(改变第一层属性，会触发响应式)
  shallowRef: 创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的。（改变.value会触发响应式，但改变.value.xx不会触发响应式）
  例如：
```js
const foo = shallowRef({})
// 改变 ref 的值是响应式的
foo.value = {}
// 但是这个值不会被转换。
isReactive(foo.value) // false
```
总结:
  reactive与ref实现的是深度响应式, 而shallowReactive与shallowRef是浅响应式
  什么时候用浅响应式呢?
    一般情况下使用ref和reactive即可,
    如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
    如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef
```html
<template>
  <h2>App</h2>

  <h3>m1: {{m1}}</h3>
  <h3>m2: {{m2}}</h3>
  <h3>m3: {{m3}}</h3>
  <h3>m4: {{m4}}</h3>

  <button @click="update">更新</button>
</template>

<script lang="ts">
import { reactive, ref, shallowReactive, shallowRef } from 'vue'

export default {

  setup () {

    const m1 = reactive({a: 1, b: {c: 2}})
    const m2 = shallowReactive({a: 1, b: {c: 2}})

    const m3 = ref({a: 1, b: {c: 2}})
    const m4 = shallowRef({a: 1, b: {c: 2}})

    const update = () => {
      // m1.b.c += 1 // 触发响应式
      // m2.b.c += 1 // 不触发响应式

      // m3.value.a += 1 // 触发响应式
      m4.value.a += 1 // 不触发响应式
    }

    return {
      m1,
      m2,
      m3,
      m4,
      update,
    }
  }
}
</script>
```