const router = require('koa-router')()

const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
	const { username, password } = ctx.request.body

	const data = await login(username, password)

	if (data.username) {
		ctx.session.username = data.username
		ctx.session.realName = data.realname

		ctx.body = new SuccessModel()
		return
	}
	ctx.body = new ErrorModel('登录失败')
})

// router.get('/bar', function (ctx, next) {
// 	ctx.body = 'this is a users/bar response'
// })

module.exports = router
