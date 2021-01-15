const request = require("../../utils/wxRequest.js");// 载入项目根路径文件
const configs = require('../../utils/config.js');

Page({
  data: {
    ico_clear: '/images/ico_clear.png',
    hot_search: [],
    is_search: false,
    result_list: [],
    search_text: '',
    empty_search: '/images/empty_search.png'
  },

  onLoad(options) {
    if (options.search_text) {
      this.setData({
        search_text: options.search_text
      })
      this.searchSize()
    }
    // 加载热门搜索
    request.postRequest('third_photo/hot_search', {}).then(res => {
      if (res.data.error_code == 0) {
        if ((res.data.hot_search_list).length != 0) {
          this.setData({
            hot_search: res.data.hot_search_list
          })
        }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.error_reason,
          duration: 1000
        });
      }
    })
  },

  searchSize: function() {
    if (!this.data.search_text.replace(/\s+/g, "")) {
      this.setData({
        search_text: ''
      });
      wx.showToast({
        icon: 'none',
        title: '请输入用途',
        duration: 3000
      });
      return;
    }
    // 搜索热门规格
    request.postRequest('third_photo/search_spec', { search_content: this.data.search_text }).then(res => {
      if (res.data.error_code == 0) {
        this.setData({
          is_search: true,
          result_list: res.data.spec_list
        });
        // if (res.data.spec_list.length == 0) {
        //   wx.showToast({
        //     icon: 'none',
        //     title: '没有找到你想要的证据规格',
        //     duration: 1000
        //   });
        // }
      } else {
        wx.showToast({
          icon: 'none',
          title: res.data.error_reason,
          duration: 1000
        });
      }
    })
  },

  inputSearch: function(e) {
    this.setData({
      search_text: e.detail.value
    })
  },

  clearInput: function() {
    this.setData({
      search_text: '',
      is_search: false
    })
  },

  selectHot: function(e) {
    this.setData({
      search_text: e.currentTarget.dataset.item
    })
    this.searchSize()
  },

  sizeDetail: function(e) {
    wx.navigateTo({
      url: '/pages/size_detail/size_detail?product_id=' + e.currentTarget.dataset.item
    })
  },
});
