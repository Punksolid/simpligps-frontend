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

export function fetchNotificationTriggers(params) {
    return request({
        url: 'v1/notification_triggers',
        method: 'GET',
        params
    })
}

export function postNotificationTrigger(params) {
    return request({
        url: 'v1/notification_triggers',
        method: 'POST',
        data: params
    })
}
