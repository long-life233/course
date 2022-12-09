<template>
  <button class="bg-blue-400" @click="onClick">变宽</button>
  <div ref="box" class="box" :style="`width: ${width}px;--width:${width}px`">
    <div>宽：{{  desc.width  }}</div>
    <div>高：{{  desc.height  }}</div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onUpdated } from 'vue'

const box = ref<HTMLDivElement>(null as unknown as HTMLDivElement)

const width = ref(50)

const desc = ref({ width: '', height: '' })

onMounted(() => {
  getWH()
})

onUpdated(() => {
  getWH()
})

function getWH() {
  desc.value.width = window.getComputedStyle(box.value).width
  desc.value.height = window.getComputedStyle(box.value).height
}

function onClick() {
  width.value += 50
}
</script>

<style lang="scss">
body {
  padding: 100px;
}
.box {
  height: calc(var(--width) * 2);

  background: red;
  color: #fff;
  font-weight: 700;
}
</style>
