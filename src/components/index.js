import TestOne from './Test1/Test-1.vue'
import TestTwo from './Test2/Test-2.vue'
import Pagination from './pagination/index.vue'

import fil from './filter/index'

// 一. 全局注册组件(对象写法)
// export default {
//   install: (Vue) => {
//     Vue.component('TestOne', TestOne)
//     Vue.component('TestTwo', TestTwo)
//   }
// }

// 一. 全局注册组件(数组写法)
// 二.全局注册过滤器(数组写法)

const coms = [TestOne, TestTwo, Pagination]
const obj = {
  fil
}
export default (Vue) => {
  coms.forEach(ele => {
    Vue.component(ele.name, ele)
  })
  Object.keys(obj).forEach(key => {
    Vue.filter(key, obj[key])
  })
}

