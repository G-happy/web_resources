import axios from 'axios'
import { Message } from 'element-ui'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础路径
  timeout: 5000 // 超时时间
})

// 请求拦截器
service.interceptors.request.use()

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
