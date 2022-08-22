# dva文档记录

1、
```js
// reducer是同步更新state的方法。

// effects是处理异步逻辑的方法。
export default {
  namespace: 'products',
  state: [],
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
};
```
2、串联组件和model
```js
import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';

const Products = ({ dispatch, products }) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

// export default Products;
export default connect(({ products }) => ({
  products,
}))(Products);
```
3、model的state

`type State = any`

可以是任何数据，不过通常是对象。改变state要返回一个全新的对象，不要有相同的引用关系。

4、action
`type AsyncAction = any`
```shell

  action是一个对象，必须有type字段标识要去调用哪个reducer、或effect。

  其它字段可以自定义。

  使用distpath函数发起action。

  组件通过props接收dispatch函数。
```
5、dispatch函数
`type dispatch = (a: Action) => Action`

```shell
connect Model的组件可用通过props获取到dispatch函数。

model里通过第二个参数对象的put方法调用effects或reducer，变了个名字。

dispatch 方法从哪里来？被 connect 的 Component 会自动在 props 中拥有 dispatch 方法。
```

6、reducer函数
`type Reducer<S, A> = (state: S, action: A) => S`

改变state的函数。

假设state是一个对象，reducer返回一个新的对象，是会老state合并还是覆盖呢？

7、effects函数

副作用函数。里面写异步逻辑。

8、Subscription

订阅监听一个数据源，里面可以调用dispatch。

当前的时间、服务器的 websocket 连接、keyboard 输入、geolocation 变化、history 路由变化等等。
```js
import key from 'keymaster';
...
app.model({
  namespace: 'count',
  subscriptions: {
    keyEvent({dispatch}) {
      key('⌘+up, ctrl+up', () => { dispatch({type:'add'}) });
    },
  }
});
```


