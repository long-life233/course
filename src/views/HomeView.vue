<script setup>
import dragDirective from '../_utils/drag'
// 自定义指令
const vDrag = dragDirective

function drag() {
}
</script>

<template>
  <div v-drag="drag" class="box"></div>
</template>
<style>
.box {
  width: 50px;
  height: 50px;
  background-color: red;
  border-radius: 100%;
}
</style>
