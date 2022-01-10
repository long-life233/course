<script setup>
import { ref } from 'vue'
const emit = defineEmits(['checkAll'])
defineProps({
  completeNum:Number,
  allNum:Number,
  isCheckAll:Boolean
})
const checkAll = (value)=>{
  emit('checkAll',value)
}

</script>

<template>
  <div class="todo-footer">
    <label>
      <input @change="checkAll($event.target.checked)" type="checkbox" :checked="isCheckAll"/>
    </label>
    <span>
      <span>已完成{{completeNum}}</span> / 全部{{allNum}}
    </span>
    <button class="btn btn-danger">清除已完成任务</button>
  </div>
</template>

<style scoped>
</style>
