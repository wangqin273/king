const configs = require('../../utils/config.js');
const request = require("../../utils/wxRequest.js"); // 载入项目根路径文件
const utils = require("../../utils/util.js");

Page({
  data: {
    price_elec: 0,
    cut_photo_data: {}, // 缓存做好的证件照json数据
    origin_photo_url: '',
    color_flag: 0,
    payment_no: 0, // 支付订单号
    change_cloth_origin_pic_name: '',
    has_change_cloth: false, // 是否曾经换过装
    photo_url: '',
    tab_list: ['更换背景', '更换服装', '美颜'],
    tab_inx: 0,
    color_list: ['#FF4646', '#ffffff', '#458CE4'],
    color_inx: 0,
    cloth_list: [{
      sex: '女',
      param: 'applet_girl',
      list: [{
        id: 0,
        cloth: 'https://leqi-public.oss-cn-shanghai.aliyuncs.com/wechat_applet/clothes/applet_girl1%403x.png'
      }, {
        id: 0,
        cloth: 'https://leqi-public.oss-cn-shanghai.aliyuncs.com/wechat_applet/clothes/applet_girl2%403x.png'
      }, {
        id: 0,
        cloth: 'https://leqi-public.oss-cn-shanghai.aliyuncs.com/wechat_applet/clothes/applet_girl3%403x.png'
      }, {
        id: 0,
        cloth: 'https://leqi-public.oss-cn-shanghai.aliyuncs.com/wechat_applet/clothes/applet_girl4%403x.png'
      }, {
        id: 0,
        cloth: 'https://leqi-public.oss-cn-shanghai.aliyuncs.com/wechat_applet/clothes/applet_girl5%403x.png'
      }, {
        id: 0,
        cloth: 'https://leqi-public.oss-cn-shanghai.aliyuncs.com/wechat_applet/clothes/applet_girl6%403x.png'
      }]
    }, {
      sex: '男',
      param: 'applet_boy',
      list: [{
        id: 0,
        cloth: 'https://leqi-public.oss-cn-shanghai.aliyuncs.com/wechat_applet/clothes/applet_boy1%403x.png'
      }, {
        id: 0,
        cloth: 'https://leqi-public.oss-cn-shanghai.aliyuncs.com/wechat_applet/clothes/applet_boy2%403x.png'
      }, {
        id: 0,
        cloth: 'https://leqi-public.oss-cn-shanghai.aliyuncs.com/wechat_applet/clothes/applet_boy3%403x.png'
      }, {
        id: 0,
        cloth: 'https://leqi-public.oss-cn-shanghai.aliyuncs.com/wechat_applet/clothes/applet_boy4%403x.png'
      }]
    }, {
      sex: '儿童',
      param: 'applet_kid',
      list: [{
        id: 0,
        cloth: 'https://leqi-public.oss-cn-shanghai.aliyuncs.com/wechat_applet/clothes/applet_kid1%403x.png'
      }, {
        id: 0,
        cloth: 'https://leqi-public.oss-cn-shanghai.aliyuncs.com/wechat_applet/clothes/applet_kid2%403x.png'
      }, {
        id: 0,
        cloth: 'https://leqi-public.oss-cn-shanghai.aliyuncs.com/wechat_applet/clothes/applet_kid3%403x.png'
      }, {
        id: 0,
        cloth: 'https://leqi-public.oss-cn-shanghai.aliyuncs.com/wechat_applet/clothes/applet_kid4%403x.png'
      }]
    }],
    sex_inx: 0,
    cloth_inx: -1,
    ico_cloth: '/images/ico_cloth.png',
    ico_no_cloth: '/images/ico_no_cloth.png',
    beauty_list: [{
      img: '/images/ico_no_beauty.png',
      text: '无美颜'
    }, {
      img: '/images/ico_beauty.png',
      text: '智能美颜'
    }],
    is_beauty: 1,
    is_show_electron: false,
    ico_select: '/images/ico_select.png',
    ico_no_select: '/images/ico_no_select.png',
    is_cloth_service: false,
    is_all_color: true,

  },
  onLoad(options) {
    console.log('开始请求并且检测用户照片是否正常。。。', options)
    if (options.photo_url) {
      let detail = JSON.parse(options.detail);
      console.log('detail', detail)
      this.setData({
        photo_url: options.photo_url,
        origin_photo_url: options.photo_url,
        detail,
      })
    }
    this.setData({
      color_list: Object.keys(this.data.detail.color)
    })

    this.getPicInfo();
    this.calculatePriceEle()

    // this.paymentConfirm();

  },
  serialResult: function(res) {
    var that = this;
    console.log('==upload photo done==', res);
    if (res.code == 507) {
      wx.showToast({
        icon: 'none',
        title: '该图片不能制作该规格，请上传一张新的照片~',
        duration: 2500
      });
      let timerSerial = setTimeout(() => {
        clearTimeout(timerSerial)
        wx.navigateBack();
      }, 2500)
      return;
    }
    if (res.code != 200) {
      wx.showToast({
        icon: 'none',
        title: res.error,
        duration: 2500
      });
      return
    }
    if (res.error_code == 0) {
      if (res) {
        that.setData({
          cut_photo_data: res
        });

        // 有换服装时候的原图名称，那么保存
        if (res.origin_pic_name) {
          that.setData({
            change_cloth_origin_pic_name: res.origin_pic_name
          });
        }

        var file_name = this.data.cut_photo_data.result ? this.data.cut_photo_data.result.img_wm_url_list : this.data.cut_photo_data.wm_pic_url;

        console.log('==get color before==', file_name, color, color_str);

        var color = this.data.color_list[this.data.color_inx];
        var color_str = this.data.detail.color_filter[color];

        console.log('==get color==', file_name, color_str);

        // var url = files[0]
        // if (url) {
        //   this.setData({
        //     photo_url: url
        //   })
        // }

        // 检查背景颜色可以显示几张
        // var c_data = that.data.color_can_show;
        // var show_red = null, show_blue = null, show_white = null;
        // var file_name = res.result ? res.result.file_name : res.final_pic_name

        for (var i = 0; i < file_name.length; i++) {
          console.log('==foreach:==', file_name[i])
          if (file_name[i].search(color_str) != -1) {
            this.setData({
              photo_url: file_name[i]
            })
            break;
          }
          if (file_name.length - 1 == i) {
            // 兼容背景颜色
            color_str = color_str.substring(0, color_str.length - 1);
            console.log('==兼容颜色==', color_str, file_name)
            for (var j = 0; j < file_name.length; j++) {
              if (file_name[j].search(color_str) != -1) {
                this.setData({
                  photo_url: file_name[j]
                })
                break;
              }
            }
          }
        }

        // c_data[0]['show'] = show_red
        // c_data[1]['show'] = show_white
        // c_data[2]['show'] = show_blue

        // that.setData({
        //   color_can_show: c_data
        // })
        // // 设置默认显示的图片

        // that.setData({
        //   color_inx: show_red ? 0 : (show_white ? 1 : (show_blue ? 2 : 1))
        // })
        //this.change_pic_by_color_index(this.data.color_inx)
      }
    }
  },
  getPicInfo: function(formData) { // 获取照片
    formData = formData || {};
    if (this.data.cloth_inx != -1 && this.data.has_change_cloth) {
      var cloth_name = this.data.cloth_list[this.data.sex_inx].param + (this.data.cloth_inx + 1);
      formData.clothes = cloth_name;
      formData.url = 'cut_change_clothes';
    }

    var that = this;
    if (this.data.is_beauty) { // 是否美颜了
      formData.is_fair = 1;
    }
    formData.product_id = this.data.detail.color[this.data.color_list[this.data.color_inx]];
    console.log('地址：', that.data.photo_url, formData);
    formData.no_need_photo_file = 0
    if (formData.no_need_photo_file == 1) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
      request.postRequest('third_photo/cut_photo', formData).then(res => {
        wx.hideLoading();
        this.serialResult(res.data)
      });
    } else {
      if (!this.data.origin_photo_url) {
        // wx.hideLoading();
        return;
      }
      wx.showLoading({
        title: '上传中...',
        mask: true
      });
      request.uploadFile('third_photo/cut_photo', this.data.origin_photo_url, formData, 'file').then(res => {
        wx.hideLoading();
        this.serialResult(JSON.parse(res.data))
      });
    }
  },
  change_pic_by_color_index: function(index) {
    var color_inx = index
    var files = this.data.cut_photo_data.result ? this.data.cut_photo_data.result.img_wm_url_list : this.data.cut_photo_data.wm_pic_url
    var url = '';
    for (var i = 0; i < files.length; i++) {
      console.log('==foreach:==', files[i])
      if (/.*red.*/.test(files[i]) && color_inx == 0) {
        url = files[i]
      } else if (/.*white.*/.test(files[i]) && color_inx == 1) {
        url = files[i]
      } else if (/.*blue.*/.test(files[i]) && color_inx == 2) {
        url = files[i]
      }
    }
    if (url) {
      this.setData({
        photo_url: url
      })
    }
  },
  selectTab: function(e) {
    this.setData({
      tab_inx: e.currentTarget.dataset.index
    })
  },
  showColorClothPic: function(color, cloth) { // 展示某个颜色背景和服装的图片
    if (color) {
      this.setData({
        photo_url: ""
      })
    }
  },
  selectColor: function(e) { // 选择颜色
    this.setData({
      color_inx: e.currentTarget.dataset.index,
      color_flag: this.data.detail.color_filter[e.currentTarget.dataset.color]
    });

    // 选择颜色后 更换服装就需要重新上传图片
    // this.setData({
    //   has_change_cloth: false
    // })

    this.getPicInfo();

    // this.change_pic_by_color_index(this.data.color_inx);
  },
  selectSex: function(e) { // 选择性别
    let index = e.currentTarget.dataset.index
    if (index != this.data.sex_inx) {
      this.setData({
        sex_inx: index,
        cloth_inx: -1
      })
    }
  },

  selectCloth: function(e) { // 选择服装
    if (e.currentTarget.dataset.index == this.data.cloth_inx && !e.select_beauty) return;

    this.setData({
      cloth_inx: e.currentTarget.dataset.index,
      is_cloth_service: e.currentTarget.dataset.index == -1 ? 0 : 1
    })

    if (this.data.cloth_inx == -1) {
      this.getPicInfo();
      return;
    }

    var formData = {
      url: 'cut_change_clothes'
    }

    if (!this.data.has_change_cloth) {
      this.setData({
        has_change_cloth: true
      })
    } else {
      formData.no_need_photo_file = 1
      formData.origin_pic_name = this.data.change_cloth_origin_pic_name
    }

    this.calculatePriceEle()

    this.getPicInfo(formData);

  },

  selectBeauty: function(e) { // 选择是否美颜
    this.setData({
      is_beauty: e.currentTarget.dataset.index
    })

    if (this.data.cut_photo_data.result) {
      this.selectCloth({
        select_beauty: 1,
        currentTarget: {
          dataset: {
            index: this.data.cloth_inx
          }
        }
      })
    } else {
      this.getPicInfo()
    }
  },

  saveElectron: function() { // 打印电子订单
    this.setData({
      is_show_electron: !this.data.is_show_electron
    })
  },
  navToPhotoPrint: function() {

    if (this.data.detail.can_print_pic != 1) {
      wx.showToast({
        icon: 'none',
        title: '该照片不能冲印只能保存电子照。',
        duration: 1000
      });
      return;
    }

    var file_print = this.data.cut_photo_data.result ? this.data.cut_photo_data.result.print_wm_url_list[0] : this.data.cut_photo_data.print_wm_pic_url[0]

    if (this.data.detail.can_print_pic != 1) {
      wx.showToast({
        icon: 'none',
        title: '数据错误，请重试。。。',
        duration: 1000
      });
      return;
    }

    var cloth_name = this.data.cloth_list[this.data.sex_inx].param + (this.data.cloth_inx + 1);
    if (this.data.cloth_inx == -1) {
      cloth_name = '';
    }

    var cf = {}
    var cf_key = this.data.color_list[this.data.color_inx];
    cf[cf_key] = this.data.detail.color_filter[cf_key];

    // 保存第三方返回的数据
    wx.setStorageSync('cut_photo_custom', {
      cloth: cloth_name,
      is_fair: this.data.is_beauty,
      'origin_photo_url': this.data.origin_photo_url,
      color_filter: cf
    });

    // 保存第三方返回的数据
    wx.setStorageSync('cut_photo_data', this.data.cut_photo_data);

    var cs = {};
    cs[this.data.color_list[this.data.color_inx]] = this.data.detail.color[this.data.color_list[this.data.color_inx]];
    // 保存用户选择的颜色数据
    wx.setStorageSync('cut_photo_color', cs);

    console.log(file_print)
    let detail = {
      file_print: escape(file_print),
      color_flag: this.data.color_flag,
      size_name: this.data.detail.name,
      is_cloth_service: this.data.is_cloth_service ? 1 : 0,
      is_added: this.data.color_inx != -1 ? 1 : 0
    }
    wx.navigateTo({
      url: '/pages/photo_print/photo_print?detail=' + JSON.stringify(detail)
    });

  },

  clothService: function() {
    if (this.data.cloth_inx == -1) {
      return;
    }
    this.setData({
      is_cloth_service: !this.data.is_cloth_service
    })
    this.calculatePriceEle()
  },

  // 确认支付
  paymentConfirm: function(pay_type) {
    var _this = this;

    pay_type = pay_type || 'elec'

    var cloth_name = this.data.cloth_list[this.data.sex_inx].param + (this.data.cloth_inx + 1);

    if (this.data.cloth_inx == -1) {
      cloth_name = '';
    }

    var data = {
      size_name: this.data.detail.name,
      order_type: pay_type,
      is_fair: this.data.is_beauty,
      cloth: cloth_name,
      data: JSON.stringify(this.data.cut_photo_data),
      is_select_cloth: this.data.is_cloth_service ? 1 : 0
    };

    // todo 这里传入payment_no 或者加入签名算法
    if (this.data.payment_no) {
      // data.payment_no = this.data.payment_no
    }
    if (!this.data.is_all_color) {
      data.choose_back = 1;
      var cs = {};
      cs[this.data.color_list[this.data.color_inx]] = this.data.detail.color[this.data.color_list[this.data.color_inx]];
      data.color_ids = cs;
      var cf = {}
      var cf_key = this.data.color_list[this.data.color_inx];
      cf[cf_key] = this.data.detail.color_filter[cf_key];
      data.color_filter = cf;
    } else {
      data.choose_back = this.data.color_flag;
      data.color_ids = this.data.detail.color;
      data.color_filter = this.data.detail.color_filter;
    }
    data.color_ids = JSON.stringify(data.color_ids);

    wx.showLoading({
      title: '加载中...'
    });
    request.postRequest('third_photo/create_order', data).then(res => {
      wx.hideLoading();

      if (res.data.error_code == 0) {
        if (res.data.payment_no && res.data.order_id) {
          this.setData({
            payment_no: res.data.payment_no,
            order_id: res.data.order_id
          })
        }

        // 上传原图
        request.uploadFile('third_photo/after_create', _this.data.origin_photo_url, {
          order_id: res.data.order_id
        }, 'file').then(res_ => {
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
      console.log(resp, resp.data.error_code)
      if (resp.data.error_code == 0) {
        console.log('pay before', resp.data.result);
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
        //     console.log(trade)
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
        wx.showToast({
          icon: 'none',
          title: resp.data.error_reason || resp.data.result.alipay_trade_create_response.sub_msg
        });
      }
    })
  },

  colorService: function(e) {
    this.setData({
      is_all_color: e.currentTarget.dataset.index
    })
    this.calculatePriceEle()
  },
  payElectron() { // 电子订单支付开始
    this.paymentConfirm();
  },

  calculatePriceEle() {
    this.setData({
      price_elec: (1.99 * (this.data.is_all_color ? this.data.color_list.length : 1) + ((this.data.cloth_inx != -1 && this.data.is_cloth_service) ? 9.9 : 0)).toFixed(2)
    })
  }

});