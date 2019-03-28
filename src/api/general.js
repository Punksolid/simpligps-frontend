import request from '@/utils/request'

export function checkStatus(params) {
  return request({
    url: '',
    method: 'GET'
  })
}

export function getResources(params) {
  return request({
    url: 'v1/wialon/resources',
    method: 'get',
    params
  })
}

export function getWialonUnits() {
  return request({
    url: 'v1/wialon/units',
    method: 'GET'
  })
}

export function deleteUser(user_id) {
  return request({
    url: 'v1/users/' + user_id,
    method: 'DELETE'
  })
}

export function getWialonNotifications() {
  return request({
    url: 'v1/wialon/notifications',
    method: 'GET'
  })
}

export function destroyNotification(id) {
  return request({
    url: 'v1/wialon/notifications/' + id,
    method: 'delete'
  })
}

export function getDatabaseNotifications() {
  return request({
    url: 'v1/me/notifications',
    method: 'GET'
  })
}

export function createWialonNotification(params) {
  return request({
    url: 'v1/wialon/notifications',
    method: 'POST',
    params
  })
}
