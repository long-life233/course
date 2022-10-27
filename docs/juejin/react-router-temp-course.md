# react-router临时入门教程

创建react app

```js
npx create-react-app react-router-6-tutorial
```

安装react-router6

```js
npm install react-router-dom@6
```

## 使用

```js
import ReactDOM from 'react-dom'
import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App`

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
, document.getElementById('app))
```
App.js

```js
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
```

## 一个小案例

```js
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
}

const Home = () => {
  return <div>hello world</div>
}

const About = () => {
  return <div>这里是卡拉云的主页</div>
}

const Dashboard = () => {
  return <div>今日活跃用户: 42</div>
}

export default App;
```

## 获取当前页面路径hook

```js
import { useLocation } from 'react-router-dom'

const About = () => {
  // 使用 hook
  const location = useLocation();
  const { from, pathname } = location

  return <div>这里是卡拉云的网站，你当前在 {pathname}，你是从 {from} 跳转过来的</div>
}
```

## 设置404页面路径
```js
function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
}

// 用来作为 404 页面的组件
const NotFound = () => {
  return <div>你来到了没有知识的荒原</div>
}
```