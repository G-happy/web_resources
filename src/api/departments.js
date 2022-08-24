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

/**
 * 根据 id 获取部门详情
 * @param {String} id 部门id
 * @returns
 */
export function getDepartDetailAPI(id) {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * 根据 id 编辑部门详情
 * @param {Object} 部门信息
 * @returns
 */
export function editDepartDetailAPI(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}
