var vm = new Vue({
    el: ".vueBox",
    data: {
        avatar:'images/user_avatar.jpg',
        dollar:'images/icon_dollar.png',
        nickname:'黑芝麻的红包',
        money:23,
        num_received:4,
        num_total:5,
        isReceived:false,/*判断是否还有红包*/
        noReceived:false,/*判断是否领到红包*/
        receiveList:[
            {
                nickname:' Mary ',
                avatar:'images/user_avatar.jpg',
                time:'2018-5-08  16:42:26',
                number:'5.20',
                type:1,
            },
            {
                nickname:' Mary ',
                avatar:'images/user_avatar.jpg',
                time:'2018-5-08  16:42:26',
                number:'13.14',
                type:1,
            },
            {
                nickname:' Mary ',
                avatar:'images/user_avatar.jpg',
                time:'2018-5-08  16:42:26',
                number:'2.5',
                type:1,
            },
            {
                nickname:' Mary ',
                avatar:'images/user_avatar.jpg',
                time:'2018-5-08  16:42:26',
                number:'52',
                type:1,
            },
            {
                nickname:' Mary ',
                avatar:'images/user_avatar.jpg',
                time:'2018-5-08  16:42:26',
                number:'1.4',
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