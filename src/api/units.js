import request from '@/utils/request'

export function getUnits(params) {
  return request({
    url: 'v1/units',
    method: 'get',
    params
  })
}

