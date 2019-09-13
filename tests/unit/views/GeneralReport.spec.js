import { mount, createLocalVue } from '@vue/test-utils'
import { DatePicker } from 'element-ui'
import GeneralReportView from '@/views/reports/GeneralReportView'

describe('GeneralReportView.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(GeneralReportView, {
      stubs: {
        transition: false
      }
    })
  })

  it('should show all fields required for general report', () => {
    expect(wrapper.find(DatePicker).exists()).toBeTruthy()
    expect(wrapper.find('#monitoring-type').exists()).toBeTruthy()
    expect(wrapper.find('#origin-place').exists()).toBeTruthy()
    expect(wrapper.find('#destination-place').exists()).toBeTruthy()
    expect(wrapper.find('#carrier').exists()).toBeTruthy()
    expect(wrapper.find('#generate').exists()).toBeTruthy()
  })

  it('should have a download button', function() {
    expect(wrapper.html()).toContain('Download')
  })
})
