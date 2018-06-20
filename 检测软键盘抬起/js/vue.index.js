var vm = new Vue({
    el: ".vueBox",
    data: {
        icon_dollar:'images/icon_dollar.png',
        icon_person:'images/icon_person.png',
        icon_message:'images/icon_message.png',
        mydollar:4662,
        dollarvalue:null,
        redenvelopenum:null,
        message:null,
        wordsnumber:0,
        notenough:false,
        showFooter:1
    },
    created() {

    },
    methods: {
        dollarVal:function(e){
            // if(this.dollarvalue>this.mydollar){
            //     this.dollarvalue=this.mydollar
            // }
        },
        redenvelopeNum:function(e){
            // console.log(this.redenvelopenum);
            if(this.redenvelopenum<3){
                this.redenvelopenum=3
            }else if(this.redenvelopenum>50){
                this.redenvelopenum=50
            }
        },
        messageChange:function(e){
            let megs=this.message;
            // console.log(typeof megs);
            if ( this.wordsnumber>50){
                this.message=megs.substring(0,50);
                this.wordsnumber=50;
            }else {
                this.wordsnumber=megs;

            }
        },
        sendRedenvelope:function () {
            let dollarvalue=this.dollarvalue;
            let mydollar=this.mydollar;
            if(dollarvalue>mydollar){
                this.notenough = true
            }else {
                console.log( this.notenough  );
            }
        },
        cancel:function () {
            this.notenough = false
        },
    }

});


// JavaScript 根据窗口大小变化，解决移动端软键盘抬起 影响固定定位和绝对定位的问题
(function (doc, win) {
    const docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            clientHeight= docEl.clientHeight, /*进入页面时 可视区域高端*/
            recalc = function () {
                let   currentHeight= docEl.clientHeight; /*窗口改变时 可视区域高端*/
                if (clientHeight - currentHeight > 50) { /*比较可视区域的高度变化 */
                    //当软键盘弹出，在这里面操作
                    vm.showFooter=0 // 隐藏固定底部
                } else {
                    //当软键盘收起，在此处操作
                    vm.showFooter=1  // 显示固定底部
                }
        };
    if (!doc.addEventListener) return;
    // 窗口大小发生变化，初始化
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

