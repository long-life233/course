# react

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