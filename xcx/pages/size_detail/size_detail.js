// pages/size_detail/size_detail.js
const request = require("../../utils/wxRequest.js");// 载入项目根路径文件
const configs = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ico_skill_pink: '/images/ico_skill_pink.png',
    photo_template: '/images/photo_template.png',
    ico_print: '/images/ico_print.png',
    ico_electron: '/images/ico_electron.png',
    detail: {},
    btn_bg01: '/images/btn_bg01.png',
    btn_bg02: '/images/btn_bg02.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 规格详情
    request.postRequest('third_photo/spec_detail', { product_id: options.product_id }).then(res => {
      if (res.data.error_code == 0) {
        if (res.data.sku_detail_list) {
          this.setData({
            detail: res.data.sku_detail_list
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '获取详情失败',
            duration: 1000
          });
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.error_reason,
          duration: 1000
        });
      }
    })
  },

  selectPhoto: function(e) {
    console.log(e)
    let sourceType = e.currentTarget.dataset.id == 1 ? 'camera' : 'album';
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [sourceType],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        wx.navigateTo({
          url: '/pages/edit_photo/edit_photo?photo_url=' + res.tempFilePaths +  "&detail=" + JSON.stringify(that.data.detail)
        });
        
      }
    })
  },

  navToSkill() {
    wx.navigateTo({
      url: '/pages/webview/webview?url=touch/manual/tips.html'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})