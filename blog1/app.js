const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { access } = require('./src/utils/log')

const getCookieExpires = () => {
	const d = new Date()
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
	console.log(' d.toGMTString() is', d.toGMTString())
	return d.toGMTString()
}

// session 数据
const SESSION_DATA = {}

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
	access(
		`${req.method} -- ${req.url} -- ${
			req.headers['user-agent']
		} -- ${Date.now()}`
	)
	// 设置返回格式 JSON
	res.setHeader('Content-type', 'application/json')

	const url = req.url
	req.path = url.split('?')[0]
	req.query = querystring.parse(url.split('?')[1])

	// 解析cookie
	req.cookie = {}
	const cookieStr = req.headers.cookie || '' //k1=v1;k2=v2
	cookieStr.split(';').forEach((item) => {
		if (!item) {
			return
		}
		const arr = item.split('=')
		req.cookie[arr[0].trim()] = arr[1].trim()
	})
	console.log('req.cookie is', req.cookie)

	// 解析session
	let needSetCookie = false
	let userId = req.cookie.userid
	if (userId) {
		if (!SESSION_DATA[userId]) {
			SESSION_DATA[userId] = {}
		} else {
			req.session = SESSION_DATA[userId]
		}
	} else {
		needSetCookie = true
		userId = `${Date.now()}_${Math.random()}`
		SESSION_DATA[userId] = {}
	}
	req.session = SESSION_DATA[userId]

	getPostData(req).then((postData) => {
		req.body = postData
		// https://www.runoob.com/redis/redis-install.html
		// 处理博客路由
		const blogResult = handleBlogRouter(req, res)
		if (blogResult) {
			blogResult.then((blogData) => {
				if (needSetCookie) {
					res.setHeader(
						'set-cookie',
						`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
					)
				}
				if (blogData) {
					res.end(JSON.stringify(blogData))
				}
			})
			return
		}

		// 处理user路由
		const userResult = handleUserRouter(req, res)
		if (userResult) {
			if (needSetCookie) {
				res.setHeader('set-cookie', `userid=${userId}; path=/;`)
			}
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

