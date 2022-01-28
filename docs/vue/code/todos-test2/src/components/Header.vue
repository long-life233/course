<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: String
})
// console.log(props,"props"); // 代理对象

const emit = defineEmits(['update:text','submit'])

// 输入触发回调
const onInput = (e) => {
  emit('update:text', e.target.value)
}
// enter提交触发回调
const submit = (e) => {
  emit('submit',e.target.value)
}
const count = ref(0)
</script>

<template>
  <div class="todo-header">
    <input :value="text" @input="onInput" @keyup.enter="submit" type="text" placeholder="请输入你的任务名称，按回车键确认" />
  </div>
</template>

<style scoped>
</style>
