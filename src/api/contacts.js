import request from '@/utils/request'

export function createContact(params) {
  return request({
    url: 'v1/contacts',
    method: 'POST',
    data: params
  })
}
export function getContacts(params) {
  return request({
    url: 'v1/contacts',
    method: 'get',
    params
  })
}
export function updateContact(id, params) {
  return request({
    url: 'v1/contacts/' + id,
    method: 'PUT',
    data: params
  })
}
export function deleteContact(contact_id) {
  return request({
    url: 'v1/contacts/' + contact_id,
    method: 'DELETE'
  })
}
