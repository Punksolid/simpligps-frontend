import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TenantID = '0'

export function setTenantID(value) {
  return Cookies.set(TenantID, value)
}
export function getTenantID() {
  return Cookies.get(TenantID)
}
export function removeTenantID() {
  return Cookies.remove(TenantID)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  console.log('REMOVER TOKEN') // TODO REMOVER TOQKEN
  return Cookies.remove(TokenKey)
}
