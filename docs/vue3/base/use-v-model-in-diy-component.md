# 在自定义组件上使用v-model

一般用于子组件简单的修改父组件数据，父组件不用再写传值和定义事件了，直接一个v-model搞定

在自定义组件上使用v-model，会进行转化

```vue
<my-component v-model:title="bookTitle"></my-component>
<!-- 转化为 -->
<my-component :modelValue="bookTitle" @update:title="bookTitle=$event"></my-component>
```
my-component组件内部必须要定义props title，也应该emit一个名为update:title的自定义事件

例如：
```js
app.component('my-component', {
  props: {
    title: String
  },
  emits: ['update:title'],
  template: `
    <input
      type="text"
      :value="title"
      @input="$emit('update:title', $event.target.value)">
  `
})
```