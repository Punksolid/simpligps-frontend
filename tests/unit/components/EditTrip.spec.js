import { mount, shallowMount } from '@vue/test-utils'
import EditTrip from '@/views/catalogs/trips/EditTrip.vue'

describe('EditTrip.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(EditTrip, {
      props: {
        id: 1
      }
    })
  })

  it('puede presionar boton de Editar Viaje', () => {
    const submit = wrapper.find('#submit')
    expect(submit.html()).toContain('Update Trip')

    expect(wrapper.vm.loading).toBe(false)

    submit.trigger('click')
    expect(wrapper.vm.loading).toBe(true)
  })

  it('should populate the fields in the form', function() {
    const tripDetails = {
      'data': {
        'id': 32,
        'rp': 'Prueba Salida CTTMXxxxxx3333',
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
          'current_operator': { 'id': 14, 'name': 'OperatorToDelete'}
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
          'real_at_time': null,
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
    }
    const form = wrapper.vm.data.form
    expect(form.).toBe(true)

  })
})

