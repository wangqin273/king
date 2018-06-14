
function countdown(that) {
    var EndTime = new Date(that.end_time)|| [] ;
    var NowTime = new Date().getTime();
    var total_micro_second = EndTime - NowTime || [];
    // 总秒数
    var second = Math.floor(total_micro_second / 1000);
    // 天数
    var day = Math.floor(second / 3600 / 24);
    // 小时
    var hr = Math.floor(second / 3600 % 24);
    // 分钟
    var min = Math.floor(second / 60 % 60);
    // 秒
    var sec = Math.floor(second % 60);
    // 时间格式化输出，如11:03 25:19 每1s都会调用一次
    second = toTwo(second)
    day = toTwo(day)
    hr = toTwo(hr)
    min = toTwo(min)
    sec = toTwo(sec)
    // console.log('剩余时间：' + total_micro_second)
    if (total_micro_second <= 0) {
            that.clock = true;
        return false
    }
    // 渲染倒计时时钟
        that.second= second;
        that.day= day;
        that.hr= hr;
        that.min= min;
        that.sec= sec;

    setTimeout(function () {
        total_micro_second -= 1000;
        countdown(that)
    }, 1000)
}
/**
 * 封装函数使1位数变2位数
 */
function toTwo(n) {
    n = n < 10 ? "0" + n : n
    return n
}


