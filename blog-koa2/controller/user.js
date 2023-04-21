const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')
const login = async (userName, password) => {
	userName = escape(userName)
	// 生成加密密码
	password = genPassword(password)

	password = escape(password)
	const sql = `select username, password, realname from users where username=${userName} and password=${password}`
	console.log('sql is', sql)
	const users = await exec(sql)
	return users[0] || {}
}

module.exports = { login }
