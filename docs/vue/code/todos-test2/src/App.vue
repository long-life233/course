
<script setup>
import vButton from './components/V-Button.vue'
const onClick = ()=>{
  console.log("我是爹");
}

</script>
<template>
  <router-view></router-view>
  <vButton @click="onClick" class="abcd"></vButton>
</template>

<style>

</style>
