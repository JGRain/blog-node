const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
	// console.log('method:', req.method)
	// const url = req.url
	// console.log('url:', req.url)
	// req.query = querystring.parse(url.split('?')[1])
	// console.log('query:', req.query)
	// res.end(JSON.stringify(req.query))
	// if (req.method === 'POST') {
	// 	console.log('req content-type', req.headers['content-type'])
	// 	let postData = ''
	// 	req.on('data', (chunk) => {
	// 		postData += chunk.toString()
	// 	})
	// 	req.on('end', () => {
	// 		console.log('postData:', postData)
	// 		res.end('hello world')
	// 	})
	// }

	const method = req.method
	const url = req.url
	const path = url.split('?')[0]
	const query = querystring.parse(url.split('?')[1])
	res.setHeader('Content-type', 'application/json')
	const resData = {
		method,
		url,
		path,
		query,
	}
	if (method === 'GET') {
		res.end(JSON.stringify(resData))
	}
	if (method === 'POST') {
		let postData = ''
		req.on('data', (chunk) => {
			postData += chunk.toString()
		})
		req.on('end', () => {
			res.end(JSON.stringify(postData))
		})
	}
})
server.listen(3000)
