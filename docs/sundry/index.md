# 介绍

编程记录中的杂项

vue3文档
- doc/guide/Essentials 
    - Reactivity Fundamentals
    - Components Basics（OK）

vitepress文档
- Guide/Intorduction
    - Asset Handling(OK)

## 切换深色和浅色主题
主要使用API：
```js
// 媒体查询，系统是否使用深色主题？（return boolean）
const query = window.matchMedia(`(prefers-color-scheme: dark)`)

query.onchange = (e) => {
    log(e.matches)
}


const classList = document.documentElement.classList
classList[dark ? 'add' : 'remove']('dark')
```
对HTML根元素添加或删除dark类来切换主题。然后对很多元素(body,头部导航等等)来说，使用交集选择器（当html拥有dark类时）,设置背景为
```css
html.dark body{
    /* 定义css变量 */
    --vt-c-bg: var(--vt-c-black);
}
```
[-->了解css变量](https://www.ruanyifeng.com/blog/2017/05/css-variables.html)

还可以用js来操作获取css变量哟！

