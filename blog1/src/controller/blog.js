const getList = (author, keyword) => {
	return [
		{
			id: 1,
			title: '标题A',
			content: '博客A',
			createTime: '1681831308651',
			author: 'zhangsan',
		},
		{
			id: 2,
			title: '标题B',
			content: '博客B',
			createTime: '1681831308656',
			author: 'lisi',
		},
	]
}
const getDetail = (id) => {
	return {
		id: 1,
		title: '标题A',
		content: '博客A',
		createTime: '1681831308651',
		author: 'zhangsan',
	}
}

const newBlog = (blogData = {}) => {
  console.log('blogData:', blogData)
	// blogData 包含title content 属性
	return { id: 3 }
}

const updateDetail = (id, blogData = {}) => {
	// 更新博客的ID
	return true
}
const deleteDetail = (id) => {
  // 删除博客的ID
	return true
}
module.exports = {
	getList,
	getDetail,
	newBlog,
	updateDetail,
	deleteDetail,
}
