const xss = require('xss')
const { exec } = require('../db/mysql')
const getList = async (author, keyword) => {
	// 1=1 是 防止后面没有author，keyword做容错
	let sql = `select * from blogs where 1=1 `
	if (author) {
		sql += `and author='${author}' `
	}
	if (keyword) {
		sql += `and title like'%${keyword}%' `
	}
	sql += `order by createtime desc;`
	// 返回 promise
	return await exec(sql)
}
const getDetail = async (id) => {
	const sql = `select * from blogs where id='${id}';`
	const rows = await exec(sql)
	return rows[0]

}

const newBlog = async (blogData = {}) => {
	let { title, content, author } = blogData
	title = xss(title)
	content = xss(content)
	const createtime = Date.now()

	const sql = `insert into blogs(title,content,createtime,author)values('${title}','${content}','${createtime}','${author}');`
	const insertData = await exec(sql)
	return { id: insertData.insertId }

}

const updateDetail = async (id, blogData = {}) => {
	// 更新博客的ID
	const { title, content } = blogData
	const sql = `update blogs set title='${title}', content='${content}' where id='${id}';`

	const updateDate = await exec(sql)
	if (updateDate.affectedRows > 0) {
		return true
	}
	return false


}
const deleteDetail = async (id, author) => {
	// 删除博客的ID

	const sql = `delete from blogs where id='${id}' and author='${author}';`

	const delData = await exec(sql)
	if (delData.affectedRows > 0) {
		return true
	}
	return false

}
module.exports = {
	getList,
	getDetail,
	newBlog,
	updateDetail,
	deleteDetail,
}
