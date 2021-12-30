<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header></Header>
      <List></List>
      <Footer></Footer>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Footer from "./components/Footer.vue"
  import Header from "./components/Header.vue"
  import List from "./components/List.vue"

  export default defineComponent({
    components:{
      Footer,
      Header,
      List
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