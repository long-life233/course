# ref

把一个数据变成引用对象，原来的数据在这个引用对象的value属性中；

更改引用对象的value属性，会触发视图的响应式更新。

这个数据可以是基本数据类型（number，boolean）、引用类型（Object，Array，Function）

```html
<template>
  <h2>{{count}}</h2>
  <hr>
  <button @click="updateCount">更新计数</button>
</template>

<script>
import {ref} from 'vue'
export default {
  setup () {
    // 定义响应式数据 ref对象
    const count = ref(1)
    // console.log(count) // refImpl引用实现

    function updateCount () {
      // 如果只是简单的对象，修改后不会触发模板数据的更新
      // 但count是响应式数据（基本数据类型的原理是defineProperty）
      count.value = count.value + 1
    }

    return {
      count,
      update
    }
  }
}
</script>
```