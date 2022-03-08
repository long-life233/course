# uniCloud教程

## hello world
创建一个云函数，可以在本地运行，也可以上传后运行。

前端通过uni.callFunction调用

## 通讯录实战功能
- 读取数据

此时要涉及到云数据库clienDB。

1. 创建一个通讯录项目。

2. 在web控制台创建一个服务空间。创建一个表（数组）contacts，设置schema的read权限为true。

3. 为contacts添加几个数据（对象）

4. 前端使用代码快uDB，直接获取数据
```html
<unicloud-db v-slot:default="{data, loading, error, options}" collection="contacts">
    <view v-if="error">{{error.message}}</view>
    <view v-else>
        {{data}}
    </view>
</unicloud-db>
```

- 导入uni-ui
就是导入插件uni-ui，使用uni-list-item插件。

- 删除数据
unicloud为我们删除做了许多事：

给unicloud-db组件一个ref，然后调用它的remove方法，可以快速实现删除功能。

但是要配置表结构的schema的delete权限为true。
`this.$refs.udb.remove(item._id)`
- 新增数据

使用代码块，cdb

还要配置表的权限，schema的create权限为true。表的属性也得有要添加的属性名
```js

    add(){
        const db = uniCloud.database();
        db.collection("contacts").add(this.form).then(e=>{
            console.log(e);
        })
    }

```
- 修改数据
如下
```vue
<template>
	<view>
		<input type="text" v-model="item.name"/>
		<button @click="update">修改</button>
	</view>
</template>
<script>
    export default {
        data() {
            return {
                item:{}
            }
        },
        methods: {
            update(){
                const db = uniCloud.database();
                let id = this.item._id
                delete this.item._id
                db.collection('contacts').doc(id).update(this.item).then(e=>{
                    console.log(e,"xxx");
                })
            }
        },
        onLoad(e) {
            this.item = JSON.parse(e.item)
            
        }
    }
</script>
```

## schema2code
里面讲了一些东西不懂

## uni-starter
快速的创建一个包含注册，登陆等功能的应用

- 写一个md文件，然后右键分享，可以上传到网上，在用户协议地方用得到。

## uni-admin
快速的创建一个管理后台管理

## unicloud记录

云函数要使用common目录下的公共模块，需要在云函数目录右键管理公共模块依赖，更新依赖。

## hello uniCloud分析


