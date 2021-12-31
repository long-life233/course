### 资料 

官网
https://v3.cn.vuejs.org/

笔记
https://24kcs.github.io/vue3_study/
https://juejin.cn/post/7023275396388880414

视频
typescript+vue3
https://www.bilibili.com/video/BV1ra4y1H7ih
vue2+vue3
https://www.bilibili.com/video/BV1Zy4y1K7SH

### 创建vue3项目
使用脚手架创建

### 组合式API


### defineComponent函数
```html
<script lang="ts">
    // defineComponent函数，目的是定义一个组件，内部可以传入一个配置对象
    import { defineComponent } from 'vue'
    // 暴露出去一个定义好的组件
    export default defineComponent({
        // 当前组件的名字是App
        name: 'App'
    })
</script>
```

### setup

新的option选项，值为一个函数，所有的组合API函数都在此使用，只在初始化时执行一次

函数会返回一个对象，模板可以直接使用对象中的第一层属性

例如：
```html
<template>
  a的值为：{{a}}
  obj中的b为：{{obj.b}}
</template>
<script>
export default {
//   data(){
//       // 还能使用vue2的写法
//       return {}
//   },
  setup(){
    let a = 10
    let obj = {
        b:20
    }

    return {
      a,
      obj
    }
  }
};
</script>
```

### ref

把一个数据变成引用对象，原来的数据在这个引用对象的value属性中；

更改引用对象的value属性，会触发视图的响应式更新。

这个数据可以是基本数据类型（number，boolean）、引用类型（Object，Array，Function）

```html
<template>
  <h2>{{count}}</h2>
  <hr>
  <button @click="updateCount">更新计数</button>
</template>

<script>
import {ref} from 'vue'
export default {
  setup () {
    // 定义响应式数据 ref对象
    const count = ref(1)
    // console.log(count) // refImpl引用实现

    function updateCount () {
      // 如果只是简单的对象，修改后不会触发模板数据的更新
      // 但count是响应式数据（基本数据类型的原理是defineProperty）
      count.value = count.value + 1
    }

    return {
      count,
      update
    }
  }
}
</script>
```

### reactive
将一个对象（不能是基本数据类型）变为响应式数据；

原理是通过proxy；

`const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象`

操作proxy的属性都会触发模板的响应式更新（直接操作proxy把它的引用地址给改了，还触发啥响应式)
```html
<template>
  <h2>name: {{state.name}}</h2>
  <h2>age: {{state.age}}</h2>
  <h2>wife: {{state.wife}}</h2>
  <hr>
  <button @click="update">更新</button>
</template>

<script>
import {reactive} from 'vue'
export default {
  setup () {
    const state = reactive({
      name: 'tom',
      age: 25,
      wife: {
        name: 'marry',
        age: 22
      },
    })
    const update = () => {
      state.name += '--'
      state.age += 1
      state.wife.name += '++'
      state.wife.age += 2
    }

    return {
      state,
      update
    }
  }
}
</script>
```

### 比较vue2和vue3的响应式
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
### setup细节
1. 在beforeCreate钩子之前执行；此时组件对象还没有创建

2. 不能使用this

3. 返回一个对象，模板可以直接使用对象里的第一层属性/方法

4. 不能是async函数；因为这会导致返回的对象是promise，使模板看不到对象中的属性数据

5. setup参数
    `setup(props,context) / setup(props,{attrs,slots,emit})`
    
    - props:组件选项中声明接收的props
    - attrs: 包含没有在props配置中声明的属性的对象, 相当于 this.$attrs
    - slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
    - emit: 用来分发自定义事件的函数, 相当于 this.$emit
    

### 计算属性与监视函数

