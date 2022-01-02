<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"></Header>
      <List :todos="todos" ></List>
      <Footer :footerData="footerData" :deleteCheck="deleteCheck" :checkAll="checkAll"></Footer>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs,provide, computed, onMounted, watch } from 'vue';
  import Footer from "./components/Footer.vue"
  import Header from "./components/Header.vue"
  import List from "./components/List.vue"
  import InterfaceTodo from "./types/todo"
  export default defineComponent({
    components:{
      Footer,
      Header,
      List
    },
    // 数据应该用数组来存储，数组中的每个数据都是一个对象，对象中应该有三个属性
    // (id，title，isCompleted)
    // 把数组暂且定义在App.vue父级组件
    setup(){
      // 定义一个数组数据
      const state = reactive<{todos:InterfaceTodo []}>({
        todos:[
          {id:1,title:'奔驰',isCompleted:false},
          {id:2,title:'宝马',isCompleted:true},
          {id:3,title:'奥迪',isCompleted:false},
        ]
      })
      // 定义一个添加todo的方法
      const addTodo = (todo:InterfaceTodo)=>{
        state.todos.unshift(todo)
      }
      // 定义一个删除todo的方法
      const deleteTodo = (index:number)=>{
        state.todos.splice(index,1)
      }
      // 为孙组件（app-》list-》item）provide一个删除todo方法
      provide('deleteTodo',deleteTodo)

      // 定义一个改变check的方法
      const changeCheck = (index:number)=>{
        state.todos[index].isCompleted = !state.todos[index].isCompleted
      }
      provide('changeCheck',changeCheck)

      // 计算Footer数据，包括是否全选，已完成数，总todos数
      const footerData = computed(()=>{
        // todos check选中的个数
        const checkNum = state.todos.filter(item=>item.isCompleted).length
        // todos所有的个数
        const allNum = state.todos.length
        // 是否全选
        let isCheckAll = false
        if(allNum === 0) {
          isCheckAll = false
        }else{
          isCheckAll = checkNum === allNum
        }
        return {
          checkNum,
          allNum,
          isCheckAll
        }
      })

      // 清除所有选中方法
      const deleteCheck=()=>{
        const notCheck = state.todos.filter(item=>item.isCompleted===false)
        state.todos = notCheck
      }

      // checkAll方法
      const checkAll = (checkAll:boolean)=>{
        state.todos.forEach(item=>item.isCompleted = checkAll)
      }

      // 缓存数据
      onMounted(()=>{
        let todos = localStorage.getItem('todos') as string
        if(todos){
          state.todos = JSON.parse(todos)
        }
      })
      // 监视todos数据，发生变化就缓存到浏览器
      watch(()=>state.todos,()=>{
        console.log(123);

        localStorage.setItem('todos',JSON.stringify(state.todos))
      },{
        deep:true
      })

      return {
        ...toRefs(state),
        addTodo,
        deleteCheck,
        footerData,
        checkAll
      }
    }
  });
</script>

<style>
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

  

  

  

</style>