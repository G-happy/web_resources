import { loginAPI, getUserInfoAPI } from '@/api'
//
import { setToken, getToken, removeToken } from '@/utils/auth'
export default {
  namspaced: true,

  state: {
    // 用户登录成功的token值
    token: getToken() || null,
    // 用户信息
    userInfo: {}
  },

  mutations: {
    // 设置 token 值
    SET_TOKEN(state, token) {
      state.token = token
      // 将 token 存储到 cookie 中
      setToken(token)
    },
    // 保存用户信息
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    REMOVE_TOKEN(state) {
      state.token = null
      removeToken()
    },
    REMOVE_USER_INFO(state) {
      state.userInfo = {}
    }
  },

  actions: {
    async setToken(context, loginFormData) {
      // 在响应拦截器中对请求回来的数据进行了处理
      const token = await loginAPI(loginFormData)
      context.commit('SET_TOKEN', token)
    },
    async getUserInfo(context) {
      const res = await getUserInfoAPI()
      // console.log(res)
      context.commit('SET_USER_INFO', res)
    }
  }
}
