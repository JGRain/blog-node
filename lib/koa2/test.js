const LikeKoa2 = require('./like-koa2')
// 运行代码
const app = new LikeKoa2()

app.use(async (ctx, next) => {
	await next()
	console.log(`1`)
})

// x-response-time
app.use(async (ctx, next) => {
	const start = Date.now()
	await next()
	const ms = Date.now() - start
	console.log('X-Response-Time', `${ms}ms`)
})

// response
app.use(async (ctx) => {
	console.log(3)
	ctx.res.end(JSON.stringify({ a: 'hello world' }))
})

app.listen(8000)
