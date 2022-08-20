//  权限管理
import Layout from '@/layout'
export default {
  path: '/permission', // 路径
  name: 'permission', // 给路由规则加一个name
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/permission'),
    meta: {
      title: '权限管理', icon: 'lock'
    }
  }]
}
