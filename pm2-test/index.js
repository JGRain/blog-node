const http = require('http')

const server = http.createServer((req, res) => {
	// 模拟日志
	console.log('cur time', Date.now)
	// 模拟错误
	console.error('假装出错', Date.now)

	// 模拟异常错误
	if (req.url === '/err') {
		throw new Error('error 出错了')
	}
	res.setHeader('Content-type', 'application/json')

	res.end(
		JSON.stringify({
			errorno: 0,
			msg: 'pm2 test server 1',
		})
	)
})

server.listen(8000)
console.log('server is listening on port 8000')
