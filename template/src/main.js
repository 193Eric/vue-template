// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 支持es5语法, 低版本的android机的一些浏览器还不支持es5
import 'babel-polyfill'

// 不要删除下面一行，用来导入replacing_debug, import './debug'
// replacing_debug
import Vue from 'vue'
// vuex 仓库
import store from './vuex/store'

// 微信SDK调用
import wechat from './wechat'
// api配置
import rest from './rest'
// 路由配置
import router from './router'

// 样式文件
import './assets/styles/app.less'

// 初始化全局toast
import './common/mixins'
// 入口文件
import App from './App.vue'

// 全局禁止微信分享
wechat.promise.then(wx => {
  wx.hideOptionMenu()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // vuex
  rest, // api
  wechat, // wx
  template: '<App/>',
  components: { App }
})
