import { loginAPI, getUserInfoAPI, getUserAvator } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

export default {
  namspaced: true,

  state: {
    // 用户登录成功的token值
    token: getToken() || null,
    // 用户信息
    userInfo: {},
    // 每次登录的时间戳
    hrsaasTime: ''
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
    },
    // 保存时间戳
    set_hrsaasTime(state, time) {
      state.hrsaasTime = time
    }
  },

  actions: {
    // 登录
    async setToken(context, loginFormData) {
      // 在响应拦截器中对请求回来的数据进行了处理
      const token = await loginAPI(loginFormData)
      context.commit('SET_TOKEN', token)
      context.commit('set_hrsaasTime', +new Date())
    },
    // 获取用户信息
    async getUserInfo(context) {
      const res = await getUserInfoAPI()
      const data = await getUserAvator(res.userId)
      context.commit('SET_USER_INFO', { ...res, ...data })
      return { ...res, ...data }
    },
    // 退出
    logout(context) {
      // 删除token
      context.commit('REMOVE_TOKEN')
      // 删除用户资料
      context.commit('REMOVE_USER_INFO')
      // 重置路由
      resetRouter()
      // user 模块调用了 permission 中的方法
      // 子模块调用子模块的action 可以 将 commit的第三个参数 设置成  { root: true } 就表示当前的context不是子模块了 而是父模块
      // 清空所有的动态路由
      context.commit('permission/filterRoutes', [])
    }
  }
}
