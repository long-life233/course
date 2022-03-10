# hello uniCloud

## 云函数

### 新增一条数据 
```js
        async add() {
            // ===================
            return await uniCloud.callFunction({
                name: 'add',
                data: {
                    name: 'DCloud',
                    subType: 'uniCloud',
                    createTime: Date.now()
                }
            }).then((res) => {
                return  res.result.id
            })
        }
```
云函数
```js
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('unicloud-test')
	const res = await collection.add(event)
	return res
};
```

### 删除一条数据
```js
    async remove() {
        return await uniCloud.callFunction({
            name: 'remove'
        }).then((res) => {
            return res.result.msg
        })
    }
```
云函数
```js
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('unicloud-test')
	const docList = await collection.limit(1).get()
	if (!docList.data || docList.data.length === 0) {
		return {
			status: -1,
			msg: '集合unicloud-test内没有数据'
		}
	}
	const res = await collection.doc(docList.data[0]._id).remove()
	if (res.deleted === 1) {
		return {
			status: 0,
			msg: '成功删除unicloud-test内第一条数据'
		}
	} else {
		return {
			status: -2,
			msg: '删除数据失败'
		}
	}
};
```

### 修改数据
```js
            async update() {
				uni.showLoading({
					title: '处理中...'
				})
				return await uniCloud.callFunction({
					name: 'update',
					data: {
						name: 'DCloud',
						subType: 'html 5+',
						createTime: Date.now()
					}
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: res.result.msg,
						showCancel: false
					})
					console.log(res)
					return res.result.msg
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `更新操作执行失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
```
```js
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('unicloud-test')
	const docList = await collection.limit(1).get();
	if (!docList.data || docList.data.length === 0) {
		return {
			status: -1,
			msg: '集合unicloud-test内没有数据'
		}
	}
	const res = await collection.doc(docList.data[0]._id).update(event);
	if (res.updated === 1) {
		let result = Object.assign({}, {
			_id: docList.data[0]._id
		}, event)
		return {
			status: 0,
			msg: `集合第一条数据由${JSON.stringify(docList.data[0])}修改为${JSON.stringify(result)}`
		}
	} else {
		return {
			status: -1,
			msg: `集合unicloud-test内没有数据`
		}
	}
};

