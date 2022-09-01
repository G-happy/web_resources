// 公司设置
import Layout from '@/layout'
export default {
  path: '/setting', // 路径
  component: Layout,
  meta: { id: 'settings' },
  children: [{
    path: '',
    name: 'setting', // 给路由规则加一个name
    component: () => import('@/views/setting'),
    meta: {
      title: '公司设置', icon: 'setting'
    }
  }]
}
