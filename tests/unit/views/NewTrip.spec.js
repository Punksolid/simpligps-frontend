import { mount, shallowMount } from '@vue/test-utils'
import NewTrip from '@/views/catalogs/trips/newtrip.vue'
import TripMock from '@/mock/trips.js'
import { tripDetails } from '@/api/trips'
import nock from 'nock'
import { Select } from 'element-ui'

describe('NewTrip.vue', () => {
  let wrapper

  it('can show form with empty fields', () => {
      wrapper = mount(NewTrip)

      expect(wrapper.vm.$data.form.georoute_ref).toBeNull()
      expect(wrapper.vm.$data.form.origin_id).toBeNull()
  })

  it('should display a plus button to add intermediates', function() {
    wrapper = shallowMount(NewTrip)
    const plus_button = wrapper.find('#add-intermediate')
    expect(plus_button.exists()).toBe(true)

  })

  it('should not show intermediates fields by default', function() {
    wrapper = shallowMount(NewTrip)

    expect(wrapper.find('.intermediates-fields').exists()).toBeFalsy()

    const add_intermediate_button = wrapper.find('#add-intermediate')

    add_intermediate_button.vm.$emit('click')

    expect(wrapper.find('.intermediates-fields').exists()).toBeTruthy()

  })

})
