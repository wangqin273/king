// picker.js
Page({
  data: {
    index1: 0,
    index2: 0,
    index3: 0,
    option1: ['11', '22', '33', '44', '55'],
    option2: ['一一', '二二', '三三', '四四', '五五'],
    option3: ['①①', '②②', '③③', '④④', '⑤⑤'],
  },
  bindchange1: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  bindchange2: function (e) {
    this.setData({
      index2: e.detail.value
    })
  },
  bindchange3: function (e) {
    this.setData({
      index3: e.detail.value
    })
  }

})