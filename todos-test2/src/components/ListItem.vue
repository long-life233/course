<script setup>
import { inject, ref } from 'vue'

const props = defineProps({
  item: Object,
  index:Number
})



const changeCheck = inject('changeCheck')

</script>

<template>
  <li>
    <label>
      <input @change="changeCheck($event.target.checked,index)" :checked="item.isCheck" type="checkbox" />
      <span>{{item.title}}</span>
    </label>
    <button class="btn btn-danger" style="display:none">删除</button>
  </li>
</template>

<style scoped>
</style>
