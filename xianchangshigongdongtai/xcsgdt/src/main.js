import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Resource from 'vue-resource'
import mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/style.css'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import './assets/css/common.css'
import  './assets/js/calendar.js'
import store from './store/index.js'
import RPM from './assets/js/r93535_mobile.js'
import MobileSelect from 'mobile-select'
import './assets/css/style.css'

Vue.use(Vant)
Vue.use(mint)
Vue.use(Resource)
Vue.use(Vuex)
Vue.use(RPM)

var bus = new Vue({})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,// 使用store
  render: h => h(App)
})
