import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/api/userlist',
    method: 'post',
    data
  })
}
export function register(data) {
  return request({
    url: '/api/register',
    method: 'post',
    data
  })
}
export function updata(data) {
  return request({
    url: '/api/updatauser',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/api/deluser',
    method: 'post',
    data
  })
}
