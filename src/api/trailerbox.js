import request from '@/utils/request'

export function createTrailerBox(params) {
  return request({
    url: 'v1/trailers',
    method: 'POST',
    data: params
  })
}
export function TrailerboxDetail(id, params) {
  return request({
    url: 'v1/trailers/' + id,
    method: 'GET',
    data: params
  })
}
export function updateTrailerBox(id, params) {
  return request({
    url: 'v1/trailers/' + id,
    method: 'PUT',
    data: params
  })
}
export function deleteTrailerBox(user_id) {
  return request({
    url: 'v1/trailers/' + user_id,
    method: 'DELETE'
  })
}
export function trailerboxList(params) {
  return request({
    url: 'v1/trailers',
    method: 'GET',
    params: params
  })
}
