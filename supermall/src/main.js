import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from 'components/common/toast/index.js'


Vue.config.productionTip = false
 
// 安装 toast 插件
// 一旦使用Vue.use 就会 调用 toast 这个对象
// toast 这个对象 就是导出的 obj 对象 就会执行 obj 的install函数
Vue.use(toast)

// 给 $bus 赋值
Vue.prototype.$bus = new Vue()

// 使用图片懒加载
Vue.use(VueLazyload, {
  // 在js导入图片需要使用 require
  loading: require('assets/images/common/placeholder.png')
})

// 解决移动端的300ms的延迟
fastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
