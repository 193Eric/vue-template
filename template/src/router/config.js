/**
 * 路由
 */
import Navigation from '../modules/navigation/Index' // 导航页
import StoreIndex from '../modules/store/Index' // 4s店首页
export default {
  routes: [{
    path: '/', // 请不要移动这个配置的位置
    redirect: '/store/index'
  }, { // 导航页 , 请不要移动这个配置的位置
    path: '/nav',
    component: Navigation,
    meta: {
      title: '导航页',
      needLoading: true
    }
  }, { // 4s店首页
    path: '/store/index',
    component: StoreIndex,
    meta: {
      title: '首页',
      needLoading: true
    }
  }]
}
