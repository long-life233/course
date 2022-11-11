# 手写 promise

## `Promise`要实现的功能

```js
// =======================
const p1 = new Promise((resolve, reject) => {
	resolve('成功');
});
p1.then((value) => {
	console.log(value); // 输出成功
});

// =======================
const p2 = new Promise((resolve, reject) => {
	reject('失败');
});
p2.then(undefined, (reason) => {
	console.log(reason); // 输出失败
});

// =======================
const p3 = new Promise((resolve, reject) => {
	throw '错误';
});
p3.then(undefined, (reason) => {
	console.log(reason); // 输出错误
});
```

## 根据前面代码，推断基本结构

```js
function Promise(excutor) {}
Promise.prototype.then = (onResolved, onRejected) => {};
```

## Promise 存在三种状态

我们用常量保存

```js
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
```

## 当实例化 Promise 时

Promise 会调用立即执行函数，其内部会提供 resolve 和 rejected 函数，用于改变 Promise 实例的 status 与 value。并且会在原型对象上的 then 方法里面接受 resolve 或 reject 传入的值。

所以我们要干三件事：

1. 调用立即执行函数 excutor
2. 实例内部提供 resolve 和 rejected 函数，用于改变 Promise 实例的 status 与 value
3. 定义 Promise 实例的 status 与 value

代码如下

```js
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function Promise(excutor) {
	this.status = PENDING;
	this.value = undefined;
	excutor(resolve, rejected);
	function resolve(value) {
		this.status = RESOLVED;
		this.value = value;
	}
	function rejected(value) {
		this.status = REJECTED;
		this.value = reason;
	}
}
```

## Promise 原型上的 then 方法

会根据 promise 实例的状态决定执行 onResolved 还是 onRejected 回调。

```js
Promise.prototype.then = function (onResolved, onRejected) {
	if (this.status === RESOLVED) {
		onResolved(this.value);
	} else if (this.status === REJECTED) {
		onRejected(this.value);
	}
};
```

## 当前已完成代码

现在发现有 this 指针的问题

```js
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function Promise(excutor) {
	this.status = PENDING;
	this.value = undefined;
	excutor(resolve, rejected);
	function resolve(value) {
		this.status = RESOLVED;
		this.value = value;
	}
	function rejected(value) {
		this.status = REJECTED;
		this.value = reason;
	}
}
Promise.prototype.then = function (onResolved, onRejected) {
	if (this.status === RESOLVED) {
		onResolved(this.value);
	} else if (this.status === REJECTED) {
		onRejected(this.value);
	}
};
```

测试。会发现 1 和 2 都没有输出。

```js
const myPromise = new Promise((resolve, reject) => {
	resolve('hello');
	reject('kitty');
});
myPromise.then(
	(value) => {
		console.log(value); // 1
	},
	(reason) => {
		console.log(reason); // 2
	}
);
```

原因如下

```js
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function Promise(excutor) {
	this.status = PENDING;
	this.value = undefined;
	try {
		excutor(resolve.bind(this), reject.bind(this)); // 所以我们必须把resolve,reject函数绑定this为这个promise实例
	} catch (error) {
		reject(error); // 这里就不是我们手动调用了。是抛出错误程序自动执行reject的
	}
	function resolve(value) {
		this.status = RESOLVED;
		this.value = value;
		console.log(this); // window，因为是我们自己调的这个函数。类似window.resolve(xxx)
	}
	function reject(value) {
		this.status = REJECTED;
		this.value = value;
		console.log(this); // window，因为是我们自己调的这个函数。类似window.reject(xxx)
	}
}
Promise.prototype.then = function (onResolved, onRejected) {
	console.log(this.status);
	console.log(this); // Promise
	if (this.status === RESOLVED) {
		onResolved(this.value);
	} else if (this.status === REJECTED) {
		onRejected(this.value);
	}
};

const myPromise = new Promise((resolve, reject) => {
	resolve('hello');
	reject('kitty');
});
myPromise.then(
	(value) => {
		console.log(value);
	},
	(reason) => {
		console.log(reason);
	}
);
```

