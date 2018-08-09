
function countdown(that,i) {
    // i是时区 以埃及时间为例，东二区 2
    var sTime = new Date(that.start_time)|| [] ;
    var EndTime = new Date(that.end_time)|| [] ;
    var localTime = new Date().getTime();
    var localOffset=new Date().getTimezoneOffset()*60000; //获得当地时间偏移的毫秒数
    var utc = localTime + localOffset; //utc即GMT时间
    var offset =i; //埃及时间为例，东2区
        localTime = utc + (3600000*i); 
    var NowTime = new Date(localTime); 

    var isStart= sTime - NowTime>0;

    var total_micro_second = isStart ? sTime - NowTime : EndTime - NowTime ;
      
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
        that.isStart = isStart;


    setTimeout(function () {
        // total_micro_second -= 1000;
        countdown(that,i)
    }, 1000)
}
/**
 * 封装函数使1位数变2位数
 */
function toTwo(n) {
    n = n < 10 ? "0" + n : n
    return n
}


