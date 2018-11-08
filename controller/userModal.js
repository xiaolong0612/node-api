const mysql = require('mysql');
const sqlPoolObj = require('../utils/SQLcool.js');
const sqlPool = sqlPoolObj.sqlpool();
 
module.exports = {
  list: function (req, callback) {
  	const query = req.body;
    let sqlStr = 'SELECT COUNT(*) FROM USER_LIST;';

    sqlStr += "SELECT * FROM USER_LIST where 1=1";
    let user = [];
    if(query.user_name && query.user_name != ''){
    	query.user_name = "%"+query.user_name+"%";
      sqlStr += " and user_name like ?";
      user.push(query.user_name);
    }
    if(query.sex && query.sex != ''){
    	query.sex = "%"+query.sex+"%";
      sqlStr += " and sex like ?";
      user.push(query.sex);
    }
    if(query.age && query.age != ''){
    	query.age = "%"+query.age+"%";
      sqlStr += " and age like ?";
      user.push(query.age);
    }
    if(query.birthday && query.birthday != ''){
    	query.birthday = "%"+query.birthday+"%";
      sqlStr += " and birthday like ?";
      user.push(query.birthday);
    }
    sqlStr += ' limit ?,?';
    user.push((Number(query.pageNo-1) || 0), (Number(query.pageSize) || 10))
    sqlPool.connect(sqlStr, user, callback);
  },
  add: function (req, callback) {
  	const query = req.body;
  	const sqlStr = 'INSERT INTO USER_LIST(user_name, sex, age, birthday) VALUES(?,?,?,?)';
  	var user = [query.user_name, query.sex, query.age, query.birthday];

  	sqlPool.connect(sqlStr, user, callback);
  },
  del: function (req, callback) {
  	const query = req.body;
  	const sqlStr = 'DELETE FROM USER_LIST WHERE id = '+query.id;
  	sqlPool.connect(sqlStr, [], callback);
  },
  update: function (req, callback) {
  	const query = req.body;
  	const sqlStr = 'UPDATE USER_LIST SET user_name=?, sex=?, age=?, birthday=? WHERE id = '+query.id;
  	var user = [query.user_name, query.sex, query.age, query.birthday,query.id];
  	sqlPool.connect(sqlStr, user, callback);
  }
}