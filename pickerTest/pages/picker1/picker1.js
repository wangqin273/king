//picker.js
Page({
  data: {
    index: 0,//设置索引值默认为0
    option1: ['1', '2', '3', '4', '5'],
    option2: ['一', '二', '三', '四', '五'],
    option3: ['①', '②', '③', '④', '⑤'],
  },
  bindchange1: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // 设置这个携带值赋值给索引值index
    // 所以option1 ,option2 ,option3的索引值都是一样的
    this.setData({
      index: e.detail.value
    })
  }
})