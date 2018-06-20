
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

