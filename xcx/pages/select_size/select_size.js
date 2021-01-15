const request = require("../../utils/wxRequest.js");// 载入项目根路径文件
const configs = require('../../utils/config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ico_skill_pink: '/images/ico_skill_pink.png',
    ico_search: '/images/ico_search.png',
    hot_search: [],
    hot_size: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // 加载热门搜索
    request.postRequest('third_photo/hot_search', {}).then(res => {
      if (res.data.error_code == 0) {
          if ((res.data.hot_search_list).length != 0) {
              this.setData({
                hot_search: res.data.hot_search_list
              })
          }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.error_reason,
          duration: 1000
        });
      }
    })

    // 加载热门规格
    request.postRequest('third_photo/hot_specs', {}).then(res => {
      if (res.data.error_code == 0) {
          if ((res.data.hot_spec_list).length != 0) {
              this.setData({
                hot_size: res.data.hot_spec_list
              })
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

  sizeDetail: function(e) {
    wx.navigateTo({
      url: '/pages/size_detail/size_detail?product_id=' + e.currentTarget.dataset.item
    })
  },

  searchSize: function() {
    wx.navigateTo({
      url: '/pages/search_size/search_size'
    })

  },

  selectHot: function(e) {
    wx.navigateTo({
      url: '/pages/search_size/search_size?search_text=' + e.currentTarget.dataset.item
    })
  },

  navToSkill() {
    wx.navigateTo({
      url: '/pages/webview/webview?url=touch/manual/tips.html'
    })
  },

  navToExplain() {
    wx.navigateTo({
      url: '/pages/webview/webview?url=touch/manual/index.html'
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