// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders_type: [{
        bg: '/images/order_bg_print.png',
        title: '冲印版订单',
      },
      {
        bg: '/images/order_bg_online.png',
        title: '电子版订单',
      }
    ]
  },
  navToOrdersList(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.index ? '/pages/order_list_online/order_list_online' : '/pages/order_list_print/order_list_print'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
 
})