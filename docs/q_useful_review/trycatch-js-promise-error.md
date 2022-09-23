# JavaScript中Promise的异常捕获问题怎么解决？

这篇文章参考了一篇有用的文章：https://www.yisu.com/zixun/722019.html

首先要明确`try catch`只能捕获同步代码，不能捕获异步代码。
```js
// 这段代码捕获不到错误
try {
  setTimeout(() => {
    throw Error('出错了')
  })
} catch (error) {
  console.log('这里不会被执行')
}

// 改为同步代码就可以了
try {
  throw Error('出错了')
} catch {
  console.log('会被执行')
}
```

Promise有自己的错误处理回调函数，也就是then方法的第二个参数。
```js
Promise.reject('error').then(() => {
  console.log('我不会被打印')
}, () => {
  console.log('会被打印')
})
```

我们一般不会这么写。因为try catch捕获不到错误，Promise自己会处理错误。
```js
try {
  Promise.reject('error').then(() => {
    console.log('我不会被打印')
  }, () => {
    console.log('会被打印')
  })
} catch (error) {
  // ...
  console.log('不会执行')
}
```

但是如果我们使用async、await，就没有类似then方法的第二个参数了。

```js
try {
  await Promise.reject('error')
} catch (error) {
  // ...
  console.log('会执行')
}
```

await 后面的值如果是一个Promise，会等它的状态改变，如果为成功状态，返回成功的值。如果为失败状态，会被try catch所捕获。

await 后面的值如果是非Promise，则直接返回该值。

综上所述，处理Promise的异常捕获，可以再Promise实例的then方法第二个参数里捕获，也可以利用async await配合try catch捕获。

