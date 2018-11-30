import request from '@/utils/request'
/**
 * @param  {
 * 		pageNo: 1,
      pageSize: 10,
      sex: '', // 男/女
      age: '', // init
      user_name: '', // string
      birthday: '' // yyyy-MM-dd
 * }
 */
export function getList(data) {
  return request({
    url: '/api/userlist',
    method: 'post',
    data
  })
}
/**
 * @param  {
 * 		account: 'xiaolong',
      password: '123456',
      checkPass: '123456',
      user_name: 'xiaolongjun',
      sex: '男',
      age: '12',
      birthday: '1997-06-12'
 * }
 */
export function register(data) {
  return request({
    url: '/api/register',
    method: 'post',
    data
  })
}
/**
 * @param  {
 * 		user_name: 'xiaolongjun',
      sex: '男',
      age: '12',
      birthday: '1997-06-12'
 * }
 */
export function updata(data) {
  return request({
    url: '/api/updatauser',
    method: 'post',
    data
  })
}
/**
 * @param  {
 * 		ids: []
 * }
 */
export function del(data) {
  return request({
    url: '/api/deluser',
    method: 'post',
    data
  })
}
