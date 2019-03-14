import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getAccSelected } from '@/utils/auth'
import Cookies from 'js-cookie'

const user = {
  state: {
    id: '',
    token: getToken(),
    name: '',
    avatar: '',
    accselected: getAccSelected(),
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ACCSELECTED: (state, value) => {
      state.accselected = value
      Cookies.set('AccSelected', value)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ID: (state, id) => {
      state.id = id
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.email.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.access_token)
          commit('SET_ID', data.id)
          setToken(response.data.access_token)
          resolve(data)
        }).catch(error => {
          console.log(error.response)
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut: function({ commit, state }) {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      Cookies.remove('AccSelected')
      removeToken()
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
