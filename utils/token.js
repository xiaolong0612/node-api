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
	validateToken: function (token) {
		jwt.verify(token, privateKey, (error, decoded) => {
		  if (error) {
		    console.log(error.message)
		    return {success: false}
		  }
		  return {
		  	user: decoded,
		  	success: true
		  }	
		})
	}
}