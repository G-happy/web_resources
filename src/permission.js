// 权限设置
import router from '@/router'
import store from '@/store'

// 白名单(不需要token,即可访问的页面)
const whiteList = ['/login', '/404']

// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  // 1.已有token
  if (store.getters.token) {
    if (!store.getters.userId) {
      await store.dispatch('getUserInfo')
    }
    // 1.1 如果还要去登录页,则跳转到首页
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    //   目标路径处于白名单中,直接跳转
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
