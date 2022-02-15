<script setup >
import { useAttrs } from 'vue';
const emit = defineEmits('click')
console.log();
const onClick = ()=>{
    console.log(123);
}
</script>
<template>
    <button>按钮</button>
</template>