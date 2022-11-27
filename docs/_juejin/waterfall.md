
## 以前我也不懂

我以前也不会写瀑布流，以前我觉得瀑布流好难实现，然后就去网上找了一些瀑布流插件，但因为对它们内部实现原理的不清楚，担心不知道会从哪冒出来一个bug，使用的时候内心还是有点忐忑的。

而且有时候这个插件可能支持h5，但不支持小程序，我又得重新找插件。

还有就是有些瀑布流实现需要后端返回图片数据的同时返回图片的宽高，我感觉不太好，为了实现瀑布流，必须依赖后端。。。

于是我就想要是自己能实现一个瀑布流插件该有多好呀，虽然可能会费点时间。

但是只要理解了原理，以后业务真的需要使用到瀑布流，自己实现起来也重头开始想快。


## 废话不多说

我使用了vue3的script setup来写瀑布流（感觉用起来很顺手）。

我也对实现这个瀑布流有一些自己的想法，就是不依赖后端返回图片的宽高，不用关心容器的宽度，高度。

于是我写了这样一个方法，img的onload方法与Promise结合，再利用async、await，实现上一张图片加载完成获取到宽高后，再去加载下一张图片。
图片使用new Image加载出后，在其它地方再次加载该图片会直接走缓存，不用重复请求。
```js
async function syncLoadImg(src) {
  return new Promise(resolve => {
    const imgDom = new Image()
    imgDom.src = src
    imgDom.onload = () => {
      resolve(imgDom)
    }
  })
}
```

思路也是很简单。把用户传入的数据列表list，用for循环，从前到后，按顺序当这项的图片加载完成后，去获取瀑布流容器每一列的高度。

判断把这项加入到哪一列。

才去加载下一项。

不过也要考虑用户对传入list的修改。可能是修改、删除、新增，都要作不同的判断。

这里为了简单，假设瀑布流只是两列。看懂了后自己改成几列也非常简单。

准备了一些数据。data.json
```json
[
  {
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
```

因为我们需要获取瀑布流列的高度，所以必须等dom渲染完成后再去执行。所以我们在mounted钩子里初始化方法。

css部分的话用到了一个`aspect-ratio`属性，设置img元素的宽高比。这样当我设置图片的宽为100%时，只要知道了图片的宽高比，图片就不会变形。
```js
// 通过ref获取瀑布流的列，获取它们的高度
const leftRef = ref(null)
const rightRef = ref(null)

// 用户传入的数据列表list
const list = reactive(JSON.parse(JSON.stringify(data)))

// 瀑布流左边的列
const leftArr = ref([])
// 瀑布流右边的列
const rightArr = ref([])
```
```js
onMounted(async () => {
  initOrLoadMore()
})

async function initOrLoadMore() {
  // 如果用户删除瀑布流就剔除掉不存在的项。不过下面两行检测不出来list改变元素顺序，只能通过重新计算list来加入瀑布流了。
  leftArr.value = list.filter(item => leftArr.value.find(item2 => item2 === item))
  rightArr.value = list.filter(item => rightArr.value.find(item2 => item2 === item))
  // 获取新增的数据
  const data = getDiffList()
  for(let item of data) {
    // 利用async、await，当上一项渲染完了，再去渲染下一项。
    // 不用nextTick，照样能获取到最新的dom元素。
    await render(item)
  }
}
```
```js
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
```
```js
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
```
HTML
```html
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
```
CSS
```css
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
```
最后来个测试方法，测试一下
```js
function add() {
  list.splice(list.length, 0, ...data)
}
```

最后，该瀑布流肯定不是最好的，懒加载、万一数据顺序发生变化、图片加载失败，这些都没有处理。但是也提供了不用后端提供图片高度实现瀑布流的一种思路。

小伙伴们快去试一试吧。
