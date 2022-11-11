# react

## 安装

## 核心概念

### HelloWorld
### JSX 简介
花括号`{}`里能使用js表达式（有返回值）,花括号里不能写js语句。

使用类使用className关键字

使用style行内样式使用双花括号key和value形式 `{d{key:value}}`

一种语法。类似下面这种形式：
```js
const element = <h1>Hello, world!</h1>;

const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```

### 元素渲染

```html
<!-- 假设html中有一个标签 -->
<div id="root"></div>

<!-- 将一个渲染节点渲染到root节点里 -->
<script>
  const root = ReactDOM.createRoot(
    document.getElementById('root')
  );
  const element = <h1>Hello, world{ + new Date()}</h1>;
  
  setInterval(() => {
    root.render(element);
  }, 1000);
</script>
```

### 组件、props

函数组件、class组件。

名字首字母必须大写。

props是只读的。类似纯函数不会对传入的参数进行修改。
```js
// 函数组件，接收props，返回props
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 类组件
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// 组件传参
<Welcome name="Sara" />
```

### state & 生命周期
使用state

就要把函数式组件改为class组件，继承React.Component, 添加一个空的render方法, 并添加一个类型为对象的state

使用state注意： setState的更新是异步的，所以当使用对象形式更新state时不要直接依赖他们的值来更新。
```js
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
而是使用函数形式: 
```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

```js
class Clock extends React.Component {
  // 或者在构造器中添加state
  // constructor(props) {
  //   super(props) // props不传可能会出现一个不大不小的问题。
  //   this.state = {
  //     a: 1,
  //     b: 2
  //   }
  // } 
  state = {
    date: new Date(),
    b: 2
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
挂载、卸载生命周期钩子
```js
class Clock extends React.Component {
  state = {
    date: new Date(),
    b: 2
  }
  // 挂载生命周期钩子
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000)
  }

  // 卸载生命周期钩子
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

```shell
卸载组件api
  ReactDom.unmountComponentAtNode(document,getElementById('test'))

组件挂载挂载完毕生命周期钩子，与render方法同级。
  componentDidMount() {
  
  }

组件将要卸载生命周期钩子
  componentWillUnmount() {
  
  }

总结生命周期钩子（旧）

| -- 挂载时      --   | --    父组件render时                                     -- |
|  constructor        |       componentWillReceiveProps（只在父组件再次渲染时调用） |
|  componentWillMount |    shouldComponentUpdate        <---setState()               |  (组件应该更新吗？返回一个boolean值)
|                     |    componentWillUpdate          <---forceUpdate()            |    
|                     ---render()---                                                 |
|  componentDidMount  |               componentDidUpdate                             |
|                     ---componentWillUnmount()---                                   |

为什么不在constructor、componentWillMount钩子里发ajax请求？因为服务端渲染情况下可能会服务端会渲染一次，客户端执行一次；只有componentDidMount官网确认只会执行一次。


总结生命周期钩子（新）

删除了三个will，除了componentWillUnmount。新增了一个几乎用不到的钩子、getSnapshotBeforeUpdate钩子

  场景：让滚动条的位置不动
    getSnapshotBeforeUpdate(){
      return this.refs.list.scrollHeight
    }
    componentDidUpdate(preProps, preState, height){
      this.refs.list.scrollTop += this.refs.list.scrollHeight - height
    }

```

### 事件处理

react的事件命名为小驼峰形式；

传入一个函数。

通过`e.preventDefault()`阻止默认事件行为。

为避免this指针问题，推荐使用public class fields 语法。
```js
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
  handleClick = () => {
    console.log('this is:', this);
  };
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

### 条件渲染

1，一个组件会根据props返回不同的组件。

2，render方法里根据变量判断渲染哪个组件。

3，&& 运算符。

4，三目运算符

5，阻止组件渲染，返回null
```js
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}
```

### 列表、key

```js
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

### 表单

受控组件：没有自己的state，使用传递的props

textarea标签
```js
<textarea value={this.state.value} onChange={this.handleChange} />
```

select标签
```js
<select value={this.state.value} onChange={this.handleChange}>
  <option value="grapefruit">葡萄柚</option>
  <option value="lime">酸橙</option>
  <option value="coconut">椰子</option>
  <option value="mango">芒果</option>
</select>

<select multiple={true} value={['B', 'C']}>
```

处理多个输入：

```html
handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}

<label>
  参与:
  <input
    name="isGoing"
    type="checkbox"
    checked={this.state.isGoing}
    onChange={this.handleInputChange} />
</label>
<br />
<label>
  来宾人数:
  <input
    name="numberOfGuests"
    type="number"
    value={this.state.numberOfGuests}
    onChange={this.handleInputChange} />
</label>
```


