var createError = require('http-errors')
var express = require('express')
var path = require('path')
var fs = require('fs')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const { createClient } = require('redis')

// var indexRouter = require('./routes/index')
// var usersRouter = require('./routes/users')
var blogRouter = require('./routes/blog')
var userRouter = require('./routes/user')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

const ENV = process.env.NODE_ENV
// app.use(
// 	logger('dev', {
// 		stream: process.stdout,
// 	})
// )
if (ENV !== 'production') {
	// 开发、测试环境
	app.use(logger('dev'))
} else {
	// 线上环境
	const logFileName = path.join(__dirname, 'logs', 'access.log')
	const wirteStream = fs.createWriteStream(logFileName, {
		flags: 'a',
	})
	app.use(
		logger('combined', {
			stream: wirteStream,
		})
	)
}
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// const redisClient = require('./db/redis')
let redisClient = createClient()
// redisClient.connect().catch(console.error)
console.log('redisClient', redisClient)
// redisClient.connect().catch(console.error)

app.use(
	session({
		secret: 'Wsd134_34#_',
		cookie: {
			// path: '/', // 默认值
			// httpOnly: true, // 默认值
			maxAge: 24 * 60 * 60 * 1000,
		},
		store: new RedisStore({
			client: redisClient,
		}),
	})
)

// app.use('/', indexRouter)
// app.use('/users', usersRouter)
app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'dev' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
