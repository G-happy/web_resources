// 社保
import Layout from '@/layout'
export default {
  path: '/social',
  component: Layout,
  meta: { id: 'social_securitys' }, // "666"
  children: [{
    path: '',
    name: 'social',
    component: () => import('@/views/social'),
    meta: {
      title: '社保', icon: 'table'
    }
  }]
}
