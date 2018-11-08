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
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})
 

const config = require('./config');
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