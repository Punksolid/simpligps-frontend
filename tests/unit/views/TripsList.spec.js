import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import { Pagination, Select } from 'element-ui'

import ElementUI from 'element-ui'
import TripList from '@/views/catalogs/trips/index.vue'
// import { ElLoadingComponent } from 'element-ui/types/loading'
import { Loading } from 'element-ui'

describe('TripList.vue', () => {
  let wrapper


  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.directive('loading', Loading)
    wrapper = mount(TripList, {
      localVue
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

})
