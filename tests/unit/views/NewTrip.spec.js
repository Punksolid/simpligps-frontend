import { mount, shallowMount } from '@vue/test-utils'
import NewTrip from '@/views/catalogs/trips/newtrip.vue'
import TripMock from '@/mock/trips.js'
import { tripDetails } from '@/api/trips'
import nock from 'nock'
import { Select } from 'element-ui'

describe('Newtrip.vue', () => {
  let wrapper
  const tripResponse = {
      'id': 32,
      'rp': 'Prueba Salida',
      'folio': null,
      'invoice': 'este es el invoice nuevo',
      'client_id': 1,
      'client_name': 'StarkIndustries',
      'origin_name': 'CTTMX',
      'destination_name': 'Mente Interactiva',
      'stops': 0,
      'mon_type': 'Monitoring',
      'carrier_id': 1,
      'truck_tract_id': 14,
      'truck_name': 'Persona Chema',
      'operator_id': 2,
      'scheduled_load': '2019-08-06 22:39:00',
      'scheduled_departure': '2019-08-07 22:39:00',
      'scheduled_arrival': '2019-08-08 22:39:00',
      'scheduled_unload': '2019-08-09 22:39:00',
      'real_departure': null,
      'real_arrival': null,
      'bulk': null,
      'tag': null,
      'convoy_id': null,
      'georoute_ref': '17471233_7',
      'tags': [{ 'name': 'etiquetaazul', 'slug': 'etiquetaazul' }],
      'truck': {
        'id': 14,
        'name': 'Persona Chema',
        'plate': 'Bicicleta',
        'model': 'Desconocido',
        'internal_number': '111111111',
        'brand': 'Desconocido',
        'gps': null,
        'color': 'Azul',
        'carrier_id': 1,
        'device_id': null,
        'operator_id': null,
        'current_operator': { 'id': 14, 'name': 'OperatorToDelete' }
      },
      'operator': { 'id': 2, 'name': 'ComercializadoraSAdeCVV' },
      'origin': {
        'id': 20,
        'name': 'CTTMX',
        'person_in_charge': 'Daniel',
        'address': 'Rosales',
        'phone': '66666666666',
        'high_risk': 0,
        'geofence_ref': '17471233_1',
        'checkpoint_id': 80,
        'at_time': '2019-08-06 22:39:00',
        'exiting': '2019-08-07 22:39:00',
        'real_at_time': '2019-08-22 07:25:48',
        'real_exiting': '2019-08-22 07:25:48',
        'status': 2
      },
      'destination': {
        'id': 22,
        'name': 'Mente Interactiva',
        'person_in_charge': 'Heber Martinez',
        'address': 'asdfasd',
        'phone': '876182763187283',
        'high_risk': 0,
        'geofence_ref': '17471233_6',
        'checkpoint_id': 87,
        'at_time': '2019-08-08 22:39:00',
        'exiting': '2019-08-09 22:39:00',
        'real_at_time': null,
        'real_exiting': null,
        'status': 0
      },
      'intermediates': [],
      'trailers': [],
      'client': {
        'id': 1,
        'description': 'Company Description',
        'company_name': 'StarkIndustries',
        'address': 'Sky Tower #123',
        'city': 'Culiacan',
        'state': 'Sinaloa',
        'phone': '6677220033',
        'email': 'stark@industries.com',
        'person_name': '6',
        'status': true,
        'email_frequency': 1
      }
    }


  // beforeEach(() => {
  //   wrapper = mount(NewTrip, {
  //     propsData: {
  //       trip: tripResponse
  //     }
  //   })
  // })
  //
  // afterEach(() => {
  //   wrapper.destroy()
  //
  // })

  it('can press a create trip planification button and put loading', () => {
    const wrapper_create = mount(NewTrip)
    const submit = wrapper_create.find('#submit')
    expect(submit.html()).toContain('Create Trip Planification')

    expect(wrapper_create.vm.loadings.general).toBe(false)

    submit.trigger('click')

    // expect(wrapper_create.vm.loadings.general).toBe(true)
    expect(submit.vm.loading).toBe(true)
  })

  it('should disable the origin to be modified when real_at_time is set on origin', () => {
    const wrapper = shallowMount(NewTrip, {
      propsData: {
        trip: tripResponse
      }
    })

    const origin_select = wrapper.find('#origin')

    console.log(wrapper.vm.locks.origin)
    expect(origin_select.props('disabled')).toBe(true)
    wrapper.vm.locks.origin = true
    console.log(wrapper.vm.locks.origin)


  })
})
