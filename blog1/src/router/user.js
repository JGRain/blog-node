const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
	const method = req.method
	const path = req.path

	// 登录接口
	if (method === 'POST' && path === '/api/user/login') {
		const { userName = '', password = '' } = req.body
		const result = loginCheck(userName, password)
		if (result) {
			return new SuccessModel()
		}
		return new ErrorModel('登录失败')
		// return {
		// 	msg: '这是登录接口',
		// }
	}
	// 登出接口
	if (method === 'GET' && path === '/api/user/logout') {
		return {
			msg: '这是登出接口',
		}
	}
}

module.exports = handleUserRouter
