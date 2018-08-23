var vm = new Vue({
    el: ".vueBox",
    data: {
        checkedNames: [],
        music_list: [],
        all_cheched:false,
    },
    computed: {

    },
    created: function () {

    },
    mounted: function () {
        this.getMusic();
    },
    methods: {
        allChecked: function () {
            if (this.checkedNames.length === this.music_list.length) {
                // 全不选
                this.checkedNames = [];

            } else {
                this.checkedNames = [];
                // 全选
                this.music_list.forEach(  (item) =>{
                    this.checkedNames.push(item.id); // 与checkbox的value统一
                })
            }
        },
        getMusic: function () {
            var music_list = [
                {
                    "cov": "http://img1.kuwo.cn/star/starheads/240/34/11/220267175.jpg",
                    "voi": "http://other.web.ra01.sycdn.kuwo.cn/resource/n3/192/19/57/297064714.mp3",
                    "tit": "独自去偷欢-刘德华",
                    "lrcUrl": "audio/lrc/dzqth.lrc",
                    "id": 'dzqth'
                },
                {
                    "cov": "http://img4.kuwo.cn/star/starheads/240/61/54/2102134023.jpg",
                    "voi": "http://other.web.ra01.sycdn.kuwo.cn/resource/n2/192/69/30/1696331887.mp3",
                    "tit": "头发乱了-张学友",
                    "lrcUrl": "audio/lrc/tfll.lrc",
                    "id": 'tfll'
                },
                {
                    "cov": "http://star.kuwo.cn/star/starheads/180/44/10/3787691319.jpg",
                    "voi": "http://other.web.ra01.sycdn.kuwo.cn/resource/n1/192/23/45/2735055960.mp3",
                    "tit": "浮夸-陈奕迅",
                    "lrcUrl": "audio/lrc/fk.lrc",
                    "id": 'fk'
                },
                {
                    "cov": "http://img4.kuwo.cn/star/starheads/240/1/0/3016067007.jpg",
                    "voi": "http://other.web.rf01.sycdn.kuwo.cn/resource/n2/66/79/3849065227.mp3",
                    "tit": "匆匆那年-王菲",
                    "lrcUrl": "audio/lrc/ccnn.lrc",
                    "id": 'ccnn'
                },
                {
                    "cov": "http://img2.kuwo.cn/star/starheads/240/70/47/1808655553.jpg",
                    "voi": "http://other.web.rb01.sycdn.kuwo.cn/resource/n3/28/23/4233584092.mp3",
                    "tit": "爱久见人心-梁静茹",
                    "lrcUrl": "audio/lrc/ajjrx.lrc",
                    "id": 'ajjrx'
                },
                {
                    "cov": "http://img2.kuwo.cn/star/starheads/240/71/48/2963446299.jpg",
                    "voi": "http://other.web.ra01.sycdn.kuwo.cn/resource/n2/192/11/54/2132876119.mp3",
                    "tit": "后来-刘若英",
                    "lrcUrl": "audio/lrc/hl.lrc",
                    "id": 'hl'
                }
            ];
            this.music_list =  music_list
        },
        deleteMusic:function () {
            var music_list = this.music_list;
            var checkedNames = this.checkedNames;
            /*循环查找选中项*/
            checkedNames.forEach(function (item,index) {
                music_list.forEach(function (music,i) {
                    if(music.id==item){
                        music_list.splice(i,1);
                    }
                });
            })
            this.music_list=music_list;
            this.checkedNames=[]
        }
    }

});