const jwt = require('jsonwebtoken')
const fs = require('fs')
// Token 数据
const payload = {
  name: 'wanghao',
  admin: true
}

// 密钥
const privateKey = fs.readFileSync('./config/private.key')

// 签发 Token
const token = jwt.sign(payload, privateKey, { expiresIn: 60 * 60 * 24 })

// 输出签发的 Token
console.log(token)

jwt.verify(token, privateKey, (error, decoded) => {
  if (error) {
    console.log(error.message)
    return
  }
  console.log(decoded)
})