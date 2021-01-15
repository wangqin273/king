/*秒杀倒计时*/
function countdown(that) {
  var EndTime = that.data.end_at || 0;
  var NowTime = that.data.now_at || 0;
  var total_micro_second = EndTime - NowTime;

  countdowntimer();

  function countdowntimer() {
    // 总秒数
    var second = Math.floor(total_micro_second / 1000);
    // 天数
    // var day = Math.floor(second / 3600 / 24);
    // 小时
    // var hr = Math.floor(second / 3600 % 24);
    var hr = Math.floor(second / 3600);
    // 分钟
    var min = Math.floor(second / 60 % 60);
    // 秒
    var sec = Math.floor(second % 60);
    // 时间格式化输出，如11:03 25:19 每1s都会调用一次
    // second = toTwo(second);
    // day = toTwo(day);
    // hr = toTwo(hr);
    min = toTwo(min);
    sec = toTwo(sec);
    if (total_micro_second < 0) {
      // 重新获取下一轮时间
      return false
    }
    // 渲染倒计时时钟
    // that.second = second;
    // that.day = day;
    // that.hr = hr;
    // that.min = min;
    // that.sec = sec;
    that.setData({
      min: min,
      sec: sec
    })
    total_micro_second -= 1000;
    setTimeout(countdowntimer, 1000);
  }
}

/**
 * 封装函数使1位数变2位数
 */
function toTwo(n) {
  n = n < 10 ? "0" + n : '' + n;
  return n
}

module.exports = {
  countdown: countdown
}