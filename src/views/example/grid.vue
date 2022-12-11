<script setup lang="ts">
import { ref } from 'vue';
import dataGrid from './components/data-grid.vue'

const searchQuery = ref<string>('')

const columns = ['company', 'id']
const tableData = [
  {company: '华为科技有限公司', id: "123"},
  {company: '腾讯科技有限公司', id: "456"},
  {company: '字节跳动', id: '789'},
  {company: 'BAT', id: '012'}
] as Array<{company: string, id: string}>

</script>
<template>
  <form>
    Search <input v-model="searchQuery" />
  </form>
  <data-grid :table-data="tableData" :columns="columns" :filter-key="searchQuery"/>
</template>
<style lang="scss" scoped>

</style>