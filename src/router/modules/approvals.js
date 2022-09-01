// 审批
import Layout from '@/layout'
export default {
  path: '/approvals', // 路径
  component: Layout,
  meta: { id: 'approvals' },
  children: [{
    path: '',
    name: 'approvals', // 给路由规则加一个name
    component: () => import('@/views/approvals'),
    meta: {
      title: '审批', icon: 'tree-table'
    }
  }]
}
