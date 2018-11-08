exports = module.exports = [
	{
		// 获取列表
    method: 'post',
    path: '/api/userlist',
    impl: 'account.list'
	},
	{
		// 添加user
		method: 'post',
    path: '/api/adduser',
    impl: 'account.add'
	},
	{
		// 删除user
		method: 'post',
    path: '/api/deluser',
    impl: 'account.del'
	},
	{
		// 修改user
		method: 'post',
    path: '/api/updateuser',
    impl: 'account.update'
	}
];