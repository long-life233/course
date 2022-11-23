<script setup>
import { computed, reactive } from 'vue';
import dragDirective from '../_utils/drag'
// 自定义指令
const vDrag = dragDirective

const position = reactive({
  X: 0,
  y: 0
})

const style = computed(() => {
  return {transform: `translate(${position.x}px, ${position.y}px)`}
})

</script>

<template>
  <div v-drag="drag" class="box" :style="style">
    {{position.x}}，{{position.y}}
  </div>
</template>
<style>
.box {
  user-select: none;
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 100%;
}
</style>
