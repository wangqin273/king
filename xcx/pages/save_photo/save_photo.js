// pages/save_photo/save_photo.js
const request = require("../../utils/wxRequest.js"); // 载入项目根路径文件
const utils = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_info: {}, 
    can_save: 0
  },

  //保存图片到相册，提示保存成功
  savePhoto(e) { 
    if (!this.data.can_save){
      wx.showToast({
        icon: 'none',
        title: '下载图片失败，不可保存',
        duration: 2000,
        mask: true,
      });
      return false
    }
    wx.showLoading({
      title: '保存中...' 
    });
    let that = this;
    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() { //这里是用户同意授权后的回调 
              that.saveImage();
            },
            fail() {
              wx.hideLoading()
              //这里是用户拒绝授权后的回调
              wx.showModal({
                title: '提示',
                content: '若不打开授权，则无法将图片保存在相册中！',
                confirmText: '去授权',
                confirmColor: '#3CC51F',
                cancelText: '暂不授权',
                cancelColor: '#000000',
                success(res) {
                  if (res.confirm) {
                    wx.openSetting({
                      //调起客户端小程序设置界面，返回用户设置的操作结果。
                      success(res) {
                        that.saveImage();
                      }
                    })
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                    wx.hideLoading()
                  }
                }
              })
            }
          })
        } else { //用户已经授权过了
          that.saveImage();
        }
      }
    })
   
    
  },

  saveImage() {
    let urls = this.data.order_info.urls;
    let lens = this.data.order_info.urls.length;
    urls.forEach((item, i) => {
      wx.getImageInfo({
        src: item, // 字符串(一张) 
        success: function (ret) {
          var path = ret.path;
          wx.saveImageToPhotosAlbum({
            filePath: path,
            success(result) {
              if (i == lens - 1) {
                wx.hideLoading();
                wx.showToast({
                  title: '下载图片成功',
                  duration: 2000,
                  mask: true,
                });
              }
            },
            fail(result) {
              console.log("失败,你取消了", result);
              wx.hideLoading()
            }
          });
        }
      });
    })
   
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    request.postRequest('third_photo/transfer_photo_url', {
      id: options.id
    }).then(resp => {
      console.log("==transfer photo url==", resp.data);
      if (resp.data.error_code == 0) { 
        let order_info = resp.data
      this.setData({
        order_info,
        can_save: 1
      });
      } else {
        wx.showToast({
          icon: 'none',
          title: resp.data.error_reason,
          duration: 2000
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})