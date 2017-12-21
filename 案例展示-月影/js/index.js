window.onload = function () {

    (function () {
        var length = 5*5*5;
        var oBox = document.getElementById("box"),
            oList = document.getElementById("list"),
            oUl = oList.getElementsByTagName("ul")[0],
            aLi = oUl.getElementsByTagName("li");

            for(var i = 0; i<length;i++){
                /*创建li*/
                var oLi = document.createElement("li");
                oLi.x = i%5;
                oLi.y = Math.floor( i%25/5 );
                oLi.z = 4- Math.floor( i/25 ) ;
                oLi.index = i;
                var yData = yueData[i] || yueData[0];
                oLi.innerHTML = "<b class='liCover'></b>" +
                    "<p class='liNumber'>"+(i+1)+"</p>" +
                    "<p class='liTitle'>"+yData.type+"</p>" +
                    "<p class='liAuthor'>"+yData.author+"</p>" +
                    "<p class='liTime'>"+yData.time+"</p>";

                oUl.appendChild(oLi);

                /*初始随机摆放li*/
                var sX = Math.random()*6000-3000,
                    sY = Math.random()*6000-3000,
                    sZ = Math.random()*6000-3000;
                oLi.style.transform = "translate3D("+sX+"px,"+sY+"px,"+sZ+"px)";
                 setTimeout(Table , 300);
            }

        //按钮切换布局
        (function(){
            var oBtn = document.getElementById("btn");
            var aBtn = oBtn.getElementsByTagName("li");
            oBtn.style.left= 30 +"px";
            var arr = [Table , Sphere , Helix , Grid];//函数名存入数组
            for (var i = 0 , length = arr.length; i < length; i++) {
                aBtn[i].onclick = arr[i];
            }
        })();

        //Table 元素周期表布局
        function Table() {
            if ( Table.arr ){
                for (var i = 0; i < length; i++) {
                    aLi[i].style.transform = Table.arr[i];
                }
            }else{
                Table.arr = [];
                var n = Math.ceil(length / 18) + 2;
                var midY = n / 2 - 0.5;
                var midX = 18 / 2 - 0.5;
                var disX = 160;
                var disY = 200;
                // 先布局前18个
                var arr = [
                    {x : 0, y : 0},
                    {x : 17, y : 0},
                    {x : 0, y : 1},
                    {x : 1, y : 1},
                    {x : 12, y : 1},
                    {x : 13, y : 1},
                    {x : 14, y : 1},
                    {x : 15, y : 1},
                    {x : 16, y : 1},
                    {x : 17, y : 1},
                    {x : 0, y : 2},
                    {x : 1, y : 2},
                    {x : 12, y : 2},
                    {x : 13, y : 2},
                    {x : 14, y : 2},
                    {x : 15, y : 2},
                    {x : 16, y : 2},
                    {x : 17, y : 2}
                ];

                for (i = 0; i < length; i++) {
                    var x,y;
                    if ( i < 18 ){
                        x = arr[i].x;
                        y = arr[i].y;
                    }else{
                        x = i%18;
                        y = Math.floor(i/18)+2;
                    }
                    var val = "translate3D("+(x-midX)*disX+"px,"+(y-midY)*disY+"px,0px)";
                    Table.arr[i] = val;
                    aLi[i].style.transform = val;
                }
            }

        }

        //Sphere 球状布局
        function Sphere() {
            if ( Sphere.arr ){
                for (var i = 0; i < length; i++) {
                    aLi[i].style.transform = Sphere.arr[i];
                }
            }else{
                Sphere.arr = [];
                var arr = [1,3,7,9,11,14,21,16,12,10,9,7,4,1],
                    arrLength = arr.length,
                    xDeg = 180 / (arrLength-1);
                for (i = 0; i < length; i++) {

                    //求出当前 i 处于arr的第几层 第几个
                    var numC = 0 , numG = 0;
                    var arrSum = 0;
                    for (var j = 0; j < arrLength; j++) {
                        arrSum += arr[j];
                        if ( arrSum > i ){
                            numC = j;
                            numG = arr[j] - (arrSum - i);
                            break;
                        }
                    }
                    var yDeg = 360 / arr[numC];
                    var val = "rotateY("+(numG+1.3)*yDeg+"deg) rotateX("+(90-numC*xDeg)+"deg) translateZ(800px)";
                    Sphere.arr[i] = val;
                    aLi[i].style.transform = val;
                }
            }

        }

        /*网格布局*/
        function Grid() {
            if ( Grid.arr ){
                for (var i = 0; i < length; i++) {
                    aLi[i].style.transform = Grid.arr[i];
                }
            }else{
                Grid.arr = [];
                var disX = 350;//每个li 水平（x）方向的间距
                var disY = 350;//每个li 垂直（y）方向的间距
                var disZ = 800;//每个li 纵深（z）方向的间距xss
                for(var i = 0; i<length;i++){
                    oLi = aLi[i];
                    var x = (oLi.x - 2) * disX,
                        y = (oLi.y - 2) * disY,
                        z = (oLi.z - 2) * disZ;
                    var val = "translate3D("+x+"px,"+y+"px,"+z+"px)";
                    Grid.arr[i] = val;
                    oLi.style.transform = val;
                }
            }
            }

        //Helix 螺旋式布局
        function Helix() {
            if (Helix.arr){
                for (var i = 0; i < length; i++) {
                    aLi[i].style.transform = Helix.arr[i];
                }
            }else{
                Helix.arr = [];
                var h = 3.7,//环数
                    tY = 7,//每个li上下位移相差
                    num = Math.round(length/h),//每环个数
                    deg = 360 / num,//每个li Y旋转相差
                    mid = length/2 - 0.5;//找准中间点
                for (i = 0; i < length; i++) {
                    var val = "rotateY("+i*deg+"deg) translateY("+(i-mid)*tY+"px) translateZ(800px)";
                    Helix.arr[i] = val;
                    aLi[i].style.transform = val;
                }
            }

        }

        //添加 拖拽/滚轮事件
        (function () {
            var roX = 0,
                roY = 0,
                trZ = -2000,
                timerMouse = null;


            // 清除默认选中事件
            document.onselectstart = function () {
                return false;
            };
            // 清除默认拖拽事件
            document.ondrag = function () {
                return false;
            };
            document.onmousedown = function (e) {
                //清除惯性运动
                cancelAnimationFrame( timerMouse );

                var sX = e.clientX,
                    sY = e.clientY,
                    lastX = sX,//存最后一次move的坐标
                    lastY = sY,//存最后一次move的坐标
                    x_ = 0,//用来存最后两次move的距离差
                    y_ = 0,//用来存最后两次move的距离差
                    ifMove = false,//检测up之前是否有move
                    moveTime = 0;//用来解决最后一次move后很久再up还会有惯性的问题


                this.onmousemove = function (e) {
                    ifMove = true;
                    x_ = e.clientX - lastX;
                    y_ = e.clientY - lastY;

                    roX -= y_*0.15;
                    roY += x_*0.15;

                    oUl.style.transform = "translateZ("+trZ+"px) rotateX("+roX+"deg) rotateY("+roY+"deg)";

                    lastX = e.clientX;
                    lastY = e.clientY;

                    moveTime = new Date;
                };
                this.onmouseup = function (e) {

                    this.onmousemove = null;
                    function inertia() {
                        x_ *= 0.9;
                        y_ *= 0.9;
                        roX -= y_*0.15;
                        roY += x_*0.15;
                        oUl.style.transform = "translateZ("+trZ+"px) rotateX("+roX+"deg) rotateY("+roY+"deg)";
                        if ( Math.abs(x_) < 0.1 && Math.abs(y_) < 0.1 )return;
                        timerMouse = requestAnimationFrame(inertia);
                    }
                    if ( new Date - moveTime < 100 ){
                        timerMouse = requestAnimationFrame(inertia);
                    }
                }
            };



            /*滚轮事件 改变Z值*/
            mousewheel( document , function (e,d) {
                trZ += d*100;
                oUl.style.transform = "translateZ("+trZ+"px) rotateX("+roX+"deg) rotateY("+roY+"deg)";
            } );
            function mousewheel(obj , Fn) {
                function eFn(e) {
                    e = e||window.event;
                    if ( Fn.call(this,e,e.wheelDelta/120||-e.detail/3) === false ){
                        e.preventDefault();
                    }
                }
                var eName = document.onmousewheel===null?"mousewheel":"DOMMouseScroll";
                document.addEventListener?obj.addEventListener(eName,eFn,false):obj.attachEvent("onmousewheel",eFn);
            }


        })();


        // 弹窗事件
        (function(){
            var oPopup = document.getElementById("popup"),
                oTitle = oPopup.getElementsByClassName("title")[0],
                oImg = oPopup.getElementsByClassName("img")[0].getElementsByTagName("img")[0],
                oAuthor = oPopup.getElementsByClassName("author")[0],
                oInfo = oPopup.getElementsByClassName("info")[0];
            // 点击li 显示弹窗
            oUl.onclick = function (e) {

                var target = e.target;
                var index = target.parentNode.index;
                var yData = yueData[index] || yueData[0];
                oTitle.innerHTML =  yData.title;
                oImg.src = "src/" + yData.src + "/index.png";
                oAuthor.innerHTML = yData.author;
                oInfo.innerHTML =  yData.info;
                oPopup.index = index;
                oPopup.style.transform = "rotateY(0deg) scale(1)";

                // 案例展示 框架 通过定位显示隐藏
                var showFrame = document.getElementById("showFrame");
                var oFrame = document.getElementById("frame");
                oPopup.onclick =function () {
                    oFrame.src = "src/" + yData.src + "/index.html";
                    showFrame.style.left= 0;
                    oBox.style.marginLeft="-100%";
                    var oBack = document.getElementById("back");
                    oBack.onclick =function () {
                        showFrame.style.left= "100%";
                        oBox.style.marginLeft=0;
                    };

                };
                // 阻止冒泡
                window.event? window.event.cancelBubble = true : e.stopPropagation();
            };
            // 点击li 以外隐藏弹窗
            document.onclick=function () {
                oPopup.style.transform = "rotateY(180deg) scale(0)";

            }

        })();


    })();


};














