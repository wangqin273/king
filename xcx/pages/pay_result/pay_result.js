const app = getApp();
const request = require("../../utils/wxRequest.js");// 载入项目根路径文件
const configs = require('../../utils/config.js');
Page({
  data: {
    pay_result_bg: '/images/pay_result_bg.png',
    is_success: true,
    ico_success: '/images/ico_success.png',
    ico_tip: '/images/ico_tip.png',
    order_number:'',
    order_price:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.payment_no) {
      this.setData({
        order_price:options.amount, 
        order_number: options.payment_no
      })
    } 
  },
 
  navToHome: function() {
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    return {
      title: app.globalData.share_info.title,
      path: app.globalData.share_info.path + '&share_history_id=' + app.globalData.share_history_id,
      imageUrl: app.globalData.share_info.image_url,
      bgImgUrl: app.globalData.share_info.image_url,
    }
  },
})