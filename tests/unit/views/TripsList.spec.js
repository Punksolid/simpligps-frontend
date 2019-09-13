import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import { Pagination, Select } from 'element-ui'
import axios from 'axios'
import Vuex from 'vuex'

import TripList from '@/views/catalogs/trips/index.vue'
// import { ElLoadingComponent } from 'element-ui/types/loading'
import { Loading } from 'element-ui'

describe('TripList.vue', () => {
  let wrapper
  let store

  beforeEach(() => {
    const localVue = createLocalVue()
    store = new Vuex.Store({
      state: {
        account: {
          uuid: jest.fn()
        }
      }
    })

    localVue.directive('loading', Loading)
    wrapper = mount(TripList, {
      store,
      localVue,
      stubs: {
        transition: false
      }
    })
  })
  afterEach(() => {
    wrapper.destroy()
  })
  it('should load the view', function() {
    expect(wrapper.find(TripList).exists()).toBe(true)
  })

  it('should PAGINATE the trip list', async function() {
    const pagination = await wrapper.find(Pagination)
    expect(pagination.vm.currentPage).toEqual(1)
  })

  it('should discard the tags dialog after assign tag', async function() {
    wrapper.setData({
      tripsList: [{ 'id': 785, 'rp': "Danika O'Kon", 'folio': null, 'invoice': '98448', 'client_id': 873, 'client_name': 'Zieme LLC', 'origin_name': 'Prof. Dasia Turcotte IV', 'destination_name': 'Mr. Madison Volkman', 'stops': 0, 'mon_type': '1', 'carrier_id': 2077, 'truck_tract_id': 1153, 'truck_name': 'Ernest Harber', 'operator_id': 876, 'scheduled_load': '2019-09-07 10:21:01', 'scheduled_departure': '2019-09-08 10:21:01', 'scheduled_arrival': '2019-09-10 10:21:01', 'scheduled_unload': '2019-09-11 10:21:01', 'real_departure': null, 'real_arrival': null, 'bulk': null, 'convoy_id': null, 'georoute_ref': null,
        'tags': [{ 'name': 'autoridad', 'slug': 'autoridad' }, { 'name': 'federal', 'slug': 'federal' }],
        'truck': { 'id': 1153, 'name': 'Ernest Harber', 'plate': '#056340', 'model': 'Blanda Ltd', 'internal_number': '926752', 'brand': 'Hyatt-Raynor', 'gps': null, 'color': 'Silver', 'carrier_id': 2076, 'device_id': null, 'operator_id': null, 'current_operator': { 'id': 876, 'name': 'Dr. Steve Wolff I', 'phone': '595.647.8373', 'active': false }}, 'origin': { 'id': 1397, 'name': 'Prof. Dasia Turcotte IV', 'person_in_charge': 'Raegan Franecki', 'address': '248 Dewitt Fort Apt. 051\nNorth Karinahaven, NE 21000', 'phone': '291.214.8671', 'high_risk': 0, 'geofence_ref': '17471233_4', 'checkpoint_id': 612, 'at_time': '2019-09-07 10:21:01', 'exiting': '2019-09-08 10:21:01', 'real_at_time': null, 'real_exiting': null, 'status': 0 }, 'destination': { 'id': 1398, 'name': 'Mr. Madison Volkman', 'person_in_charge': 'Vickie Bayer', 'address': '4894 Upton Rapid\nLake Niahaven, GA 45929', 'phone': '253-576-6474', 'high_risk': 1, 'geofence_ref': '17471233_4', 'checkpoint_id': 613, 'at_time': '2019-09-10 10:21:01', 'exiting': '2019-09-11 10:21:01', 'real_at_time': null, 'real_exiting': null, 'status': 0 }, 'intermediates': [], 'client': { 'id': 873, 'description': 'Neva Cassin', 'company_name': 'Zieme LLC', 'address': 'Jamil Schamberger', 'city': 'Dr. Mattie Toy', 'state': 'Mckenna Yundt', 'phone': 'Dr. Natasha Conn III', 'email': 'Payton Ledner', 'person_name': 'Hailey Jakubowski', 'status': true, 'email_frequency': 1 }}]
    })

    const tags_dialog_button = wrapper.find('.action-buttons')
    // console.log(tags_dialog_button.html())
    expect(tags_dialog_button.exists()).toBeTruthy()
    console.log(tags_dialog_button.html())
    // expect(wrapper.html()).not.toContain('Trip Tags')
    tags_dialog_button.trigger('click')
    // expect(wrapper.html()).toContain('Trip Tags')
  })
})
