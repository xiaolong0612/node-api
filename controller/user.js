var user = require('./userModal.js');

exports.register = function(req, res){
    user.register(req, res, function(err, results){
        if (err) return res.json({
            code: 1,
            message: err,
        })
        res.json({
            code: 200,
            success: true,
            message: '注册成功',
        })
    })
}

exports.login = function(req, res){
    user.login(req, function(err, results){
        if (err) return res.json({
            code: 1,
            message: err,
        })
        res.json({
            code: 0,
            message: '添加成功',
        })
    })
}

exports.list = function(req, res){
    user.list(req, function(err, results){
        var data = req.body;
        if (err) return res.json({
            code: 1,
            success: false,
            message: '数据不存在',
        })
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

exports.add = function(req, res){
    user.add(req, function(err, results){
        if (err) return res.json({
            err_code: 1,
            message: err,
        })
        res.json({
            err_code: 0,
            message: '添加成功',
        })
    })
}

exports.del = function(req, res){
    user.del(req, function(err, results){
        if (err) return res.json({
            code: 1,
            message: err,
        })
        res.json({
            code: 0,
            message: '删除成功',
        })
    })
}

exports.update = function(req, res){
    user.update(req, function(err, results){
        if (err) return res.json({
            code: 1,
            message: err,
        })
        res.json({
            code: 0,
            message: '编辑成功',
            // affectedRows: results.affectedRows
        })
    })
}