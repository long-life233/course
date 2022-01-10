<script setup>
import { ref } from 'vue'
import ListItem from "../components/ListItem.vue"

defineProps({
  reciveData: Array
})

const count = ref(0)
</script>

<template>
  <ul class="todo-main">
    <ListItem :item="item" :index="index" v-for="(item,index) in reciveData"></ListItem>
  </ul>
</template>

<style scoped>
</style>
