import { parseTime, dateDiff } from '@/utils/index.js';
const token = require('@/utils/token.js');
const user = require('./userModal.js');

export function register(req, res){
    user.register(req, res, function(err, results){
        if (err) return res.json({
            code: -1,
            success: false,
            message: err,
        })
        res.json({
            code: 200,
            success: true,
            message: '注册成功',
        })
    })
}

export function login(req, res){
    user.login(req, function(err, results){
        if (err) return res.json({
            code: -1,
            success: false,
            message: err,
        })
        if(results.length <= 0){
            return res.json({
                code: -1,
                success: false,
                message: '账号或密码错误',
            })
        }

        res.json({
            code: 200,
            success: true,
            message: '登陆成功',
            token: token.setToken({
                id: results[0].id,
                account: req.body.account,
                password: req.body.password,
                time: parseTime(new Date())
            })
        })
    })
}

export function logout(req, res){
    res.json({
        code: 200,
        success: true,
        message: '成功退出'
    })
}

export function getUserInfo(req, res){
    token.getToken(req.headers.authorization, res, function(rs){
        if(rs.success){
            let begintime = new Date(rs.user.time);
            let nowtime = new Date()
            let difftime = dateDiff(nowtime, begintime)
            user.info(req, rs.user.account, function(err, results){
                if (err) return res.json({
                    code: -1,
                    success: false,
                    message: err,
                })
                delete results[0].password;
                results[0].roles = results[0].roles.split(',');
                // 与上次保存token相差时间在23到24之间更新token，预防使用中重新登陆，体验不好
                let tokentext = '';
                if(difftime > 23 && difftime <=24){
                    tokentext = token.setToken({
                        id: results[0].id,
                        account: req.body.account,
                        password: req.body.password,
                        time: parseTime(new Date())
                    })
                }
                res.json({
                    code: 200,
                    success: true,
                    message: '用户信息获取成功',
                    data: results[0],
                    token: tokentext
                })   
            })
            
        }
    })
}
export function list(req, res){
    token.getToken(req.headers.authorization, res, function(rs){
        if(rs.success){
            user.list(req, function(err, results){
                var data = req.body;
                if (err) return res.json({
                    code: -1,
                    success: false,
                    message: '数据不存在',
                })
                for(var i in results[1]){
                    results[1][i].birthday = parseTime(results[1][i].birthday, '{y}-{m}-{d}')
                    delete results[1][i].password
                }
                res.json({
                    code: 200,
                    success: true,
                    pageNo: data.pageNo,
                    pageSize: data.pageSize,
                    total: results[0][0]['COUNT(*)'],
                    data: results[1],
                })
            })
        }
    })
}

export function add(req, res){
    token.getToken(req.headers.authorization, res, function(rs){
        user.add(req, function(err, results){
            if (err) return res.json({
                err_code: -1,
                success: false,
                message: err,
            })
            res.json({
                err_code: 200,
                success: true,
                message: '添加成功',
            })
        })
    })
}

export function del(req, res){
    token.getToken(req.headers.authorization, res, function(rs){
        user.del(req, function(err, results){
            if (err) return res.json({
                code: -1,
                success: false,
                message: err,
            })
            res.json({
                code: 200,
                success: true,
                message: '删除成功',
            })
        })
    })
}

export function updata(req, res){
    token.getToken(req.headers.authorization, res, function(rs){
        user.updata(req, function(err, results){
            if (err) return res.json({
                code: -1,
                success: false,
                message: err,
            })
            res.json({
                code: 200,
                success: true,
                message: '编辑成功',
            })
        })
    })
}