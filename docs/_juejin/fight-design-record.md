# Fight Design 记录

## 组件是如何一次性全部注册的？

写好的组件是在哪里注册的？

以button组件为例。它位于fighting-design/button/下。

其中fight-design/button/index.ts长这样：

```ts
// 引入button.vue组件
import Button from './src/button.vue'

// 注册组件的一个方法，接收一个组件作为参数,返回值类型为 vue的插件类型和组件本身的类型
import { install } from '../_utils'

// 执行install方法（在组件上加了个注册自己的方法，然后返回组件本身）
export const FButton = install(Button)

// 导出重命名为ButtonInstance的Button组件实例类型
export type ButtonInstance = InstanceType<typeof Button>

// 先引入，后导出类型
export * from './src/interface.d'

// 默认导出Button组件
export default Button
```

install方法

```ts
/**
 * 注册组件
 * @param main 组件实例
 * @return { InstallType<T> }
 */
export const install = <T>(main: T): InstallType<T> => {
  (main as InstallType<T>).install = (app: App): void => {
    const { name } = main as unknown as { name: string }
    app.component(name, main as InstallType<T>)
  }
  return main as InstallType<T>
}
```

然后在fighting-design/components.ts文件中，会集中导入再导出组件的安装插件和接口，

相当于一个中转站。

```ts
export { FBreadcrumbItem } from './breadcrumb-item'
export * from './breadcrumb-item'

// 导入组件的安装插件
export { FButton } from './button'
// 导入组件接口
export * from './button'

export { FButtonGroup } from './button-group'
export * from './button-group'
```

然后在fighting-desin/defaults.ts文件中，定义了一个安装所有组件的方法

```ts
// 导入所有组件的注册插件
import * as components from './components'
// 导入package.json中的版本号
import { version } from './package.json'
// 导入vue的App类型
import type { App } from 'vue'
// 导入注册所有组件方法的接口
// export interface AppInstallInterface {
//   (app: App): App
// }
import type { AppInstallInterface } from './_interface'

// 定义注册所有组件的方法install
const install: AppInstallInterface = (app: App): App => {
  Object.entries(components).forEach(([key, value]): void => {
    // https://cn.vuejs.org/api/application.html#app-component
    app.component(key, value)
  })

  // 挂载全局组件
  app.config.globalProperties.FMessage = components.FMessage
  // 
  app.config.globalProperties.FNotification = components.FNotification
  return app
}

export default {
  version,
  install
}

```

最后在fighting-design/index.ts文件里，引入注册所有组件的installer方法，并默认导出。

引入并导出所有组件的类型接口

```ts
import installer from './defaults'

export * from './components'

export default installer
```

再在最后，在某个地方安装一下这个插件就可以了

```ts
app.use(FightingDesign)
```


## 组件是如何按需引入的？

## 组件的样式需要作初始化处理吗？
比如所有的标签盒模型都为border-box，ul、li没有默认的样式




