// 工资
import Layout from '@/layout'
export default {
  path: '/salarys', // 路径
  component: Layout,
  meta: { id: 'salarys' },
  children: [{
    path: '',
    name: 'salarys', // 给路由规则加一个name
    component: () => import('@/views/salarys'),
    meta: {
      title: '工资', icon: 'money'
    }
  }]
}
