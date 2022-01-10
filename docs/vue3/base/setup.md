# setup

新的option选项，值为一个函数，所有的组合API函数都在此使用，只在初始化时执行一次

函数会返回一个对象，模板可以直接使用对象中的第一层属性

例如：
```html
<template>
  a的值为：{{a}}
  obj中的b为：{{obj.b}}
</template>
<script>
export default {
//   data(){
//       // 还能使用vue2的写法
//       return {}
//   },
  setup(){
    let a = 10
    let obj = {
        b:20
    }

    return {
      a,
      obj
    }
  }
};
</script>
```