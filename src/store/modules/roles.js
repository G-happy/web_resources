import { getRolesListAPI, addRolesAPI } from '@/api'

export default {
  namspaced: true,
  state: {
    rolesList: [],
    total: 0
  },
  mutations: {
    GET_ROLES_LIST(state, res) {
      state.rolesList = res.rows
      state.total = res.total
    }
  },
  actions: {
    //   获取所有角色的信息
    async  getRolesList(context, params) {
      const res = await getRolesListAPI(params)
      context.commit('GET_ROLES_LIST', res)
    },
    //  新增角色
    async addRoles(context, data) {
      const res = await addRolesAPI(data)
      console.log(res)
    }
  }
}