## Promise 的状态 state 只允许更改一次

所以对 resolve 或 reject 函数内部添加一个判断，如果状态部位 pending，即已经改变，将会返回不会向下继续执行函数

```js
function resolve(value) {
	if (this.status !== PENDING) {
		return;
	}
	this.status = RESOLVED;
	this.value = value;
	console.log(this); // window，因为是我们自己调的这个函数。类似window.resolve(xxx)
}
function reject(value) {
	if (this.status !== PENDING) {
		return;
	}
	this.status = REJECTED;
	this.value = value;
	console.log(this); // window，因为是我们自己调的这个函数。类似window.reject(xxx)
}
```

## then 方法传入的回调是异步的

正常情况输出顺序是 1，2，3

但现在是 1，3，2。

原因是在 then 方法里面是异步执行 onResolved 和 onRejected 函数的。而我们并没有异步执行，所以外面包一个 setTimeout 就可以了。

```js
const myPromise = new Promise((resolve, reject) => {
	console.log(1);
	resolve();
});
myPromise.then((value) => {
	console.log(3);
});
console.log(2);
```

包上 setTimeout,此时再执行，结果就为正确的 1，2，3 了！

```js
Promise.prototype.then = function (onResolved, onRejected) {
	if (this.status === RESOLVED) {
		setTimeout(() => {
			onResolved(this.value);
		});
	} else if (this.status === REJECTED) {
		setTimeout(() => {
			onRejected(this.value);
		});
	}
};
```

## 完成 Promise 连缀调用

据我的理解，then 方法会根据执行 onResolve 或 onRejected 回调函数得到的返回值，决定返回的 Promise 的状态。

1. 抛错为 rejected
2. 非 promise 为 resolved
3. promise 为该 promise 的状态

```js
const p = new Promise((resolve, reject) => {
	resolve('成功');
});
const result = p.then();
// 输出status为 resolved 的 Promise 实例
console.log(result);

const p2 = new Promise((resolve, reject) => {
	reject('失败');
});
const result2 = p2.then();
// 输出status为 resolved 的 Promise 实例
console.log(result2);

const p3 = new Promise((resolve, reject) => {
	throw '异常';
});
const result3 = p3.then();
// 输出status为 rejected 的 Promise 实例
console.log(result3);
```

现在执行下面的代码，会发现我们的 then 方法的返回值为 undefined。

并且还会飘红，说 onResolved 回调函数不存在。（因为我们没有传入）

```js
const myPromise = new Promise((resolve, reject) => {
	resolve();
});
const p2 = myPromise.then((value) => {});
console.log(p2, 'xxx'); // undefined
```

所以我们需要做两件事
1. 判断then方法里传入的回调函数
2. 设置 then 方法的返回值为 promise。then 方法会根据执行 onResolve 或 onRejected 回调函数得到的返回值，决定返回的 Promise 的状态。
    1. 抛错为 rejected
    2. 非 promise 为 resolved
    3. promise 为该 promise 的状态
```js
        const PENDING = 'pending'
        const RESOLVED = 'resolved'
        const REJECTED = 'rejected'

        function Promise(excutor) {
            this.status = PENDING
            this.value = undefined
            try {
                excutor(resolve.bind(this), reject.bind(this)) // 所以我们必须把resolve,reject函数绑定this为这个promise实例
            } catch (error) {
                reject(error) // 这里就不是我们手动调用了。是抛出错误程序自动执行reject的
            }
            function resolve(value) {
                this.status = RESOLVED
                this.value = value
            }
            function reject(value) {
                this.status = REJECTED
                this.value = value
            }
        }
        Promise.prototype.then = function (onResolved, onRejected) {
            return new Promise((resolve, reject) => {
                typeof onResolved === 'function' ? '' : onResolved = value => value
                typeof onRejected === 'function' ? '' : onRejected = error => { throw error }
                if (this.status === RESOLVED) {
                    handle(onResolved) // 代码只有onResolved和onRejected不同，封装为一个方法
                } else if (this.status === REJECTED) { 
                    handle(onRejected) // 代码只有onResolved和onRejected不同，封装为一个方法
                }
                function handle(callback) {
                    setTimeout(() => { // 这个setTimeout要不要也封装进来呢？不清楚，会有什么问题。
                        try {
                            const res = callback(this.value)
                            if (res instanceof Promise) {
                                res.then(resolve, reject)
                            } else {
                                resolve(res)
                            }
                        } catch (error) {
                            reject(error)
                        }
                    })
                }
            })
        }
```
执行测试，发现只输出了一个123。

