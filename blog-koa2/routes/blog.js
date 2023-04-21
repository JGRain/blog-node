const router = require('koa-router')()

const {
	getList,
	getDetail,
	newBlog,
	updateDetail,
	deleteDetail,
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/blog')

const loginCheck = require('../middleware/loginCheck')

router.get('/list', async (ctx, next) => {
	let { author = '', keyword = '' } = ctx.query
	if (ctx.query.isadmin) {
		console.log('is admin')
		// 管理员界面
		if (ctx.session.username === null) {
			// 未登录
			ctx.body = new ErrorModel('未登录')
			return
		}
		// 强制查询自己的博客
		author = ctx.session.username
	}
	const listData = await getList(author, keyword)
	ctx.body = new SuccessModel(listData)
})

router.get('/detail', async (ctx, next) => {
	const detail = await getDetail(ctx.query.id)
	ctx.body = new SuccessModel(detail)
})

router.post('/new', loginCheck, async (ctx, next) => {
	const body = ctx.request.body
	body.author = ctx.session.username

	const data = await newBlog(body)
	ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async (ctx, next) => {
	const data = await updateDetail(ctx.query.id, ctx.body)
	ctx.body = new SuccessModel(data)
})

router.post('/delete', loginCheck, async (ctx, next) => {
	const data = await deleteDetail(ctx.query.id, ctx.session.username)
	if (data) {
		ctx.body = new SuccessModel(data)
	} else {
		ctx.body = new ErrorModel('删除博客失败')
	}
})

module.exports = router
