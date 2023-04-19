const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'guyu123456',
	port: '3306',
	database: 'myblog',
})

// 开始连接
con.connect()
// 执行sql语句
// const sql = 'select id,username from users'
// const sql = `update users set realname='李四2' where username='lisi'`
const sql = `insert into blogs(title,content,createtime,author) values ('标题B','内容B','1681882029505','zhangsan')`
con.query(sql, (err, result) => {
	if (err) {
		console.error(err)
		return
	}
	console.log(result)
})
// 关闭链接
con.end()
