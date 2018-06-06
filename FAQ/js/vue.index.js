var vm = new Vue({
    el: ".vueBox",
    data: {
        arrow:'images/arrow.png',
        curIdx:0,
        faqList:[
            {
                title:'房间&成员',
            },
            {
                title:'朋友管理',
            },
            {
                title:'账户设置',
            }
        ] },
    created:function() { },
    methods: {
        selectFaq:function(index){
           this.curIdx=index;
            window.location.href='details.html?'+index
        },
    }

});