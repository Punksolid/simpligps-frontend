import request from '@/utils/request'

export function changePassword(params) {
  return request({
    url: 'v1/me/change_password',
    method: 'POST',
    data: params
  })
}

export function getMyAccounts() {
  return request({
    url: 'v1/me/accounts/',
    method: 'GET'
  })
}

export function viewAccount() {
  return request({
    url: 'v1/me/accounts/',
    method: 'POST'
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

export function markNotificationAsRead(uuid) {
  return request({
    url: 'v1/me/notifications/' + uuid + '/mark_as_read',
    method: 'POST'
  })
}
