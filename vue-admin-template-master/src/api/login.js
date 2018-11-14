import request from '@/utils/request'

export function login(account, password) {
  return request({
    url: '/api/login',
    method: 'post',
    data: {
      account,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/api/userinfo',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/api/logout',
    method: 'post'
  })
}
