var Promise = require('../plugins/es6-promise.js');
var configs = require('config.js');
var md5 = require('md5.js');
var time = 0;

function wxPromisify(fn) {
  return function(obj = {}) {
    return new Promise((resolve, reject) => {
      obj.success = function(res) {
        let current_time = Date.parse(new Date()) / 1000;
        //成功
        if (res.data.error_code == -100) {
          if (time < current_time) {
            time = current_time + 3;
            wx.removeStorageSync('sid')
            setTimeout(function(){
              wx.reLaunch({
                url: '/pages/index/index'
              })
            },100)
          }
        } else if (res.data.error_code == -200) {
          if (time < current_time) {
            time = current_time + 3;
            setTimeout(function(){
              wx.reLaunch({
                url: '/pages/index/index'
              })
            },100)
          }
        }
        resolve(res)
      }
      obj.fail = function(res) {
        //失败
        reject(res)
      }
      fn(obj)
    })
  }
}
//无论promise对象最后状态如何都会执行
Promise.prototype.finally = function(callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  );
};
/**
 * 微信请求get方法
 * url
 * data 以对象的格式传入
 */
function getRequest(url, data = {}) {
  var getRequest = wxPromisify(wx.request);
  data.version_code = configs.version_code;
  data.version_name = configs.version_name;
  data.sid = data.sid ? data.sid : wx.getStorageSync('sid');
  data.code = configs.code;
  if (wx.getStorageSync("parent")) {
    var parent = wx.getStorageSync("parent");
    data.parent_id = parent.user_id ? parent.user_id : 0
  }
  if (wx.getStorageSync("device_no")) {
    data.device_no = wx.getStorageSync("device_no");
  }
  data.ckey = configs.sign_key;
  data.h = this.getValidSign(data);
  return getRequest({
    url: fixUrl(url),
    method: 'GET',
    data: data,
    header: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age = 3600',
      'Pragma': 'max-age = 3600',
    }
  })
}

function fixUrl(url) {
  if (url.substring(0, 1) == '/') {
    url = configs.root.domain + url.substring(1, url.length)
  } else {
    url = configs.root.path + url
  }
  return url;
}

/**
 * 微信图片上传
 * URL
 */
function uploadFile(url, filePath, formData, name) {
  var uploadFile = wxPromisify(wx.uploadFile);
  formData.version_code = configs.version_code;
  formData.version_name = configs.version_name;
  formData.code = configs.code;
  formData.sid = wx.getStorageSync('sid');
  formData.type = 'file';
  if (wx.getStorageSync("device_no")) {
    formData.device_no = wx.getStorageSync("device_no");
  }
  formData.ckey = configs.sign_key;
  formData.h = this.getValidSign(formData);

  return uploadFile({
    url: fixUrl(url),
    filePath: filePath,
    name: name,
    formData: formData,
    header: {
      "Content-Type": "multipart/form-data"
    },
  })
}
/**
 * 微信请求post方法封装
 * url
 * data 以对象的格式传入
 */
function postRequest(url, data = {}) {
  var postRequest = wxPromisify(wx.request)
  data.version_code = configs.version_code;
  data.version_name = configs.version_name;
  data.sid = data.sid ? data.sid : wx.getStorageSync('sid');
  data.share_history_id = data.share_history_id ? data.share_history_id : wx.getStorageSync('share_history_id' + configs.debug);
  data.code = configs.code;
  if (wx.getStorageSync("parent")) {
    var parent = wx.getStorageSync("parent");
    data.parent_id = parent.user_id ? parent.user_id : 0
  }
  if (wx.getStorageSync("device_no")) {
    data.device_no = wx.getStorageSync("device_no");
  }
  data.ckey = configs.sign_key;
  data.h = this.getValidSign(data);

  // console.log('post url', url, data)
  return postRequest({
    url: fixUrl(url),
    method: 'POST',
    data: data,
    header: {
      "content-type": "application/x-www-form-urlencoded",
      'Cache-Control': 'max-age = 3600',
      'Pragma': 'max-age = 3600',
    },
  })
}

/**
 * 调用微信支付
 * result  支付参数
 * cb 支付回调值
 */
function requestPayment(result, cb) {
  console.log('==pay start==', result);
  wx.requestPayment({
    'timeStamp': result.form.timeStamp,
    'nonceStr': result.form.nonceStr,
    'package': result.form.package,
    'signType': 'MD5',
    'paySign': result.form.paySign,
    success: function(res) {
      showToast('支付成功', 'success');
      setTimeout(function() {
        cb(true);
      }, 1000);
    },
    fail: function(res) {
      showToast('支付失败', 'none');
      cb(false);
    },
  });
}

/**
 * getValidSign 
 * 生成签名
 */
function getValidSign(data) {
  var sign = [];
  for (var k in data) {
    if (k == 'h' || k == '_url' || k == 'file') {
      continue;
    }
    sign.push(k + '=' + data[k]);
  }
  sign = sign.sort();
  sign = sign.join("&");
  sign = md5(md5(sign) + configs.sign_key);
  return sign;
}
/**
 * 微信用户软提示无确定取消
 * title 提示文案
 * icon 提示图标 支持 success,none,loading
 * time 提示时间
 */
function showToast(title, icon, time) {
  wx.showToast({
    title: title,
    icon: icon ? icon : 'none',
    duration: time ? time : 2000,
    mask: true
  })
}

module.exports = {
  postRequest: postRequest,
  getRequest: getRequest,
  uploadFile: uploadFile,
  getValidSign: getValidSign,
  requestPayment: requestPayment,
  showToast: showToast
}