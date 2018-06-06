var vm = new Vue({
    el: ".vueBox",
    data: {
        title:'常见问题',
        showList:[],
        showIdx:null,
        faqList:[
            {
                title:'房间&成员',
                list: [
                    {
                        q:'1.如何创建自己的房间',
                        a:'解答：在首页-点击创建按钮-进入房间的创建页面-完善信息-保存即可创建',
                    },
                    {
                        q:'2.如何为你的房间上锁？',
                        a:'解答：进入房间-点击右上角-点击加锁即可',
                    },
                    {
                        q:'3.如何设置房间标签？',
                        a:'我的房间-房间头像-设置-标签-选择你自己的标签',
                    },
                    {
                        q:'4.如何指派管理员或删除房间成员',
                        a:'我的房间--选中该成员-踢出房间',
                    },
                    {
                        q:'5.如何管理房间内用户',
                        a: '<p>@邀请用户上麦</p><p>@移除用户麦克风</p><p>@禁止用户</p><p>@把用户提出房间</p>',

                    },
                    {
                        q:'6.如何举报房间？',
                        a:'房间内-右上角-举报房间',
                    },
                ]
            },
            {
                title:'朋友管理',
                list: [
                    {
                        q:'1.如何添加朋友？',
                        a:'消息-新的好友-添加-ID',
                    },
                    {
                        q:'2.如何删除好友',
                        a:'朋友-个人资料页-右上角-删除好友',
                    },
                    {
                        q:'3.如何从列表中删除好友',
                        a:'我-设置-清除列表-编辑-寻找朋友',
                    },
                    {
                        q:'4.如何举报好友？',
                        a:'朋友-个人资料页-右上角-举报',
                    }
                ]
            },
            {
                title:'账户设置',
                list: [
                    {
                        q:'1.如何设置个人签名',
                        a:'我-编辑-个人编辑-你的个签',
                    },
                    {
                        q:'2.如何修改我的性别？',
                        a:'性别目前不支持用户修改',
                    },
                    {
                        q:'3.忘记密码怎么办？',
                        a:'登陆-忘记密码-邮箱验证-重置密码',
                    }
                ]
            }
        ]
    },
    mounted:function(){
    },
    created:function() {
    },
    methods: {
        showFaq:function(index){
            this.showIdx = index
        },
    }
});
var search =window.location.search;
var num= search?search.replace(/[^0-9]/ig,""):0;
document.title = vm.faqList[num].title;
vm.showList = vm.faqList[num].list;


