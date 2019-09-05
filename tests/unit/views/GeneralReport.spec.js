import { mount, createLocalVue } from '@vue/test-utils'
import { DatePicker, Loading } from 'element-ui'
import GeneralReportView from '@/views/reports/GeneralReportView'


describe('GeneralReportView.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(GeneralReportView)

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

  it('should populate all the fields', function() {
    console.table(wrapper.find(DatePicker).vm)
    wrapper.find(DatePicker).setData({
      value: [
        new Date(2016, 9, 10, 8, 40),
        new Date(2016, 9, 10, 9, 40)]
  })

    expect(wrapper.vm.form).toEqual({
      intervalTime: '019283', // start and date in the same field
      monitoringType: '019283',
      originPlace: '019283',
      destinationPlace: '019283',
      carrier: '019283'
    })
  })

})
