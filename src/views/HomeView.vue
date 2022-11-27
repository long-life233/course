<script setup>
import { onMounted, reactive, watchEffect, ref, nextTick, toRaw, watch } from 'vue';
// import data from '../data.json'
const data = [{
    "id": 0,
    "url": "https://freenaturestock.com/wp-content/uploads/freenaturestock-2053-768x1152.jpg",
    "text": "0我是一段文字哈哈哈---1664293152407"
  },
  {
    "id": 1,
    "url": "https://freenaturestock.com/wp-content/uploads/freenaturestock-2046-768x399.jpg",
    "text": "1我是一段文字哈哈哈---1664293152407"
  },
  {
    "id": 2,
    "url": "https://freenaturestock.com/wp-content/uploads/freenaturestock-14-768x455.jpeg",
    "text": "2我是一段文字哈哈哈---1664293152408"
  },
  {
    "id": 3,
    "width": 768,
    "height": 235,
    "url": "https://freenaturestock.com/wp-content/uploads/freenaturestock-2000-768x235.jpg",
    "text": "3我是一段文字哈哈哈---1664293152408"
  }
]

const leftRef = ref(null)
const rightRef = ref(null)

const list = reactive(JSON.parse(JSON.stringify(data)))

const leftArr = ref([])
const rightArr = ref([])

onMounted(async () => {
  initOrLoadMore()
})

async function initOrLoadMore() {
  // 删除瀑布流
  // leftArr.value = list.filter(item => leftArr.value.find(item2 => item2 === item))
  // rightArr.value = list.filter(item => rightArr.value.find(item2 => item2 === item))
  const data = getDiffList()
  for(let item of data) {
    await render(item)
  }
}

function getDiffList() {
  let diffList = [];
  let total = list.length;
  let oldTotal = leftArr.value.length + rightArr.value.length;
  let diff = total - oldTotal;
  if (diff > 0) {
    // diffList = [...list].filter((item, index) => {
    //   return index >= oldTotal
    // })
    diffList = list.slice(oldTotal)
  }
  return diffList
}

async function syncLoadImg(src) {
  return new Promise(resolve => {
    const imgDom = new Image()
    imgDom.src = src
    imgDom.onload = () => {
      resolve(imgDom)
    }
  })
}

async function render(item) {
  const src = item.url
  const imgDom = await syncLoadImg(src)
  const width = imgDom.width
  const height = imgDom.height
  const leftContainerH = leftRef.value.getBoundingClientRect().height
  const rightContainerH = rightRef.value.getBoundingClientRect().height
  if(leftContainerH > rightContainerH) {
    rightArr.value.push({
      ...item,
      width,
      height
    })
  } else {
    leftArr.value.push({
      ...item,
      width,
      height
    })
  }
}

function add() {
  list.splice(list.length, 0, ...data)
}

function del() {

}

watch(list, initOrLoadMore)


// ============
</script>
<template>
  <div class="box">
    <div ref="leftRef" class="column">
      <div class="item" v-for="item in leftArr" :key="item.id" @click="del">
        <img :src="item.url" class="img" :style="`width: 100%;aspect-ratio: ${item.width / item.height}`" />
        <div>{{item.text}}</div>
      </div>
    </div>
    <div ref="rightRef" class="column">
      <div class="item" v-for="item in rightArr" :key="item.id">
        <img :src="item.url" class="img" :style="`width: 100%;aspect-ratio: ${item.width / item.height}`" />
        <div>{{item.text}}</div>
      </div>
    </div>
  </div>
  <button class="bg-red-800" @click="add">加</button>
</template>
<style scoped>
.box {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 300px;
  border: 1px solid red;
}

.column {
  width: 50%;
  
}

.item {
  border: 1px solid red;
}

.img {
  background-color: red;
  margin: 20px 0;
}
</style>

<!-- 

 -->