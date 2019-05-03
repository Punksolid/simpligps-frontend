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

export function getWialonNotifications() {
  return request({
    url: 'v1/wialon/notifications',
    method: 'GET'
  })
}

export function destroyNotification(id) {
  return request({
    url: 'v1/notification_triggers/' + id,
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
    data: params
  })
}

export function getDashboardElements() {
  return request({
    url: 'v1/dashboard',
    method: 'GET'
  })
}

export function getPlaces(params) {
  return request({
    url: 'v1/places',
    method: 'GET',
    params
  })
}

export function fetchGeofences() {
  return request({
    url: 'v1/wialon/geofences',
    method: 'GET'
  })
}

export function fetchLogsDevices(id) {
  return request({
    url: 'v1/devices/' + id + '/logs',
    method: 'GET'
  })
}
