import request from '@/utils/request'

export function upfile() {
  return request({
    url: '/api/upfile',
    method: 'post'
  })
}
