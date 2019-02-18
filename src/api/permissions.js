import request from '@/utils/request'

export function getPermissions() {
  return request({
    url: 'v1/permissions',
    method: 'GET'
  })
}
export function getRoles() {
  return request({
    url: 'v1/roles',
    method: 'GET'
  })
}

export function createRole(params) {
  return request({
    url: 'v1/roles',
    method: 'POST',
    data: {
      name: params
    }
  })
}
export function deleteRole(id) {
  return request({
    url: 'v1/roles/' + id,
    method: 'DELETE'
  })
}

export function updatePermissions(user, params) {
  return request({
    url: 'v1/permissions/user_sync/' + user,
    method: 'POST',
    data: {
      permissions: params,
      _method: 'PUT'
    }
  })
}
