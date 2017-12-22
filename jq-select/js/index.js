

// 公告滚动 函数封装
function timerUp(obj){
    $(obj).animate({
        marginTop : "-0.6rem"
    },500,function(){
        $(this).css({marginTop : "0"}).find("li:first").appendTo(this);
    })
}

$(function(){
    // 首页调用 公告滚动函数
    setInterval('timerUp(".marquee_adv_content ul")',4000);

    // 添加微信 弹出层显示隐藏
    $('.addWechat').click(function(){
        $('.wechat_popup').fadeIn()
    });
    $('.wechat_close').click(function(){
        $('.wechat_popup').fadeOut()
    });


// 首页搜索框
    $('.input_search').focus(function(){
         window.location.href = "search.html";
    });

});


/*swiper 选项卡函数*/
function tabs(obj,swiperObj) {
    var tabSwiper = new Swiper(swiperObj, {
        speed : 500,
        autoHeight: true, //高度随内容变化
        onSlideChangeStart : function() {
            $(obj).removeClass('active');
            $(obj).eq(tabSwiper.activeIndex).addClass('active');
        }
    });
    $(obj).on('touchstart mousedown', function(e) {
        e.preventDefault();
        $(obj).removeClass('active');
        $(this).addClass('active');
        tabSwiper.slideTo($(this).index());
    });
    $(obj).click(function(e) {
        e.preventDefault();//阻止默认事件
    });
}
// 模拟下拉选框
function selectArea(area,val) {
    $(val).each(function(){
        if( $(this).next("select").find("option:selected").length !== 0 ){
            $(this).text( $(this).next("select").find("option:selected").text() );
        }
    });
    $(area).find('select').change(function(){
        $(this).parent(area).find(val).text( $(this).find("option:selected").text() ).css('color','#393939');
    });
}