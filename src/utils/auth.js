import Cookies from 'js-cookie'

const TenantID = ''
// const Tenant = null

export function setTenantID(value) {
  return Cookies.set('TenantID', value)
}
export function getTenantID() {
  return Cookies.get('TenantID')
}
export function setTenant(value) {
  return Cookies.set('Tenant', value)
}
export function getTenant() {
  return Cookies.get('Tenant')
}
export function removeTenantID() {
  return Cookies.remove(TenantID)
}

export function getToken() {
  return Cookies.get('TokenKey')
}
export function setToken(token) {
  // var TimeToExpire = new Date(new Date().getTime() + 15 * 60 * 1000) // Primer numero es igual a minutos.
  return Cookies.set('TokenKey', token, { expires: 1 }) // Expiracion en un día, si se requieren minutos cambiar el numero 1 por la variable "TimeToExpire"
}
export function removeToken() {
  return Cookies.remove('TokenKey')
}

export function resetCookie() {
  Cookies.remove('Account')
  Cookies.remove('UserId')
  Cookies.remove('TokenKey')
  return Cookies.remove('TenantID')
}

// User id handling
export function getUserId() {
  return Cookies.get('UserId')
}

export function setUserId(value) {
  return Cookies.set('UserId', value)
}
