const city_data  = require("../../utils/cities.js");
const request = require("../../utils/wxRequest.js");// 载入项目根路径文件
const configs = require('../../utils/config.js');
const wxApi = require("../../utils/wxApi.js");
const utils = require("../../utils/util.js");
Page({
  data: {
    can_switch_cloth: false,
    is_cloth_service: 0,
    print_number: '123456678',
    print_photo: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572694595744&di=dfdac7987fc8bfa8baa9cf10b2184b35&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180309%2F54fa39515a0644339051f472084ab630.jpeg',
    print_title: '二寸照',
    print_rule: '35*49mm',
    print_size: '413*579',
    print_price: 5,
    print_oldprice: 20,
    print_count: 1,
    ico_plus: '/images/ico_plus.png',
    ico_minus: '/images/ico_minus.png',
    ico_select: '/images/ico_select.png',
    ico_no_select: '/images/ico_no_select.png',
    is_added: false,
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
    color_flag: 1,
    is_first_print: false
  },

  countMinus(e) {
    if (this.data.print_count > 1) {
      this.data.print_count--
    }
    this.setData({
      print_count: this.data.print_count,
      print_price: 5 * (this.data.print_count - 1),
      print_oldprice: 6 * this.data.print_count
    })
  },
  countPlus(e) {
    this.data.print_count++
    this.setData({
      print_count: this.data.print_count,
      print_price: 5 * (this.data.print_count - 1),
      print_oldprice: 6 * this.data.print_count
    })
  },
  valueAdded(e) {
    if (!this.data.can_switch_cloth) return;
    this.setData({
      is_added: !this.data.is_added
    })
  },

  /**
   * 表单验证，创建订单
   */
  confirmOrder(e) {
    if (e.detail.formId) {
      utils.setFormIid(e.detail.formId, form => { });
    }
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
        warn_address: true,
      })
      return false
    }
    if (this.data.print_number) {
      this.setInfoData()
      wx.navigateTo({
        url: '/pages/confirm_order/confirm_order?order_number=' + this.data.print_number + '&color_flag=' + this.data.color_flag + '&size_name=' + this.data.print_title +
          '&is_added=' + (this.data.is_added ? 1 : 0)
      })
    } else {
      wx.showToast({
        title: '没找到要冲印的照片',
        icon: 'none'
      })
    }
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
      info_address: this.data.info_address,
      print_count: this.data.print_count,
      is_added: this.data.is_added,
      print_price: this.data.print_price
    }
    console.log(info_data)
    wx.setStorageSync('info_data',info_data);
    this.setData({
      is_edit: false
    })
  },
  onLoad(options) {
    let detail = JSON.parse(options.detail)
    var that = this;
    detail.is_cloth_service = detail.is_cloth_service * 1
    this.setData({
      print_count: this.data.print_count,
      print_price: 5 * (this.data.print_count - 1),
      print_oldprice: 20 * this.data.print_count
    })

    let info_data = wx.getStorageSync('info_data');
    console.log(info_data)
    if (info_data) {
      this.setData(info_data)
    }
    this.setData({
      print_photo: unescape(detail.file_print),
      can_switch_cloth: detail.is_cloth_service,
      is_added: detail.is_cloth_service,
      color_flag: detail.color_flag,
      print_title: detail.size_name,
      is_cloth_service: detail.is_cloth_service
    })

    // request.postRequest('third_photo/is_first_print', {}).then(res => {
    //   if (res.data.error_code == 0 && res.data.first_print == 1) {
    //     that.setData({
    //       total_amount: this.data.total_amount - 5,
    //       print_price: 5 * this.data.print_count - 5,
    //       is_first_print: true
    //     });
    //   }
    // });
  },
});