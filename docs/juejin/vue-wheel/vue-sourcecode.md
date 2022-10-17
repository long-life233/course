# 读vue源码的记录

## 准备读源码
去github把vue3的代码仓库拉下来。

在package.json中给dev脚本加上sourcemap参数，然后执行脚本。
```js
"dev": "node scripts/dev.js --sourcemap",
```

然后可以在下面这个路径中新建一个文件打开，在浏览器中进行断掉调试了。
```js
core/packages/vue/examples/composition/test.html
```
## 首次渲染过程

要渲染出下面这个界面，vue要做出哪些步骤呢？
```html
<script src="../../dist/vue.global.js"></script>

<div id="app">
  <h1>
    {{count}}
  </h1>
</div>
<script>
Vue.createApp({
  data() {
    return {
      count: 0    
    }
  }
}).mount("#app") // 在这里打上断点
</script>
```

## 然后进行调试


##### 执行mount('#app')方法，这里的mount方法是扩展过后的mount方法，会获取宿主的模板，清空宿主的innnerHTML

```js
export const createApp = ((...args) => {
  const app = ensureRenderer().createApp(...args)
  // ...
  const { mount } = app
  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
    // ...
    container.innerHTML = ''
    
    // 执行原生mount方法，如果是首次挂载，会创建根组件的虚拟dom，然后执行render方法
    const proxy = mount(container, false, container instanceof SVGElement)

    if (container instanceof Element) {
      container.removeAttribute('v-cloak')
      container.setAttribute('data-v-app', '')
    }
    return proxy
  }

  return app
}) as CreateAppFunction<Element>
```

##### mount方法内部
```js
    function createAppApi(render, hydrate) {
      return function createApp(rootComponent, rootProps) {
        const app = {
          use() {/** */},
          mixin() {/** */},
          component() {/** */},
          directive() {/** */},

          mount() {
            if (!isMounted) {
              // ...创建根组件的虚拟dom
              const vnode = createVNode(
                rootComponent as ConcreteComponent,
                rootProps
              )
              // ...

              if (isHydrate && hydrate) { // 如果是服务器渲染
                hydrate(vnode as VNode<Node, Element>, rootContainer as any)
              } else { // 会走这步
                // 执行renderer.ts里的render方法
                render(vnode, rootContainer, isSVG)
              }
              isMounted = true
              // ...
            } else if (__DEV__) {
              warn(
                `App has already been mounted.\n` +
                  `If you want to remount the same app, move your app creation logic ` +
                  `into a factory function and create fresh app instances for each ` +
                  `mount - e.g. \`const createMyApp = () => createApp(App)\``
              )
            }
          },

          unmount() {/** */},
          provide() {/** */}
        }
        
        return app;
      }
    }
```
##### renderer.ts里定义的名为render的内部方法

```js
  const render: RootRenderFunction = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true)
      }
    } else {
      // 调用同样定义在renderer.ts文件里的名为patch的内部方法
      patch(container._vnode || null, vnode, container, null, null, null, isSVG)
    }
    // 这三行代码是干什么的不知道
    flushPreFlushCbs()
    flushPostFlushCbs()
    container._vnode = vnode
  }
```
##### patch方法内部会经过一系列判断，执行以下定义在renderer.ts里且同级的方法：

```js
// 调用它
processComponent(
  n1,
  n2,
  container,
  anchor,
  parentComponent,
  parentSuspense,
  isSVG,
  slotScopeIds,
  optimized
)

// --->
    mountComponent(
      n2,
      container,
      anchor,
      parentComponent,
      parentSuspense,
      isSVG,
      optimized
    )
```

##### mountComponent方法内部
```js
  const mountComponent: MountComponentFn = (
    initialVNode,
    container,
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    optimized
  ) => {
    // ...
    // 初始化组件更新函数，创建数据更新副作用。
    setupRenderEffect(
      instance,
      initialVNode,
      container,
      anchor,
      parentSuspense,
      isSVG,
      optimized
    )

    // ...
  }
```
##### setupRenderEffect方法内部
```js
  const setupRenderEffect: SetupRenderEffectFn = (
    instance,
    initialVNode,
    container,
    anchor,
    parentSuspense,
    isSVG,
    optimized
  ) => {
    // 组件更新函数
    const componentUpdateFn = () => {
      if (!instance.isMounted) { // 如果没有被挂载

        if (el && hydrateNode) {
          // ...
        } else {
          // ...
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            isSVG
          )
          // ...
        }
        
      } else { // 更新
        // ...
        patch(
          prevTree,
          nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el!)!,
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        )
        // ...
      }
    }

    // 创建响应式副作用，传入参数组件更新函数
    const effect = (instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update),
      instance.scope // track it in component's effect scope
    ))

    const update: SchedulerJob = (instance.update = () => effect.run())

    // effect.run()方法最终其实执行的是componentUpdateFn方法。
    update()
  }
```
##### 给你们看看ReactiveEffect类
```js
export class ReactiveEffect<T = any> {
  constructor(
    public fn: () => T,
    public scheduler: EffectScheduler | null = null,
    scope?: EffectScope
  ) {
    // ...
  }

  run() {
    
    try {

      Effect(this)
      
      return this.fn()

    } finally {
      // ...
    }
  }

  stop() {

  }
}
```
##### 回归正题，接下来会执行componentUpdateFn方法，而它的主要作用是去执行patch方法。

咦，这里第二次出现了patch方法。第一次patch方法是在哪里被执行的呢？

没错，是原生mount方法里的render方法里，执行了patch方法。

那么这一会patch方法会去执行哪些方法呢？

会执行以下这些方法：

```js
// patch方法经过判断，会去执行renderer渲染器的

processElement()
// -->
  mountElement()
    // -->
      mountChildren() // 因为内部有多个标签元素,会循环执行mountElement方法
        // -->
         mountElement() 

```
