# react项目练习

## 介绍

## 项目启航: 项目初始化与配置

### Create React App 初始化项目
安装 Node >= 14.0.0 和 npm >= 5.6

```shell
# 创建typescript版的react项目[--template typescript可选]
npx create-react-app react-jira-exercise --template typescript
```

### 配置 eslint、 prettier 和 commitlint 规范工程

tsconfig.json文件中
```json
{
  "compilerOptions": {
    "baseUrl": "./src", // 配置绝对路径路径从src目录下寻起
    // ...
  }
}

```
下载prettier
```shell
# 1
npm install --save-dev --save-exact prettier

# 2
echo {}> .prettierrc.json

# 3
创建.prettierignore文件
 写入
  # Ignore artifacts:
  build
  coverage

# 4 手动格式化命令
npx prettier --write .


# 5 工程化
npx mrm@2 lint-staged

在package.json中会新增这些代码：

  "devDependencies": {
    "husky": "^8.0.1",
    "lint-staged": "^13.0.3",
    "prettier": "2.7.1"
  },
  "lint-staged": {
    # "*.{js,css,md}": "prettier --write"
    # 需要进行扩展，因为我们是用react ts写的
    "*.{js,css,md,ts,tsx}": "prettier --write"
  }

# 6 如果使用了eslint，还需要下载 eslint-config-prettier 包
npm i -D  eslint-config-prettier

# 7 在package.json中配置
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest",
      # 新增，让eslint和prettier不会冲突。覆盖了一部分eslint的规则
      "prettier"
    ]
  },

# 8 此时把一个jsx文件的格式改乱一点，在提交，会发现已经被格式化了。
```

规范commit msg。

使用到commitlint包。

```shell
# 首先安装依赖
npm install --save-dev @commitlint/config-conventional @commitlint/cli

# Configure commitlint to use conventional config
# 注意不要在commitlint.config.js里写字符串。
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

# Install Husky v6
npm install husky --save-dev

# Activate hooks
npx husky install

# 写内容到文件.husky/commit-msg，不包括单引号。
# 还有windows平台，反斜杠去掉，不需要转意。
echo '
#!/bin/sh
. "\$(dirname "\$0")/_/husky.sh"

npx --no -- commitlint --edit ${1}
' > .husky/commit-msg

# 最后在git命令行里执行：
chmod a+x .husky/commit-msg
```

### 对比常见Mock方案，配置JSON SERVER

看官网。。

## React与Hook应用：实现项目列表

### 用JSX渲染开发工程列表页面(上)

搜索条件为负责人id和关键字
```JSX
import { useState } from "react"

export function SearchPanel() {
  // 搜索参数
  const [searchParam, setSearchParam] = useState({
    keyword: '',
    personId: ''
  })

  // 负责人列表
  const [personList, setPersonList] = useState([
    {
      name: '张三',
      id: '1'
    },
    {
      name: '李四',
      id: '2'
    }
  ])

  return (
    <>
      <input type="text" value={searchParam.keyword} onChange={e => setSearchParam({
        ...searchParam,
        keyword: e.target.value
      })}></input>

      <select value={searchParam.personId} onChange={e => setSearchParam({
        ...searchParam,
        personId: e.target.value
      })}>
        <option value={''}>负责人</option>
        {
          personList.map(item => <option value={item.id} key={item.id}>{item.name}</option>)
        }
      </select>
    </>
  )
}
```

### 用状态提升分享组件状态，完成工程列表页面(下)

```shell
1. 在create-react-app里，配置.env环境, 
比如：

REACT_APP_API_URL=http://localhost:3000

2. fetch的使用

3. react18的useEffect，当第二个参数为空数组时，会执行两次。

4. react中怎么实现想vue的watch监听属性

5. query-string我看比qs好用，可以跳过为null，‘’，undefined的值，将对象转化为query字符串。
```

### 学习使用自定义hook 

函数式组件里写防抖节流函数。

## JS神助攻-强类型
用Hook + TS + 泛型实现useArray，要求如下：
```js

const {value, clear, removeIndex, add} = useArray(person)

function useArray(arr: Array<T>) {
  const [value, setValue] = useState(arr)

  function clear(index: number) {
    const copy = [...arr]
    copy.length = 0
    setValue(copy)
  }

  // 其他方法类似

  return {
    value,
    clear
  }
}
```

## 安装和使用antd组件库

