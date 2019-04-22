import request from '@/utils/request'
import Cookies from 'js-cookie'

const account = {
  state: {
    id: Cookies.get('Account') ? Cookies.getJSON('Account').id : '',
    name: Cookies.get('Account') ? Cookies.getJSON('Account').name : '',
    uuid: Cookies.get('Account') ? Cookies.getJSON('Account').uuid : ''
  },

  mutations: {
    SET_ACCOUNT: (state, account) => {
      state.uuid = account.uuid
      state.id = account.id
      state.name = account.easyname
      Cookies.set('Account', account)
    }
  },

  actions: {
    SelectAccount({ commit }, account_uuid_selected) {
      return new Promise((resolve, reject) => {
          return request({
            url: 'v1/me/accounts/' + account_uuid_selected,
            method: 'GET'
          }).then(response => {
              commit('SET_ACCOUNT', response.data.data)
              resolve()
            }).catch(error => {
              console.log('ERRRROR')
              console.log(error)
              Error('err')
              reject()
          })
      })
    }
  }
}

export default account
