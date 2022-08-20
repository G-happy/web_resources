// 组织架构
import Layout from '@/layout'
export default {
  path: '/departments', // 路径
  name: 'departments', // 给路由规则加一个name
  component: Layout,
  children: [{
    path: '',
    component: () => import('@/views/departments'),
    meta: {
      title: '组织架构', icon: 'skill'
    }
  }]
}
