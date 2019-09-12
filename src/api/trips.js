import request from '@/utils/request'

export function fetchTripList(params) {
  return request({
    url: 'v1/trips',
    method: 'GET',
    params: params
  })
}
export function createTrip(params) {
  return request({
    url: 'v1/trips',
    method: 'POST',
    data: params
  })
}
export function updateTrip(id, params) {
  return request({
    url: 'v1/trips/' + id,
    method: 'PUT',
    data: params
  })
}
export function deleteTrip(id) {
  return request({
    url: 'v1/trips/' + id,
    method: 'DELETE'
  })
}
export function startTrip(id, params) {
  return request({
    url: 'v1/trips/' + id + '/give_exit',
    method: 'POST',
    data: params
  })
}
export function tripAutoUpdates(id) {
  return request({
    url: 'v1/trips/' + id + '/automatic_updates',
    method: 'DELETE'
  })
}
export function assignTripTags(id, params) {
  return request({
    url: 'v1/trips/' + id + '/tags',
    method: 'POST',
    data: params
  })
}
export function fetchTripDetails(id) {
  return request({
    url: 'v1/trips/' + id,
    method: 'GET'
  })
}
export function updateCheckpoint(id, params) {
  /**
   *         $call = $this->patchJson("/api/v1/checkpoints/{$checkpoint->pivot->id}", $form);

        $call->assertJson([
            'data' => [
                'name' => $place1->name,
                'real_at_time' => $form['real_at_time'],
                'real_exiting' => $form['real_exiting']
            ]
        ]);
   */
  return request({
    url: 'v1/checkpoints/' + id,
    data: params,
    method: 'PATCH'
  })
}
export function fetchTripsReport(params) {
  return request({
    url: 'v1/reports',
    params: params,
    method: 'POST',
    responseType: 'blob'
  })
}
export function importTripsList(params) {
  return request({
    url: 'v1/imports',
    params: params,
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

