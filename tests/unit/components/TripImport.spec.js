import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import TripImportButton from '@/views/catalogs/trips/components/TripImportButton.vue'
import { Dialog } from 'element-ui'

describe('TripImportButton.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(TripImportButton)
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
