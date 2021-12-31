<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"></Header>
      <List :todos="todos"></List>
      <Footer></Footer>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
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

      return {
        ...toRefs(state),
        addTodo
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