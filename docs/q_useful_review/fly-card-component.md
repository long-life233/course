# fly-card-component
vue仿知乎飞卡组件

```vue
<script setup>
  import { ref, reactive, onMounted } from 'vue'
  const card1Left = ref(0)
  // 松手后，并且卡片飞出去的判断变量
  const hasDrop = ref(false)
  const dropBack = ref(false)
  let innerX = 0
  const touchStart = (e) => {
    innerX = e.touches[0].clientX - e.target.offsetLeft
  }
  const touchMove = (e) => {
    card1Left.value = e.touches[0].clientX - innerX
  }
  const touchCancel = (e) => {
    if (-50 < card1Left.value && card1Left.value < 50) {
      card1Left.value = 0
      dropBack.value = true
      setTimeout(()=>{dropBack.value = false},400)
    } else if (card1Left.value < -50) {
      card1Left.value = -500
      _dropCard()
    } else if (card1Left.value > 50) {
      card1Left.value = 500
      _dropCard()
    }
    function _dropCard(){
      hasDrop.value = true
      setTimeout(()=>{
        card1Left.value = 0 // 复原第一张卡片
        hasDrop.value = false // 松手后，并且卡片飞出去的判断变量
        list.splice(0,1) // 把数据也要真的删除
      },400)
    }
  }

  // 测试数据
  const list = [
    'xxx',
    'xagags',
    '按时到噶是给俺儿我',
    'asdfasf',
    '13462456245',
    'qwerqwetewryr'
  ]
</script>

<template>
  <div class="out-container">
    <div class="container">
      <div class="card" @touchstart="touchStart" @touchmove="touchMove" @touchcancel="touchCancel"
        @touchend="touchCancel" :style="`left:${card1Left}px;z-index:4`"
        :class="[hasDrop?'card1 transition':'card1',dropBack?'transition':'']">
        {{list[0]}}
      </div>
      <div style="z-index:3" class="card" :class="hasDrop?'card1 transition':'card2'">{{list[1]}}</div>
      <div style="z-index:2" class="card" :class="hasDrop?'card2 transition':'card3'"></div>
      <div style="z-index:1" class="card" :class="hasDrop?'card3 transition':'card4'"></div>
    </div>
  </div>
</template>

<style scoped>
  .html,
  body {
    padding: 0;
    margin: 0;
  }
  .out-container{
    position: relative;
    overflow: hidden;
    height: 500px;
  }
  .container {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 240px;
    left: 0;
    right:0;
    margin: 0 auto; 
  }
  .transition{
    transition: opacity 0.4s ease-out, left 0.4s ease-out, top 0.4s ease-out, width 0.4s ease-out, transform 0.4s ease-out;
  }
  .card {
    width: 240px;
    height: 150px;
    background-color: #fff;
    position: absolute;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  }

  .card1 {
    /* width: 240px; */
    top: 0;
  }

  .card2 {
    /* width: 230px; */
    transform: scale(.9);
    top: 20px;
  }

  .card3 {
    /* width: 220px; */
    transform: scale(.8);
    display: block;
    top: 40px;
  }

  .card4 {
    transform: scale(.7);
    top: 60px;
    display: none;
  }
</style>
```