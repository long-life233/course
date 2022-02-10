# vue3大概初始化流程

## 问题
- 初始工作？
```shell
- 首先删除popteer依赖，太大了

- pnpm i

- 配脚本 dev："node script/dev.js --sourcemap"

- pnpm dev
```

- renderer.ts里的patch函数的作用？
    比较n1，n2的虚拟节点，diff更新。
    如果n1，n2节点相同，直接返回。
    如果n2节点是文本类型，执行processText方法
    如果n2节点是注释类型，执行processCommentNode方法
    如果n2节点是元素类型，执行processElement方法，

    除此之外，这个文件里还定义了patchElement，mountChildren，patchProps，mountComponent，setupRenderEffect等方法

- renderer.ts里的baseCreateRenderer方法的作用是什么？
    该函数接收options对象（insert、remove），
    函数内部定义patch方法，
    render方法（里面执行patch方法）
    返回渲染方法render，
        和真正的createApp函数（接收rootComponent），返回mount属性方法，作用是根据rootComponent生成vnode，
        然后执行render(vnode)