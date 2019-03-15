const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  accselected: state => state.user.accselected,
  name: state => state.user.name,
  roles: state => state.user.roles,
  tenant: state => state.user.tenant
}
export default getters
