# Vue源码
村长github，57code，vue-interview

## 怎么看源码
```shell
克隆地址

npm i pnpm -g

删除popteer、@types/popteer依赖（体积大）

pnpm install

配脚本，dev脚本后加 --sourcemap

然后执行npm run dev 或者 pnpm dev

如果packages/vue/dist下有vue.global.js和vue.global.js.map，说明打包成功

renderer.ts里返回一个对象，
render函数：将vnode转换为真实dom，渲染到页面上（追加到宿主元素上）
hydrate函数，ssr，服务端将一个vnode渲染为html
createApp：工厂函数。生成vue实例。

setupRenderEffect机制
获取vnode
1、创建一个组件更新函数
    1.1 render获取vnode
    1.2 patch（oldnode，newnode）
2、创建更新机制：
    new ReactEffect（更新函数）
    会执行一下更新函数，对更新函数里面的响应式数据进行一个收集。当响应式数据修改时，会重新触发更新函数。

```

## vue3的初始化过程

ensureRenderer传入的options配置与平台相关。猜测可以重写以适应其它平台。

vue3怎么体现树摇的呢？vue2中在Vue构造函数上设置静态方法不能树摇。vue3将这些方法抽取为独立的函数。