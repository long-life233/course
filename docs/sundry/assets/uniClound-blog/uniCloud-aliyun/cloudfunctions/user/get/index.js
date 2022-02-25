const db = uniCloud.database()
const util = require('../utils/index.js')
exports.get = async (event)=>{
	// 获取 user 表的集合对象
	const collection = db.collection('user')
	let user
	console.log(event.openId,"event.openId");
	if(event.openId){
		user = await collection.where({
			openId:event.openId
		}).get()
		if(user.affectedDocs < 1){ // 没有就新增
			let res = await collection.add({
				openId:event.openId
			})
		}
		return {
			code:0,
			msg:'success'
		}
	}else{
		// 操作云数据库必须 等待，查找user表中 username 为 event.username同时password为event.password的对象
		user = await collection.where({
			userName: event.userName,
			passWord: util.sha1(event.passWord)
		}).get()
		// affectedDocs 当做找到的个数
		if (user.affectedDocs < 1) {
			// 没有找到
			return {
				code: -1,
				msg: '用户名或密码错误'
			}
		} else {
			return {
				code: 0,
				msg: 'success'
			}
		}
	}
}