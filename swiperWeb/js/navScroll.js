
/*  导航滚动插件 参数：
*       navBox: 导航栏
*       navA: 导航列表，内部嵌套带有锚点的a标签
*       navFocus: 导航列表当前状态
*       className：导航列表 当前状态下的className
* */
function navScroll(navBox,navA,navFocus,className) {
    /* 设置 当前样式 宽度 和 位置 ，初始为第一个导航的位置*/
    var index = 0; // 设置当前索引 初始为0
    var $sW = navA.eq(index).outerWidth();
    var $sL = navA.eq(index).position().left;
    navFocus.css({  width: $sW, left:  $sL });
    curClass(navA.eq(index));


    /* 鼠标移入到导航栏 改变当前样式*/
    navA.mouseenter(function () {
        // curClass($(this));
        navFocusMove($(this));
    });

    // 鼠标离开导航栏时 当前样式回到 上次位置
    navBox.mouseleave(function () {
        navFocus.stop().animate( {
            width: $sW,
            left:  $sL
        },function () {
            /*给上一次导航添加当前样式*/
            curClass(navA.eq(index))
        })
    });

    /*滚动到某个部分 对应导航改变样式*/
    $(document).on('scroll',function(){
        var	docTop = $(document).scrollTop()+100,
            offsetTop=[];
        for(var i = 0,length = navA.length;i<length;i++){
            /*通过a标签href来获取ID选择器，转换为jq对象 使用jq方法*/
            offsetTop.push($($(navA[i]).attr("href")).offset().top);
            if( docTop>=offsetTop[i]){
                curNav(navA.eq(i));
                curClass(navA.eq(i));
                navFocusMove(navA.eq(i))
            }
        }
    });
    /* 点击导航时 改变导航样式，文档平滑的滚动到指定的位置*/
    navA.click(function() {
        curNav($(this));
        curClass($(this));
        navFocusMove($(this));
        $("html, body").animate({
            /*根据a标签href转换为ID选择器 获取对应位置*/
            scrollTop: $($(this).attr("href")).offset().top - 60+"px"
        }, {
            duration: 500,
            easing: "swing"
        });
        return false;
    });
// 当前样式 移动函数
    function navFocusMove(that) {
        navFocus.stop().animate( {
            width: that.outerWidth(),
            left:  that.position().left
        })
    }
// 添加当前样式，删除其他当前样式
    function curClass(curnavA) {
        curnavA.addClass(className).parent().siblings().find('a').removeClass(className);
    }
    /*记录上一次当前样式所在位置 */
    function curNav(obj) {
        $sW = obj.outerWidth();
        $sL = obj.position().left;
        index = obj.parent().index();
    }

    // 改变窗口大小时 设置 导航的当前样式
    $(window).resize(function () {
        var $sW = navA.eq(index).outerWidth();
        var $sL = navA.eq(index).position().left;
        navFocus.css({  width: $sW, left:  $sL });
        }
    )

}

