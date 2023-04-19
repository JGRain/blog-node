const fs = require('fs')
const path = require('path')

// callback 方式获取一个文件内容
function getFileContent(fileName, callback) {
	// __dirname当前目录的地址
	const fullFileName = path.resolve(__dirname, 'files', fileName)

	fs.readFile(fullFileName, (err, data) => {
		if (err) {
			console.log(err)
			return
		}
		// console.log(data.toString())
		callback(JSON.parse(data.toString()))
	})
}

// 测试
// getFileContent('a.json', (aData) => {
// 	console.log('a data', aData)
// 	getFileContent(aData.next, (bData) => {
// 		console.log('b data', bData)
// 		getFileContent(bData.next, (cData) => {
// 			console.log('c data', cData)
// 		})
// 	})
// })
// 用promise 获取文件内容
function getFileContent(fileName) {
	const promise = new Promise((resolve, reject) => {
		const fullFileName = path.resolve(__dirname, 'files', fileName)

		fs.readFile(fullFileName, (err, data) => {
			if (err) {
				reject(err)
				return
			}
			// console.log(data.toString())
			resolve(JSON.parse(data.toString()))
		})
	})
	return promise
}

// getFileContent('a.json')
// 	.then((aData) => {
// 		console.log('a data', aData)
// 		return getFileContent(aData.next)
// 	})
// 	.then((bData) => {
// 		console.log('b data', bData)
// 		return getFileContent(bData.next)
// 	})
// 	.then((cData) => {
// 		console.log('c data', cData)
// 	})

// saync
async function getrul() {
	const aData = await getFileContent('a.json')
	console.log('a data', aData)
	const bData = await getFileContent(aData.next)
	console.log('b data', bData)
	const cData = await getFileContent(bData.next)
	console.log('c data', cData)
}
getrul()
