const { exec } = require('../db/mysql')
const loginCheck = (userName, password) => {
	const sql = `select username, password from users where username='${userName}' and password='${password}'`
	return exec(sql).then((users) => {
		return users[0] || {}
	})
}

module.exports = { loginCheck }
