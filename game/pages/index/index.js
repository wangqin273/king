//index.js
//获取应用实例
const app = getApp()
Page({
  data: { 
    num:100,
    step:null,
    time:null,
    stepTimer:null,

    count: 0,
    txt: "正在匹配中...",
    countTimer: null,
  },
  stepInterval:function(){
    // 设置倒计时 定时器
    this.stepTimer = setInterval(() => {
      if (this.data.num >= 0) {
        this.data.step = this.data.num / 50;
        // 绘制彩色圆环进度条
        this.circle.drawCircle('circle_draw', 40, 4, this.data.step)
        if ((/(^[1-9]\d*$)/.test(this.data.num / 10))) {
          // 当时间为整数秒的时候 改变时间
          this.setData({
            time: this.data.num / 10
          });
        }
        this.data.num--;
      } else {
        this.setData({
          time: 0
        });
      }
    }, 100) 
  },

  countInterval: function () {
    // 设置倒计时 定时器
    this.countTimer = setInterval(() => {   
      if (this.data.count <= 100) {        
        // 绘制彩色圆环进度条
        this.circle.drawCircle('circle_draw1', 100, 8, this.data.count/50)
        this.data.count++;
        } else {
        this.setData({
          txt: "匹配成功"
        });
        // wx.navigateTo({
        //    url: "../logs/logs"
        // })
         clearInterval(this.countTimer); 
      }
    }, 100)
  },


  changeTime:function(){
    // 先清除定时器
    clearInterval(this.stepTimer);
    // 计数器 还原到100
    this.setData({
      num: 100
    });
    // 重新开启倒计时
    this.stepInterval()
  },

  onLoad: function () {
  },
  onReady: function () {
    // 获得circle组件
    this.circle = this.selectComponent("#circle");
    // 绘制背景圆环
    this.circle.drawCircleBg('circle_bg', 40, 4)
    this.stepInterval()



    this.circle = this.selectComponent("#circle1");
    // 绘制背景圆环
    this.circle.drawCircleBg('circle_bg1', 100, 8)
    this.countInterval()

    this._runEvent()
  },
  
  _runEvent() {
     console.log(1111) 
  },
})
