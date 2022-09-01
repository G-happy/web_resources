import router, { asyncRoutes, constantRoutes } from '@/router'
const state = {
  // 静态路由
  routes: constantRoutes
}
const mutations = {
  setRoutes(state, matchRoutes) {
    state.routes = [...constantRoutes, ...matchRoutes]
  }
}
const actions = {
  filterRoutes(context, menus) {
    // 根据路由中的 meta.id 将属于用户的权限模块过滤出来
    const matchRoutes = asyncRoutes.filter(route => menus.includes(route.meta.id))
    // 存储到state中
    context.commit('setRoutes', matchRoutes)

    // 将动态路由 添加到 路由表中
    router.addRoutes([...matchRoutes, { path: '*', redirect: '/404', hidden: true }])
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
