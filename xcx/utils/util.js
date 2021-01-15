const configs = require("config.js");
const wxRequest = require('wxRequest.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function getShare(app, wxRequest) {
  wxRequest.postRequest('users/qrcode', {}).then(res => {
    if (res.data.error_code == 0) {
      app.globalData.share_history_id = res.data.share_history_id;
      app.globalData.qrcode = res.data.qrcode;
    }
  })
}
/**
 * 页面弹框
 * title=>提示的标题
 * content=>提示的内容
 * showCancel=>是否显示取消按钮（默认true）
 * confirmText=>确认按钮的文本（默认确认）
 * cancelText=>取消按钮的文本（默认取消）
 * cancelColor=>取消按钮的文字颜色（默认#000000）
 * confirmColor=>确认按钮的文字颜色（默认#3CC51F）
 */
const showModal = (title, content, showCancel = true, confirmText = '确定', cancelText = '取消', cancelColor = '#000000', confirmColor = '#3CC51F') => {
  wx.showModal({
    title: title,
    content: content,
    showCancel: showCancel,
    cancelText: cancelText,
    cancelColor: cancelColor,
    confirmText: confirmText,
    confirmColor: confirmColor
  })
}
const showModalCb = (title, content, showCancel = true, confirmText = '确定', cancelText = '取消', cancelColor = '#000000', confirmColor = '#3CC51F', cb) => {
  wx.showModal({
    title: title,
    content: content,
    showCancel: showCancel,
    cancelText: cancelText,
    cancelColor: cancelColor,
    confirmText: confirmText,
    confirmColor: confirmColor,
    success: function (res) {
      if (res.confirm) {
        cb(true);
      } else if (res.cancel) {
        cb(false);
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  getShare: getShare,
  showModal: showModal,
  showModalCb: showModalCb
}
