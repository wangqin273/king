var vm = new Vue({
    el: ".vueBox",
    data: {
        second: '',
        day: '',
        hr: '',
        min: '',
        sec: '',
        clock: false,
        isStart: false,
        start_time:'2018/07/23 18:00',
        end_time:'2018/07/27 18:00',
  },
    created:function() {
        countdown(this,3)//调用倒计时
    },
    methods: {
        

    }

});