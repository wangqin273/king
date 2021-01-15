const app = getApp();
const request = require("../../utils/wxRequest.js");// 载入项目根路径文件
const configs = require('../../utils/config.js');
const utils = require("../../utils/util.js");
var flag = true;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    can_switch_cloth: false,
    is_added: 0,
    payment_no: '',
    ico_select: '/images/ico_select.png',
    ico_no_select: '/images/ico_no_select.png',
    // 用户信息 
    user_info: {},
    order_number: '2019010100010',
    postage: 12,
    total_amount: 12.5,
    price_original: 32.5,
    footer_tip: '即将恢复原价',
    is_buy: '',
    size_name: '',
    is_cloth_service: 0,
    color_flag: 1 // 用户选择的颜色标志， 1 2 3 （红绿蓝）
  },
  valueAdded: function(e) {
    if (!this.data.can_switch_cloth) return;
    this.setData({
      is_added: !this.data.is_added
    });
    var amount = (this.data.total_amount * 1 + 1 * (this.data.is_added ? 9.9 : -9.9));
    console.log(amount)
    amount = amount.toFixed(2)
    this.setData({
      total_amount: amount
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    options.is_added = options.is_added * 1
    console.log(options.order_number)
    this.setData({
      is_added: options.is_added,
      can_switch_cloth: options.is_added,
      user_info: wx.getStorageSync('info_data'),
      color_flag: options.color_flag,
      size_name: options.size_name,
      cut_photo_data: wx.getStorageSync('cut_photo_data'),
      colors: wx.getStorageSync('cut_photo_color'),
      cut_photo_custom: wx.getStorageSync('cut_photo_custom'),
    })
    if (options.order_number) {
      this.getHome();
    }
  },
  getHome: function() {
    this.setData({
      total_amount: this.data.user_info.print_price + this.data.postage + (this.data.user_info.is_added ? 9.9 : 0),// 换装增值服务费9.9元
      price_original: this.data.user_info.print_price + this.data.postage + 6
    });
  },
  paymentConfirm: function(e) {
    console.log(e);
    this.paymentConfirmStart('print');
  },

  // 确认支付
  paymentConfirmStart: function(pay_type) {
    var _this = this;

    pay_type = pay_type || 'print'

    var cut_photo_data = this.data.cut_photo_data;

    console.log(pay_type, cut_photo_data);

    if (!cut_photo_data) {
      wx.showToast({
        icon: 'none',
        title: '数据错误！',
        duration: 1000
      });
      return;
    }
    if (!this.data.color_flag) {
      wx.showToast({
        icon: 'none',
        title: '背景颜色错误！',
        duration: 1000
      });
      return;
    }

    var data = {
      color_filter: this.data.cut_photo_custom.color_filter,
      cloth: this.data.cut_photo_custom.cloth,
      size_name: this.data.size_name,
      order_type: pay_type,
      data: JSON.stringify(cut_photo_data),
      print_order_number: this.data.user_info.print_count,
      is_select_cloth: this.data.is_added ? 1 : 0,
      receiver_phone: this.data.user_info.info_phone,
      receiver_name: this.data.user_info.info_name,
      addr_json: JSON.stringify({ addr: this.data.user_info.city_name, detail: this.data.user_info.info_address })
    };

    if (this.data.payment_no) {
      data.payment_no = this.data.payment_no
    }

    // data.choose_back = this.data.color_flag;

    data.color_ids = JSON.stringify(this.data.colors);

    request.postRequest('third_photo/create_order', data).then(res => {
      if (res.data.error_code == 0) {
        if (res.data.payment_no && res.data.order_id) {
          this.setData({
            payment_no: res.data.payment_no
          })
        }
        // 上传原图
        request.uploadFile('third_photo/after_create', _this.data.cut_photo_custom.origin_photo_url, { order_id: res.data.order_id }, 'file').then(res_ => {
          console.log('upload file done', res_)

          var data = JSON.parse(res_.data)

          if (data.error_code == 0) {
            _this.payOrder(res);
          } else {
            wx.showToast({
              icon: 'none',
              title: res_.data.error_reason,
              duration: 1000
            });
          }
        });

      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.error_reason,
          duration: 1000
        });
      }
    })
  },

  /**
   * 支付
   */
  payOrder: function(res) {
    var _this = this;
    var confirm_data = {
      order_id: res.data.order_id,
      pay_type: 1
    };
    request.postRequest('third_photo/pay_order', confirm_data).then(resp => {
      console.log('支付', resp)
      if (resp.data.error_code == 0) {
        request.requestPayment(resp.data.result, res => {
          if (res) {
            wx.navigateTo({
              url: '/pages/pay_result/pay_result?is_success=true&payment_no=' + resp.data.payment_no + '&amount=' + resp.data.amount
            })
          } else {
            return;
          }
        });

        // wx.tradePay({
        //   // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
        //   tradeNO: resp.data.result.alipay_trade_create_response.trade_no,
        //   success: (trade) => {
        //     if (trade.resultCode == 9000) {

        //       wx.navigateTo({
        //         url: '/pages/pay_result/pay_result?is_success=true&payment_no=' + resp.data.payment_no + '&amount=' + resp.data.amount
        //       })
        //     } else {
        //       wx.showToast({
        //         icon: 'none',
        //         title: '支付失败！',
        //         duration: 3000
        //       });
        //     }
        //   },
        //   fail: (trade) => {
        //     wx.showToast({
        //       icon: 'none',
        //       title: JSON.stringify(trade)
        //     });
        //   }
        // });
      } else {
      }
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    // let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    // let prevPage = pages[pages.length - 2]; //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
    // if (prevPage) {
    //   prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
    //     is_blur: this.data.is_blur, // 这里是修改了上一个页面数据:name
    //   })
    // }

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