一个代码弄明白
```html
<template>
  <h2>App</h2>
  fistName: <input v-model="user.firstName"/><br>
  lastName: <input v-model="user.lastName"/><br>
  fullName1: <input v-model="fullName1"/><br>
  fullName2: <input v-model="fullName2"><br>
  fullName3: <input v-model="fullName3"><br>
</template>

<script>
import {
  reactive,
  ref,
  computed,
  watch,
  watchEffect
} from 'vue'

export default {

  setup () {
    const user = reactive({
      firstName: 'A',
      lastName: 'B'
    })

    // 只有getter的计算属性

    // computed(callback),返回一个响应式数据
    const fullName1 = computed(() => {
      console.log('fullName1')
      return user.firstName + '-' + user.lastName
    })

    // 有getter与setter的计算属性

    // computed(callback),返回一个响应式数据
    const fullName2 = computed({
      get () {
        console.log('fullName2 get')
        return user.firstName + '-' + user.lastName
      },

      set (value: string) {
        console.log('fullName2 set')
        const names = value.split('-')
        user.firstName = names[0]
        user.lastName = names[1]
      }
    })

    const fullName3 = ref('')

    
    // watchEffect: 监视所有回调中使用的响应式数据
    
    watchEffect(() => {
      console.log('watchEffect')
      fullName3.value = user.firstName + '-' + user.lastName
    }) 

    
    // 使用watch的2个特性:,深度监视,初始化立即执行
    
    // watch(target,callback,configObject)
    watch(user, () => {
      fullName3.value = user.firstName + '-' + user.lastName
    }, {
      immediate: true,  // 是否初始化立即执行一次, 默认是false
      deep: true, // 是否是深度监视, 默认是false
    })


    // watch一个数据,默认在数据发生改变时执行回调

    watch(fullName3, (value) => {
      console.log('watch')
      const names = value.split('-')
      user.firstName = names[0]
      user.lastName = names[1]
    })


    // watch多个数据: 
    //   使用数组来指定
    //   如果是ref对象, 直接指定
    //   如果是reactive对象中的属性,  必须通过函数来指定

    watch([() => user.firstName, () => user.lastName, fullName3], (values) => {
      console.log('监视多个数据', values)
    })

    return {
      user,
      fullName1,
      fullName2,
      fullName3
    }
  }
}
</script>
```

### 生命周期
```js
beforeCreate -> 使用 setup()
created -> 使用 setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted
errorCaptured -> onErrorCaptured
```

### 自定义hook
相当于vue2中的mixin(其实就相当于把setup中的一部分代码抽离出去，可以进行复用)

需求1: 收集用户鼠标点击的页面坐标

hooks/useMousePosition.ts
```js
import { ref, onMounted, onUnmounted } from 'vue'
/* 
收集用户鼠标点击的页面坐标
*/
export default function useMousePosition () {
  // 初始化坐标数据，注意这里是响应式的
  const x = ref(-1)
  const y = ref(-1)

  // 用于收集点击事件坐标的函数
  const updatePosition = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }

  // 挂载后绑定点击监听
  onMounted(() => {
    document.addEventListener('click', updatePosition)
  })

  // 卸载前解绑点击监听
  onUnmounted(() => {
    document.removeEventListener('click', updatePosition)
  })

  return {x, y}
}
```
在其它页面中引入这个hook,然后使用
```html
<template>
<div>
  <h2>x: {{x}}, y: {{y}}</h2>
</div>
</template>
<script>
import {ref} from "vue"
import useMousePosition from './hooks/useMousePosition'
export default {
  setup() {
    // 这里的x，y是响应式数据；改变x，y会触发视图更新；
    const {x, y} = useMousePosition()
    return {
      x,
      y,
    }
  }
}
</script>
```
### toRefs
把一个响应式对象变成一个普通对象并把它的第一层属性变成响应式的。可以简化模板上`.`的操作

举例：
不用toRefs
```html
<template>
  <h3>name: {{person.name}}</h3>
  <h3>age: {{person.age}}</h3>
</template>
<script>
import { reactive } from 'vue'
export default {
  setup () {
    const person = reactive({
      name:'tom',
      age:19
    })
    return {
        person
    }
  }
}
</script>
```
使用toRefs
```html
<template>
  <h3>name: {{name}}</h3>
  <h3>age: {{age}}</h3>
  <h3>job1: {{job.job1}}</h3>
  <h3>job2: {{job.job2}}</h3>
</template>
<script>
import { reactive,toRefs } from 'vue'
export default {
  setup () {
    const person = reactive({
      name:'tom',
      age:19,
      job:{
          job1:'eat',
          job2:'sleep'
      }
    })
    return {
        ...toRefs(person),
        // name:person.name, // 这样是不行的，相当于：name:'tom'
        job:person.job, // 这样是可以的，改变数据会触发模板更新
    }
  }
}
</script>
```
如下是错误用法:
将会发现name，age根本没有变化（而{{person}}有变化），因为已经不是person里的name和age了

toRefs还是以前的引用，只不过多了一个响应式。
```html
<template>
  <h3>{{person}}<h3>
  <h3>name: {{name}}</h3>
  <h3>age: {{age}}</h3>
</template>
<script>
import { reactive,ref,onMounted } from 'vue'
export default {
  setup () {
    const person = reactive({
      name:'tom',
      age:19
    })
    onMounted(()=>{
        person.name += '---'
        person.age ++
    })
    return {
        person,
        name:ref(person.name),
        age:ref(person.age)
    }
  }
}
</script>
```

