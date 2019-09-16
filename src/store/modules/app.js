import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    usersOnline: []
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      const el = document.body
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
        el.classList.add('sidebar-collapsed')
        el.classList.remove('sidebar-show')
      } else {
        Cookies.set('sidebarStatus', 0)
        el.classList.add('sidebar-show')
        el.classList.remove('sidebar-collapsed')
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      const el = document.body
      el.classList.remove('sidebar-show')
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_USERS_ONLINE: (state, users) => {
      console.log('first set')
      state.usersOnline = users
    },
    ADD_USER_ONLINE: (state, user) => {
      console.log('add user')
      console.table(user)
      state.usersOnline.push(user)
    },
    REMOVE_FROM_USERS_ONLINE: (state, user) => {
      console.log('delete user')
      state.usersOnline = state.usersOnline.filter(function(user_element) {
        return user_element.id !== user.id
      })
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    SetUsersOnline({ commit }, users) {
      commit('SET_USERS_ONLINE', users)
    },
    AddUserOnline({ commit }, user) {
      commit('ADD_USER_ONLINE', user)
    },
    RemoveUserOnline({ commit }, user) {
      commit('REMOVE_FROM_USERS_ONLINE', user)
    }
  }
}

export default app
