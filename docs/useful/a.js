/**
 *  一个promise实例有三个状态
 * 一个promise实例有一个then方法
 * then方法会返回一个promise实例，于是then方法后面可以接着.then
 * 一个promise成功时回去执行成功回调，失败时回去执行失败回调。等待状态不执行回调
 */

const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected' 

function Promise(excutor){
    const self = this 
    self.status = PENDING
    self.data = undefined
    self.callbacks = [] // {onResolved(){},onRejected(){}}

    function resolve(value){
        if(self.status !== PENDING) return 
        self.status = RESOLVED
        self.data = value

        if(self.callbacks.length > 0){
            setTimeout(()=>{
                self.callbacks.forEach(cbsObj=>{
                    cbsObj.onResolved(value)
                })
            })
        }
    }

    function reject(reason){
        if(self.status !== PENDING) return 

        self.status = REJECTED
        self.data = reason
        if(self.callbacks.length>0){
            setTimeout(()=>{
                self.callbacks.forEach(cbsObj=>{
                    cbsObj.onRejected(reason)
                })
            })
        }
    }

    try {
        excutor(resolve,reject)
    } catch (error) {
        reject(error)
    }
}

Promise.prototype.then = function(onResolved,onRejected){
    const self = this
    onResolved = typeof onResolved === 'function' ?onResolved:value=>value
    onRejected = typeof onRejected === 'function' ?onRejected:reason=>{throw reason}

    return new Promise((resolve,reject)=>{
        function handle(callback){
            try {
                const result = callback(self.data)
                if(!(result instanceof Promise)){
                    resolve(result)
                }else{
                    result.then(resolve,reject)
                }
            } catch (error) {
                reject(error)
            }
        }

        if(self.status === RESOLVED){
            setTimeout(()=>{
                handle(onResolved)
            })
        }else if(self.status === REJECTED){
            setTimeout(()=>{
                handle(onRejected)
            })
        }else {
            self.callbacks.push({
                onResolved(){
                    handle(onResolved)
                },
                onRejected(){
                    handle(onRejected)
                }
            })
        }
    })
}

Promise.prototype.catch = function(onRejected){
    return this.then(undefined,onRejected)
}


Promise.resolve = function(value){
    return new Promise((resolve,reject)=>{
        if(value instanceof Promise){
            value.then(resolve,reject)
        }else{
            resolve(value)
        }
    })
}

Promise.reject = function(reason){
    return new Promise((resolve,reject)=>{
        reject(reason)
    })
}