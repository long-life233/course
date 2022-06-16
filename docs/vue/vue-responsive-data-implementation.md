# 响应式数据实现的大致原理

使用官方api
```ts
import  {effect, reactive} from "@vue/reactivity"

let a = reactive({
    value:19
})

let b;
// effect函数，当回调里面的响应式数据发生变化时，再次执行回调
effect(()=>{
    b = a.value + 10
    console.log(b);
})

a.value = 29
```

名为reactivity.ts，导出effectWatch函数，reactivity函数
```ts
// 当前dep实例是否有依赖函数
let currentEffect:Function|null;
// dep类
class Dep {
    // 依赖函数集合
    effects: Set<Function>;
    // 当前dep的值（dep也就是一个响应式数据）
    _val:any;
    // 获取当前dep的值
    get value(){
        this.depend()
        return this._val
    }
    // 设置当前dep的值
    set value(newVal){
        this._val = newVal;
        this.notice()
    }
    // 实例dep时做两个操作，创建一个空的依赖集合，初始化值
    constructor(val:any){
        this.effects = new Set()
        this._val = val
    }
    // 1. 收集依赖
    depend(){
        if(currentEffect){
            this.effects.add(currentEffect)
        }
    }

    // 2. 触发依赖
    notice(){
        // 触发一下我们之前收集到的依赖
        this.effects.forEach(effect=>effect())
    }
}
export function effectWatch(effect:Function) {
    // 收集依赖
    currentEffect = effect
    effect()
    currentEffect = null
}
```
测试一下
```ts
// 测试
ref --> 很像了。
const dep = new Dep(10)

let b;

effectWatch(()=>{
    b = dep.value + 10
    // console.log(b);
})

// 值发生变更
dep.value = 20
```
最后，继续在这个文件中实现reactivity
```ts
// reactive
// dep -> number string
// object -> key -> dep

const depsMap = new Map();

function getDep(target:any, key:any) {
    // let depsMap = targetMap.get(target)
    // if(!depsMap){
    //     depsMap = new Map()
    //     targetMap.set(target,depsMap)
    // }
    let dep = depsMap.get(key)
    if(!dep){
        dep = new Dep(target[key]);
        depsMap.set(key,dep);
    }
    return dep;
}
export function reactive(raw:Object){
    return new Proxy(raw,{
        get(target,key){
            // key - dep
            // dep 我们存储在哪里
            const dep = getDep(target,key);

            // 依赖收集
            dep.depend();

            // return target[key]
            return Reflect.get(target,key)
            // return dep.value // 这里返回的是dep的值，那么改变代理的值时也要改变对应dep的值。
        },
        set(target,key,value){
            // 触发依赖
            // 要获取到dep
            const dep = getDep(target,key);
            Reflect.set(target,key,value)
            dep.notice();            
        }
    })
}
```
测试
```ts
let user  = reactive({
    age:19
})

effectWatch(()=>{
    console.log(user.age);
})
```

