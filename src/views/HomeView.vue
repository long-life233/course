<template>
  <div>count: {{store.counter}}</div>
  <button @click="add">加</button>
</template>
<script setup lang="ts">
import {useCounterStore} from '../stores/counter'
const store = useCounterStore()

function add() {
  store.increment()
}
</script>

<style lang="scss">

</style>
