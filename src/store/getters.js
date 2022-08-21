const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  username: state => state.user.userInfo.username,
  userId: state => state.user.userInfo.userId,
  staffPhoto: state => state.user.userInfo.staffPhoto,
  hrsaasTime: state => state.user.hrsaasTime,
  rolesList: state => state.roles.rolesList,
  total: state => state.roles.total
}
export default getters
