import Cookies from 'js-cookie'

const TenantID = ''

export function setTenantID(value) {
  return Cookies.set('TenantID', value)
}
export function getTenantID() {
  return Cookies.get('TenantID')
}
export function removeTenantID() {
  return Cookies.remove(TenantID)
}

export function getToken() {
  return Cookies.get('TokenKey')
}
export function setToken(token) {
  return Cookies.set('TokenKey', token)
}
export function removeToken() {
  return Cookies.remove('TokenKey')
}

export function resetCookie() {
  Cookies.remove('TokenKey')
  return Cookies.remove('TenantID')
}
