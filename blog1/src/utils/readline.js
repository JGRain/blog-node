const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')
const readStream = fs.createReadStream(fileName)

// 创建readline对象

const rl = readline.createInterface({
	input: readStream,
})

let chromNum = 0
let sum = 0

// 逐行执行
rl.on('line', (lineData) => {
	if (!lineData) {
		return
	}

	// 累加总数
	sum++

	const arr = lineData.split(' -- ')
	if (arr[2] && arr[2].includes('Chrome')) {
		// 累加chrome数量
		chromNum++
	}
})

// 监听读取完成
rl.on('close', () => {
	console.log('chrome 占比：' + chromNum / sum)
})
