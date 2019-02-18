import request from '@/utils/request'

export function changePassword(params) {
  return request({
    url: 'v1/me/change_password',
    method: 'POST',
    data: params
  })
}

export function getMyPermissions() {
  return request({
    url: 'v1/me/permissions',
    method: 'GET'
  })
}

export function getMyNotifications() {
  return request({
    url: 'v1/me/notifications',
    method: 'GET'
  })
}
