const jwt = require('jsonwebtoken')

/**
 * 密匙
 * @type {String}
 */
const secret = 'XIAOLONGJUN'

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
module.exports = {
	setToken: function (userinfo) {
		return jwt.sign(userinfo, secret, { expiresIn: '1day' })
	},
	getToken: function (token) {
		jwt.verify(token, secret, (error, decoded) => {
		  if (error) {
		    console.log(error.message)
		    return
		  }
		  return decoded
		})
	}
}