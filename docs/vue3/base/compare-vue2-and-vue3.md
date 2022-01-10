# 比较vue2和vue3的响应式
vue2
```
核心:
对象: 通过defineProperty对对象的已有属性值的读取和修改进行劫持(监视/拦截)
数组: 通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持

Object.defineProperty(data, 'count', {
    get () {}, 
    set () {}
})

问题
对象直接新添加的属性或删除已有属性, 界面不会自动更新
直接通过下标替换元素或更新length, 界面不会自动更新 arr[1] = {}
```

vue3
```
核心:
通过Proxy(代理): 拦截对data任意属性的任意(13种)操作, 包括属性值的读写, 属性的添加, 属性的删除等...
通过 Reflect(反射): 动态对被代理对象的相应属性进行特定的操作

其中Reflect和Object类似，只不过Reflect操作数据会返回一个bool值来判断是否成功；Object若操作失败会抛出异常，终止程序运行，而try-catch又很麻烦，这对框架作者来说是致命的；
```
例如：
```html

  <script>
    //
    const user = {
      name: "John",
      age: 12
    };
    //
    const proxyUser = new Proxy(user, {

      get(target, prop) {
        console.log('读取')
        return Reflect.get(target, prop)
      },

      set(target, prop, val) {
        console.log('设置')
        return Reflect.set(target, prop, val); // (2)
      },

      deleteProperty (target, prop) {
        console.log('删除')
        return Reflect.deleteProperty(target, prop)
      }
    });

    proxyUser.name // 输出 '读取'
    
    proxyUser.name // 输出 '设置'
    
    proxyUser.sex = 'secret' // 添加不存在的属性，还是输出 '设置'

    delete proxyUser.sex // 输出 '删除'

  </script>

```