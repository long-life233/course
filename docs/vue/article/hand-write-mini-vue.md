# 手写mini-vue

## 整体工作流程
1. 编译器将视图模板编译为渲染函数
2. 数据响应模块根据数据对象生成响应式数据
3. 视图渲染
    1. RenderPhase:渲染函数生成虚拟dom
    2. MountPhase:根据虚拟dom生成html视图
    3. PathPhase:执行渲染函数生成新的虚拟dom，做dom diff更新视图。

## 三大模块

1. 数据响应式模块
    允许我们创建能够监听其变化的js响应式对象。
    allows us to create JavaScript reactive objects that can be watched for changes。
2. 编译模块
    将html的template模板编译为渲染函数
3. 渲染模块
    渲染模块有三个周期将视图渲染到页面上。
    1. render Phase，渲染函数返回虚拟dom
    2. mount Phase，将虚拟dom渲染为html视图
    3. patch Phase，将新的虚拟dom做diff更新

## MVVM原型
在数据和视图中间，增加了一个vm层，监听数据和视图的变化。

实现最简MVVM，但代理对象的属性发生改变时，触发set，执行effect里保存的render函数;render传入的参数（setupResult，container）是对象类型，引用始终在；
<img src="https://static01.imgkr.com/temp/fe93ace9c079435b961e012a9945dca9.jpg" />
```html
<body>
    <div id="app"></div>
    <script type="importmap">
        {
          "imports": {
            "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
          }
        }
      </script>
    <script type="module">
        import { h } from 'vue'
        let effect;
        const App = {
            template: `<div id="div"></div>
                      <button id="button">button</button>
            `,
            setup() {
                const state = new Proxy({ name: "tom", age: 19 }, {
                    get(target, p, receiver) {
                        // target: 被代理对象
                        // p: 访问属性
                        // receiver：代理对象
                        return Reflect.get(target, p)
                    },
                    set(target,p,value,receicer) {
                        effect()
                        return Reflect.set(target,p,value)
                    }
                })
                
                const clickFn = () => {
                    state.age++
                }
                return { state, clickFn }
            }
        }

        const Vue = {
            createApp(App) {
                const compile = (template) => {
                    // 版本一：直接在渲染函数里生成html
                    return (content,dom)=>{
                        dom.innerHTML = ""
                        let div = document.createElement("div")
                        div.innerHTML = content.state.age;
                        let button = document.createElement("button")
                        button.innerHTML = "button"
                        button.onclick=content.clickFn
                        dom.appendChild(div)
                        dom.appendChild(button)
                    }
                }
                // 返回渲染函数
                const render = compile(App.template)
               

                const { state, clickFn } = App.setup()
                return {
                    mount(container) {
                        container = document.querySelector(container)
                        container.innerHTML = ""
                        let setupResult = App.setup()
                        effect=()=>{render(setupResult,container)}
                        render(setupResult,container);
                    }
                }
            }
        }
        const { createApp } = Vue;
        createApp(App).mount("#app")
    </script>
</body>
```


```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div id="app"></div>
    <script>
        // 定义一个Vue对象
        const Vue = {
            // 具有createApp方法，传参config，约等于rootComponent根组件
            createApp(config) {
                // 编译函数，传参模板，返回函数（传参响应式数据，挂载节点）
                const compile = (template) => (content, dom) => {
                    // 这其实是渲染函数
                    // 重新渲染，清空挂载节点内容
                    dom.innerText = "";
                    // 真实情况是渲染函数根据content响应式数据，生成渲染函数返回虚拟节点；
                    // 然后mountElement函数根据虚拟节点渲染出真是dom；
                    // 当响应式数据改变时，会重新触发渲染函数，渲染出新的虚拟节点
                    // mountELment函数会判断是否是首次将虚拟dom转为真实dom；如果不是，
                    // 将会对新老的xulidom采用diff算法，高效更新对应的dom元素
                    let input = dom.querySelector("input")
                    input = document.createElement("input");
                    // input框添加keyup事件
                    input.addEventListener("keyup", function () {
                        content.state.message = this.value;
                    })
                    // input框设置value值
                    input.setAttribute("value", content.state.message+"hello");
                    // 挂载节点插入input框
                    dom.appendChild(input);

                    // 创建button标签
                    let button = dom.querySelector("button");
                    button = document.createElement("button");
                    // 添加点击事件
                    button.addEventListener("click", () => {
                        return content.click.apply(content.state);
                    })
                    // 改变button的内容
                    button.innerText = content.state.message+"!!!";
                    // 插入进挂载节点中
                    dom.appendChild(button);
                }
                // 生成渲染函数
                // 传参响应式数据，挂载节点
                const render = compile(config.template);

                // 返回对象
                return {
                    // 有个属性为挂载函数，传参挂载节点
                    mount:function(container){
                        // 获取到挂载节点
                        const dom = document.querySelector(container);
                        // 获取到App组件的响应式数据
                        const setupResult = config.setup();
                        // 赋值响应式函数，当响应式数据发生变更时，会触发执行响应式想函数
                        effective=()=>render(setupResult,dom);
                        render(setupResult,dom);
                    }
                }
            }
        }
        // 定义响应式函数
        let effective;
        // App组件，包含模板，setup函数（返回响应式数据）
        const App = {
            // 视图
            template: `
                <input v-model="message"/>
                <button @click='click'>{{message}}</button>
            `,
            setup(){
                // 数据劫持
                const state = new Proxy(
                    {
                        message:"Hello Vue3!!",
                    },
                    {
                        set(target,key,value,receiver){
                            const ret = Reflect.set(target,key,value,receiver);
                            // 触发函数响应
                            effective();
                            return ret;
                        }
                    }
                )
                const click = ()=>{
                    state.message = state.message.split("").reverse().join("");
                }
                return {state,click};
            }
        }

        // 结构出Vue的createApp函数，作用（传参App组件，返回一个对象可继续.mount函数挂载根节点）
        const {createApp} = Vue;
        createApp(App).mount("#app");
        /**
         * 总结：
         * Vue对象暴露一个属性createApp函数，传参App组件
         * 
         * 它会将App组件的模板进行编译，并生成渲染函数。
         * 渲染函数会根据边以后的模板和响应式数据返回虚拟节点。
         * 
         * createApp函数会返回一个对象，里面有个属性方法mount，传参单页应用的挂载节点。
         * 它会执行渲染函数和响应式函数。响应式函数的作用是当响应式数据发生变化时，重新触发执行渲染函数，
         * 返回新的虚拟dom，然后mountElement函数会通过diff算法高效更新dom视图。
         *
        **/
    </script>
</body>
</html>
```