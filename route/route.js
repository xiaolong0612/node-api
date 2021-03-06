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
		// 用户登出
		method: 'post',
    path: '/api/logout',
    impl: 'user.logout'
	},
	{
		// 用户信息
		method: 'post',
    path: '/api/userinfo',
    impl: 'user.getUserInfo'
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
    path: '/api/updatauser',
    impl: 'user.updata'
	},
	{
		// 上传
		method: 'post',
    path: '/api/upfile',
    impl: 'file.upfile'
	}
];