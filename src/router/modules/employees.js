// 员工
import Layout from '@/layout'
export default {
  path: '/employees', // 路径
  component: Layout,
  children: [{
    path: '',
    name: 'employees',
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理', icon: 'people'
    }
  }, {
    path: 'detail/:id',
    name: 'detail',
    hidden: true,
    component: () => import('@/views/employees/detail.vue')
  }]
}
