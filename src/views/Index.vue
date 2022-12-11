<script setup lang="ts">
import commits from '@/views/example/commits.vue'

type exampleType = 'commits'

const examples: Record<string, any> = {
  commits
}

const current = 'commits' as exampleType

</script>
<template>
  <component :is="examples[current]"></component>
</template>
<style lang="scss">

</style>
