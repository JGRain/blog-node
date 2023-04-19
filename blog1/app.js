const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { log } = require('console')

// 用于处理post data
const getPostData = (req) => {
	const promise = new Promise((resolve, reject) => {
		if (req.method !== 'POST') {
			resolve({})
			return
		}
		if (req.headers['content-type'] !== 'application/json') {
			resolve({})
			return
		}
		let postData = ''
		req.on('data', (chunk) => {
			postData += chunk.toString()
		})
		req.on('end', () => {
			if (!postData) {
				resolve({})
				return
			}
			resolve(JSON.parse(postData))
		})
	})
	return promise
}
const serverHandle = (req, res) => {
	// 设置返回格式 JSON
	res.setHeader('Content-type', 'application/json')

	const url = req.url
	req.path = url.split('?')[0]
	req.query = querystring.parse(url.split('?')[1])

  getPostData(req).then((postData) => {
		req.body = postData

		// 处理博客路由
		const blogResult = handleBlogRouter(req, res)
		if (blogResult) {
			blogResult.then((blogData) => {
				if (blogData) {
					res.end(JSON.stringify(blogData))
				}
			})
			return
		}

		// 处理user路由
		const userResult = handleUserRouter(req, res)
		if (userResult) {
			userResult.then((userData) => {
				if (userData) res.end(JSON.stringify(userData))
			})
			return
		}
		// 路由未命中 返回404
		res.writeHead(404, { 'Content-type': 'text/plain' })
		res.write('404 NOT Found\n')
		res.end()
	})
}
module.exports = serverHandle

// process.env.NODE_ENV,
