import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
const TimeOut = 60 * 60 * 24 // 定义超时时间

// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = store.getters.hrsaasTime // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础路径
  timeout: 5000 // 超时时间
})

// 请求拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // 只有在有token的情况下 才有必要去检查时间戳是否超时
    if (IsCheckTimeOut()) {
      // 如果它为true表示 过期了
      // token没用了 因为超时了
      store.dispatch('user/logout') // 退出操作
      // 跳转到登录页
      router.push('/login')

      return Promise.reject(new Error('token超时了'))
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  // 将请求过来的数据进行处理
  const { success, message, data } = response.data
  if (success) {
    return data
  }
  Message.error(message)
  return Promise.reject(new Error(message))
}, (err) => {
  Message.error(err.message)
  return Promise.reject(err)
})

export default service
