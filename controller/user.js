var user = require('./userModal.js');

exports.list = function(req, res){
    user.list(req.query, function(err, results){
        if (err) return res.json({
            code: 1,
            success: false,
            message: '数据不存在',
            affextedRows: 0
        })
        // res.json({
        //     code: 200,
        //     success: true,
        //     pageNo: data.pageNo,
        //     pageSize: data.pageSize,
        //     total: results[0][0]['COUNT(*)'],
        //     data: results[1],
        //     affextedRows: results.affextedRows
        // })
        res.end({
        	data: results[1]
        })
    })
    // res.end('waiting for impl.');
}