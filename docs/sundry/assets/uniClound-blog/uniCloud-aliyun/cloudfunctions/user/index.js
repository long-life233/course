'use strict';
// 登录操作
const {add} = require('./add/index.js')
// 注册操作
const {get} = require('./get/index.js')
// 因为是node 就直接用global全局对象
global.successMsg = 'success' 
global.successCode = 0 
global.wrongCode = -1

exports.main = async (event, context) => {
		switch (event.type) { 
			case 'add':
				return add(event) 
			case 'get':
	        // 上文的index代码都移动到 get/index.js中
				return get(event) 
		}
};
