const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const getCookieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
	console.log(' d.toGMTString() is', d.toGMTString())
	return d.toGMTString()
}
const handleUserRouter = (req, res) => {
	const method = req.method
	const path = req.path

	// 登录接口
	if (method === 'POST' && path === '/api/user/login') {
		const { username, password } = req.body
		// const { username, password } = req.query
		const result = login(username, password)
		return result.then((data) => {
			if (data.username) {
				req.session.username = data.username
				req.session.realName = data.realname

				set(req.sessionId, req.session)
				// console.log('req.session', req.session)
				// 操作cookie
				// res.setHeader(
				// 	'set-cookie',
				// 	`username=${
				// 		data.username
				// 	}; path=/; httpOnly; expires=${getCookieExpires()}`
				// )
				return new SuccessModel()
			}
			return new ErrorModel('登录失败')
		})
		// if (result) {
		// 	return new SuccessModel()
		// }
		// return new ErrorModel('登录失败')
		// return {
		// 	msg: '这是登录接口',
		// }
	}
	// 登出接口
	// if (method === 'GET' && path === '/api/user/login-test') {
	// 	if (req.session.username) {
	// 		return Promise.resolve(
	// 			new SuccessModel({
	// 				session: req.session,
	// 			})
	// 		)
	// 	}
	// 	return Promise.resolve(new ErrorModel('尚未登录'))
	// }
}
// https://dev.mysql.com/downloads/mysql/

module.exports = handleUserRouter
