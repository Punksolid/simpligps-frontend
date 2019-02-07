import request from '@/utils/request'

export function changePassword(params) {
  return request({
    url: 'v1/me/change_password',
    method: 'POST',
    params
  })
}

export function getMyNotifications() {
  return request({
    url: 'v1/me/notifications',
    method: 'GET'
  })
}
