<script setup>
import { computed, provide, reactive, ref } from 'vue'
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import List from "../components/List.vue"
import mockData from "../static/data.json"

const text = ref("")
// 
const data = reactive(mockData)
// 输入框提交事件
const onSubmit = (value) => {
  // 判断是否需要重新赋值
  if (text.value === value) {
    console.log("相等，不用赋值");
  } else {
    text.value = value
  }

  // 一些条件限制
  // 不能重复，不能为空
  if (data.findIndex(item => item.title === value.trim()) > -1 || value.trim() === '') {
    return alert("请不要重复输入或者输入为空")
  }

  // 往data里添加数据
  data.unshift({
    "title": value,
    "isCheck": false,
    "addTime": new Date().getTime()
  })
  // 清空输入框里的数据
  text.value = ""
  console.log(123);
}

// 为孙组件提供改变选中的方法
const changeCheck = (check, index) => {
  console.log(123);
  data[index].isCheck = check
}
provide('changeCheck', changeCheck)


// Footer的底部数据
// 已完成，全部，是否全选
// 已完成
const completeNum = computed(() => {
  return data.reduce((accumulator, currentValue) => {
    if(currentValue.isCheck){
      return accumulator+1
    }else{
      return accumulator
    }
  }, 0)
})
// 全部数量
const allNum = computed(()=>{
  return data.length
})
// 是否全选
const isCheckAll = computed(()=>{
  if(completeNum.value === allNum.value && allNum.value!== 0){
    return true
  }else{
    return false
  }
})
// footer的全选全不选函数
const checkAll = (value)=>{
  data.forEach(item=>item.isCheck = value)
}
</script>

<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header v-model:text="text" @submit="onSubmit"></Header>
      <list :reciveData="data"></list>
      <Footer :completeNum="completeNum" :allNum="allNum" :isCheckAll="isCheckAll" @checkAll="checkAll"></Footer>
    </div>
  </div>
</template>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/*header*/
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}

/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}

/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
