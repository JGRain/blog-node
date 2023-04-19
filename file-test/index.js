const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件内容(坑 文件可能很大)
// fs.readFile(fileName, (err, data) => {
// 	if (err) {
// 		console.error(err)
// 		return
// 	}
// 	// data 是二进制内容  要转成成字符串
// 	console.log(data.toString())
// })

// 写入文件 (坑 写入文件特别大)
// const content = '这是新写入的内容\n'

// const opt = {
// 	flag: 'a', //追加写入。覆盖用'w'
// }
// fs.writeFile(fileName, content, opt, (err) => {
// 	if (err) {
// 		console.error(err)
// 		return
// 	}
// })

// 判断文件是否存在
// fs.exists(fileName, (exist) => {
// 	console.log('exist', exist)
// })
