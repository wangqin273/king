var vm = new Vue({
    el:".vueBox",
    data:{
        // apiUrl: 'js/areaTwo.json',
        apiUrl: 'js/areaThree.json',  /* json数据源 */
        area_btn: ['取消','确定'],  /* 按钮 文案 */
        areaShow: false,    /* 控制 选择器显示隐藏 */
        prov_text: '请选择', /* 省份 */
        city_text: '',      /* 城市 */
        dist_text: '',      /* 区县 */
        areaArr: [],        /* 中国区数组 */
        prov_name: [],      /* 省份数组 */
        city_name: [],      /* 城市数组 */
        num:0,              /* 省份 滑动计数 */
        city_num:0,         /* 城市 滑动计数 */
        dist_num:0,         /* 区县 滑动计数 */
        prov_top:0,         /* 省份 滑动定位 */
        city_top:0,         /* 城市 滑动定位 */
        dist_top:0          /* 区县 滑动定位 */
       
    },
    created: function () {
    },
    methods: {
        getArea: function() { /*显示选择器*/
            this.areaShow = true;
            this.$http.get(this.apiUrl).then(function(res){ /*异步获取json数据*/
                this.areaArr= res.data.arrcity;
                for(var i in  this.areaArr){
                    this.prov_name.push(this.areaArr[i]);
                }
                for(var j in  this.prov_name){
                    this.city_name.push(this.prov_name[j].sub);
                }
                if(this.prov_text==="请选择"){
                    this.prov_text=this.prov_name[0].name;
                    this.city_text=this.city_name[0][0].name;
                    if(this.dist_text=this.city_name[0][0].sub){
                        this.dist_text=this.city_name[0][0].sub[0].name;
                    }else {
                        this.dist_text=""
                    }
                }

            }, function(res)  {
                // 响应错误回调
                alert('服务器请求失败');
            });
        },
        sureSelect:function (index) {
            if(index){
                this.areaShow = false;
            }else {
                this.areaShow = false;
            }
        }
    }
});
Vue.directive('drag',function(obj){
    var num = 0,  endTop=0;
    /*单指拖动*/
    obj.addEventListener("touchstart", function(event) {
        event.preventDefault();
        var lens =obj.getElementsByTagName("li").length,
            sY = event.targetTouches[0].pageY,
            top = parseFloat(obj.style.top),
            y = sY/50 - top;
        obj.addEventListener('touchmove', function(event) {
            event.preventDefault();
            // 如果这个元素的位置内只有一个手指的话
            if (event.targetTouches.length ===1) {
                event.preventDefault(); // 阻止浏览器默认事件
                // 把元素放在手指所在的位置
                var moveY = event.targetTouches[0].pageY;
                var endY = moveY/50 - y;
                if(endY>0){
                    endY=0
                }else if(endY<=-(lens-1)*0.6){
                    endY=-(lens-1)*0.6
                }
                // obj.style.top = endY+ 'rem';
                num =  Math.round(endY/0.6);
                endTop = num*0.6;
            }
        }, false);
        obj.addEventListener("touchend",function(){
            if(obj.className==='area_prov'){  /* 滑动省份*/
                vm.num= Math.abs(num);
                vm.prov_text = vm.areaArr[vm.num].name;
                vm.city_text = vm.city_name[vm.num][0].name;
                if(vm.city_name[vm.num][0].sub){
                    vm.dist_text = vm.city_name[vm.num][vm.city_num].sub[0].name;
                }else {
                    vm.dist_text = "";
                }
                vm.prov_top= endTop;
                vm.city_top= 0;
                vm.dist_top= 0;
                vm.city_num= 0;
                vm.dist_num= 0;

            }else if(obj.className==='area_city'){  /* 滑动城市*/
                vm.city_num= Math.abs(num);
                vm.city_text = vm.city_name[vm.num][vm.city_num].name;
                if(vm.city_name[vm.num][vm.city_num].sub){
                    vm.dist_text = vm.city_name[vm.num][vm.city_num].sub[0].name;
                }else {
                    vm.dist_text = "";
                }
                vm.city_top= endTop;
                vm.dist_num= 0;
                vm.dist_top= 0;
            }else {                    /* 滑动区县*/
                vm.dist_top= endTop;
                vm.dist_num= Math.abs(num);
                vm.dist_text = vm.city_name[vm.num][vm.city_num].sub[vm.dist_num].name;
            }
        });

    });
});

