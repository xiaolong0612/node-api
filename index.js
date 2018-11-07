const http = require('http');
const nUrl = require('url');
const util = require('util');
const querystring = require('querystring');
const config = require('./config');
const controller = require('./controller');
const route = require('./route').map(item => {
    console.log(`route ${item.method}:${item.path}`);
    let tuple = item.impl.split('.');
    item.impl = controller[tuple[0]][tuple[1]];
    return item;
});
const server = http.createServer((req, res) => {
    let url = {};
    let method = req.method;
    if(method == 'GET') {
        console.log('get')
        url = util.inspect(nUrl.parse(req.url,true))
    } else {
        console.log("post")
        // 注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
        req.on('data', function (chunk) {
            // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
            url += chunk;
        });
        req.on('end', function () {
            // 解析参数
            url = querystring.parse(url);  //将一个字符串反序列化为一个对象
            console.log(url.sex);
        });
    }

    let matchRoute = route.find(item => {
        return item.method === method && item.path === url.pathname;
    });

    if (matchRoute) {
        matchRoute.impl(req, res);
        return;
    }
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
});

server.listen(config.port, config.hostname, () => {
    console.log(`Server running at http://${config.hostname}:${config.port}/`);
});