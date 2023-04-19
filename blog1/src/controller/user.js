const loginCheck = (userName, password) => {
	if (userName === 'zhangsan' && password === '123') {
		return true
	}
	return false
}

module.exports = { loginCheck }
