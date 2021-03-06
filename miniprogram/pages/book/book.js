import { BookModel } from '../../models/book.js'
import { iRandom } from '../../utils/common.js'

const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: Number
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    // bookModel.getHotList().then(
    //   res=>{
    //     this.setData({
    //       books: res
    //     })
    //   }
    // )

    const books = await bookModel.getHotList()
    this.setData({ books })
  },

  onSearching(event){
    this.setData({
      searching: true
    })
  },

  onCancel(){
    this.setData({
      searching: false
    })
  },

  onReachBottom(){
    this.setData({
      more: iRandom(16)
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})