import request from '@/utils/request'

export function situationsList(params) {
  return request({
    url: 'v1/situations',
    method: 'GET',
    data: params
  })
}
export function createSituation(params) {
  return request({
    url: 'v1/situations',
    method: 'POST',
    data: params
  })
}
export function updateSituation(id, params) {
  return request({
    url: 'v1/situations/' + id,
    method: 'PUT',
    data: params
  })
}
export function deleteSituation(id) {
  return request({
    url: 'v1/situations/' + id,
    method: 'DELETE'
  })
}
