// 员工
import Layout from '@/layout'
export default {
  path: '/employees', // 路径
  component: Layout,
  children: [{
    path: '',
    name: 'employees', // 给路由规则加一个name
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理', icon: 'people'
    }
  }]
}
