import request from '@/utils/request'

export function login(email, password) {
  const data = {
    email: email,
    password: password
  }
  return request({
    url: 'v1/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'v1/user/info',
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/v1/logout',
    method: 'post'
  })
}
export function resetPass(params) {
  return request({
    url: '/v1/password/send_email/',
    method: 'POST',
    params
  })
}
