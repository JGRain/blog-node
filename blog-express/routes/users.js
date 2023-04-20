var express = require('express')
var router = express.Router()
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* GET users listing. */
router.post('/login', function (req, res, next) {
	const { username, password } = req.body
	// const { username, password } = req.query
	const result = login(username, password)
	return result.then((data) => {
		if (data.username) {
			req.session.username = data.username
			req.session.realName = data.realname

			res.json(new SuccessModel())
			return
		}
		res.json(new ErrorModel('登录失败'))
	})
})

module.exports = router
