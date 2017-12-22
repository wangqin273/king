
var vm = new Vue({
    el: ".vueBox",
    data: {
        user: {
            id_name: '用户78474',
            id_no: '486900288739874563',
            mobile: '13472630986',
            job:'上班族',
            credit_card_status:'无',
            mobile_usage_time:'1-5个月'
        },
        myProfile: [
            {
                title: '职业身份',
                value: '上班族',
                filed: 'job',
                dataFiled: ['上班族','个体户','企业主','自由职业者'],
                showOption:false
            },
            {
                title: '有无信用卡',
                value: '无',
                filed: 'credit_card_status',
                dataFiled: ['无','有'],
                showOption:false
            },
            {
                title: '手机使用时间',
                value: '6个月以内',
                filed: 'mobile_usage_time',
                dataFiled: ['6个月以内','6个月以上','1年以上','3年以上'],
                showOption:false
            }
        ],
        mobileEdit:false,
        id_nameEdit:false,
        id_noEdit:false


    },
    computed:{

    },
    methods: {
        editmobile:function () {
            this.mobileEdit = !this.mobileEdit
        },
        editid_name:function () {
            this.id_nameEdit = !this.id_nameEdit
        },
        editid_no:function () {
            this.id_noEdit = !this.id_noEdit
        },
        showSelect:function(index){
            for(var i in this.myProfile){
                this.myProfile[i].showOption=false;
            }
            this.myProfile[index].showOption=true
        },
        setSelectVal:function(index,val){
            this.myProfile[index].showOption=false;
            this.myProfile[index].value=val;
        },
        hideSelect:function () {
            for(var i in this.myProfile){
                this.myProfile[i].showOption=false;
            }
        }
    }
});

