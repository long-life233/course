# toRefs
把一个响应式对象变成一个普通对象并把它的第一层属性变成响应式的。可以简化模板上`.`的操作

举例：
不用toRefs
```html
<template>
  <h3>name: {{person.name}}</h3>
  <h3>age: {{person.age}}</h3>
</template>
<script>
import { reactive } from 'vue'
export default {
  setup () {
    const person = reactive({
      name:'tom',
      age:19
    })
    return {
        person
    }
  }
}
</script>
```
使用toRefs
```html
<template>
  <h3>name: {{name}}</h3>
  <h3>age: {{age}}</h3>
  <h3>job1: {{job.job1}}</h3>
  <h3>job2: {{job.job2}}</h3>
</template>
<script>
import { reactive,toRefs } from 'vue'
export default {
  setup () {
    const person = reactive({
      name:'tom',
      age:19,
      job:{
          job1:'eat',
          job2:'sleep'
      }
    })
    return {
        ...toRefs(person),
        // name:person.name, // 这样是不行的，相当于：name:'tom'
        job:person.job, // 这样是可以的，改变数据会触发模板更新
    }
  }
}
</script>
```
如下是错误用法:
将会发现name，age根本没有变化（而{{person}}有变化），因为已经不是person里的name和age了

toRefs还是以前的引用，只不过多了一个响应式。
```html
<template>
  <h3>{{person}}<h3>
  <h3>name: {{name}}</h3>
  <h3>age: {{age}}</h3>
</template>
<script>
import { reactive,ref,onMounted } from 'vue'
export default {
  setup () {
    const person = reactive({
      name:'tom',
      age:19
    })
    onMounted(()=>{
        person.name += '---'
        person.age ++
    })
    return {
        person,
        name:ref(person.name),
        age:ref(person.age)
    }
  }
}
</script>
```