const router = require('koa-router')()

router.get('/', async (ctx, next) => {
	await ctx.render('index', {
		title: 'Hello Koa 2!',
	})
})

router.get('/string', async (ctx, next) => {
	ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
	ctx.body = {
		title: 'koa2 json',
	}
})

router.get('/session-test', async function (ctx, next) {
	if (ctx.session.viewNum === null) {
		ctx.session.viewNum = 0
	}
	ctx.session.viewNum++
	ctx.body = {
		errorno: 0,
		viewNum: ctx.session.viewNum,
	}
})
module.exports = router