```



### 查询前10条数据
```js
            async get() {
				uni.showLoading({
					title: '处理中...'
				})
				return await uniCloud.callFunction({
					name: 'get'
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: `查询成功，获取数据列表为：${JSON.stringify(res.result.data)}`,
						showCancel: false
					})
					console.log(res)
					return res.result.data
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `查询失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
```
```js
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection('unicloud-test')
	const res = await collection.limit(10).get()
	return res
};

```
### 云函数使用公共模块
```js
        async useCommon() {
            console.log('请确保自己已经阅读并按照公用模块文档操作 https://uniapp.dcloud.io/uniCloud/cf-common')
            return await uniCloud.callFunction({
                name: 'use-common'
            }).then((res) => {
                uni.hideLoading()
                uni.showModal({
                    content: '云函数use-common返回结果：' + JSON.stringify(res.result),
                    showCancel: false
                })
                console.log(res)
                return res.result
            }).catch((err) => {
                uni.hideLoading()
                uni.showModal({
                    content: `云函数use-common执行失败，错误信息为：${err.message}`,
                    showCancel: false
                })
                console.error(err)
            })
        },
```
公共模块
```js
module.exports = {
	secret: 'abcdefg',
	getVersion: function(){
		return '1.0.0'
	}
}
```
云函数
```js
'use strict';
const {
	secret,
	getVersion
} = require('hello-common')
exports.main = async (event, context) => {
	let version = getVersion()

	console.log("secret: " + secret);
	console.log("version: " + version);

	return {
		secret,
		version
	}
};

```
### 使用redis
不怎么懂，不想用。但看着好像挺简单

## 云对象
HX版本低于3.4
## 云存储

### 选择文件后上传
关键是`uniCloud.uploadFile`
```js
            upload() {
				new Promise((resolve, reject) => {
					uni.chooseImage({
						count: 1,
						success: res => {
							const path = res.tempFilePaths[0]
							let ext
							// #ifdef H5
							ext = res.tempFiles[0].name.split('.').pop()
							const options = {
								filePath: path,
								cloudPath: Date.now() + '.' + ext
							}
							resolve(options)
							// #endif
							// #ifndef H5
							uni.getImageInfo({
								src: path,
								success(info) {
									const options = {
										filePath: path,
										cloudPath: Date.now() + '.' + info.type.toLowerCase()
									}
									resolve(options)
								},
								fail(err) {
									reject(new Error(err.errMsg || '未能获取图片类型'))
								}
							})
							// #endif
						},
						fail: () => {
							reject(new Error('Fail_Cancel'))
						}
					})
				}).then((options) => {
					uni.showLoading({
						title: '文件上传中...'
					})
                    // ================================
					return uniCloud.uploadFile({
						...options,
						onUploadProgress(e) {
							console.log(e)
						}
					})
                    // ================================
				}).then(res => {
					uni.hideLoading()
					console.log(res);
					uni.showModal({
						content: '图片上传成功，fileId为：' + res.fileID,
						showCancel: false
					})
				}).catch((err) => {
					uni.hideLoading()
					console.log(err);
					if (err.message !== 'Fail_Cancel') {
						uni.showModal({
							content: `图片上传失败，错误信息为：${err.message}`,
							showCancel: false
						})
					}
				})
			}
```
### 选择文件并上传
```js
            chooseAndUploadFile(file) {
				uni.showLoading({
					title: '文件上传中...'
				})
				uniCloud.chooseAndUploadFile({
					type: 'image',
					onChooseFile:(res)=> {
						console.log(res);
						const processAll = []
						for (let i = 0; i < res.tempFiles.length; i++) {
							processAll.push(this.cropImg(res.tempFiles[i]))
						}
						return Promise.all(processAll).then((fileList) => {
							let result = {
								tempFilePaths: []
							}
							result.tempFiles = fileList.map((fileItem, index) => {
								result.tempFilePaths.push(fileItem.path)
								return {
									path: fileItem.path,
									cloudPath: '' + Date.now() + index + '.' + fileItem.ext, // 云端路径，这里随便生成了一个
									fileType: fileItem.fileType
								}
							})
							return result
						})
					}
				}).then(res => {
					console.log(res)
					uni.showModal({
						content: JSON.stringify(res),
						showCancel: false
					});
				}).catch((err) => {
					console.log(err);
					uni.showModal({
						content: JSON.stringify(err),
						showCancel: false
					});
				}).finally(() => {
					uni.hideLoading()
				})
			},
            cropImg(file) {
				return new Promise((resolve, reject) => {
					let ext
					let filePathProcessed = file.path // 处理结果
					// #ifdef H5
					ext = file.name.split('.').pop()
					resolve({
						path: filePathProcessed,
						ext,
						fileType: file.fileType
					})
					// #endif
					// #ifndef H5
					uni.getImageInfo({
						src: file.path,
						success(info) {
							ext = info.type.toLowerCase()
							resolve({
								path: filePathProcessed,
								ext,
								fileType: file.fileType
							})
						},
						fail(err) {
							reject(new Error(err.errMsg || '未能获取图片类型'))
						}
					})
					// #endif
				})
			},
```

## api操作数据库

### 普通查询，客户端联表查询

```js
const db = uniCloud.database();
// book.or,order
async getData(tableName) {
    // 客户端联表查询
    return await db.collection(tableName).get().then(res => {
            return res.result.data
        })
},
```
联表查询

book.schema.json
```json
// 文档教程: https://uniapp.dcloud.net.cn/uniCloud/schema
{
	"bsonType": "object",
	"required": [],
	"permission": {
		"read": true
	},
	"properties": {
		"title": {
			"bsonType": "string"
		},
		"author": {
			"bsonType": "string"
		}
	}
}
```
order.schema.json
```json
// 文档教程: https://uniapp.dcloud.net.cn/uniCloud/schema
{
	"bsonType": "object",
	"required": [],
	"permission": {
		"read": true,
		"create":true,
		"delete":true,
		"update":true
	},
	"properties": {
		"book_id": {
			"bsonType": "string",
			"foreignKey": "book._id" // 使用foreignKey表示，此字段关联book表的_id。
		},
		"quantity": {
			"bsonType": "int"
		},
		"create_date":{
			"defaultValue":{
				"$env":"now"
			}
		}
	}
}
```

### 查询列表分页
```js
    async getPageData() {
        uni.showLoading({
            mask: false
        });
        let res = await db.collection("book")
            .skip((this.pageCurrent - 1) * this.pageSize)
            .limit(this.pageSize)
            .get()
        return res.result.data
    }
```
### 数据表较大时，高性能查询
联表查询

只需在db schema中，将两个表的关联字段建立映射关系，即可实现联表查询。
```js
    async getOrderByGetTemp() {
        //当数据表记录数较大时，务必使用本方法
        uni.showLoading({mask: true});
        // 这是主表
        // 使用getTemp先过滤处理获取临时表再联表查询
        const orderQuery = db.collection('order').field('book_id,quantity').getTemp()	
        // 注意：这里的`_id`字段必须获取，因为这是order临时表联表的字段，否则会报错找不到
        const bookQuery = db.collection('book').field('_id,author,title').getTemp()
        const res = await db.collection(orderQuery,bookQuery).field('book_id as books_info,quantity').get()
        uni.hideLoading()
        this.$refs.alertCode.open(res.result)
        console.log(res.result.data, "111");
    },
```
### 数据表较小时，便捷查询

```js
    async getOrder() {
        //直接关联多个表为虚拟表再进行查询。仅数据表字段内容较少时使用，否者将查询超时
        uni.showLoading({mask: true});
        // 客户端联表查询
        return await db.collection('order,book') // 注意collection方法内需要传入所有用到的表名，用逗号分隔，主表需要放在第一位
            //.where('book_id.title == "三国演义"') // 查询order表内书名为“三国演义”的订单
            // 外键book_id就相当于book表
            .field('book_id{title,author} as books_info,quantity') // 这里联表查询book表返回book表内的title、book表内的author、order表内的quantity
            .get()
            .then(res => {
                this.$refs.alertCode.open(res.result)
                console.log(res.result.data, "111");
                return res.result.data
            }).catch(err => {
                console.error(err)
                return err
            }).finally(() => {
                uni.hideLoading()
            })
    },
```
### 查询一本图书数据
使用clientDB时可以在get方法内传入getOne:true来返回一条数据
```js
    async getOneBook() {
        uni.showLoading({
            mask: true
        });
        // 客户端联表查询
        return await db.collection('book')
            .get({
                getOne: true
            })
            .then(res => {
                this.$refs.alertCode.open(res.result)
                return res.result.data
            }).catch(err => {
                console.error(err)
                return err
            }).finally(() => {
                uni.hideLoading()
            })
    },
```
### 查询结果返回总数
使用clientDB时可以在get方法内传入getCount:true来同时返回总数
```js
    async getBookHasCount() {
        uni.showLoading({
            mask: true
        });
        return await db.collection('book')
            .get({
                "getCount": true
            })
            .then(res => {
                this.$refs.alertCode.open(res.result)
                return res.result
            }).catch(err => {
                console.error(err)
                return err
            }).finally(() => {
                uni.hideLoading()
            })
    },
```

### 仅查询图书数据的书名
查询时可以使用field方法指定返回字段，在<uni-clientDB>组件中也支持field属性。不使用field方法时会返回所有字段

```js
    async getBookTitle() {
        uni.showLoading({
            mask: true
        });
        // 客户端联表查询
        return await db.collection('book')
            .field('title')
            .get()
            .then(res => {
                this.$refs.alertCode.open(res.result)
                return res.result.data
            }).catch(err => {
                console.error(err)
                return err
            }).finally(() => {
                uni.hideLoading()
            })
    },
```

### 获得被设置别名的数据
如：author as book_author，意思是将数据库的author字段重命名为book_author
```js
			async getBookAs() {
				uni.showLoading({
					mask: true
				});
				// 客户端联表查询
				return await db.collection('book')
					.field('title,author as book_author')
					.get()
					.then(res => {
						this.$refs.alertCode.open(res.result)
						return res.result.data
					}).catch(err => {
						console.error(err)
						return err
					}).finally(() => {
						uni.hideLoading()
					})
			},
```
### 按销量升序
orderBy方法内可以传入一个字符串来指定排序规则。如:订单表order根据quantity销量字段排序
```html
<button @click="getOrderOrderBy('quantity asc')" type="primary" plain>按销量升序</button>
```
```js
    async getOrderOrderBy(str) {
        uni.showLoading({
            mask: true
        });
        return await db.collection('order')
            .orderBy(str)
            .get()
            .then(res => {
                this.$refs.alertCode.open(res.result)
                return res.result.data
            }).catch(err => {
                console.error(err)
                return err
            }).finally(() => {
                uni.hideLoading()
            })
    },
```
### 按创建时间降序
```html
<button plain @click="getOrderOrderBy('create_date desc')" type="primary">按创建时间降序</button>
```
```js
			async getOrderOrderBy(str) {
				uni.showLoading({
					mask: true
				});
				return await db.collection('order')
					.orderBy(str)
					.get()
					.then(res => {
						this.$refs.alertCode.open(res.result)
						return res.result.data
					}).catch(err => {
						console.error(err)
						return err
					}).finally(() => {
						uni.hideLoading()
					})
			},
```
### 销量相同时，按创建时间降序
```html
<button plain @click="getOrderOrderBy('quantity asc, create_date desc')" type="primary">销量相同时，按创建时间降序</button>
```
### 查询树形数据
树形数据，在数据库里一般不会按照tree的层次来存储，因为按tree结构通过json对象的方式存储不同层级的数据，不利于对tree上的某个节点单独做增删改查。一般存储树形数据，tree上的每个节点都是一条单独的数据表记录，然后通过类似parent_id来表达父子关系。如部门的数据表，里面有2条数据，一条数据记录是“总部”，parent_id为空；另一条数据记录“一级部门A”，parent_id为总部的_id

```js
			async getTreeFn() {
				uni.showLoading({
					mask: true
				});
				return await db.collection("department").get({
						getTree: {
							limitLevel: 10, // 最大查询层级（不包含当前层级），可以省略默认10级，最大15，最小1
							//	startWith: "parent_code==''"  // 第一层级条件，此初始条件可以省略，不传startWith时默认从最顶级开始查询
						}
					})
					.then((res) => {
						const resdata = res.result.data
						console.log("resdata", );
						this.$refs.alertCode.open(resdata)
						return resdata
					}).catch((err) => {
						uni.showModal({
							content: err.message || '请求服务失败',
							showCancel: false
						})
						return err
					}).finally(() => {
						uni.hideLoading()
					})
			},
```

### 在test表里新增一条
获取到db的表对象后，通过add方法新增数据记录

在test表里新增一条
				"data=当前时间戳"的记录
```js
			addData2TestDb() {
				uni.showLoading({
					mask: false
				});
				db.collection('test').add({
					data: Date.now()
				}).then(res => {
					this.$refs.alertCode.open(res.result)
					uni.hideLoading()
				})
			},
```
### 在test表里新增5条
在test表里新增5条
				"data=随机数"的记录
```js
			addMoreData2TestDb() {
				uni.showLoading({
					mask: false
				});
				let dataList = [];
				for (var i = 0; i < 5; i++) {
					dataList.push({
						"data": Math.ceil(Math.random() * 999)
					})
				}
				db.collection('test').add(dataList).then(res => {
					this.$refs.alertCode.open(res.result)
					uni.hideLoading()
				})
			},
```

### 更新test表里的一条记录
```js
			updateData2TestDb() {
				uni.showLoading({
					mask: false
				});
				let testDb = db.collection("test")
				testDb.get({
					getOne: true
				}).then(({
					result: {
						data
					}
				}) => {
					if (data) {
						testDb.doc(data._id).update({
							data: Date.now()
						}).then(res => {
							console.log(res);
							this.$refs.alertCode.open(res.result)
							uni.hideLoading()
						})
					} else {
						uni.showToast({
							title: 'test表内没有数据',
							icon: 'none'
						});
						uni.hideLoading()
					}
				})
			},
```

### 删除test表里的一条记录
```js
			removeData2TestDb() {
				uni.showLoading({
					mask: false
				});
				let testDb = db.collection("test")
				testDb.get({
					getOne: true
				}).then(({
					result: {
						data
					}
				}) => {
					if (data) {
						testDb.doc(data._id).remove().then(res => {
							console.log(res);
							this.$refs.alertCode.open(res.result)
							uni.hideLoading()
						})
					} else {
						uni.showToast({
							title: 'test表内没有数据',
							icon: 'none'
						});
						uni.hideLoading()
					}
				})
			},
```

### 删除test表里的所有数据
```js
    async removeAllData2TestDb() {
        let index = 1
        uni.showLoading({
            mask: false
        });
        let testDb = db.collection("test")
        let {
            result: {
                data
            }
        } = await testDb.get()
        console.log(data);
        if (data.length) {
            //用一个不存在的条件来删除所有数据
            let {
                result: {
                    deleted
                }
            } = await testDb.where('data!="不存在的条件"').remove();
            uni.showToast({
                title: '成功删除' + deleted + '条数据！',
                icon: 'none'
            });
        } else {
            uni.showToast({
                title: 'test表内没有数据',
                icon: 'none'
            });
            uni.hideLoading()
        }
    },
```

## clientDB组件

增
```js
	async add(){
		return await udb.add({
			book_id:"add-test",
			quantity:Date.now()
		},{
			success: (res) => { // 新增成功后的回调
				console.log("res.result: ",res.result);
				this.getFn()
				return res
			}
		})
	},
```
删
```js
	async remove(){
		const _id = udb.dataList[0]._id
		return await udb.remove(_id)
	},
```
改
```js
	async update(){
		const _id = udb.dataList[0]._id
		return await udb.update(_id,{book_id:"这条数据被改"},
		{
			success: (res) => { // 新增成功后的回调
				this.getFn()
			}
		})
	},
```
查
```js
	getFn(){
		udb.loadData()
	},
```
指定查询结果是否仅返回数组第一条数据（getone）

默认 false。在false情况下返回的是数组，即便只有一条结果，也需要[0]的方式获取。在值为 true 时，直接返回结果数据，少一层数组，一般用于非列表页，比如详情页
```html
		<switch class="switch-getone" :checked="getone" @change="getone = $event.detail.value" />


		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options,pagination,hasMore}"
			:options="options"
			:page-data="pageData"
			:collection="collection"
			:field="field.join(',')"
			:page-size="pageSize"
			:orderby="orderby"
			:getone="getone"
			:page-current="pageCurrent"
			:getcount="getcount"
			>
```
分页策略选择（page-data）
```html
<uni-data-checkbox v-model="pageData" :localdata='pageDataList' />

pageData:"replace",

pageDataList:[{"text":"add",value:"add"},{"text":"replace",value:"replace"}],
```

### 控制前端操作数据库的权限

### 字段值域校验

### 完整示例