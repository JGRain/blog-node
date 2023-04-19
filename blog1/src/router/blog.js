const {
	getList,
	getDetail,
	newBlog,
	updateDetail,
	deleteDetail,
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleBlogRouter = (req, res) => {
	const method = req.method
	const path = req.path
	const id = req.query.id || ''

	// 获取博客列表
	if (method === 'GET' && path === '/api/blog/list') {
		const { author = '', keyword = '' } = req.query
		const result = getList(author, keyword)
		return result.then((listData) => {
			return new SuccessModel(listData)
		})
		// return {
		// 	msg: '这是获取博客列表的接口',
		// }
	}
	// 获取博客详情
	if (method === 'GET' && path === '/api/blog/detail') {
		const result = getDetail(id)
		return result.then((detail) => {
			return new SuccessModel(detail)
		})

		// const detail = getDetail()
		// return new SuccessModel(detail)
		// return {
		// 	msg: '这是获取博客详情的接口',
		// }
	}
	// 新建一篇博客
	if (method === 'POST' && path === '/api/blog/new') {
		// 假数据 待开发登录时候再改成真数据
		req.body.author = 'zhangsan'
		const result = newBlog(req.body)
		return result.then((data) => {
			return new SuccessModel(data)
		})
		// const data = newBlog(req.body)
		// return new SuccessModel(data)
		// return {
		// 	msg: '这是新建一篇博客的接口',
		// }
	}
	// 更新一篇博客
	if (method === 'POST' && path === '/api/blog/update') {
		const result = updateDetail(id, req.body)
		return result.then((updateDate) => {
			if (updateDate) {
				return new SuccessModel()
			}
			return new ErrorModel('传入博客失败')
		})
		// if (result) return new SuccessModel()
		// return new ErrorModel('传入博客失败')
		// return {
		// 	msg: '这是更新一篇博客的接口',
		// }
	}
	// 删除一篇博客
	if (method === 'POST' && path === '/api/blog/delete') {
		// 假数据 待开发登录时候再改成真数据
		req.body.author = 'zhangsan'

		const result = deleteDetail(id, req.body.author)
		return result.then((deleteDate) => {
			if (deleteDate) {
				return new SuccessModel()
			}
			return new ErrorModel('删除博客失败')
		})
		// const result = deleteDetail(id, req.data)
		// if (result) return new SuccessModel()
		// return new ErrorModel('删除博客失败')
		// return {
		// 	msg: '这是删除一篇博客的接口',
		// }
	}
}

module.exports = handleBlogRouter
