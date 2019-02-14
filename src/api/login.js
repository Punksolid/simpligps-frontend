import request from '@/utils/request'

export function login(email, password) {
  const data = {
    email: email,
    password: password
  }
  return request({
    url: 'v1/login',
    method: 'POST',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'v1/user/info',
    method: 'GET'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/v1/logout',
    method: 'POST'
  })
}
