import request from '@/utils/request'

export function createClient(params) {
  return request({
    url: 'v1/clients',
    method: 'POST',
    data: params
  })
}
export function updateClient(id, params) {
  return request({
    url: 'v1/clients/' + id,
    method: 'PUT',
    data: params
  })
}
export function deleteClient(client_id) {
  return request({
    url: 'v1/clients/' + client_id,
    method: 'DELETE'
  })
}
export function clientsList(params) {
  return request({
    url: 'v1/clients',
    method: 'GET',
    params: params
  })
}
export function loggedClient() {
  return request({
    url: 'v1/me',
    method: 'GET'
  })
}
