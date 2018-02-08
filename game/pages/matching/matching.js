
Page({
  /**
   * 页面的初始数据
   */
  data: {
    progress_txt: '正在匹配中...',  
    step:2,// 绘制进度条 长度，满圆为2
    count:0, // 设置 计数器 初始为0
    countTimer: null // 设置 定时器 初始为null
  },
  drawProgressbg:function(){
    // 使用 wx.createContext 获取绘图上下文 context
    var ctx = wx.createCanvasContext('canvasProgressbg')
    ctx.setLineWidth(4);
    ctx.setStrokeStyle('#20183b');
    ctx.setLineCap('round')
    ctx.beginPath();//开始一个新的路径
    ctx.arc(110, 110, 100, 0, 2 * Math.PI, false);//设置一个原点(100,100)，半径为90的圆的路径到当前路径
    ctx.stroke();//对当前路径进行描边
    ctx.draw();
  },
  drawCircle: function (step){  
    var context = wx.createCanvasContext('canvasProgress');
      // 设置渐变
      var gradient = context.createLinearGradient(200, 100, 100, 200);
      gradient.addColorStop("0", "#2661DD");
      gradient.addColorStop("0.5", "#40ED94");
      gradient.addColorStop("1.0", "#5956CC");
      context.setLineWidth(10);
      context.setStrokeStyle(gradient);
      context.setLineCap('round')
      context.beginPath();//开始一个新的路径
      // 参数step 为绘制的圆环周长，从0到2为一周
      context.arc(110, 110, 100, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
      context.stroke();//对当前路径进行描边
      context.draw() 
  },
  countInterval: function () {
    // 设置倒计时 定时器
    this.countTimer = setInterval(() => {
      if (this.data.count <= 60) {
        // 绘制彩色圆环进度条
        this.drawCircle(this.data.count / 30)
        this.data.count++;
      } else {
        this.setData({
          txt: "匹配成功"
        }); 
        clearInterval(this.countTimer);
      }
    }, 100)
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
    this.drawProgressbg();
    // this.drawCircle(2) 
    setTimeout(()=>{
      this.countInterval()

    },2000)
   
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