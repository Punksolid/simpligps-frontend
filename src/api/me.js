import request from '@/utils/request'

export function changePassword(params) {
  return request({
    url: 'v1/me/change_password',
    method: 'post',
    params
  })
}
