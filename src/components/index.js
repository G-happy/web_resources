// import PageTools from '@/components/PageTools'
// 批量注册组件
// 对象写法
// export default {
//   install(Vue) {
//     Vue.component('PageTools', PageTools)
//   }
// }
// 函数写法
// export default (Vue) => {
//     Vue.component('PageTools', PageTools)
// }

// 自动批量注册组件
const requireComponent = require.context('./', true, /\.vue$/)
// requireComponent(地址)
const res = requireComponent.keys().map(ele => requireComponent(ele))

export default (Vue) => {
  res.forEach(item => {
    // item.default 为组件对象
    Vue.component(item.default.name, item.default)
  })
}