原因是，第一个then里面判断status是resolve，而在第二个then里面，promise的状态是异步改变的，而我们并没有对这种状态进行判断处理。
```js
    const myPromise = new Promise((resolve, reject) => {
        resolve()
    })
    const p2 = myPromise.then(()=>{
        console.log(123);
    })
    p2.then(()=>{
        console.log(123);
    })
```
对PENDING状态进行判断处理。

用一个callbacks数组保存回调。

最终代码
```js
    const PENDING = 'pending'
    const RESOLVED = 'resolved'
    const REJECTED = 'rejected'

    function Promise(excutor) {
        this.status = PENDING
        this.value = undefined
        this.callbacks = []
        try {
            excutor(resolve.bind(this), reject.bind(this)) // 所以我们必须把resolve,reject函数绑定this为这个promise实例
        } catch (error) {
            reject(error) // 这里就不是我们手动调用了。是抛出错误程序自动执行reject的
        }
        function resolve(value) {
            this.status = RESOLVED
            this.value = value
            if(this.callbacks.length > 0){
                setTimeout(()=>{
                    this.callbacks.forEach(obj=>obj.onResolved())
                })
            }
        }
        function reject(value) {
            this.status = REJECTED
            this.value = value
            if(this.callbacks.length > 0){
                setTimeout(()=>{
                    this.callbacks.forEach(obj=>obj.onRejected())
                })
            }
        }
    }
    Promise.prototype.then = function (onResolved, onRejected) {
        return new Promise((resolve, reject) => {
            typeof onResolved === 'function' ? '' : onResolved = value => value
            typeof onRejected === 'function' ? '' : onRejected = error => { throw error }
            if (this.status === RESOLVED) {
                handle(onResolved) // 代码只有onResolved和onRejected不同，封装为一个方法
            } else if (this.status === REJECTED) { 
                handle(onRejected) // 代码只有onResolved和onRejected不同，封装为一个方法
            } else if( this.status === PENDING) {
                this.callbacks.push({
                    onResolved(){
                        handle(onResolved)
                    },
                    onRejected(){
                        handle(onRejected)
                    }
                })
            }
            function handle(callback) {
                setTimeout(() => { // 这个setTimeout要不要也封装进来呢？不清楚，会有什么问题。
                    try {
                        const res = callback(this.value)
                        if (res instanceof Promise) {
                            res.then(resolve, reject)
                        } else {
                            resolve(res)
                        }
                    } catch (error) {
                        reject(error)
                    }
                })
            }
        })
    }

    const myPromise = new Promise((resolve, reject) => {
        resolve()
    })
    const p2 = myPromise.then(()=>{
        console.log(123);
    })
    p2.then(()=>{
        console.log(123);
    })

```

## 其它api
```js
// catch方法的封装
Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
}
// 函数对象 resolve 的封装
Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            value.then(resolve, reject);
        } else {
            resolve(value);
        }
    });
}
// 函数对象 reject 的封装
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    })
}
//函数对象 all 的封装
Promise.all = function (promises) {
    return new Promise((resolve, reject) => {
        let pValues = [];
        let flag = 0;
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(v => {
                pValues[i] = v;
                flag++;
                if (flag >= promises.length) {
                    resolve(pValues);
                }
            }, r => {
                reject(r);
            })
        }
    });
}
// 函数对象 race
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for(let i=0;i<promises.length;i++){
            promises[i].then(value=>{
                resolve(value);
            }, reason=>{
                reject(reason);
            })
        }
    });
}
```