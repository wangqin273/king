// pages/order_list_online/order_list_online.js
//获取应用实例
const app = getApp();
const request = require("../../utils/wxRequest.js"); // 载入项目根路径文件
const configs = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_list: [{
        text: '待付款',
        status: 'elec_wait'
      },
      {
        text: '已付款',
        status: 'elec_done'
      }
    ],
    status: 'elec_wait',
    order_list: [],
    order_list_paid: [],
    order_btn: ['取消', '付款']
  },
  onOrderCanceled() {
    this.getOrderList()
  },
  downloadPhoto(e) {
    wx.navigateTo({
      url: '/pages/save_photo/save_photo?order_number=' + e.currentTarget.dataset.number
    })
  },


  tabSelect(e) {
    var status = e.currentTarget.dataset.status
    this.setData({
      status
    });
    this.getOrderList(status)

  },

  // 获取冲印订单列表
  // todo 做分页处理【待优化】
  getOrderList(status) {
    status = status ? status : 'elec_wait' ;
    var that = this;
    wx.showLoading({
      title: '加载中...'
    });
    request.postRequest('third_photo/order_list', { status } ).then(res => {
      console.log('获取订单列表', res)
      if (res.data.error_code == 0) {
        console.log('获取成功')
        let orders;
        switch (status) {
          case 'elec_wait':
            orders = 'order_list'
            break;
          case 'elec_done':
            orders = 'order_list_paid'
            break;
        }
        this.setData({
          [orders]: res.data.orders
        })
      } else {
        console.log('获取列表失败')
        wx.showToast({
          icon: 'none',
          title: res.data.error_reason,
          duration: 1000
        });
      }
      wx.hideLoading();
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getOrderList()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },


})