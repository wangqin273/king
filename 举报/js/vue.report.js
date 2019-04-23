/**
 * Created by Administrator on 2018/8/20 0020.
 */
var vm = new Vue({
    el: '.app',
    data: {
        curIdx: null,
        chooses_title: '举报理由：',
        chooses: [
            {
                text: '色情信息',
                yes: false
            }, {
                text: '骚扰',
                yes: false
            }, {
                text: '不良信息',
                yes: false
            },
            {
                text: '广告',
                yes: false
            }
        ],
        len: 0,
        message: '',
        message_title: '填写描述',
        message_tips: '',

    },
    methods: {
        choose: function (index) {
            this.curIdx = index

        },
        messageChange: function () {
            this.len = this.message.length;

        }
    }
});
























