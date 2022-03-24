# 手写常见代码
## reduce链式获取对象属性值
```js
let obj = {
    a:{
        b:{
            c:"helloKitty"
        }
    }
}
let a = ['a','b','c'].reduce((accu,item)=>{
    return accu[item]
},obj)

console.log(a);

```
## 浅拷贝
拷贝对象中的第一层属性，如果是引用数据类型，只拷贝地址

利用es6的扩展运算符
```js
    // 浅拷贝
    // 1,es6,扩展运算符
    function clone1(target) {
        // 如果是引用数据类型（对象，数组）
        if (target !== null && typeof target === "object") {
            if (Array.isArray(target)) {
                return [...target]
            } else {
                return { ...target }
            }
        } else {// 如果是基本数据类型或者函数
            return target
        }
    }
```
## 深拷贝

- 运用递归遍历方式，缓存以克隆的对象或数组

解决函数属性丢失和循环引用会报错两个问题
```js
    // 强化二
    // 解决函数属性丢失(运用递归遍历)
    // 解决循环引用会报错问题(deepClone2(p),Uncaught RangeError: Maximum call stack size exceeded)
    // 将克隆的相同对象缓存起来
    function deepClone3(target,map = new Map()){
        // 如果是引用数据类型（对象，数组）
        if (target !== null && typeof target === "object") {
            if(map.get(target)){
                return map.get(target)
            }
            let cloneTarget = Array.isArray(target) ? [] : {}
            // 设置缓存对象
            map.set(target,cloneTarget)
            for (let key in target) {
                // 自身对象上的属性，不能是对象原型中的属性
                if (target.hasOwnProperty(key)) {
                    cloneTarget[key] = deepClone3(target[key],map)
                }
            }
            return cloneTarget
        } else {// 如果是基本数据类型或者函数
            return target
        }
    }
    let p = { a: 1, b: 2, c: [1, 2, 3], d: { a: 1 } }
    p.c.push(p.d)
    p.d.xx = p.c
    console.log(deepClone3(p) === p);
```

## 数组扁平化

```js
let arr = [1, 2, 3, [4, 5, 6, [7, 8, [9, 10, 11]]]];
arr.flat(Infinity);
```
toSting，split

如果都是数字，可再进行遍历讲字符串转为数字
```js
let arr = [1, 2, 3, [4, 5, 6, [7, 8, [9, 10, 11]]]];
arr.toString().split(',')
```
三点运算符

```js
function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        // 会将数组和非数组合并到一起
        arr = [].concat(...arr);
    }
    return arr;
}
```

## 真正的冒泡排序
```js
        function bubbleSort(array) {
            // 1.获取数组的长度
            var length = array.length;

            // 2.反向循环, 因此次数越来越少
            // 循环length - 1 次
            // 外面是从右往左
            for (var i = length - 1; i >= 0; i--) {
                // 3.根据i的次数, 比较循环到i位置
                // 这才是冒泡排序！！
                // 里面是从左往右
                for (var j = 0; j < i; j++) {
                    // 4.如果j位置比j+1位置的数据大, 那么就交换
                    if (array[j] > array[j + 1]) {
                        // 交换
                        // const temp = array[j+1]
                        // array[j+1] = array[j]
                        // array[j] = temp
                        // 数组结构赋值，秒呀
                        [array[j + 1], array[j]] = [array[j], array[j + 1]];
                    }
                }
            }

            return array;
        } 
        console.log(bubbleSort([6,7,2,8,6]));
```

## 模板编译函数
最为精妙之处: 利用new Function（）将普通字符串转为木板字符串。
```js
function compile(template) {
    template = template.replace(/\{\{(.+)\}\}/g, (x, key) => {
        return "${" + key + "}"
    })
    let returnStr = ''
    // 最为精妙之处: 利用new Function（）将普通字符串转为模板字符串。
    const fnBody = "with(obj){ returnStr = `" + template + "` }; console.log(returnStr); return returnStr"
    return new Function("obj", fnBody)
}
compile('<div>{{a}}</div>')({ a: "aValue" })
```

## 防抖与节流
节流是多次只执行一次，节省流量。

防抖更厉害了，只执行最后一次。
```js
// 防抖
function debounce(fn, delay) {
    let timer = null
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
// 节流
function throttle(fn, delay) {
    let past = 0;
    return (...args) => {
        const now = + new Date()
        if (now - past > delay) {
            past = now
            fn.apply(this, args)
        }
    }
}

function testLog(){
    console.log('123');
}
const dFn = debounce(testLog,500)
const tFn = throttle(testLog,1000)
setInterval(()=>{
    tFn()
},10)
```