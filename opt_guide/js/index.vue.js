var vm = new Vue({
    el: ".vueBox",
    data: {
        titBg:"images/title_bg.png",
        curImg:"",
        curIdex:0,
        optGuide:[
            {
                tit:"如何注册登录",
                process:["images/register_1.png","images/register_2.png","images/register_3.png","images/register_4.png"]
            },
            {
                tit:"如何充值",
                process:["images/recharge_1.png","images/recharge_2.png","images/recharge_3.png","images/recharge_4.png"]
            },
            {
                tit:"如何交易",
                process:["images/trades_1.png","images/trades_2.png","images/trades_3.png"]
            },
            {
                tit:"如何提现",
                process:["images/withdraw_1.png","images/withdraw_2.png","images/withdraw_3.png"]
            }
        ],
        isPreview:false,
        preview:[]


    },
    created() {
        this.previewImg()
    },
    methods: {
        enlarge(i,j){
            // this.curImg = this.optGuide[i].process[j]
            // console.log(i,j);
            this.isPreview = true;
            var val =this.optGuide[i].process[j];
            this.curIdex = this.preview.indexOf(val);
            console.log(this.curIdex);
            tabs('.process','.swiper-container','active',this.curIdex);
        },
        reduce(){
            // this.curImg =""
            this.isPreview = false;
            tabs('.process','.swiper-container','active',0);
            console.log(this.curIdex);
        },
        previewImg(){
            [].forEach.call(this.optGuide,  (process)=> {
                [].forEach.call(process.process,  (item) =>{
                    this.preview.push(item);
                });
            });



        }
    }

});