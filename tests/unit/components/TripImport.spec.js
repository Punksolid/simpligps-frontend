import { mount } from '@vue/test-utils'
import TripImportButton from '@/views/catalogs/trips/components/TripImportButton.vue'
import Vuex from 'vuex'

describe('TripImportButton.vue', () => {
  let wrapper
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        account: {
          uuid: jest.fn()
        }
      }
    })
    wrapper = mount(TripImportButton, {
      store
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should show a button that will enable a dialog', function() {
      expect(wrapper.exists()).toBeTruthy()
      const import_button = wrapper.find('#open-import')
      expect(import_button.exists()).toBeTruthy()

      import_button.trigger('click')
      expect(wrapper.html()).toContain('Import an excel file')

  })

})
