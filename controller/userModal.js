const mysql = require('mysql');
const sqlPoolObj = require('../utils/SQLcool.js');
const sqlPool = sqlPoolObj.sqlpool();
 
module.exports = {
    list: function (query, callback) {
	    const sqlStr = 'SELECT COUNT(*) FROM USER_LIST;SELECT * FROM USER_LIST limit ' + (Number(query.pageNo || 1)-1) + ',' + (query.pageSize || 10)+ ';SELECT * FROM USER_LIST WHERE user_name=? and sex=? and age=? and birthday=?';
	    var user = [query.user_name || '', query.sex || '', query.age || '', query.birthday || ''];
        sqlPool.connect(sqlStr, user, callback);
    }
}