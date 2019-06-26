import request from '@/utils/request'

/**
 * @deprecated in favor of fetchOperators
 */
export function getOperators(params) {
  return request({
    url: 'v1/operators',
    method: 'GET',
    params
  })
}
export function fetchOperators(params) {
  return request({
    url: 'v1/operators',
    method: 'GET',
    params
  })
}
export function createOperator(params) {
  return request({
    url: 'v1/operators',
    method: 'POST',
    data: params
  })
}
export function updateOperator(id, params) {
  return request({
    url: 'v1/operators/' + id,
    method: 'PUT',
    data: params
  })
}
export function deleteOperator(id) {
  return request({
    url: 'v1/operators/' + id,
    method: 'DELETE'
  })
}
export function searchOperators(params) {
  return request({
    url: 'v1/operators/search',
    method: 'GET',
    params: params
  })
}
