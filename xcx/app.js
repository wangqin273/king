//app.js
const request = require("/utils/wxRequest.js");
App({
  onLaunch: function (options) {
    console.log("参数", options);
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录 
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var data = {
          xcx_code: res.code
        }
        request.postRequest('/xcx/users/code_login', data).then(res => {
          console.log("证件照小程序", res);
          if (res.data.error_code == 0) {
            if (res.data.sid) {
              wx.setStorageSync('sid',res.data.sid);
              app.globalData.share_history_id = res.data.share_history_id;
              app.globalData.user_info = res.data.user_info;
            } else {
              wx.showToast({
                title: "微信授权失败！",
                icon: 'none'
              }); 
            }
          } else {
            wx.showToast({
              title: res.data.error_reason,
              icon: 'none'
            });
          }
        })

      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: {},
    share_history_id:0,
    share_info:{}
  }
})