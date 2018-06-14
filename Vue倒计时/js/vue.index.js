var vm = new Vue({
    el: ".vueBox",
    data: {
        second: '',
        day: '',
        hr: '',
        min: '',
        sec: '',
        clock: false,
        end_time:'2024/01/01 00:00',
  },
    created:function() {
        countdown(this)//调用倒计时
    },
    methods: {
        

    }

});