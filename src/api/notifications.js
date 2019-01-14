import request from '@/utils/request'

export function createNotification(params) {
  return request({
    url: 'v1/notifications',
    method: 'post',
    params
  })
}

export function notificationList(params) {
  return request({
    url: 'v1/notifications',
    method: 'get',
    params
  })
}
