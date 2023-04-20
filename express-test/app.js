const express = require('express')

// 本次 http 请求的实例
const app = express()

app.use((req, res, next) => {
	console.log('请求开始...', req.method, req.url)
	next()
})

// 假设在处理 cookie
app.use((req, res, next) => {
	req.cookie = {
		userId: 123,
	}
	next()
})

// 假设处理data
app.use((req, res, next) => {
	// 异步
	setTimeout(() => {
		req.body = {
			a: 100,
			b: 200,
		}
		next()
	}, 1)
})

app.use('/api', (req, res, next) => {
	console.log('处理 /api 路由')
	next()
})
app.get('/api', (req, res, next) => {
	console.log('处理 get 路由')
	next()
})
app.post('/api', (req, res, next) => {
	console.log('处理 post 路由')
	next()
})

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
	console.log('get api/get-cookie')
	res.json({
		errorno: 0,
		data: req.cookie,
	})
})

// 模拟登录验证
function loginCheck(req, res, next) {
	console.log('模拟登录失败')
	setTimeout(() => {
		// next()
		res.json({
			errorno: -1,
			msg: '登录失败',
		})
	})
}

app.post('/api/get-post-cookie', loginCheck, (req, res, next) => {
	console.log('post api/get-post-cookie')
	res.json({
		errorno: 0,
		data: req.body,
	})
})

app.use((req, res, next) => {
	console.log('处理 404')
	res.json({
		errorno: 0,
		msg: '404 not found',
	})
})

app.listen(3000, () => {
	console.log('servere is on 3000')
})
