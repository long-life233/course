<script setup>
import {ref, defineExpose} from 'vue'

const textareaShow = ref(false)

const block = ref('')

function show(item) {
  block.value = item
  textareaShow.value = true
}

defineExpose({
  show
})
</script>

<template>
  <teleport to="body">
    <view v-if="textareaShow" class="top-0 right-0 bottom-0 left-0 fixed bg-black opacity-30" @click="textareaShow=false"></view>
    <!-- 编辑弹框 -->
    <textarea v-if="textareaShow" ref="textareEditor" v-model="block.content" class="fixed w-4/5 h-4/5 bg-black left-0 right-0 top-0 bottom-0 m-auto rounded-3xl bg-amber-50 border border-green-500 p-6 shadow-lg shadow-green-500 outline-none">
    </textarea>
  </teleport>
</template>

