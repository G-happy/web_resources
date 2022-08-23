import request from '@/utils/request'

/**
 * 获取员工简单列表
 * @returns Promise
 */
export function getEmployeesSimpleAPI() {
  return request({
    url: '/sys/user/simple'

  })
}
