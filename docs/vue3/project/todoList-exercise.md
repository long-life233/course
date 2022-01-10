## todoList练习1
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

4.todos鼠标移入高亮显示操作

定义一个flag

5.todos删除数据

在app.vue中定义删除todo的方法，使用provide/inject将方法作传递给item组件

6.全选全不选操作

在app里计算已选数，总数，是否全选；
把这些数据包在一个对象传给footer里。

7.清除所有选中数据

app里定义方法，传给footer

8.使用浏览器缓存

监视state.todos的变化，保存到localStorage中
```

## todoList练习2