<script setup lang="ts">
import commits from '@/views/example/commits.vue'
import grid from '@/views/example/grid.vue'

type exampleType = 'commits' | 'grid'

const examples: Record<string, any> = {
  commits,
  grid
}

const current = 'grid' as exampleType

</script>
<template>
  <component :is="examples[current]"></component>
</template>
<style lang="scss">

</style>
