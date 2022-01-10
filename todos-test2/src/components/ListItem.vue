<script setup>
import { inject, ref } from 'vue'

const props = defineProps({
  item: Object,
  index:Number
})

const changeCheck = inject('changeCheck')
const deleteItem = inject('deleteItem')

</script>

<template>
  <li>
    <label>
      <input @change="changeCheck($event.target.checked,index)" :checked="item.isCheck" type="checkbox" />
      <span>{{item.title}}</span>
    </label>
    <button @click="deleteItem(index)" class="btn btn-danger">删除</button>
  </li>
</template>

<style scoped>
</style>
