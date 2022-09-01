// 员工
import Layout from '@/layout'
export default {
  path: '/employees', // 路径
  component: Layout,
  meta: { id: 'employees' },
  children: [{
    path: '',
    name: 'employees', // 给路由规则加一个name
    component: () => import('@/views/employees'),
    meta: {
      title: '员工管理', icon: 'people'
    }
  }, {
    path: 'detail/:id',
    name: 'detail',
    hidden: true,
    component: () => import('@/views/employees/detail.vue')
  }, {
    path: 'print/:id', // 二级默认路由
    component: () => import('@/views/employees/Print.vue'), // 按需加载
    hidden: true,
    meta: {
      title: '打印', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
      icon: 'people'
    }
  }]
}
