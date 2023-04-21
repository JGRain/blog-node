const LikeExpress = require('./like-express')
var a = LikeExpress()
a.use((req, res, next) => {
	console.log('中间件 1')
	console.log(1)

	next()
})
a.use((req, res, next) => {
	console.log(2)

	next()
})

a.get('/hello', (req, res, next) => {
	console.log('hello')

	res.json({ code: 0 })
})

a.listen(3003)

module.exports = () => {
	return new LikeExpress()
}
