// JavaScript Document
$(function () {
    var index=0;
    var lens = $('.swiper-slide').length;
    /* 判断  localStorage里是否保存 localIndex变量 ，*/
    if(localStorage.hasOwnProperty("localIndex")){
        index=localStorage.getItem("localIndex"); /* 读取保存在localStorage对象里名为 localIndex 的变量的值 赋值给index */
        localStorage.removeItem("localIndex"); /* 删除 保存在localStorage对象里的变量 localIndex */
    }
    var mySwiper = new Swiper('.swiper-container',{
        speed:400,
        mode : 'vertical',
        resistance:'100%',
        initialSlide: index, // 设定初始化时slide的索引
        loop:true,
        mousewheelControl : true,
        grabCursor: true,
        pagination: '.pagination',
        paginationClickable: true,
        onFirstInit:function(){
            console.log(typeof index );
            /*
            * 1. 此处注意index如果是本地存储的localStorage.getItem("index") 则为字符串类型 需要转为整型 parseInt(index)
            * 2. parseInt(index) 必须对 lens 取模 否则 本地存储过来的index+1会超出页面数
            * */

            var i = (parseInt(index)%lens+1);
            // $('.swiper-slide').eq(i).addClass('ani-slide');
            $('.slide'+i).addClass('ani-slide');
        }
    });

    mySwiper.wrapperTransitionEnd(function () {
        $('.ani-slide').removeClass('ani-slide');
        $('.swiper-slide').eq(mySwiper.activeIndex).addClass('ani-slide')
    },true);
});



