import request from '@/utils/request'

export function getUnits(params) {
  return request({
    url: 'v1/units',
    method: 'get',
    params
  })
}

// "data": array:29 [
  // 0 => {#260
    // "name": "Audi RS8"
    // "id": 734477
    /*+"measure_units": 0
    +"position": {#648
      +"lat": 52.32953
      +"lon": 9.776
    }
  }
  1 => {#645
    +"name": "Audi_retr"
    +"id": 717361
    +"measure_units": 0
    +"position": {#646
      +"lat": 53.8662383333
      +"lon": 27.4363433333
    }
  } */
