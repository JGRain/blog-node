const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
	constructor() {
		// 存放中间件的列表
		this.routes = {
			all: [],
			get: [],
			post: [],
		}
	}
	register(path) {
		const info = {}
		if (typeof path === 'string') {
			info.path = path
			// 从第二个参数开始，转换为护具，存入stack
			info.stack = slice.call(arguments, 1)
		} else {
			info.path = '/'
			// 从第一个参数开始，转换为护具，存入stack
			info.stack = slice.call(arguments, 0)
		}
		return info
	}
	use() {
		const info = this.register.apply(this, arguments)
		this.routes.all.push(info)
	}
	get() {
		const info = this.register.apply(this, arguments)
		this.routes.get.push(info)
	}
	post() {
		const info = this.register.apply(this, arguments)
		this.routes.post.push(info)
	}
	match(method, url) {
		let stack = []
		if (url === '/favicon.ico') {
			return stack
		}
		let currentRoutes = []
		currentRoutes = currentRoutes.concat(this.routes.all)
		currentRoutes = currentRoutes.concat(this.routes[method])
		currentRoutes.forEach((routeInfo) => {
			if (url.includes(routeInfo.path)) {
				// url === 'api/get-cookie/' 且 routeInfo.path === '/'
				// url === 'api/get-cookie/' 且 routeInfo.path === '/api'
				// url === 'api/get-cookie/' 且 routeInfo.path === '/api/get-cookie/'
				stack = stack.concat(routeInfo.stack)
			}
		})
		return stack
	}
	handle(req, res, stack) {
		const next = () => {
			// 拿到第一个匹配的中间件
			const middleware = stack.shift()
			if (middleware) {
				middleware(req, res, next)
			}
		}
		next()
	}
	callBack() {
		return (req, res) => {
			res.json = (data) => {
				res.setHeader('Content-type', 'application/json')
				res.end(JSON.stringify(data))
			}

			const url = req.url
			const method = req.method.toLowerCase()
			const resultList = this.match(method, url)
			this.handle(req, res, resultList)
		}
	}
	listen(...args) {
		const server = http.createServer(this.callBack())
		server.listen(...args)
	}
}

// 工厂函数
module.exports = () => {
	return new LikeExpress()
}