受控组件上指定value会阻止用户编辑。如果可编辑，则可能传入了null 或者 undefined


使用非受控组件：

使用ref

```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
（不用写处理烦人的处理函数了），不过这样怎么赋初始值呢？

使用`defaultValue defaultChecked`


### 状态提示

react官网这里使用了摄氏度、华氏摄氏度相互转换的一个例子。

有空可以和用vue写对比一下。

### 组合、继承

类似于vue的插槽

`props.chilren`可以将组件里内容渲染到页面上。

react基本上不使用继承。

### react哲学

该如何使用，和vue如出一辙：

数据从上往下流；

分割组件；

组件通信。

不过我看react的组件通信方式较少，都是props。


## 高级指引

### 无障碍

以下部分是高级指引部分

讲了无障碍辅助功能的应用，不过开发中几乎不使用。

认识了`Fragment`标签。可以传递属性，不需要传可以简写为`<></>`
```html
<Fragment key={item.id}>
  <dt>{item.term}</dt>
  <dd>{item.description}</dd>
</Fragment>
```

### 代码分割

通过动态import语法实现代码分割
```js
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

通过React.lazy函数处理动态导入

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
// 应该在suspense组件中使用该组件

import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

某些情况下展示旧的UI，使用`startTransition`API

```js
  function handleTabSelect(tab) {
    startTransition(() => {
      setTab(tab);
    });
  }

  return (
    <div>
      <Tabs onTabSelect={handleTabSelect} />
      <Suspense fallback={<Glimmer />}>
        {tab === 'photos' ? <Photos /> : <Comments />}
      </Suspense>
    </div>
  );
```

异常捕获：在外面套一层出现异常时会展示的组件。

```js
import MyErrorBoundary from './MyErrorBoundary';

  <MyErrorBoundary>
    <Suspense fallback={<div>Loading...</div>}>
      <section>
        <OtherComponent />
        <AnotherComponent />
      </section>
    </Suspense>
  </MyErrorBoundary>
```

基于路由的代码分割：

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);
```

命名导出：懒加载组件只支持默认导出，不支持命名导出。可以借助中间文件实现命名导出：
```js
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;

// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";

// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```


### Context（部分）

上下文。一棵组件树可以共用一个状态。

怎么使用呢？

```js
// 1 创建一个上下文，最好是单独放在一个文件里，不然会出现重复引用报错问题。
import React from "react";

export const ThemeContext = React.createContext();

// 2 使用上下文包裹App组件
import React from "react";
import A from "../components/A";
// 主题上下文
import { ThemeContext } from "../context/theme";

export default function App() {
  return (
    // 上下文包裹组件
    <ThemeContext.Provider value="dadd123sd">
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <A />
      </div>
    </ThemeContext.Provider>
  );
}

// 3 其中A组件内容
import { Component } from "react";
import B from "./B";

export default class A extends Component {
  render() {
    return (
      <div>
        <div>我是a组件</div>
        <B />
      </div>
    );
  }
}

// 4 B组件中使用到了上下文
import React from "react";
import { ThemeContext } from "../context/theme";

export default class B extends React.Component {
  // 写了这行代码，就可以使用this.context来获取上下文了。
  static contextType = ThemeContext;

  render() {
    return (
      <div>
        <div>我是B组件，我接受了context：</div>
        <div>{this.context}</div>
      </div>
    );
  }
}

```

API以下部分就有点难理解了。

### 错误边界

不知道应用场景

### Refs转发

允许获取一个组件内部的dom ref，来操作dom api，比如input输入框，聚焦，失焦。
```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

### Fragments

片段。

```js
// 不支持key
<>
  <td>Hello</td>
  <td>World</td>
</>

// 支持key
<React.Fragment key={item.id}>
  <dt>{item.term}</dt>
  <dd>{item.description}</dd>
