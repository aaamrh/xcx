// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    multipleSlots: true
  },
  properties: {
    openType: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(event){
      console.log("img-button组件", event)

      wx.authorize({
        scope: 'scope.userInfo',
        success(event) {
          console.log('123', event)
          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
          // wx.startRecord()
        }
      })
      this.triggerEvent('getuserinfo', event.detail, {})
    },
  }
})
