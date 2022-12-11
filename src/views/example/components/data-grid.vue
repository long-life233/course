<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  tableData: Array<Record<string, string>>,
  columns: Array<string>,
  filterKey: string
}>()

const sortKey = ref<string>('')
const sortOrders = ref(props.columns.reduce((o, v) =>(o[v] = 1, o), {} as any))

const filterData = computed(() => {
  // 过滤条件
  // 搜索关键字
  let data = props.tableData
  data = data.filter(row => {
    return Object.keys(row).some(key => {
      return row[key].toLowerCase().indexOf(props.filterKey) > -1
    })
  })
  // 排序关键字
  // 排序顺序
  const order = sortOrders.value[sortKey.value]
  if(sortKey.value) {
    data = data.slice().sort((a, b) => {
      const pre = a[sortKey.value]
      const next = b[sortKey.value]
      return (pre === next ? 0 : pre > next ? 1 : -1) * order
    })
  }

  return data
})

function sortBy(key: string) {
  sortKey.value = key
  sortOrders.value[key] = sortOrders.value[key] * -1
}

</script>
<template>
  <table v-if="filterData.length > 0">
    <thead>
      <tr>
        <th v-for="item in columns" class="a"
          @click="sortBy(item)"
        >
          {{item}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filterData">
        <td v-for="key in columns" class="a">
          {{entry[key]}}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style lang="scss" scoped>
.a {
  width: 300px;
  height: 50px;
  border: 1px solid #000;
}
</style>