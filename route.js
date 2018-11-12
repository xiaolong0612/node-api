exports = module.exports = [
	{
		// 用户注册
		method: 'post',
    path: '/api/register',
    impl: 'user.register'
	},
	{
		// 用户登陆
		method: 'post',
    path: '/api/login',
    impl: 'user.login'
	},
	{
		// 获取列表
    method: 'post',
    path: '/api/userlist',
    impl: 'user.list'
	},
	{
		// 删除user
		method: 'post',
    path: '/api/deluser',
    impl: 'user.del'
	},
	{
		// 修改user
		method: 'post',
    path: '/api/updateuser',
    impl: 'user.update'
	}
];