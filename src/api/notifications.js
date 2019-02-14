import request from '@/utils/request'

export function createNotification(params) {
  return request({
    url: 'v1/notifications',
    method: 'POST',
    data: params
  })
}

export function notificationList(params) {
  return request({
    url: 'v1/notifications',
    method: 'GET',
    params
  })
}
