import { mount } from '@vue/test-utils'
import OnlineUsersCard from '@/components/Card/OnlineUsersCard'

describe('OnlineUsersCard.vue', () => {
  let wrapper

  beforeEach(() => {

    wrapper = mount(OnlineUsersCard, {
      stubs: {
        RouterLink: true
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('it should accept a number as prop and show it', function() {
      expect(wrapper.exists()).toBeTruthy()
      wrapper.setProps({
        usersCount: 4898
      })
      expect(wrapper.html()).toContain(4898)
  })

})
