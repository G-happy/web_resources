import request from '@/utils/request'
/**
 * 获取组织架构数据
 **/
export function getDepartmentsAPI() {
  return request({
    url: '/company/department'
  })
}

/**
 * 删除部门
 * @param {String|Number} id 部门id
 * @returns
 */
export function delDepartmentsAPI(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

/**
 * 新增部门
 * @param {Object} data 新增部门信息对象
 * @returns Promise
 */
export function addDepartmentsAPI(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
