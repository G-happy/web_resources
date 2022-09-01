import store from '@/store'
export default {
  methods: {
    checkPermission(key) {
      const points = store.state.user.userInfo.roles && store.state.user.userInfo.roles.points
      return points.includes(key)
    }
  }
}
