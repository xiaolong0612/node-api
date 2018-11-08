const mysql = require("mysql");

//解析表单的插件
const bodyParser = require('body-parser');

module.exports.sqlpool = function () {
    let pool = {
        config:{
            host:'39.106.16.151',
            user:'root',
            password:'zhishan_888',
            port:'3306',
            database:'xiaolongjun',
            multipleStatements: true //允许执行多条语句
        },
        connect: function (sql,arr,fn) {
            //创建链接池对象
            const pool= mysql.createPool(this.config);
            //获取链接池对象
            pool.getConnection(function (err,connect) {
                if(err){
                    console.log(err);
                }else{
                    connect.query(sql,arr,fn);
                }
            });
        }
    }
    return pool;
}