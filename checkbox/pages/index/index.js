const app = getApp()
Page({
  data: {
    items: [{
        name: 'USA',
        value: '美国'
      },
      {
        name: 'CHN',
        value: '中国',
        checked: 'true'
      },
      {
        name: 'BRA',
        value: '巴西'
      },
      {
        name: 'JPN',
        value: '日本'
      },
      {
        name: 'ENG',
        value: '英国'
      },
      {
        name: 'TUR',
        value: '法国'
      },
    ],
    checkedList: [],
  },
  allChecked: function() {
    var checkedList = [];
    var items = this.data.items;
    if (this.data.checkedList.length == this.data.items.length) {
      // 全不选
      items.forEach(function (item) {
        item.checked = false
      })
      this.setData({ 
        items: items,
        checkedList: checkedList
      })
    } else { 
      // 全选
      items.forEach(function(item) {
        item.checked = true
        checkedList.push(item.name);
      })
      this.setData({
        items: items,
        checkedList: checkedList
      })
    }

  },
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  
    this.setData({ 
      checkedList: e.detail.value
    })
    console.log(' checkedList', this.data.checkedList)
  },
  onLoad: function(options) {
    // Do some initialize when page load.
  },
  onReady: function() {
    // Do something when page ready.
  },
  onShow: function() {
    // Do something when page show.

  },
  onHide: function() {

  }
})