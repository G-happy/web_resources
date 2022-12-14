import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

const req = require.context('./svg', false, /\.svg$/)
// console.log(req.keys()) // svg 路径数组
console.dir(req('./dashboard.svg'))
const requireAll = requireContext => requireContext.keys().map(ele => requireContext(ele))
// 调用 requireAll 方法, 并传参
requireAll(req)
