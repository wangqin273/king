const city_data = require("../../utils/cities.js");
const request = require("../../utils/wxRequest.js"); // 载入项目根路径文件
const configs = require('../../utils/config.js');
const wxApi = require("../../utils/wxApi.js");
const utils = require("../../utils/util.js");
Page({
  data: {
    id: 0,
    ico_overdue: '/images/ico_overdue.png',
    is_edit: false, //是否编辑
    ico_edit: '/images/ico_edit.png',
    ico_truck: '/images/ico_truck.png',
    ico_order: '/images/ico_order.png',
    info_name: '', // 姓名
    info_phone: '', // 手机
    city_name: '',
    info_address: '', // 详细地址
    tip_name: '请填写收件人姓名', // 姓名提示
    tip_phone: '请填写收件人手机号码', // 手机提示
    tip_city: '请选择省/市/区', // 地区提示
    tip_address: '如：XX路、XX小区、XX单元', // 详细地址提示
    is_show_selector: false, // 是否显示省市区选择器
    provinces: city_data.city_data.provinces, // 省
    citys: city_data.city_data.provinces[0].cities, // 市
    areas: city_data.city_data.provinces[0].cities[0].areas, // 区
    value: [0, 0, 0], // 省市区索引
    warn_name: false, // 姓名警告
    warn_phone: false, // 手机警告
    warn_city: false, // 地区警告
    warn_address: false, // 详细地址警告
    express_info: [],
  },
  editInfo(e) {
    this.setData({
      is_edit: true
    })
  },
  payPhoto(e) {
    this.payOrder(this.data.id);
  },
  downloadPhoto(e) {
    wx.navigateTo({
      url: '/pages/save_photo/save_photo?id=' + e.currentTarget.dataset.id
    })
  },
  /**
   * 表单验证，创建订单
   */
  navToRegister(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    // if (e.detail.formId) {
    //   utils.setFormIid(e.detail.formId, form => {});
    // }
    var info_name = this.data.info_name,
      info_phone = this.data.info_phone,
      city_name = this.data.city_name,
      info_address = this.data.info_address;
    // 初始化警告
    this.setData({
      warn_name: false,
      warn_phone: false,
      warn_city: false,
      warn_address: false
    })

    // 判断姓名
    if (!info_name) {
      wx.showToast({
        title: this.data.tip_name,
        icon: 'none'
      })
      this.setData({
        warn_name: true,
      })
      return false
    }
    // 判断手机
    if (!info_phone) {
      wx.showToast({
        title: this.data.tip_phone,
        icon: 'none'
      })
      this.setData({
        warn_phone: true,
      })
      return false
    } else if (info_phone.length < 11) {

      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      this.setData({
        warn_phone: true,
      })
      return false
    }
    // 判断地区
    console.log(city_name, city_name == this.data.tip_city, this.data.tip_city)
    if (!city_name) {

      wx.showToast({
        title: this.data.tip_city,
        icon: 'none'
      })
      this.setData({
        warn_city: true,
      })
      return false
    }
    // 判断地址
    if (!info_address) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      this.setData({
        warn_address: true,
      })
      return false
    } else if (info_address.length < 5) {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none'
      })
      this.setData({
        warn_address: true
      })
      return false
    }
    this.setInfoData()

    let info_data = {
      id: this.data.id,
      info_name: this.data.info_name,
      info_phone: this.data.info_phone,
      city_name: this.data.city_name,
      info_address: this.data.info_address
    }

    request.postRequest('third_photo/change_info', info_data).then(res => {
      if (res.data.error_code == 0) {
        wx.showToast({
          title: '修改成功',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: res.data.error_reason,
          icon: 'none'
        })
      }
    })

  },

  inputName(e) {
    this.setData({
      info_name: e.detail.value
    })
  },

  inputPhone(e) {
    this.setData({
      info_phone: e.detail.value
    })
  },

  inputAddress(e) {
    this.setData({
      info_address: e.detail.value
    })
  },
  // 地区选择器
  showCities() {
    this.setData({
      is_show_selector: true

    })
  },

  hideCities() {
    this.setData({
      is_show_selector: false
    })
  },

  cityChange(event) {
    if (event.detail.value[0] != this.data.value[0]) {
      this.setData({
        value: [event.detail.value[0], 0, 0]
      })
    } else if (event.detail.value[1] != this.data.value[1]) {
      this.setData({
        value: [event.detail.value[0], event.detail.value[1], 0]
      })
    } else {
      this.setData({
        value: event.detail.value
      })
    }
    this.setData({
      citys: this.data.provinces[this.data.value[0]].cities,
      areas: this.data.provinces[this.data.value[0]].cities[this.data.value[1]].areas ? this.data.provinces[this.data.value[0]].cities[this.data.value[1]].areas : []
    })
  },

  confirm() {
    let provincename = city_data.city_data.provinces[this.data.value[0]].name,
      cityname = city_data.city_data.provinces[this.data.value[0]].cities[this.data.value[1]].name,
      areaname = city_data.city_data.provinces[this.data.value[0]].cities[this.data.value[1]].areas[this.data.value[2]].name,
      city_name = provincename + '-' + cityname + '-' + areaname;
    this.setData({
      is_show_selector: false,
      city_name
    })
  },

  // 存储数据
  setInfoData() {
    let info_data = {
      info_name: this.data.info_name,
      info_phone: this.data.info_phone,
      city_name: this.data.city_name,
      info_address: this.data.info_address
    }
    console.log('存储数据',info_data)
    wx.setStorageSync(  'info_data',  info_data );
    this.setData({
      is_edit: false
    })
  },
  onLoad(options) {
    this.setData({
      id: options.id
    })
    this.getLogistic(options.id);
  },
  //获取物流
  getLogistic(id) {
    var data = {
      id: id
    }
    request.postRequest('third_photo/post_info', data).then(res => {
      console.log('获取物流', res)
      if (res.data.error_code == 0) {
        this.setData(res.data);
        wx.setNavigationBarTitle({
          title: res.data.order_info.is_print_order ? '冲印版订单详情' : '电子版订单详情',
        });
      } else {
        wx.showToast({
          title: res.data.error_reason,
          icon: 'none'
        })
      }
    })

  },
  /**
   * 支付
   */
  payOrder: function(id) {
    var _this = this;
    var confirm_data = {
      order_id: id,
      pay_type: 1
    };
    request.postRequest('third_photo/pay_order', confirm_data).then(resp => {
      console.log('支付', resp)
      if (resp.data.error_code == 0)
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
});