//以下代码在 user/add/index.js
 
const db = uniCloud.database()
const util = require('../utils/index.js')
exports.add = async (data) => {
	const collection = db.collection('user')

	let user = await collection.where({
		userName: data.userName
	}).get() // 切记获取最后一定要 get()
        
        // 一目了然，感觉不用解释
	if (user.affectedDocs < 1) {
		const res = await collection.add({
			userName: data.userName,
			passWord: util.sha1(data.passWord)
		})
		return {
			code: global.successCode,
			msg: global.successMsg
		}
	} else {
		return {
			code: global.wrongCode,
			msg: '用户名重复，请重新录入'
		}
	}

}