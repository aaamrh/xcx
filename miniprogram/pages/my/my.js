// miniprogram/pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorize: false,
    userInfo: null
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized()

    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  userAuthorized(){
    wx.getSetting({      // 判断用户是否授权
      success: data=>{
        console.log('getSetting', data)
        if(data.authSetting["scope.userInfo"]){
          // wx.getUserInfo({  // 只有在用户授权后才能获取到信息
          //   success: data=>{
          //     console.log('用户授权过了', data)
          //     this.setData({
          //       authorize: true,
          //       userInfo: data.userInfo
          //     })
          //   }
          // })
          wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              console.log(res, '123123')
              this.setData({
                authorize: true,
                userInfo: data.userInfo
              })
            }
          })
        }else{
          console.log('err', data)
        }
      }
    })
  },

  onGetUserInfo(event){
    const userInfo = event.detail.userInfo
    this.setData({
      userInfo,
      authorize: true,
    })
  },

  onJumpToAbout(event){
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?bid=1`,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})