</React.Fragment>
```

### 高阶组件
高阶函数：一个函数返回另一个函数。

高阶组件：一个组件返回另一个组件。

```js
// 此函数接收一个组件...
function withSubscription(WrappedComponent, selectData) {
  // ...并返回另一个组件...，匿名类。
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ...负责订阅相关的操作...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... 并使用新数据渲染被包装的组件!
      // 请注意，我们可能还会传递其他属性
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

### 与第三方库协同

没怎么看

### 深入JSX

只是`React.createElement(component, props, ...children)`的语法糖

```js
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>

// ===>

React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
```

大写字母开头的标签代表着React组件。

使用JSX，react必须在作用于内。虽然并没有使用React
```js
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
```

JSX使用点语法。当导出一个模块有很多组件时，这会很方便。
```js
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

动态选择渲染的组件：

不能通过这种方式动态选择：
```js
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 错误！JSX 类型不能是一个表达式。
  return <components[props.storyType] story={props.story} />;
}
```
而是赋值给一个大写字母开头的变量：
```js
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 正确！JSX 类型可以是大写字母开头的变量。
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```


可以展开传递传递props：
```js
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```
> tips: 选择接受对象属性：`const { kind, ...other } = props;`

JSX标签之间的元素：组件可以通过props.chilren获取到。

布尔类型、Null 以及 Undefined将被忽略


### 性能优化
  
虚拟滚动列表：

https://react-window.now.sh/

https://bvaughn.github.io/react-virtualized/

使用`shouldComponentUpdate`生命周期钩子来让React是否重新渲染视图。

```js
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```
有一种更简单的方法检查当state，props改变时才更新组件。继承`React.PureComponent`
> 问题：当state、props改变时，组件不是本来就会更新组件吗？
```js
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```
注意使用纯组件不能直接改变state的值，而是应该先创建一个副本。

比如使用`concat, 扩展运算符, Object.assign方法`。

### Protal
有点类似Vue的瞬移组件，典型应用场景：模态框。

```js
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
```

### Profiler

一个用来测量渲染的效率、时间的组件。

### 不使用ES6

一般都会使用。

### 不使用JSX

一般都会使用。

### 协调

讲了一些React底层的实现原理，思想。

diffing算法，首先比较两颗树的根节点。

对比不同类型，

对比相同类型，

递归遍历子组件，

使用key来标记列表。

```shell

当数据变化时，react会立即生成新的虚拟dom，与老虚拟dom比较。
  
用index作为key的值问题：
    老：
      <li index={0} >hello</li>
      <li index={1} >world</li>
    新：
      <li index={0} >no</li>
      <li index={1} >hello</li>
      <li index={2} >world</li>
先去看index是否有相同的：
  有，看内容是否相同
    相同使用原来的dom元素。
    不相同生成新的dom替换。
  所以当在头部插入新数据的时候，会造成不必要的dom节点操作。数据量多的时候，浪费内存就大了。

可能还会存在输入框内容的错位。
```

### Refs & Dom

适合使用Refs的地方：管理输入框焦点，文本选择，媒体播放。触发强制动画，集成第三方库。

创建refs
```js
class MyComponent extends React.Component {
  myRef = React.createRef();
  render() {
    return <div ref={this.myRef} />;
  }
}
```
访问ref
```js
const node = this.myRef.current;

// 当ref添加到组件上，node是组件实例。添加到dom，node是Html元素。
// 不能给函数式组件添加ref，因为函数组件没有实例。
// 不过可以再函数组件内部使用ref，只要它指向一个class组件或dom元素。
```

ref回调函数。传给ref一个回调函数，参数为组件实例或dom元素。
```js
class CustomTextInput extends React.Component {

  textInput = null;

  setTextInputRef = element => {
    this.textInput = element;
  };

  focusTextInput = () => {
    // 使用原生 DOM API 使 text 输入框获得焦点
    if (this.textInput) this.textInput.focus();
  };

  componentDidMount() {
    // 组件挂载后，让文本框自动获得焦点
    this.focusTextInput();
  }

