import Mock from 'mockjs'
// import loginAPI from './login'
// import usersAPI from './users'

// import articleAPI from './article'
// import remoteSearchAPI from './remoteSearch'
// import transactionAPI from './transaction'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// Mock.setup({
//   timeout: '350-600'
// })

// Relacionado con inicio de sesión
// Mock.mock(/\/v1\/login/, 'post', loginAPI.loginByUsername)
// Mock.mock(/\/v1\/logout/, 'post', loginAPI.logout)
// Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// Users
 // Mock.mock(/\/v1\/users/, 'post', usersAPI.createUser)

 // Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
// Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
// Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)

// Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
// Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
// Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

export default Mock