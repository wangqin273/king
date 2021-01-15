//index.js
//获取应用实例
const app = getApp()
const configs = require('../../utils/config.js');
const request = require("../../utils/wxRequest.js");// 载入项目根路径文件
const utils = require("../../utils/util.js");

Page({
  data: {
    mobile: null,
    to_url: '',
    page_bg: '/images/page_bg.png',
    ico_skill_white: '/images/ico_skill_white.png',
    ico_contact: '/images/ico_contact.png',
    ico_order: '/images/ico_order.png',
    ico_size: '/images/ico_size.png',
    ico_camera: '/images/ico_camera.png',
    company_id: '2ck_t2GD',
    company_scene: 'SCE00125494',
  },

  onLoad() { 
  },
 
  go(url) {
    if (!this.data.mobile) {
      wx.navigateTo({
        url: url
      });
    }
  },
  selectSize() {
    this.go('/pages/select_size/select_size')
  },
  navToExplain() {
    this.go('/pages/webview/webview?url=touch/manual/index.html')
  },
  navToSkill() {
    this.go('/pages/webview/webview?url=touch/manual/tips.html')
  },
  navToOrder() {
    // this.go('/pages/order/order')
    this.go('/pages/order_list_online/order_list_online')
  }
})