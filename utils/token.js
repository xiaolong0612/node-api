const jwt = require('jsonwebtoken')
const fs = require('fs')
/**
 * @Author    xiaolongjun
 * @DateTime  2018-11-13
 * @namespace
 * @param   
 * userinfo {
 * 	account:
 * 	password:
 * }
 */
 // 获取签发 JWT 时需要用的密钥
const privateKey = fs.readFileSync('./config/private.key')
module.exports = {
	setToken: function (userinfo) {
		return jwt.sign(userinfo, privateKey, { expiresIn: 60 * 60 * 24 })
	},
	getToken: function (token, res, callback) {
		jwt.verify(token, privateKey, (error, decoded) => {
		  if (error) {
		    console.log(error.message)
		    res.json({
            code: 50014,
            success: false,
            message: '请重新登陆',
        })
		    return
		  }
		  if(typeof callback == 'function') callback({user: decoded,success:true})
		})
	}
}