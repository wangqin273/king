
/**
 *
 * 作者 月影 (QQ:253737688)
 * json 数据原创模拟 素材来自网络
 * 音乐外链生成 http://www.170mv.com/tool/song/
 * 酷狗        http://www.kuwo.cn/
 * LRC歌词     http://lrc.bzmtv.com/
 *
 */
;(function($){
    var rotatetimer,    /* 旋转定时器 */
        isNext = true,  /* 播放结束是下一首还是暂停 */
        isloop = true,  /* 是否循环播放 */
        isPlay = false, /* 播放状态 */
        angle = 0,      /* 旋转角度 */
        i = 0,
        max = 0,        /* 时长 */
        value = 0,
        $cover = $('.cover'),
        $btnPlay= $('.btn_play'),
        $searchVal= $('.search_input'),  /*以下为歌曲搜索*/
        $searchBtn= $('.search_label'),
        resJson,
        musList,
        $scale = $('#scale'),
        $btnFf = $('.btn_ff'),
        $btnFr = $('.btn_fr'),
        $timeCur = $('#time_cur'),
        $btnNext = $('.btn_next'),
        $btnPrev = $('.btn_prev'),
        $audioDot = $('.audio_dot'),
        $audioBlue = $('.audio_blue'),
        $audioLine = $('.audio_line'),
        $audioTitle = $('.audio_title'),
        $lyricList = $("#lyric_list"),
        $singer = $('#singer'),
        $songList = $('.song_list'),
        $meunBtn= $('.meun_btn'),
        wLine = $audioLine.width(),
        wDot = $audioDot.width(),
        $timeLong = $('#time_long'),
        $music=$('#music'),
        music = $music.get(0);          /* jQuery对象 转换为 DOM对象 以便于操作 Audio 对象*/

    (function getData() {
        $songList.empty();
        $.ajax({
            // url: "http://www.17sucai.com//preview/17147/2017-11-02/%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8Ajaxv2.0_3/audio/js/music.json",
            url: "audio/js/music.json",
            cache:false,
            dataType: "json",
            success:function(data){
                musList = data;         /* 获取json数据 赋值 给musList数组 */
                lens=musList.length;
                /*初始化*/
                $cover.css('background-image', "url(" + musList[0].cov + ")");/*歌曲海报 */
                $music.attr('src', musList[0].voi);          /* 歌曲链接 */
                $audioTitle.html(musList[0].tit);            /* 歌曲名称 */
                $singer.html(musList[0].inf);                /* 歌手信息，在此直接放字符串了，也可以像歌词一样单独列出来 */
                /*歌曲列表*/
                $.each( musList, function(index, items) {
                    $songList.html($songList.html()+'<li>' +items.tit + '</li>');
                });
                $songList.find('li').eq(0).addClass('cur'); /* 初始化歌曲列表 第一首高亮 */
                /*点播歌曲*/
                $songList.find('li').on('click', function() {
                    i = $(this).index();                    /* i 用来 关联点播以后的“上一首”“下一首”*/
                    play(i);
                    $(this).parent().slideToggle();
                });
                getTime();                                   /* 初始化第一个歌曲时长 */
                renderLyric(0)                               /* 初始化第一个歌曲歌词 */
            },
            error:function(){
                $songList.html('<li>音乐列表获取失败！</li>');
                $lyricList.html('<li style="height:auto;color: red; padding: 0.5rem; text-align: left ">ajax异步获取歌曲， 必须服务器支持才能打开，例如：wampserver ，MAMP 或者 webstorm 浏览器预览！</li>');
                console.log((" ajax异步获取歌曲， 必须服务器支持才能打开，例如：wampserver ，MAMP 或者 webstorm 浏览器预览"));
            }
        });
        $meunBtn.on('click',function(){
            $songList.delay().slideToggle();
        });
    })();

    /*歌曲搜索*/
    /*QQ音乐接口： https://www.showapi.com/api/lookPoint/213 */
    function searchMuics(val) {
        if(val){
            $songList.empty();
            $.ajax({
                type: 'post',
                url: "http://route.showapi.com/213-1?keyword="+val+"&page=1&",
                dataType: 'jsonp',
                data: {
                    "showapi_appid": '49218', //这里需要改成自己的appid
                    "showapi_sign": 'bc3ca9c5e1254061888a21e9c069b1ae'  //这里需要改成自己的应用的密钥secret，
                },
                jsonp: 'jsonpcallback', //这个方法名很重要,不能改变
                success: function(result) {
                    resJson = result.showapi_res_body.pagebean.contentlist;
                    var  lens = resJson.length;
                    musList = resJson;
                    /*歌曲列表*/
                    if(lens>0){
                        $.each( musList, function(index, items) {
                            musList[index].cov = items.albumpic_big;
                            musList[index].tit = items.songname +' - '+items.singername;
                            musList[index].voi = items.m4a;
                            musList[index].inf = items.albumname;
                            $songList.html($songList.html()+'<li>' + items.tit+ '</li>');
                            /* 根据API 歌曲id获取歌词*/
                            $.ajax({
                                type: 'post',
                                url: "http://route.showapi.com/213-2?musicid="+items.songid+"&",
                                dataType: 'jsonp',
                                data: {
                                    "showapi_appid": '49218', //这里需要改成自己的appid
                                    "showapi_sign": 'bc3ca9c5e1254061888a21e9c069b1ae'  //这里需要改成自己的应用的密钥secret，
                                },
                                jsonp: 'jsonpcallback', //这个方法名很重要,不能改变
                                success: function(lrcs) {
                                    musList[index].lrcText =lrcs.showapi_res_body.lyric;
                                },
                                error: function(XmlHttpRequest, textStatus, errorThrown) {
                                    console.log("暂无歌词！");
                                }
                            });

                        });
                        /*点播歌曲*/
                        $songList.find('li').on('click', function() {
                            i = $(this).index();                    /* i 用来 关联点播以后的“上一首”“下一首”*/
                            play(i);
                            $(this).parent().slideToggle();
                        });
                        getTime();
                    }else {
                        $songList.html('<li style="color: red"> 无歌曲显示，请重新搜索 </li>');
                    }
                },
                error: function(XmlHttpRequest, textStatus, errorThrown) {
                    alert("操作失败!请重新搜索！");
                }
            });
        }else {
            $songList.hide();
            console.log("请输入关键词");
        }
    }

    $searchBtn.on('click',function(e){
        var val = $searchVal.val();
        $songList.slideDown();
        searchMuics(val)
    });

    /* 获取歌曲时长 因为要加载完成才能获取时长，所以设置 延时获取*/
    function getTime() {
        setTimeout(function () {
            isNaN(music.duration)?getTime():$timeLong.html(toTwo(music.duration))
        });
    }
    /*播放*/
    $btnPlay.on('click', function() {
        isPlay ? nplay() : iplay() ;
    });

    /*切换音乐*/
    $btnNext.on('click', function() {
        next();
    });
    $btnPrev.on('click', function() {
        prev()
    });
    /*快进 快退*/
    $btnFf.on('click', function() {
        music.currentTime += 5;
    });
    $btnFr.on('click', function() {
        music.currentTime -= 5;
    });
    function prev() {             /*上一首  是否向上循环播放*/
        i>0 ? i-- :(isloop?i=lens-1:console.log('已经是最后一首了'));
        play(i)
    }
    function next() {            /*下一首 是否向下循环播放*/
        (i<=lens-2) ? i++ : (isloop ? i=0 : console.log('已经是最后一首了')) ;
        play(i)
    }

    /*播放歌曲方法*/
    function play(j) {
        $cover.css('background-image', "url(" + musList[j].cov + ")");  /* 更换对应歌曲海报 */
        $music.attr('src', musList[j].voi);                             /* 更换对应歌曲链接 */
        $audioTitle.html(musList[j].tit);                               /* 更换对应歌曲名称 */
        $singer.html(musList[j].inf);                                   /* 歌手信息，在此直接放字符串了，也可以像歌词一样单独列出来 */
        $songList.find('.cur').removeClass('cur');
        $songList.find('li').eq(i).addClass('cur');                     /* 当前播放歌曲高亮 */
        isPlay ? iplay(): nplay();
        renderLyric(j);                                                  /* 获取对应歌词 */
        getTime();                                                       /* 获取对应时长 */
    }

    /*播放状态*/
    function iplay() {
        clearInterval(rotatetimer);
        $btnPlay.removeClass('btn_pause');
        (music.onloadeddata = function () {         /* loadeddata 当浏览器已加载音频/视频的当前帧时触发。*/
            $scale.attr('max', music.duration);
            max = Math.round(music.duration);
            $timeLong.html(toTwo(music.duration));  /*加载载歌曲时长*/
        })();
        music.play();
        isPlay = true;
         /* jquery.rotate 旋转动画插件  */
        rotatetimer = setInterval(function() {
            angle += 1;
            $cover.rotate(angle);
        }, 20);
    }

    /*  歌曲当前播放时间 和进度条对应 */
    music.ontimeupdate = function () {
        value = Math.round(music.currentTime);
        $scale.val(value);
        $timeCur.html(toTwo(value));/*加载载歌曲当前播放时间*/
        leftDot = wLine * value/max;
        /*设置进度条样式*/
        $audioDot.css({ 'left' : leftDot });
        $audioBlue.css({ 'width' : leftDot+wDot/2 });
        music.onended = function () {
            console.log('音频播放完成');
            isNext?next():nplay();    /* 判断歌曲播放结束 是否下一首,*/
        }
    };

    /*拖拽进度条*/
    $scale.on('change', function() {
        music.currentTime = $scale.val();
    });

    /*暂停状态*/
    function nplay() {
        music.pause();
        isPlay = false;
        clearInterval(rotatetimer);     /* 清除选择动画 */
        $btnPlay.addClass('btn_pause'); /* 添加暂停按钮 */
    }
    /*时间格式转换器 - 00:00*/
    function toTwo(num){
        function changInt(num){
            return (num < 10) ? '0'+num : num;
        }
        return changInt(parseInt(num/60))+":"+ changInt(Math.round(num%60));
    }

        /* 以下为歌词部分  重点难点*/
    /* 解析歌词 用时间轴作为键，歌词作为值 放到lrcObj对象中 */
    function parseLyric(lrc) {
       // console.log(lrc); /*此处 Unicode编码需要处理  html过渡一下自动转编码*/
        var $lrcHtml = $("<div></div>");
        $lrcHtml.html(lrc)
        var lrc=$lrcHtml.html();
        /*  Unicode编码 处理完成*/
        // console.log(lrc); /* 已经转过编码*/
        if(lrc){
            var lrcArr = lrc.split("\n");                    /*使用换行符拆分歌词为数组*/
            var lrcObj = {};
            for(var i=0,length=lrcArr.length;i<length;i++){
                var lyric = decodeURIComponent(lrcArr[i]);   /*注意编码格式*/
                var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;   /*重点：时间正则*/
                var timeRegExpArr = lyric.match(timeReg);    /*提取 所有时间*/
                if(!timeRegExpArr)continue;                  /*忽略没有时间戳的歌词*/
                var lrcTxt = lyric.replace(timeReg,'');      /*去掉时间戳，只留下歌词部分*/
                for(var k = 0,tLength = timeRegExpArr.length;k < tLength;k++) {
                    var time = timeRegExpArr[k];             /*循环时间戳数组 转换成以秒为单位的时间*/
                    var min = Number(String(time.match(/\[\d*/i)).slice(1)),
                        sec = Number(String(time.match(/\:\d*/i)).slice(1));
                    time = min * 60 + sec;
                    lrcObj[time] = lrcTxt;                     /* 时间戳 和 歌词 的键值对*/
                }
                /* lrcObj[time] = lrcTxt;在此处  不能正确解析 《独自去偷欢的》 歌词
                 * 例如：[01:22.00][00:26.00]未去管 谁不满
                 * [00:26.00] 时间点的歌词被解析
                 * [01:22.00] 时间点的歌词没有解析
                 * */
            }
            return lrcObj;
        }
    }

    /* 渲染歌词 */
    function renderLyric(i){
        $lyricList.stop().animate({top:0});
        $lyricList.empty();                      /*先清空歌词内容 */
        if(musList[i].lrcUrl){                   /*这里的歌词是用url形式，先判断是否有歌词链接，再用ajax请求歌词*/
            $.ajax({
                type: "post",
                url: musList[i].lrcUrl,
                // url: "http://www.17sucai.com/preview/17147/2017-11-02/lrc/tfll.lrc",
                success: function (lrc) {     /* 获取歌词 */
                    var lrcData = parseLyric(lrc);
                    var n=0;                     /*这个标记歌词行数，方便歌词滚动*/
                    for( key in lrcData){        /*循环处理歌词*/
                        n++;
                        var txt = lrcData[key];
                        if(!txt)txt = " ";       /*没有歌词显示空的一行*/
                        var li = $("<li class=list_"+key+" data-line="+n+" >"+txt+"</li>");
                        $lyricList.append(li);   /* 根据时间戳设置clssName，标记歌词行数data-line */
                    }
                    $music.on("timeupdate",  updateLyric);
                },
                statusCode:{
                    404:function(){
                        // 说明请求的url不存在
                        console.log("请求的歌词url不存在");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            });
        }else if(musList[i].lrcText){
            lrc = musList[i].lrcText;
            var lrcData = parseLyric(lrc);
            var n=0;                     /*这个标记歌词行数，方便歌词滚动*/
            for( key in lrcData){        /*循环处理歌词*/
                n++;
                var txt = lrcData[key];
                if(!txt)txt = " ";       /*没有歌词显示空的一行*/
                var li = $("<li class=list_"+key+" data-line="+n+" >"+txt+"</li>");
                $lyricList.append(li);   /* 根据时间戳设置clssName，标记歌词行数data-line */
            }
            $music.on("timeupdate",  updateLyric);

        }else {
            $lyricList.html("<li>没有歌词</li>");
        }
    }
    /* 滚动歌词 高亮同步 */
    function updateLyric() {
        value = Math.floor(music.currentTime);
        var  $lyricLi = $lyricList.find('li'),
            lineHeight = $lyricLi.height(),               /* 每行歌词的高度 */
            $li =  $('.list_'+value);                       /* 当前行歌词 */
        $li.addClass('on').siblings().removeClass('on');
        nTop = $li.attr('data-line');                       /* 获取 当前行歌词 的行数 */

        if(nTop >4){                                        /*歌词高亮显示在第四行*/
            $lyricList.stop().animate({top:-(nTop-4)*lineHeight});
        }
    }
})(jQuery);