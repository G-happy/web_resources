import axios from 'axios'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础路径
  timeout: 5000 // 超时时间
})

// 请求拦截器
service.interceptors.request.use()

// 响应拦截器
service.interceptors.response.use()

export default service
