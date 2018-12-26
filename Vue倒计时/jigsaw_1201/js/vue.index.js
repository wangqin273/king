var vm = new Vue({
    el: ".vueBox",
    data: {

        //倒计时
        second: '',
        day: '00',
        hr: '00',
        min: '00',
        sec: '00',
        isStart: false,//判断活动开始未开始
        start_at: false,
        end_at: 1546003800000, // 毫秒
        now_at: 1545831000000,

    },
    created() {
        this.$nextTick(function () {
            /*获取当前时间和结束时间*/
            countdown(this);
        });
    },


});


