const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  permission_routes: state => state.permission.routes,
  UserName: state => state.user.UserName
}
export default getters
