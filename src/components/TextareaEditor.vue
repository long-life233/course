<script setup>
import {ref, toRaw, toRefs, watchEffect} from 'vue'

const props = defineProps({ 
  content:{
    type:String,
    default:""
  }
})

const editContent = ref('')
watchEffect(() => {
  editContent.value = props.content
})

const show = ref(false)

const emit = defineEmits(['show','hide'])

function showModel() {
  show.value = true
  emit('show')
}

async function hideModel() {
  show.value = false
  console.log(editContent,'123456');
  emit('hide', editContent.value)
}

defineExpose({
  show:showModel
})
</script>

<template>
  <teleport to="body">
    <view v-if="show" class="top-0 right-0 bottom-0 left-0 fixed bg-black opacity-30" @click="hideModel"></view>
    <!-- 编辑弹框 -->
    <textarea v-if="show" v-model="editContent" class="fixed w-4/5 h-4/5 bg-black left-0 right-0 top-0 bottom-0 m-auto rounded-3xl bg-amber-50 border border-green-500 p-6 shadow-lg shadow-green-500 outline-none">
    </textarea>
  </teleport>
</template>

