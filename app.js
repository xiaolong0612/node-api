const express = require('express');
const app = express();
 
//解析表单的插件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}))
 
 
//创建数据库连接对象
const mysql = require('mysql');
const conn = mysql.createConnection({
    host     : '39.106.16.151',
    user     :  'root',
    password : 'zhishan_888',
    port : '3306',
    database : 'xiaolongjun',
    multipleStatements: true //允许执行多条语句
});
 
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

//分页查询数据
app.post('/api/getlist', (req, res) => {
    var data = req.body;
    console.log(data)
    const sqlStr = 'SELECT COUNT(*) FROM USER_LIST;SELECT * FROM USER_LIST limit ' + ((Number(data.pageNo)-1) || 0) + ',' + (data.pageSize || 10)+ ';SELECT * FROM USER_LIST WHERE user_name=? and sex=? and age=? and birthday=?';
    var user = [data.user_name || '', data.sex || '', data.age || '', data.birthday || ''];
    conn.query(sqlStr, user, (err, results) => {
        if (err) return res.json({
            code: 1,
            success: false,
            message: '数据不存在',
            affextedRows: 0
        })
        res.json({
            code: 200,
            success: true,
            pageNo: data.pageNo,
            pageSize: data.pageSize,
            total: results[0][0]['COUNT(*)'],
            data: results[1],
            affextedRows: results.affextedRows
        })
    })
});

//添加 
app.get('/api/adduser', (req, res) => {
    const data = req.query
    console.log(data)
    const sqlStr = 'INSERT INTO USER_LIST(user_name, sex, age, birthday) VALUES(?,?,?,?)';
    var user = [data.user_name, data.sex, data.age, data.birthday];
    conn.query(sqlStr, user, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: err,
            affectedRows: 0
        })
        res.json({
            err_code: 0,
            message: '添加成功',
            affectedRows: results.affectedRows
        })
    })
 
})
//修改 
app.post('/api/edituser', (req, res) => {
    const data = req.body
    console.log(data)
    const sqlStr = 'UPDATE USER_LIST SET user_name=?, sex=?, age=?, birthday=? WHERE id = '+data.id ;
    var user = [data.user_name, data.sex, data.age, data.birthday,data.id];
    conn.query(sqlStr, user, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: err,
            affectedRows: 0
        })
        res.json({
            err_code: 0,
            message: '修改成功',
            affectedRows: results.affectedRows
        })
    })
 
})

//删除 
app.post('/api/deluser', (req, res) => {
    const data = req.body
    console.log(data)
    const sqlStr = 'DELETE FROM USER_LIST WHERE id = '+data.id;
    conn.query(sqlStr, (err, results) => {
        if (err) return res.json({
            err_code: 1,
            message: err,
            affectedRows: 0
        })
        res.json({
            err_code: 0,
            message: '删除成功',
            affectedRows: results.affectedRows
        })
    })
 
})
 
app.listen(3000, () => {
    console.log('正在监听端口3000');
})