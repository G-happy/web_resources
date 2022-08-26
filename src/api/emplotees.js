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

/**
 * 获取员工列表
 * @param {Object} params 页码和每页条数
 * @returns  Promise
 */
export function getEmployeesDetailInfoAPI(params) {
  return request({
    url: '/sys/user',
    params
  })
}

/**
 * 新增员工
 * @param {Object} data
 * @returns
 */
export function addEmployeeAPI(data) {
  return request({
    method: 'post',
    url: '/sys/user',
    data
  })
}

/**
 * 删除员工接口
 * ****/
export function delEmployeeAPI(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/** *
 *  封装一个导入员工的接口
 *  批量导入
 * ***/
export function importEmployeeAPI(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
