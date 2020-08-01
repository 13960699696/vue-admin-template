import Vue from 'vue'
/**
 * 浏览器兼容reset的css
 */
import 'normalize.css/normalize.css'
/**
 * 引用element-ui
 */
import ElementUI from 'element-ui'
import './styles/element-variables.scss'
/**
 * 全局样式
 */
import '@/styles/index.scss'
/**
 * 引用路由和store
 */
import App from './App'
import store from './store'
import router from './router'
/**
 * 引用图标
 */
import '@/icons'
/**
 * 路由权限
 */
import '@/permission'

Vue.use(ElementUI,{
  size: 'mini'
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
