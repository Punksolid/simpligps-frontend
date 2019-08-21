import { mount, shallowMount } from '@vue/test-utils'
import NewTrip from '@/views/catalogs/trips/newtrip.vue'

describe('Newtrip.vue', () => {

  let wrapper

  beforeEach(() => {

    wrapper = shallowMount(NewTrip)
    wrapper.setProps({
      form: {
        rp: 'a'
      }
    })
  })

  it('can press a create trip planification button', () => {

  })
})
