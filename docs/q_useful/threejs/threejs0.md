# threejs 学习
曦月风尘老师

gitee地址：

shiotsukikaedesari.gitee.io
## 启动项目
```shell
# 1 , 注意选择vue-ts
npm create vite@latest
# 2 
npm i three
npm i --save-dev @types/three
```
## 资源
官方文档[https://threejs.org/docs/index.html]

## three与vue对接
```ts
import {WebGLRenderer} from 'three'
export class TEngine{
    private dom:HTMLElement
    private renderer:WebGLRenderer
    constructor(dom:HTMLElement){
        this.dom = dom
        this.renderer = new WebGLRenderer()
        dom.append(this.renderer.domElement)
        // ，设为true允许改变canvas画面
        this.renderer.setSize(dom.offsetWidth,dom.offsetHeight,true)
    }
}
```
app.vue
```vue
<script setup lang="ts">
import {TEngine} from "./assets/ts/TEngine.ts"
import {ref,onMounted} from "vue"

const threeTarget = ref(null)
onMounted(()=>{
  new TEngine(threeTarget.value)
})
</script>

<template>
  <div class="three-canvas" ref="threeTarget"></div>
</template>

<style>
.three-canvas {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>

```
## 渲染一个立方体

## 渲染一个有颜色的立方体

## 增加场景辅助

## 让场景动起来

## 添加性能监视器

## 添加轨道控制器

## 添加抗锯齿处理
```ts
        this.renderer = new WebGLRenderer({
            antialias: true
        })
```
## 丰富场景物体，进行项目模块切分

## 添加点光源，让物体更真实

## 添加光源辅助，可视化光源调适

## 让物体产生阴影

## 感受一下pbr材质

## 加载外部贴图

## 添加物体变换控制器

## 物体拾取与射线生成器

## 解决物体变换的bug
当用物体变换控器控制物体后，再次点击变换控制器操作会失效。

原因是mouseDown，mouseUp，click的区别（执行先后顺序）。

我们是监听的click事件来拾取物体。当操作变换控制器松手时会触发click，把变换控制器本身给选择到了，变换的就不是原来的物体。

## 避免选择到变换控制器

## 不要选择到辅助轴
有个虚拟方法，可以将其指控，射线就不会选择到了
```ts
axesHelper.raycast = ()=>{}

// fasle。是否只选择第一层物体
const intersection = raycaster.intersectObjects(this.scene.children,false)
```

## 改变变换控制器模式
监听键盘事件，改变它的模式。
## 增加物体自定义事件 
dispatch自定义派发事件
```ts
wall.addEventListener('mouseenter', () => {
  (wall.material as MeshStandardMaterial).color = new Color('red')
})

wall.addEventListener('mouseleave', () => {
  (wall.material as MeshStandardMaterial).color = new Color('white')
})
// =============
cacheObject.dispatchEvent({
    type: 'mouseleave'
})
```