import request from '@/utils/request'

export function createGeofence(params) {
  return request({
    url: 'v1/geofences',
    method: 'POST',
    data: params
  })
}

export function getGeofence(params) {
  return request({
    url: 'v1/geofences',
    method: 'get',
    params
  })
}


