import { getRolesListAPI } from '@/api'
export default {
  namspaced: true,
  state: {
    rolesList: [],
    total: 0,
    addDialogVisible: false

  },
  mutations: {
    GET_ROLES_LIST(state, res) {
      state.rolesList = res.rows
      state.total = res.total
    },
    // 修改 addDialogVisible 的值
    change_DialogVisible(state, value) {
      state.addDialogVisible = value
    }
  },
  actions: {
    //   获取所有角色的信息
    async  getRolesList(context, params) {
      const res = await getRolesListAPI(params)
      context.commit('GET_ROLES_LIST', res)
    }
  }
}
