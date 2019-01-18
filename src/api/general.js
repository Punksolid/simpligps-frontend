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
