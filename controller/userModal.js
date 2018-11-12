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
  register: function (req, res, callback) {
    const query = req.body;
    this.validateAccount(req, function(err, results){
      if(!query.user_name || query.user_name == ''){
        res.json({
            code: 0,
            success: false,
            message: '请填写用户名',
        })
      }else if(results.length > 0){
        res.json({
            code: 0,
            success: false,
            message: '该账号已存在，请重新填写',
        })
      }else {
        const sqlStr = 'INSERT INTO USER_LIST(account, password, user_name, sex, age, birthday) VALUES(?,?,?,?,?,?)';

        query.password = setMd5(query.password);
        var user = [query.account, query.password, query.user_name, query.sex || null, query.age || null, query.birthday || null];
        sqlPool.connect(sqlStr, user, callback);
      }
    });
  },
  validateAccount: function (req, callback){
    const query = req.body;
    var sqlUserList = "SELECT * FROM USER_LIST where 1=1 and account=?";
    sqlPool.connect(sqlUserList, [query.account], callback)
  },
  login: function (req, callback) {
    const query = req.body;
    let sqlStr = 'SELECT * FROM USER_LIST WHERE account=? and password=?';

    query.password = setMd5(query.password);
    var value = [query.account, query.password];
    sqlPool.connect(sqlStr, value, callback);
  },
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
  	const sqlStr = 'INSERT INTO USER_LIST( user_name, sex, age, birthday) VALUES(?,?,?,?)';
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