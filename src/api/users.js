import request from '@/utils/request'

export function createUser(params) {
  return request({
    url: 'v1/users',
    method: 'post',
    params
  })
}

export function usersList(params) {
  return request({
    url: 'v1/users',
    method: 'get',
    params
  })
}
export function loggedUser() {
  return request({
    url: 'v1/me',
    method: 'GET',
  })
}
