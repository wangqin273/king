// pages/banners/banners.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [
      {
        index: 0,
        img: 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=a80e4a17ae014c080d3620f76b12696d/42166d224f4a20a40709fb7997529822720ed07d.jpg',
        imgs: ['https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=a80e4a17ae014c080d3620f76b12696d/42166d224f4a20a40709fb7997529822720ed07d.jpg', 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=00c4cfe352fbb2fb202650402e234bc1/d62a6059252dd42a711ec615043b5bb5c9eab87d.jpg', 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=66342e1187d4b31ce4319ce9e6bf4c1a/54fbb2fb43166d22639320c64a2309f79152d2ff.jpg', 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=9e8ac1c952df8db1a8237436684ab631/3ac79f3df8dcd100784b38707e8b4710b8122f88.jpg'],

      },
      {
        index: 0,
        img: 'https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=005e5fcd9aef76c6c4dff379fc7f969f/9358d109b3de9c8234db74636681800a18d843a4.jpg',
        imgs: ['https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=005e5fcd9aef76c6c4dff379fc7f969f/9358d109b3de9c8234db74636681800a18d843a4.jpg', 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=53d730f8daa20cf4529df68d17602053/8d5494eef01f3a2927a062b19325bc315c607c60.jpg', 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=d45d73693f7adab429dd1311eabdd879/562c11dfa9ec8a134f6397a1fe03918fa0ecc072.jpg', 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=5354a1279925bc313f5009ca3fb6e6d4/7e3e6709c93d70cf4566dee4f8dcd100bba12bbe.jpg'],

      },
      {
        index: 0,
        img: 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=47772d4895510fb36c147fc5b85aa3f0/8326cffc1e178a8218bb1c51fd03738da877e8b8.jpg',
        imgs: ['https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=47772d4895510fb36c147fc5b85aa3f0/8326cffc1e178a8218bb1c51fd03738da877e8b8.jpg', 'https://gss1.bdstatic.com/9vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike116%2C5%2C5%2C116%2C38/sign=4ab22f86f91fbe090853cb460a096756/e850352ac65c1038623ade32b9119313b17e89fd.jpg', 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=82905fe6e0f81a4c323fe49bb6430b3c/5882b2b7d0a20cf4bf0e134d7d094b36adaf9982.jpg', 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike180%2C5%2C5%2C180%2C60/sign=83659ab63212b31bd361c57be7715d1f/622762d0f703918f50043b3b5a3d269758eec46e.jpg', 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=c2765b7686b1cb132a643441bc3d3d2b/b8014a90f603738d5fa93cbbb81bb051f919ec4c.jpg'],

      },
    ],
  },
  showBanner: function (e) {
    let i = e.target.dataset.idx,
      j = e.target.dataset.index,
      banners = this.data.banners;
    banners[i].index = j;
    banners[i].img = banners[i].imgs[j]
    this.setData({
      banners: banners
    })
  },
  preview:function(e){
    let i = e.target.dataset.idx,
      banners = this.data.banners;

    wx.previewImage({
      current: banners[i].img, // 当前显示图片的http链接
      urls: banners[i].imgs // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})