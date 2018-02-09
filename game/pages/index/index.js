//index.js
//获取应用实例
const app = getApp()
Page({
  data: { 
    num:100,
    step:null,
    time:null,
    stepTimer:null,
    
 
    txt: "正在匹配中...",
    count: 0,//计数器，初始值为0
    maxCount: 60, // 绘制一个圆环所需的步骤 
    countTimer: null,//定时器，初始值为null
  },
  stepInterval:function(){
    // 设置倒计时 定时器
    var n = this.data.num / 2
    this.stepTimer = setInterval(() => {
      if (this.data.num >= 0) {
        this.data.step = this.data.num / n;
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
    // 设置倒计时 定时器 假设每隔100毫秒 count递增+1，当 count递增到两倍maxCount的时候刚好是一个圆环（ step 从0到2为一周），然后改变txt值并且清除定时器
    this.countTimer = setInterval(() => {   
      if (this.data.count <= 2 * this.data.maxCount) {        
        // 绘制彩色圆环进度条
        this.circle.drawCircle('circle_draw1', 100, 8, this.data.count / this.data.maxCount)
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

    // 触发自定义组件事件
    this._runEvent()
  },

  onLoad: function () {
  },
  onReady: function () {
    /*倒计时*/

    // 获得circle组件
    this.circle = this.selectComponent("#circle");
    // 绘制背景圆环
    this.circle.drawCircleBg('circle_bg', 40, 4)
    // 绘制彩色圆环
    this.stepInterval()


    /*进度条 */
   // 获得circle组件
    this.circle = this.selectComponent("#circle1");
    // 绘制背景圆环
    this.circle.drawCircleBg('circle_bg1', 100, 8);
    this.circle.drawCircle('circle_draw1', 100, 8, 2);
    // 绘制彩色圆环
    // this.circle.drawCircle('circle_draw1', 100, 8, 2);
    this.countInterval()

    
  },
  
  _runEvent() {
     console.log(1111) 
  },
})
