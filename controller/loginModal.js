const mysql = require('mysql');
const sqlPoolObj = require('../utils/SQLcool.js');
const sqlPool = sqlPoolObj.sqlpool();
var md5 = require('md5-node');


// 加密处理，多次加密不容易被破解
function setMd5(str, count){
	count = typeof count == 'undefined' ? 3 : count;
	for(let i=0; i<count; i++){
		str = md5(str);
	}
	return str
}
 
module.exports = {
	index: function(req, callback) {
		const query = req.body;
    let sqlStr = 'SELECT COUNT(*) checkNum FROM ACCOUNT WHERE account=? and password=?';

		query.password = setMd5(query.password);
    var value = [query.account, query.password];
    sqlPool.connect(sqlStr, value, callback);
	},
	getUserInfo: function (account, callback){
		let sqlStr = 'SELECT * FROM USER_LIST where 1=1 and account=' + account + ' limit 0,1';
		sqlPool.connect(sqlStr, callback);
	},
	register: function(req, callback) {
  	const query = req.body;
  	const sqlStr = 'INSERT INTO ACCOUNT(account, password) VALUES(?,?)';
  	// 加密处理，多次加密不容易被破解
		query.password = setMd5(query.password);

  	var value = [query.account, query.password];
  	sqlPool.connect(sqlStr, value, callback);
	},
}