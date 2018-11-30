import request from '@/utils/request'

export function updateAccessKey(params) {
  return request({
    url: 'v1/settings/wialon_key/',
    method: 'post',
    params
  })
}
