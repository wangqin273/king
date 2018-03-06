var playtimer,timer;
var tag = true;
//requestAnimationFrame 兼容
window.requestAnimationFrame = window.requestAnimationFrame || function (fn) {return setTimeout(fn , 1000/60)};
window.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
window.onload=function() {
    var vm = new Vue({
        el: ".vueBox",
        data: {
            checkedNames: [],
            music_list: []
        },
        computed: {},
        created: function () {

        },
        mounted: function () {
            this.getMusic();
        },
        methods: {
            audioPlay: function (e, index) {
                clearInterval(playtimer);
                var music = document.querySelectorAll(".music");
                var _this = this;
                /*当前播放状态*/
                var curIsPlay = this.music_list[index].isPlay;
                this.music_list.forEach(function (item, i) {
                    music[i].pause();
                    _this.$set(item, 'isPlay', false);
                });
                // this.$set(this.music_list[index],'isPlay', curIsPlay ? false : true );
                // curIsPlay?music[index].pause():music[index].play();
                if (curIsPlay) {
                    this.$set(this.music_list[index], 'isPlay', false);
                    music[index].pause()
                } else {
                    this.$set(this.music_list[index], 'isPlay', true);
                    music[index].play();
                    var oProgress = music[index].parentNode.querySelector('.audio_progress'),
                         wLine = music[index].parentNode.querySelector('.audio_line').offsetWidth,
                         oDot = music[index].parentNode.querySelector('.audio_dot'),
                         wDot = oDot.offsetWidth,
                         max = Math.round(this.music_list[index].duration),
                        // 此处必须用jQuery 才能获取到 元素距离文档顶端和左边的偏移值
                         bpgLeft = $('.audio_progress').offset().left;
                    oProgress.onclick=function (e) {
                        if (tag) {
                            var leftP = e.clientX - bpgLeft ;
                            if( leftP<0  ){
                                leftP=bpgLeft;
                            }else if(leftP>oProgress.offsetWidth){
                                leftP=oProgress.offsetWidth;
                            }
                            oDot.style.left=(leftP-wDot/2)+'px';
                            _this.$set(_this.music_list[index], 'leftDot',leftP-wDot/2);
                            _this.$set(_this.music_list[index], 'currentTime', music[index].currentTime);
                            music[index].currentTime =  (leftP-wDot/2) * max / (wLine-wDot);
                        }
                        tag = true;
                    };
                    oDot.onmousedown=function(e){
                        tag = false;
                        var disX=e.clientX-oDot.offsetLeft;
                        document.onmousemove=function(e){
                            if (!tag) {
                                var leftVal=e.clientX-disX;
                                if( leftVal<=0  ){
                                    leftVal=0;
                                }else if(leftVal>wLine-wDot){
                                    leftVal=wLine-wDot;
                                }
                                oDot.style.left=leftVal+'px';
                                _this.$set(_this.music_list[index], 'leftDot',leftVal);
                                _this.$set(_this.music_list[index], 'wDot', wDot);
                                _this.$set(_this.music_list[index], 'currentTime', music[index].currentTime);
                                music[index].currentTime =  leftVal * max / (wLine-wDot);
                            }
                            //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
                            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                        };
                        document.onmouseup=function(){
                            document.onmousemove=null;
                            document.onmouseup=null;

                        };
                    };
                    playtimer = setInterval(function () {
                        _this.$set(_this.music_list[index], 'currentTime', music[index].currentTime);
                        var value = Math.round(_this.music_list[index].currentTime);
                        // console.log("歌曲时长：" + max + "~~~~~~~现在的时间：" + value);
                        _this.$set(_this.music_list[index], 'leftDot', (wLine-wDot) * value / max);
                        _this.$set(_this.music_list[index], 'wDot', wDot);
                        if (value === max) {
                            clearInterval(playtimer);
                            _this.$set(_this.music_list[index], 'isPlay', false);
                            _this.$set(_this.music_list[index], 'currentTime', 0);
                            _this.$set(_this.music_list[index], 'leftDot', 0);
                        }
                    }, 100);

                }

            },
            allChecked: function () {
                if (this.checkedNames.length === this.music_list.length) {
                    // 全不选
                    this.checkedNames = [];
                } else {
                    this.checkedNames = [];
                    var _this = this;
                    // 全选
                    this.music_list.forEach(function (item) {
                        _this.checkedNames.push(item.id);
                    })
                }
            },
            getMusic: function () {

                this.music_list = [
                    {
                        "cov": "http://img1.kuwo.cn/star/starheads/240/34/11/220267175.jpg",
                        "voi": "http://other.web.ra01.sycdn.kuwo.cn/resource/n3/192/19/57/297064714.mp3",
                        "tit": "独自去偷欢-刘德华",
                        "lrcUrl": "audio/lrc/dzqth.lrc",
                        "id": 10
                    },
                    {
                        "cov": "http://img4.kuwo.cn/star/starheads/240/61/54/2102134023.jpg",
                        "voi": "http://other.web.ra01.sycdn.kuwo.cn/resource/n2/192/69/30/1696331887.mp3",
                        "tit": "头发乱了-张学友",
                        "lrcUrl": "audio/lrc/tfll.lrc",
                        "id": 20
                    },
                    {
                        "cov": "http://star.kuwo.cn/star/starheads/180/44/10/3787691319.jpg",
                        "voi": "http://other.web.ra01.sycdn.kuwo.cn/resource/n1/192/23/45/2735055960.mp3",
                        "tit": "浮夸-陈奕迅",
                        "lrcUrl": "audio/lrc/fk.lrc",
                        "id": 30
                    },
                    {
                        "cov": "http://img4.kuwo.cn/star/starheads/240/1/0/3016067007.jpg",
                        "voi": "http://other.web.rf01.sycdn.kuwo.cn/resource/n2/66/79/3849065227.mp3",
                        "tit": "匆匆那年-王菲",
                        "lrcUrl": "audio/lrc/ccnn.lrc",
                        "id": 40
                    },
                    {
                        "cov": "http://img2.kuwo.cn/star/starheads/240/70/47/1808655553.jpg",
                        "voi": "http://other.web.rb01.sycdn.kuwo.cn/resource/n3/28/23/4233584092.mp3",
                        "tit": "爱久见人心-梁静茹",
                        "lrcUrl": "audio/lrc/ajjrx.lrc",
                        "id": 50
                    },
                    {
                        "cov": "http://img2.kuwo.cn/star/starheads/240/71/48/2963446299.jpg",
                        "voi": "http://other.web.ra01.sycdn.kuwo.cn/resource/n2/192/11/54/2132876119.mp3",
                        "tit": "后来-刘若英",
                        "lrcUrl": "audio/lrc/hl.lrc",
                        "id": 60
                    }
                ];

                this.$nextTick(function () {
                    var _this = this;
                    this.music_list.forEach(function (item, i) {
                        // 初始化当前播放时间和时长
                        _this.$set(item, 'currentTime', 0);
                        _this.$set(item, 'duration', 0);
                        // 初始化模拟进度条位置
                        _this.$set(item, 'leftDot', 0);
                        /*设置播放状态isPlay，初始为false*/
                        _this.$set(item, 'isPlay', false);
                        // 获取音频时长设置为 music_list自定义属性duration
                        getTime();

                        function getTime() {
                            setTimeout(function () { //
                                var music = document.querySelectorAll(".music");
                                if (isNaN(music[i].duration)) {
                                    getTime();
                                } else {
                                    _this.$set(item, 'duration', music[i].duration);

                                }
                            }, 20);
                        }
                    })


                });
                /* this.$http.get("js/music.json").then(function(res){
                     // console.log(res.data);
                     this.music_list = res.data;
                     this.$nextTick(function () {
                         var _this=this;
                         this.music_list.forEach(function(item,i){
                             /!*设置播放状态isPlay，初始为false*!/
                             _this.$set(item,'isPlay', false);
                             _this.$set(item,'currentTime', 0);
                             _this.$set(item,'duration', 0);
                             _this.$set(item,'leftDot', 0);
                             // 获取音频时长设置为 music_list自定义属性duration
                             (function getTime() {
                                 requestAnimationFrame(function () {
                                     var music = document.querySelectorAll(".music");
                                     if(isNaN(music[i].duration)){
                                         getTime();
                                     }else {
                                         _this.$set(item,'duration', music[i].duration);
                                     }
                                 });
                             })();
                         })

                     });

                 }, function(res)  {
                     // 响应错误回调
                     alert('服务器请求失败');
                 });*/
            },
            scaleChange: function (e, index) {
                var music = document.querySelectorAll(".music");
                if (this.music_list[index].isPlay) {
                    music[index].currentTime = e.target.value;
                }
            },
            toTwo: function (num) {  // 转换时间格式
                function changInt(num) {
                    return (num < 10) ? '0' + num : num;
                }
                return changInt(parseInt(num / 60)) + ":" + changInt(Math.floor(num % 60));
            }
        }

    });
}


