import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// permission v-auth
import '@/directive'

// api
import { api } from '@/api'

// 全局组件
import vForm from '@/components/form'
import vTable from '@/components/table'
import vCard from '@/components/card'
import vTitle from '@/components/info-title'
import vPagination from '@/components/Pagination'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

Vue.config.productionTip = false
Vue.prototype.$http = api

Vue.component('vForm', vForm)
Vue.component('vTable', vTable)
Vue.component('vCard', vCard)
Vue.component('vTitle', vTitle)
Vue.component('vPage', vPagination)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
