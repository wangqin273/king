function countdown(start_time,end_time ) {
    var EndTime = new Date(end_time) || [];
    var StartTime = new Date(start_time) || [];
    var NowTime = new Date().getTime();
    StartTime = StartTime.getTime()
    EndTime = EndTime.getTime()
    var text = '';
    if (NowTime < StartTime) {
        EndTime = StartTime;
        text = "الوقت المتبقي：";
    } else {
        text = "لوقت المتبقي للنشاط：";
    }
    var total_micro_second = EndTime - NowTime || [];

    console.log(total_micro_second);
    if (total_micro_second > 0) {
        setTimeout(function () {
            countdown(start_time, end_time);
        }, 1000)
    } else {
        total_micro_second = 0;
    }

    var time = 'الوقت المتبقي على نهاية النشاط';

    if (total_micro_second > 0) {
        // 总秒数
        var second = Math.floor(total_micro_second / 1000)
        // 天数
        var day = Math.floor(second / 3600 / 24)
        // 小时
        var hr = Math.floor(second / 3600 % 24)
        // 分钟
        var min = Math.floor(second / 60 % 60)
        // 秒
        var sec = Math.floor(second % 60)
        // 时间格式化输出，如11:03 25:19 每1s都会调用一次
        second = toTwo(second)

        min = toTwo(min)
        sec = toTwo(sec)
        // 渲染倒计时时钟
        time = text + sec + ":" + min  + ":" + (day*24+hr) ;
    }

    var _time = document.getElementById("time_text");

    _time.innerText = time;

}
/**
 * 封装函数使1位数变2位数
 */
function toTwo(n) {
    n = n < 10 ? "0" + n : n
    return n
}