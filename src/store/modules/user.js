import { loginAPI } from '@/api'
//
import { setToken, getToken, removeToken } from '@/utils/auth'
export default {
  namspaced: true,

  state: {
    // 用户登录成功的token值
    token: getToken() || null
  },

  mutations: {
    // 设置 token 值
    SET_TOKEN(state, token) {
      state.token = token
      // 将 token 存储到 cookie 中
      setToken(token)
    },
    REMOVE_TOKEN(state) {
      state.token = null
      removeToken()
    }
  },

  actions: {
    async setToken(context, loginFormData) {
      // 在响应拦截器中对请求回来的数据进行了处理
      const token = await loginAPI(loginFormData)
      context.commit('SET_TOKEN', token)
    }
  }
}
