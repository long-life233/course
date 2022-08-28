# react

## JSX
一种语法。类似下面这种形式：
```jsx
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

## 元素渲染

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

## 组件、props

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

## state & 生命周期
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

## 事件处理

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

## 条件渲染

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

## 列表、key

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

## 表单

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
















jsx语法规则
```jsx
花括号{}里能使用js表达式（有返回值），花括号里不能写js语句。

使用类使用className关键字

使用style行内样式使用双花括号key和value形式 {{key:value}}

虚拟dom只能有一个根标签

jsx写的按钮绑定的方法定义在class外部，方法内部获取不到this。

react的组件类class里面，super、render方法能获取到正确的this指向。但是定义的方法里面的this可能会获取不到为undefined。
因为直接调用一个实例的方法p1.changeWether()，changeWether方法里面能正确获取到this,但是如果赋值再调用，this就获取不到了。
    
    const p2 = p1.changeWether;
    p2() // 方法内部this获取不到
也就是说onClick的回调方法是直接调用的，不是实例调用的。所以回调函数应该在箭头函数里调用函数，或者定义的函数是一个箭头函数。

类中直接写赋值语句，相当于往自身实例上添加属性。

也就是所state可以直接写在类中，不写在构造器里。

批量传递属性，使用点点点对象 {... p}, 仅适用标签属性的传递。

对传递的props进行限制
  Person.propTypes = {
    name: PropTypes.string.isRequired, // 字符串且为必传
    sex: PropTypes.string, // 字符串
    age: PropTypes.number,
    speak: PropTypes.func,
  }

  Person.defaultProps = {
    sex: '不男不女',
    age: 18
  }

  如果要写在class里面，就使用static关键字

props是只读的。

构造器中是否传递props，取决于是否想要在构造器中使用this.props，未传就是获取不到的。

函数式组件使用props校验通过函数名.propTypes进行校验

通过ref获取节点。在节点上打ref属性，通过this.refs.xx获取

不太推荐使用字符串形式的ref

回调函数形式的ref
  <input ref={(该节点)=>{ }} /> 

  回调函数形式的ref存在问题：当使用内联的回调函数时，更新视图时内联回调会执行两次。
  所以把回调函数定义在class实例上，不要使用内联的函数。

React.createRef() 的使用。专人专用。

  给实例上添加一个属性，比如inputRef = React.createRef()
  然后再对应标签上加ref={this.inputRef};
  然后再需要使用到该节点的地方通过this.inputRef.current就可以获取到了。

react中的事件处理：onClick、onBlur等都是封装的原生事件，会自动事件委托、传入点击的元素

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

