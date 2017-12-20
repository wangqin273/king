 /*参数说明：
        * pupW 弹出层宽度 单位可以是px rem, 百分百
        * pupH 弹出层高度
        * pupText 弹出层提示语 可以加html标签
        * pupClose 关闭按钮
        * pupCloseH 关闭按钮高度 用来定位关闭按钮的位置
        * btnText 按钮文字 （可缺省，不加按钮）
        * */
        function pupopTip(pupW,pupH,pupText,pupClose,pupCloseH,btnText) {
            var popup = $('<div  class="pupopBox" style="display:none;position: fixed;top:0;left: 0;width: 100%;height: 100%;background-color:rgba(0,0,0,0.6); "><div  class="pupopContent" style="position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);display:flex;flex-direction:column;justify-content:center;align-items:center;width:'+pupW+';height: '+pupH+';background-color: #fff;border-radius: 10px;padding: 20px">' +
                '<img class="pupClose" src="'+pupClose+'" style="position: absolute;height:'+pupCloseH+'; top:-'+pupCloseH+';right:0; cursor: pointer " />' +
                '<div style="font-size: 14px;">'+pupText+' </div>' +
                 '</div></div>');
            $("body").append(popup);
            if(btnText){
                $('.pupopContent').append($('<a style="background-color:rgba(0,0,0,0.9);border-radius: 5px;margin-top:20px;padding:5px 20px;color: #fff; text-decoration: none;font-size: 14px; " id="pup_btn" href="javascript:;">'+btnText+'</a>'));

            }
            $('.pupopBox').fadeIn();
            $('body').on('click','.pupClose',function() {
                $('.pupopBox').fadeOut(500,function () {$(this).remove()})
            })
        }