### shallowReactive和shallowRef
shallowReactive与shallowRef
  shallowReactive: 只处理了对象内最外层属性的响应式(改变第一层属性，会触发响应式)
  shallowRef: 创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的。（改变.value会触发响应式，但改变.value.xx不会触发响应式）
  例如：
```js
const foo = shallowRef({})
// 改变 ref 的值是响应式的
foo.value = {}
// 但是这个值不会被转换。
isReactive(foo.value) // false
```
总结:
  reactive与ref实现的是深度响应式, 而shallowReactive与shallowRef是浅响应式
  什么时候用浅响应式呢?
    一般情况下使用ref和reactive即可,
    如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
    如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef
```html
<template>
  <h2>App</h2>

  <h3>m1: {{m1}}</h3>
  <h3>m2: {{m2}}</h3>
  <h3>m3: {{m3}}</h3>
  <h3>m4: {{m4}}</h3>

  <button @click="update">更新</button>
</template>

<script lang="ts">
import { reactive, ref, shallowReactive, shallowRef } from 'vue'

export default {

  setup () {

    const m1 = reactive({a: 1, b: {c: 2}})
    const m2 = shallowReactive({a: 1, b: {c: 2}})

    const m3 = ref({a: 1, b: {c: 2}})
    const m4 = shallowRef({a: 1, b: {c: 2}})

    const update = () => {
      // m1.b.c += 1 // 触发响应式
      // m2.b.c += 1 // 不触发响应式

      // m3.value.a += 1 // 触发响应式
      m4.value.a += 1 // 不触发响应式
    }

    return {
      m1,
      m2,
      m3,
      m4,
      update,
    }
  }
}
</script>
```
### readonly 与 shallowReadonly
readonly:
深度只读数据
获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
只读代理是深层的：访问的任何嵌套 property 也是只读的。
shallowReadonly
浅只读数据
创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换
应用场景:
在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除
```html
<template>
  <h2>App</h2>
  <h3>{{state}}</h3>
  <button @click="update">更新</button>
</template>

<script lang="ts">
import { reactive, readonly, shallowReadonly } from 'vue'
/*
readonly: 深度只读数据
  获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
  只读代理是深层的：访问的任何嵌套 property 也是只读的。
shallowReadonly: 浅只读数据
  创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 
应用场景: 
  在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除
*/

export default {

  setup () {

    const state = reactive({
      a: 1,
      b: {
        c: 2
      }
    })

    // const rState1 = readonly(state)
    const rState2 = shallowReadonly(state)

    const update = () => {
      // rState1.a++ // error,只读
      // rState1.b.c++ // error，只读

      // rState2.a++ // error，只读
      rState2.b.c++ // 可以
    }
    
    return {
      state,
      update
    }
  }
}
</script>
```

### 新组件
```
Fragment(片段)  组件不用根标签了

Teleport（瞬移）子组件的内容跑到父组件某个标签下

Suspense（异步组件）当异步组件还未渲染出来的时候，用其它内容代替。
```

### toRaw,markRaw,toRef,customRef,provide/inject
官网。。。

### 响应式数据的判断
```
isRef: 检查一个值是否为一个 ref 对象
isReactive: 检查一个对象是否是由 reactive 创建的响应式代理
isReadonly: 检查一个对象是否是由 readonly 创建的只读代理
isProxy: 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理
```

### todoList练习
```
1.拆分组件

2.遍历数据并显示

你可能看不懂的地方一

      // 定义一个接口，约束state的数据类型
      export default interface Todo{
        id:number,
        title:string,
        isCompleted:boolean
      }

      const state = reactive<{todos:InterfaceTodo []}>({
        todos:[
          {id:1,title:'奔驰',isCompleted:false},
          {id:2,title:'宝马',isCompleted:true},
          {id:3,title:'奥迪',isCompleted:false},
        ]
      })

官方文档说法叫类型声明reactive
https://v3.cn.vuejs.org/guide/typescript-support.html#%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E-reactive

你可能没看不懂的地方二

      export default defineComponent({
          props: {
              // todo: Object as ()=> Todo // 函数返回的是Todo类型
              todo: {
                  type: Object as PropType<Todo>
              }
          }
      });
https://v3.cn.vuejs.org/guide/typescript-support.html#%E6%B3%A8%E8%A7%A3-props


3.todos添加数据

在app.vue中定义添加todo的方法，将方法作为属性传递给header组件
```