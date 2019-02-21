import request from '@/utils/request'

export function getRoles(role) {
  return request({
    url: 'v1/roles/' + role,
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

export function setRole(role, user) {
  return request({
    url: 'v1/roles/' + role + '/user',
    method: 'POST',
    data: {
      user_id: user
    }
  })
}

export function setRolePermissions(role, permissions) {
  return request({
    url: 'v1/roles/' + role,
    method: 'PUT',
    data: {
      permissions: permissions
    }
  })
}

export function getPermissions() {
  return request({
    url: 'v1/permissions',
    method: 'GET'
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
