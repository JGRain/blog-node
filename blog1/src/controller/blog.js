const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
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
	return exec(sql)
}
const getDetail = (id) => {
	const sql = `select * from blogs where id='${id}';`
	return exec(sql).then((rows) => {
		return rows[0]
	})
}

const newBlog = (blogData = {}) => {
	const { title, content, author } = blogData
	const createtime = Date.now()

	const sql = `insert into blogs(title,content,createtime,author)values('${title}','${content}','${createtime}','${author}');`
	return exec(sql).then((insertData) => {
		console.log('insertData is', insertData)
		return { id: insertData.insertId }
	})
	// console.log('blogData:', blogData)
	// blogData 包含title content 属性
	// return { id: 3 }
}

const updateDetail = (id, blogData = {}) => {
	// 更新博客的ID
	const { title, content } = blogData
	const sql = `update blogs set title='${title}', content='${content}' where id='${id}';`

	return exec(sql).then((updateDate) => {
		// console.log(updateDate)
		if (updateDate.affectedRows > 0) {
			return true
		}
		return false
	})
}
const deleteDetail = (id, author) => {
	// 删除博客的ID

	const sql = `delete from blogs where id='${id}' and author='${author}';`

	return exec(sql).then((delData) => {
		if (delData.affectedRows > 0) {
			return true
		}
		return false
	})
	// return true
}
module.exports = {
	getList,
	getDetail,
	newBlog,
	updateDetail,
	deleteDetail,
}
