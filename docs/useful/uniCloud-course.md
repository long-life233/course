# uniCloud教程

## 什么是uniCloud？
就是一个无服务器云服务，不用你去学啥子java啥的

## web控制台了解uniCloud
在控制台大致讲解了一下各个部分的作用。。比如二进制数据（视频，图片）

## uniCloud版hello world
创建了一个云函数，可以在本地运行，也可以上传后运行。

前端通过uni.callFunction调用

## uniCloud实战通讯录功能-red
此时要设计到云数据库了clienDB。

这是一个小案例。

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

## 美化界面
就是导入插件uni-ui，使用uni-list-item插件。

## 删除联系人
unicloud为我们删除做了许多事：

给unicloud-db组件一个ref，然后调用它的remove方法，可以快速实现删除功能。

但是要配置表结构的schema的delete权限为true。

## 新增联系人
使用代码块，cdb

还要配置表的权限，schema的create权限为true。表的属性也得有要添加的属性名

## 修改联系人
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
                let copyItem = JSON.parse(JSON.stringify(this.item))
                delete copyItem._id
                db.collection('contacts').doc(this.item._id).update(copyItem).then(e=>{
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

## 代码生成工具schema2code-入门体验
就是将一个表文件转换为代码，让你不用再写烦人的增删改查页面了

## 代码生成工具schema2code-高级进阶
涉及到联表查询等东西。以后回头再来看看。
