const configs = require('../../utils/config.js');
Page({
  data: {
    url: ''
  },
  onLoad(option) {
    if (option.url) {
      this.setData({
        url: (option.url.indexOf('http') != -1) ? option.url : configs.root.domain + option.url
      })
    }
  },
});
