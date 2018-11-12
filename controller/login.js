const login = require('./loginModal.js');
// 注册用户表添加用户
const user = require('./user.js');

const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

//生成token的方法
function  generateToken(data){
    let created = Math.floor(Date.now() / 1000);
    let cert = fs.readFileSync(path.join(__dirname, '../config/pri.pem'));//私钥
    let token = jwt.sign({
        data,
        exp: created + 3600 * 24
    }, cert, {algorithm: 'RS256'});
    return token;
}

exports.login = function(req, res){
  login.index(req, function(err, results){
    var data = req.body;
    if (err) return res.json({
      code: 1,
      success: false,
      message: '登陆失败'
    })

    if(results[0].checkNum == 0){
    	res.json({
    		code: 1,
	      success: false,
	      message: '账号或密码错误'
	    })
    }else {
    	login.getUserInfo(data.account, function(err, results){
    		if (err){
    			return res.json({
			      code: 1,
			      success: false,
			      message: '用户信息查询失败'
			    })
    		} else {
    			console.log(results)
    			return res.json({
	    			code: 200,
			      success: true,
			      // token: generateToken({uid});
			      message: '登陆成功'
			    })  
    		}
    	})
    }
  })
}

exports.register = function(req, res){
  login.register(req, function(err, results){
    var data = req.body;
    if (err) return res.json({
      code: 1,
      success: false,
      message: '注册失败'
    })
    user.add(req, res)
  })
}