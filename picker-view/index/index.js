const date = require("../utils/date.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    birthdayshow:false,
    picker_btn:['取消','确定'],
    years: [],
    months: [],
    days: [],
    year: date.nowYear,
    month: date.nowMonth,
    day: date.nowDay,
    value: [], 
    date:'',//官方对比
  },
  // 打开选框
  showBirthday:function(){
    date.setDate(this.data.year, this.data.month, this.data.day, this)
    this.setData({
      birthdayshow: true
    })
    this.value = this.data.value;// 记录改变前的日期
  },
  // 关闭选框
  selectBirthday: function (e) {
    let index = e.currentTarget.dataset.index;  
    if (index && this.val){ // 确定选择 更换改变后的日期
     date.setDate(this.data.years[this.val[0]], this.data.months[this.val[1]], this.data.days[this.val[2]], this) 
    }else{ // 取消选择 还原改变前的日期
      date.setDate(this.data.years[this.value[0]], this.data.months[this.value[1]], this.data.days[this.value[2]], this)
    }
    this.setData({
      birthdayshow: false,
    })
    console.log('上传到后端的数据',this.data.year + '-' + this.data.month + '-' + this.data.day)
  },
  bindChange: function (e) {
    let val = e.detail.value;
    this.val = e.detail.value; //记录改变后的日期
    date.setDate(this.data.years[val[0]], this.data.months[val[1]], this.data.days[val[2]], this)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 这里必须初始化一下，否则打开的不是今天的日期
    date.setDate(this.data.year, this.data.month, this.data.day, this)
  },
//  微信官方日期选择器
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
})
