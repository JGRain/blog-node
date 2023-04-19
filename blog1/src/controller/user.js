const { exec } = require('../db/mysql')
const login = (userName, password) => {
	const sql = `select username, password, realname from users where username='${userName}' and password='${password}'`
	return exec(sql).then((users) => {
		return users[0] || {}
	})
}

module.exports = { login }
