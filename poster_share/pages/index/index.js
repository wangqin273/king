//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '进入海报页面',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  //事件处理函数
  navToShare: function () {
    // 模拟数据
    var data = {
      thumb_images: [
        'https://cbu01.alicdn.com/img/ibank/2018/544/692/8567296445_882293189.400x400.jpg',
        'https://cbu01.alicdn.com/img/ibank/2018/971/643/8581346179_882293189.400x400.jpg',
        'https://cbu01.alicdn.com/img/ibank/2018/184/392/8567293481_882293189.400x400.jpg'
      ],
      name: '2018夏季新款镂空圆领蝙蝠短袖t恤女装韩版宽松棉小衫上衣批发潮',
      price: 198,
    }
    if (this.data.hasUserInfo){
      wx.navigateTo({
        url: '../poster/poster?data=' + encodeURIComponent(JSON.stringify(data))
      })
    }else{
      wx.showToast({
        title: '请先获取头像昵称',
        icon: 'none',
        duration: 2000
      })
    }
  },
  
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    // 本地存储用户信息 
    wx.setStorageSync('userInfo', e.detail.userInfo)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
