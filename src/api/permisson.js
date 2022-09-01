import request from '@/utils/request'
// 获取所有权限点
export function getPermissionListAPI(params) {
  return request({
    url: '/sys/permission',
    params
  })
}
