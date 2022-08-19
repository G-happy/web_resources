import Cookies from 'js-cookie'

const TokenKey = 'resources_token'

// 获取
export function getToken() {
  return Cookies.get(TokenKey)
}

// 存储
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 移除
export function removeToken() {
  return Cookies.remove(TokenKey)
}
