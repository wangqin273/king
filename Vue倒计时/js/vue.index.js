var vm = new Vue({
    el: ".vueBox",
    data: {
        second: '',
        day: '',
        hr: '',
        min: '',
        sec: '',
        clock: false,
        end_time:'2018/08/19 18:00',
  },
    created:function() {
        countdown(this,3)//调用倒计时
    },
    methods: {
        

    }

});