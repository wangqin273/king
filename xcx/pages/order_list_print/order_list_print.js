// pages/order_list_print/order_list_print.js
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
        text: '未付款',
        status: 'print_pay_wait'
      },
      {
        text: '待收货',
        status: 'print_wait_receive'
      },
      {
        text: '已完成',
        status: 'print_done'
      }
    ],
    status: 'print_pay_wait',
    order_list: [],
    order_list_paid: [],
    order_list_finish: [],
    order_btn: ['取消', '付款']
  },
  onOrderCanceled(id) {
    console.log(id)
    this.getOrderList()
  },
  operateOreder(e) {
    if (e.currentTarget.dataset.index) {} else {
      wx.showModal({
        title: '温馨提示',
        content: '确定取消订单吗？',
        confirmText: '再想想',
        cancelText: '取消',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
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
    status = status ? status : 'print_pay_wait' ;
    var that = this;
    wx.showLoading({
      title: '加载中...'
    });
    request.postRequest('third_photo/order_list', { status }).then(res => {
      if (res.data.error_code == 0) { 
        let orders;
        switch (status) {
          case 'print_pay_wait':
            orders = 'order_list'
            break;
          case 'print_wait_receive':
            orders = 'order_list_paid'
            break;
          case 'print_done':
            orders = 'order_list_finish'
            break;
        }
        this.setData({
          [orders]: res.data.orders
        }) 
      } else {
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