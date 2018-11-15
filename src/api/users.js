import request from '@/utils/request'

export function createUser(params) {
  return request({
    url: 'v1/users',
    method: 'post',
    params
  })
}
