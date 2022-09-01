import request from '@/utils/request'

/**
 * 获取所有角色信息
 * @param {Object} params 页码和每页数据
 * @returns Promise
 */
export function getRolesListAPI(params) {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 新增角色
 * @param {Object} data 角色名称和角色描述
 * @returns Promise
 */
export function addRolesAPI(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

/**
 * 编辑角色
 * @param {Object} data 角色名称和角色描述
 * @returns Promise
 */
export function updataRolesAPI(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}

/** **
 *  删除角色
 *
 * ****/
export function deleteRoleAPI(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}

// 给角色分配权限
export function assignPermAPI(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}

