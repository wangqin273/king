const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ['菜单一', '菜单二'],// 导航菜单栏
    curIdx:0,// 当前导航索引
    scrollHeight:0, //滚动高度 = 设备可视区高度 -  导航栏高度
    list:[],// 内容区列表
  },

  //点击切换
  clickTab: function (e) {
    this.setData({
      curIdx: e.currentTarget.dataset.current
    })
  }, 

  //滑动切换
  swiperTab: function (e) {
    this.setData({
      curIdx: e.detail.current
    });
  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    // 更新列表
    let list = this.data.list;
    console.log(list)
    let lens = list.length
    for (let i = lens; i < lens+30; i++) {
      list.push(i)
    }
    this.setData({
      list: list
    });
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let list=[];
    for (let i=1;i<=30;i++){
      list.push(i)
    }
    this.setData({
      list: list
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 100为导航栏swiper-tab 的高度
   this.setData({
     scrollHeight: wx.getSystemInfoSync().windowHeight - (wx.getSystemInfoSync().windowWidth / 750 * 100),
   })
  },

 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})