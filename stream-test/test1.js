// 标准输入输出
// process.stdin.pipe(process.stdout)
// const http = require('http')
// const server = http.createServer((req, res) => {
// 	if (req.method === 'POST') {
// 		req.pipe(res) // 最主要
// 	}
// })
// server.listen(8002)

//通过stream 实现复制文件功能
// const { log } = require('console')
// const fs = require('fs')
// const path = require('path')
// const fileName1 = path.resolve(__dirname, 'data1.js')
// const fileName2 = path.resolve(__dirname, 'data2.js')

// const readStream = fs.createReadStream(fileName1)
// const writeSteam = fs.createWriteStream(fileName2)

// readStream.pipe(writeSteam)
// readStream.on('data', (chunk) => {
// 	console.log('chunk:', chunk.toString())
// })

// readStream.on('end', () => {
// 	console.log('cope done')
// })

// 网络传输读取系统大文件流
const http = require('http')
const fs = require('fs')
const path = require('path')
const fileName1 = path.resolve(__dirname, 'data1.js')
const server = http.createServer((req, res) => {
	if (req.method === 'POST') {
		const readStream = fs.createReadStream(fileName1)
		readStream.pipe(res)
	}
})
server.listen(8002)
