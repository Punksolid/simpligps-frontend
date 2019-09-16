import { mount, createLocalVue } from '@vue/test-utils'
import TripImportButton from '@/views/catalogs/trips/components/TripImportButton.vue'
import Vuex from 'vuex'

describe('TripImportButton.vue', () => {
  let wrapper
  let store



  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    store = new Vuex.Store({
      state: {
        account: {
          uuid: '872309418729034871209'
        }
      }
    })
    wrapper = mount(TripImportButton, {
      store,
      localVue
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