  render() {
    // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
    // 实例上（比如 this.textInput）
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

获取组件内部的ref。 parent里的this.inputElement就是子组件里的input输入框了。
```js
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

### Render Props

```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {

  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

        {/*
          调用props.render(), 把自身的state作为参数传入。
          这样render方法返回的组件就可以接收使用Mouse组件的state了。
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}

```
其实如果以children的形式传入组件一个props，且该prop的类型是一个函数，react会默认将组件的state作为参数传入。
这样就更方便了，不用写render方法(不一定命名render)。
```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {

  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {this.props.children}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        // <Mouse children={mouse => (
        //   <Cat mouse={mouse} />
        // )}/>
        // 或者
        <Mouse>
          {mouse => (
            <p>鼠标的位置是 {mouse.x}，{mouse.y}</p>
          )}
        </Mouse>
      </div>
    );
  }
}
```

### 静态类型检查

主要是TypeScrpt。

### 严格模式

开启严格模式，被包裹的组件将被检查
```js
import React from 'react';

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```

### 使用 PropTypes 进行类型检查

在大型项目中可以使用Typescript，但vue和react其实也内置了一些类型检查，但只会在开发阶段生效。

```js
// 引入类型检查库
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```
一个验证器例子：
```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以将属性声明为 JS 原生类型，默认情况下
  // 这些属性都是可选的。
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、元素或数组）
  // (或 Fragment) 也包含这些类型。
  optionalNode: PropTypes.node,

  // 一个 React 元素。
  optionalElement: PropTypes.element,

  // 一个 React 元素类型（即，MyComponent）。
  optionalElementType: PropTypes.elementType,

  // 你也可以声明 prop 为类的实例，这里使用
  // JS 的 instanceof 操作符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以让你的 prop 只能是特定的值，指定它为
  // 枚举类型。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是几种类型中的任意一个类型
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 可以指定一个数组由某一类型的元素组成
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 可以指定一个对象由某一类型的值组成
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 可以指定一个对象由特定的类型值组成
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),

  // 你可以在任何 PropTypes 属性后面加上 `isRequired` ，确保
  // 这个 prop 没有被提供时，会打印警告信息。
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的必需数据
  requiredAny: PropTypes.any.isRequired,

  // 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
  // 请不要使用 `console.warn` 或抛出异常，因为这在 `oneOfType` 中不会起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 你也可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。
  // 它应该在验证失败时返回一个 Error 对象。
  // 验证器将验证数组或对象中的每个值。验证器的前两个参数
  // 第一个是数组或对象本身
  // 第二个是他们当前的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

这样会限制传入的元素只能是单个
```js
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // 这必须只有一个元素，否则控制台会打印警告。
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};

```

默认的props值。

```js
class Greeting extends React.Component {
  // 也可以声明为静态属性。
  static defaultProps = {
    name: 'Stranger'
  };

  
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 函数式组件只能采用这种方式指定默认值。
// 指定 props 的默认值：
// Greeting.defaultProps = {
//   name: 'Stranger'
// };
```

### 非受控组件

受控组件和非受控组件的区别在于，在处理表单的时候，
受控组件会写很多表单处理函数，儿非受控组件不用。

非受控组件
```js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} defaultValue="Bob" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

文件类型表单永远只能是非受控组件。

### Web Components

https://www.ruanyifeng.com/blog/2019/08/web_components.html

### Hook 简介

复用state的一项技术。和vue的composition API类似。

### Hook 概览
hook只能在函数式组件中使用。

useState例子
```js
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  // setCount函数接受新的count值。如果声明的state变量为对象，set函数不会做合并处理。
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
useEffect例子。和vue的watchEffect类似。

```js
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

自定义hook。
```js
import React, { useState, useEffect } from 'react';

// 一般自定义hook以use开头。
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}

// 在函数组件中使用
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

其他内置hook：

订阅使用context
```js
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}

// 使用reducer
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
```

### 使用 State Hook
https://zh-hans.reactjs.org/docs/hooks-state.html

更加基础、详细的介绍useState的使用。

但了解了vue的组合式api后，很容易上手。

### 使用 Effect Hook
https://zh-hans.reactjs.org/docs/hooks-effect.html

更加基础、详细的介绍useEffect的使用。并且与class的写法进行比较。  

### Hook 规则

不要在循环，条件或嵌套函数中调用 Hook

在 React 的函数组件中调用 Hook

在自定义 Hook 中调用其他 Hook

### 自定义 Hook

把一些内置hook api写在一个函数里，供函数式组件使用。

### Hook API 索引
https://zh-hans.reactjs.org/docs/hooks-reference.html

本页面主要描述 React 中内置的 Hook API。

### Hooks FAQ

https://zh-hans.reactjs.org/docs/hooks-faq.html

问答。



### 其他

```shell

安装一个插件，es7开头rcc，rfc，

redux,是一个状态管理组件，与react无关。

react-redux，才是与react有关。

redux精简版
  1、src目录下创建一个redux目录
  2、创建
    store.js文件
      import {createStore} from 'redux'
      import countReducer from './count_reducer'
      export default createStore(countReducer)

    count_reducer.js文件
      function countReducer(preState = 0, action){
        // 从action对象中获取: type、data
        const {type, data} = action
        // ...
        return preState + data
      }
  3、组件中引入store, 渲染store.getState()
  4、执行加法
    store.dispatch({type: 'increment', data: 123})
  5、执行加法，发现视图并不更新。解决：
    componentDidMount(){
      store.subscribe(()=>{
        this.setState({}) // 虚晃一枪
      })
    }
  6、5存在每次都要在组件中写同样的代码。一劳永逸的方法：
    store.subscribe(() => {
      ReacDOM.render(<App />, document.getElementById('root'))
    })
```
