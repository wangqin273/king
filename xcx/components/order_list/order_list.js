// components/orderlist/orderlist.js
const request = require("../../utils/wxRequest.js"); // 载入项目根路径文件
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: [],
      observer: function(newVal, oldVal) {
        // 属性值变化时执行 
        this.setData({
          is_empty: !newVal.length
        })
        console.log('newVal', newVal.length, 'oldVal', oldVal.length)
      }
    },
    orders_type: {
      type: Number,
      value: null
    },
    status: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    is_empty: false,
    empty_order: '/images/empty_order.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 支付
     */
    payPhoto: function(e) {
      var _this = this;
      var confirm_data = {
        order_id: e.currentTarget.dataset.id,
        pay_type: 1
      };

      request.postRequest('third_photo/pay_order', confirm_data).then(resp => {
        console.log('支付', resp)
        
        request.requestPayment(resp.data.result, res => {
          if (res) {
            wx.navigateTo({
              url: '/pages/pay_result/pay_result?is_success=true&payment_no=' + resp.data.payment_no + '&amount=' + resp.data.amount
            })
          } else {
            return;
          }
        });


      })
    },

    downloadPhoto(e) {
      wx.navigateTo({
        url: '/pages/save_photo/save_photo?id=' + e.currentTarget.dataset.id
      })
    },
    cancelOrder(e) {
      console.log(e.currentTarget.dataset.id)
      var that = this;
      wx.showModal({
        title: '温馨提示',
        content: '确定取消订单吗？',
        confirmText: '再想想',
        cancelText: '取消',
        success(res) {
          if (res.confirm) {
            console.log('用户点击再想想')
          } else if (res.cancel) {
            var confirm_data = {
              id: e.currentTarget.dataset.id
            };
            request.postRequest('third_photo/cancel_order', confirm_data).then(resp => {
              if (resp.data.error_code == 0) {
                wx.showToast({
                  icon: 'success',
                  title: '操作成功！',
                  duration: 2000
                });
                that.onOrderCanceled();
                console.log('用户点击取消', resp)
              }
            })
            // that.onOrderCanceled();
            // console.log('用户点击取消')
          }
        }
      })
    },

    navToDetails(e) {
      console.log(e.currentTarget.dataset.id);
      wx.navigateTo({
        url: '/pages/order_details/order_details?id=' + e.currentTarget.dataset.id
      })
    },
    //复制订单号
    textPaste(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.payment_no,
        success: function(res) {
          wx.getClipboardData({
            success: function(res) {
              wx.showToast({
                title: '订单号复制成功',
              })
            }
          })
        }
      })
    },
    /*
     * 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件
     */
    onOrderCanceled() {
      //触发成功回调 
      this.triggerEvent("onOrderCanceled");
    },

  }
})