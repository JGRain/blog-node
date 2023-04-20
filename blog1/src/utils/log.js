const fs = require('fs')
const path = require('path')

// 写日志
function writeLog(writeSteam, log) {
	writeSteam.write(log + '\n') // 关键代码
}
// 生成 write Stream
function createWriteStream(fileName) {
	const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
	const writeSteam = fs.createWriteStream(fullFileName, {
		flags: 'a',
	})
	return writeSteam
}

const accessWriteStream = createWriteStream('access.log')

// 写访问日志
function access(log) {
	writeLog(accessWriteStream, log)
}

module.exports = {
	access,
}
