## 第一步，创建一个上下文对象

首先你要创建一个上下文对象，可以单独放在一个文件中。

然后传入的这个默认值，其实是可有可无的。

然而在ts文件里不传会给你报类型错误。这个问题一会后面再说。
```js
// 语法
const XXXContext = React.createContext(默认值)


import React from "react";

export const AuthContext = React.createContext({
  isLogin: false,
  login() {
  
  },
  logout() {
  
  }
})
```

## 第二步，使用XXXContext.Provider组件

这一步相当于把要共享的数据放到顶级组件中。

把要共享的数据放在value属性中。

注意这里的value值结构（也就是类型）要与我们创建上下文时传入的默认值相同。这个默认值的作用就是我们不是XXXContext.Provider组件时，它将作为共享的value。

```js
function App() {
  
  const [isLogin, setIsLogin] = useState(false)

  function login() {
    setIsLogin(true)
  }

  function logout() {
    setIsLogin(false)
  }

  const auth = {
    isLogin,
    logout,
    login,
  }

  return (
    <AuthContext.Provider value={auth}>
      <ProjectList />
      <div>||</div>
      <Login />
    </ AuthContext.Provider>
  )
}
```

## 第三步，使用XXXProvider.Consumer组件

使用了这个组件，无论在什么层级，都可以接收到XXXContext.Provider共享的数据了


AuthContext.Consumer组件内部写一个函数，可以通过参数拿到共享的数据。

返回JSX。
```js
export function TextComp() {
  return (
    <AuthContext.Consumer>
      {
      ({logout, isLogin}) => {
        return (
          isLogin &&<>
          <button onClick={logout}>退出登录</button>
          <button onClick={() => setCount(count + 1)}>加1</button>
          <button>{count}</button>
          </>
        )
      }
      }
    </AuthContext.Consumer>
  );
}

```