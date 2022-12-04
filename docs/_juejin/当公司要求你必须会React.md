## 前言

作为一个重度Vue使用者，在学习使用React时难免有些不适应，甚至有点急躁。

但时事变迁，现在不学React，找工作真的很难呀。

所以纵使React再不好学，也要熟练运用它。

毕竟编程就是这样，有些语言可能不太好理解，不过既然你不是框架开发者，只能适应它。

## 思想方面

学React的时候，就先把Vue给忘掉。

不要急，慢慢来。

## 正文

如果看不懂，可以跳着看，先把能看懂的吸收掉。

### useEffect

说实话，我当时对这个 useEffect 是一点也没搞明白，什么玩意儿！但要是理解了 React 函数式组件的渲染逻辑，就不会那么懵逼了。

React 函数式组件不像 class 组件，假设你在函数式组件里定义了一个方法，那么每次重新渲染时都会定义一个新的方法，与之前方法的引用并不相同。

而在 class 组件里定义一个方法，它的引用是不会变的，重新渲染也只是重新执行了 render 方法。

如果你正在学习 React，并且也对 useEffect 充满疑惑，一定要看看 Dan 写的这篇文章！[useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/#tldr)

```js
import {  useState } from "react";

// let a = 1

export function Login(props: any) {
  const [count, setCount] = useState(0); 

  function say () {
    let a = 1
    console.log('Hello Vue and React, are you ok ?', a ++);
  }
  say()

  return (
    <>
      <button onClick={() => setCount(count + 1)}>加1，count：{count}</button>
    </>
  );
}
```

### useState、useMemo、useCallback、React.memo

这里想想阐述的是，每次 React 改变state，函数式组件都会重新执行一遍，它的子组件也会跟着重新执行一遍。

如果想让它的子组件不会重新执行一遍，可以使用 React.memo 包裹子组件，它会使用 Object.is 来对比前后的 prop 是否相同，
不同就会重新渲染子组件。

在这里，我写了一个名为 Login 的组件（名字不重要，jy），它使用到了 Test 组件。

```js
import { useCallback, useMemo, useState } from "react";
import Test from "components/test";

export function Login(props: any) {
  const [count, setCount] = useState(0); 

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  // Test 组件执行一遍
  const data = useMemo(() => ({
    lalala: count
  }), [])

  // Test 组件首次会执行一遍，之后每次 count 加1，Test 组件都会执行一遍
  // const data = useMemo(() => ({
  //   lalala: count
  // }), [count])

  // Test 组件首次会执行一遍，在 count 为3或4的时候会执行一遍
  // const data = useMemo(() => ({
  //   lalala: count
  // }), [count === 3])

  return (
    <>
      <button onClick={() => handleClick()}>加1，count：{count}</button>
      <Test suibian={data}   />
    </>
  );
}
```

Test 组件如下

```js
import React  from 'react';

function Test(props: any) {
  console.log('Test函数组件执行了一遍');

  return <button>Test</button>
}

export default React.memo(Test)
```

### useCallback

现在我只有一个 Login 组件（不要在意名字，jym）。

为什么出现下面这种情况？

第一种情况依赖是个空数组，useCallback 它会将传入的函数进行保存，且它永远不会更新。
再由于闭包，传入的函数里所获取到的 count 值永远都是 0。所以每次点击按钮传入 setCount 的值其实都是1。

第二种情况以为传入了 count 依赖，在 count 变化后，useCallback 里的函数也会重新定义，拿到本次执行 Login 函数时定义的 count 值。
此时的 count 值为最新值。

```js
import { useCallback, useState } from "react";

export function Login(props: any) {
  const [count, setCount] = useState(0); 

  // 点击按钮后，count 加1，之后永远都为1了。
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, []);

  // 每次点击按钮，count 都会加1
  // const handleClick = useCallback(() => {
  //   setCount(count + 1);
  // }, [count]);

  return (
    <>
      <button onClick={() => handleClick()}>加1，count：{count}</button>
    </>
  );
}
```

### React 实现计算属性

使用类的 getter 来实现计算属性，不过实现不了缓存。

```js
class Example extends Component {
  state = {
    firstName: '',
    lastName: '',
  };

  // 通过getter而不是函数形式，减少变量
  get fullName() {
    const { firstName, lastName } = this.state;
    return `${firstName} ${lastName}`;
  }

  render() {
    return <Fragment>{this.fullName}</Fragment>;
  }
}
```

如果要实现缓存，可以使用 memoize-one 库，它本质是一个高阶函数，会对传入的参数作前后对比。如果与上次传入的参数相同，就返回上次缓存的结果。
否则根据新的入参重新计算返回值。

```js
import memoize from 'memoize-one';
import React, { Fragment, Component } from 'react';

class Example extends Component {
  state = {
    firstName: '',
    lastName: '',
  };

  // 如果和上次参数一样，`memoize-one` 会重复使用上一次的值。
  getFullName = memoize((firstName, lastName) => `${firstName} ${lastName}`);

  get fullName() {
    return this.getFullName(this.state.firstName, this.state.lastName);
  }

  render() {
    return <Fragment>{this.fullName}</Fragment>;
  }
}
```

如何用 React Hooks 实现计算属性呢？使用 useMemo 钩子。

```js
import React, { useState, useMemo } from 'react';

function Example(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // 使用 useMemo 函数缓存计算过程
  const renderFullName = useMemo(() => `${firstName} ${lastName}`, [
    firstName,
    lastName,
  ]);

  return <div>{renderFullName}</div>;
}
```
