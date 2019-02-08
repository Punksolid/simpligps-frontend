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

export function createContacts(params) {
  return request({
    url: 'v1/contacts',
    method: 'post',
    params
  })
}

export function getContacts(params) {
  return request({
    url: 'v1/contacts',
    method: 'get',
    params
  })
}
export function deleteContact(contact_id) {
  console.log(contact_id)
  console.log('contact')
  return request({
    url: 'v1/contacts/' + contact_id,
    method: 'DELETE'
  })
}

export function deleteUser(user_id) {
  return request({
    url: 'v1/users/' + user_id,
    method: 'DELETE'
  })
}

export function getCarriers(params) {
  return request({
    url: 'v1/carriers',
    method: 'GET',
    params
  })
}
export function createCarrier(params) {
  return request({
    url: 'v1/carriers',
    method: 'post',
    params
  })
}

export function getWialonNotifications() {
  return request({
    url: 'v1/wialon/notifications',
    method: 'GET'
  })
}
export function getPermissions() {
  return request({
    url: 'v1/permissions',
    method: 'GET'
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
