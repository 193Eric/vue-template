/**
 * mixins to Wechat Class
 */
// 缓存处理
// import cache from '../common/cache'
import rest from '../rest'
export default {
  jsApiList: ['chooseWXPay', 'scanQRCode', 'getLocation', 'openLocation', 'hideMenuItems', 'showOptionMenu', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideOptionMenu'],
  // 获取微信签名信息
  getWechatConfigResource() {
    // let storeId = cache.getLocalStorageData(cache.keyMap.CACHE_STORE_ID)
    return rest.wx.getWeChatConfigResource({
      from_url: window.encodeURIComponent(window.location.href.split('#')[0])
    }, 'config/weixin')
  },
  payByWx(appId, timeStamp, nonceStr, packageStr, signType, paySign, success, cancel, fail) {
    let config = {
      appId: appId, // 公众号名称，由商户传入
      timeStamp: timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
      package: packageStr, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: paySign // 支付签名
    }
    window.WeixinJSBridge.invoke('getBrandWCPayRequest', config, res => {
      if (res.err_msg === 'get_brand_wxpay_request:ok' && success) {
        success(res)
      } else if (res.err_msg === 'get_brand_wxpay_request:cancel' && cancel) {
        cancel(res)
      } else if (res.err_msg === 'get_brand_wxpay_request:fail' && fail) {
        fail(res)
      }
    })
  },
  /**
   * 扫一扫
   */
  scanQRCode(callback) {
    this.wx.scanQRCode({
      needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
      success: callback
    })
  },
  // 位置相关的微信接口
  openLocationByWx(latitude, longitude, name, address, scale, infoUrl) {
    this.wx.openLocation({
      latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
      longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
      name: name, // 位置名
      address: address, // 地址详情说明
      scale: scale, // 地图缩放级别,整形值,范围从1~28。默认为最大
      infoUrl: infoUrl // 在查看位置界面底部显示的超链接,可点击跳转
    })
  },
  getLocationByWx(type) {
    type = type || 'gcj02'
    let promise = new Promise((resolve, reject) => {
      // 获取地址
      this.wx.getLocation({
        type: type, // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: (res) => {
          // res.latitude // 纬度，浮点数，范围为90 ~ -90
          // res.longitude // 纬度，浮点数，范围为90 ~ -90
          resolve(res)
        },
        cancel: (res) => {
          reject(res)
        }
      })
    })
    return promise
  },
  // 分享到朋友圈
  shareTimeline(data) {
    this.wx.onMenuShareTimeline(data)
  },
  // 分享给朋友
  ShareAppMessage(data) {
    this.wx.onMenuShareAppMessage(data)
  },
  hideOptionMenu() {
    this.wx.hideOptionMenu()
  },
  hideMenuItems(options) {
    let menuItems = options && options.menuItems || [
      'menuItem:share:appMessage',
      'menuItem:share:timeline',
      'menuItem:share:qq',
      'menuItem:share:weiboApp',
      'menuItem:share:favorite'
    ]
    this.wx.hideMenuItems({
      menuList: menuItems,
      success: res => {
        console.log('hide success')
        options && options.success && options.success()
      },
      fail: res => {
        console.log('hide fail')
        options && options.fail && options.fail()
      }
    })
  }
}
