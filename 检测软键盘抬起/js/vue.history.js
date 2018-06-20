var vm = new Vue({
    el: ".vueBox",
    data: {
        historyTabs:['收到的红包','发出的红包'],
        historyType:0,
        avatar:'images/user_avatar.jpg',
        dollar:'images/icon_dollar.png',
        total_income:0,
        total_income_num:0,
        total_expenditure:0,
        total_expenditure_num:0,

        incomeList:[
            {
                nickname:'Lisa',
                avatar:'images/user_avatar.jpg',
                time:'2018-5-08  16:42:26',
                number:'5.20',
                type:1,
            },
            {
                nickname:'Lisa',
                avatar:'images/user_avatar.jpg',
                time:'2018-5-08  16:42:26',
                number:'13.14',
                type:1,
            },
            {
                nickname:'Lisa',
                avatar:'images/user_avatar.jpg',
                time:'2018-5-08  16:42:26',
                number:'52',
                type:1,
            },
            {
                nickname:'Lida',
                avatar:'images/user_avatar.jpg',
                time:'2018-5-08  16:42:26',
                number:'52',
                type:1,
            },
            {
                nickname:'Lisa',
                avatar:'images/user_avatar.jpg',
                time:'2018-5-08  16:42:26',
                number:'1314',
                type:1,
            },


        ],
        expenditureList:[
            {
                nickname:'Lucy',
                avatar:'images/user_avatar.jpg',
                time:'2018-5-08  16:42:26',
                number:'5',
                type:0,
            },
            {
                nickname:'Lucy',
                avatar:'images/user_avatar.jpg',
                time:'2018-5-08  16:42:26',
                number:'5',
                type:0,
            },
            {
                nickname:'Lucy',
                avatar:'images/user_avatar.jpg',
                time:'2018-5-08  16:42:26',
                number:'5',
                type:0,
            },
        ],

        empty_moneybag:'images/empty_moneybag.png',
    },
    created() {

        this.total_income_num = this.incomeList.length;
        this.total_expenditure_num = this.expenditureList.length;
        this.incomeList.forEach((item)=>{
                this.total_income +=  Number(item.number);
        });
        this.expenditureList.forEach((item)=>{
                this.total_expenditure +=  Number(item.number);
        });




    },
    methods: {
        selectHistoryTabs:function(index){
           this.historyType=index;
            document.title = this.historyType?'发出的红包':'收到的红包';
        }
    }

});
