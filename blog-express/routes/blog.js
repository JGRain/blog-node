var express = require('express')
var router = express.Router()
const {
	getList,
	getDetail,
	newBlog,
	updateDetail,
	deleteDetail,
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const loginCheck = require('../middleware/loginCheck')

router.get('/list', (req, res, next) => {
	let { author = '', keyword = '' } = req.query
  if (req.query.isadmin) {
    console.log('is admin');
		// 管理员界面
		if (req.session.username === null) {
			// 未登录
			res.json(new ErrorModel('未登录'))
			return
		}
		// 强制查询自己的博客
		author = req.session.username
	}
	const result = getList(author, keyword)
	return result.then((listData) => {
		res.json(new SuccessModel(listData))
	})
})
router.get('/detail', (req, res, next) => {
	const result = getDetail(req.query.id)
	return result.then((detail) => {
		res.json(new SuccessModel(detail))
	})
})
router.post('/new', loginCheck, (req, res, next) => {
	req.body.author = req.session.username
	const result = newBlog(req.body)
	return result.then((data) => {
		res.json(new SuccessModel(data))
	})
})
router.post('/update', loginCheck, (req, res, next) => {
	const result = updateDetail(req.query.id, req.body)
	return result.then((data) => {
		res.json(new SuccessModel(data))
	})
})
router.post('/delete', loginCheck, (req, res, next) => {
	const result = deleteDetail(req.query.id, req.session.username)
	return result.then((data) => {
		if (data) {
			res.json(new SuccessModel(data))
		} else {
			res.json(new ErrorModel('删除博客失败'))
		}
	})
})

module.exports = router
