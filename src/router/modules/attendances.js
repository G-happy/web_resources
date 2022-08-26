// 考勤
import Layout from '@/layout'
export default {
  path: '/attendances', // 路径
  component: Layout,
  children: [{
    path: '',
    name: 'attendances', // 给路由规则加一个name
    component: () => import('@/views/attendances'),
    meta: {
      title: '考勤', icon: 'skill'
    }
  }]
}
