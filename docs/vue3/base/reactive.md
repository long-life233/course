# reactive
将一个对象（不能是基本数据类型）变为响应式数据；

原理是通过proxy；

`const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象`

操作proxy的属性都会触发模板的响应式更新（但如果直接操作proxy把它的引用地址给改了，还触发啥响应式)
```html
<template>
  <h2>name: {{state.name}}</h2>
  <h2>age: {{state.age}}</h2>
  <h2>wife: {{state.wife}}</h2>
  <hr>
  <button @click="update">更新</button>
</template>

<script>
import {reactive} from 'vue'
export default {
  setup () {
    const state = reactive({
      name: 'tom',
      age: 25,
      wife: {
        name: 'marry',
        age: 22
      },
    })
    const update = () => {
      state.name += '--'
      state.age += 1
      state.wife.name += '++'
      state.wife.age += 2
    }

    return {
      state,
      update
    }
  }
}
</script>
```