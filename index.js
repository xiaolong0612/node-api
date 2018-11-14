const express = require('express');
const app = express();
//解析表单的插件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type, Authorization");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
})
//登录拦截器
app.all('/*', function(req, res, next){
  next();
  // if (req.session.user) {
  //   next();
  // }else {
  //   var arr = req.url.split('/');// 解析用户请求的路径

  //   for (var i = 0, length = arr.length; i < length; i++) {// 去除 GET 请求路径上携带的参数
  //     arr[i] = arr[i].split('?')[0];
  //   }
  //   if (arr.length > 1 && arr[1] == '') {// 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
  //     next();
  //   } else if (arr.length > 2 && arr[1] == 'user' && (arr[2] == 'register' || arr[2] == 'login' || arr[2] == 'logout' || arr[2].indexOf('login') > 0 )) {
  //     next();
  //   } else {  // 登录拦截
  //     req.session.originalUrl = req.originalUrl ? req.originalUrl : null;  // 记录用户原始请求路径
  //     // req.flash('error', '请先登录');
  //     // res.redirect('/user/login');  // 将用户重定向到登录页面
  //   }
  // }
});
 

const config = require('./config/index');
const controller = require('./controller');
const route = require('./route').map(item => {
    console.log(`route ${item.method}:${item.path}`);
    let tuple = item.impl.split('.');
    item.impl = controller[tuple[0]][tuple[1]];
    return item;
});
route.find(item => {
   app[item.method](item.path, (req, res) => {
        if(item){
            item.impl(req, res);
            return;
        }
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
   }) 
})

app.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
});