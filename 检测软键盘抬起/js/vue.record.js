var vm = new Vue({
    el: ".vueBox",
    data: {
        recordList:[
            {
                title:'发红包',
                time:'2018-5-08  16:42:26',
                number:'5.20',
                type:0,
            },
            {
                title:'收红包',
                time:'2018-5-08  16:42:26',
                number:'13.14',
                type:1,
            },
            {
                title:'发红包',
                time:'2018-5-08  16:42:26',
                number:'52',
                type:0,
            },
            {
                title:'收红包',
                time:'2018-5-08  16:42:26',
                number:'52',
                type:1,
            },
            {
                title:'红包退还',
                time:'2018-5-08  16:42:26',
                number:'1314',
                type:1,
            }
        ],
    },
    created() {

    },
    methods: {
        navToDetails:function(){
            window.location.href='details.html'
        }
    }

});