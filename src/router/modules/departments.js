// 组织架构
import Layout from '@/layout'
export default {
  path: '/departments', // 路径
  component: Layout,
  meta: { id: 'departments' },
  children: [{
    path: '',
    name: 'departments', // 给路由规则加一个name
    component: () => import('@/views/departments'),
    meta: {
      title: '组织架构', icon: 'skill'
    }
  }]
}
