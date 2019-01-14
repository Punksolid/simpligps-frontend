import request from '@/utils/request'

export function getOperators(params) {
  return request({
    url: 'v1/operators',
    method: 'GET',
    params
  })
}
export function createOperator(params) {
  return request({
    url: 'v1/operators',
    method: 'post',
    params
  })
}
