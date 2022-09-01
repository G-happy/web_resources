import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import roles from './modules/roles'
import permission from './modules/permission'
// vuex 数据持久化缓存
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    roles,
    permission
  },
  getters,
  plugins: [createPersistedState({
    reducer(state) {
      return {
        user: {
          hrsaasTime: state.user.hrsaasTime
        }
      }
    }
  })]
})

export default store
