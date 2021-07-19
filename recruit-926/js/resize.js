// JavaScript Document
(function px2rem(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            /*
             * 100 -> html,body {  font-size:100px; }
             * 750 -> 此处以 iPhone6 两倍设计稿 宽度750px 布局页面
             * 根据具体情况改变这两个数值
             */
        };
    if (!doc.addEventListener) return;
    // 窗口大小发生变化，初始化
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
    //防止在html未加载完毕时执行，保证获取正确的页宽
    setTimeout(function(){
        px2rem(doc, win);
    }, 200);
})(document, window);
