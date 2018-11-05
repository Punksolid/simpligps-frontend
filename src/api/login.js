import request from '@/utils/request'

export function login(email, password) {
  console.log(email, password)
  return request({
    url: 'v1/login',
    method: 'post',
    data: {
      email,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/v1/logout',
    method: 'post'
  })
}
