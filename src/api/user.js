import request from '@/utils/request'

/**
 * 登录
 * @param {} data
 */
export function loginAPI(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户基本信息
 * @returns Promise
 */
export function getUserInfoAPI() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}

/**
 * 根据ID获取角色详情
 * @param {Number} id 用户的id
 * @returns Promise
 */
export function getUserAvator(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

// 根据ID获取角色详情
export function getRoleDetailAPI(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'get'
  })
}
