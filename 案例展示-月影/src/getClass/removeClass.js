
//removeClass  函数封装
function removeClass(el,oldClass,length) {
    //判断要添加类名的元素是一个还是多个
    if(length>1){
        for (var i = 0; i<length;i++){
            var strClass = "",
                arrClass = [];
            //获取元素的类名，储存在一个字符串
            strClass = el[i].className;
            // 把类名字符串切割为数组
            arrClass = strClass.split(" ");
            //判断数组中是否存在新添加的类名
            for(var k = 0;k<arrClass.length;k++){
                if(arrClass[k]==oldClass){
                    arrClass.splice(k,1)
                }
            }
            //把新的数组转化为字符串
            strClass = arrClass.join(" ")
            // 把新的字符串添加到元素的class属性
            el[i].className = strClass;
        }
    }else{
        strClass = el.className;
        arrClass = strClass.split(" ");
        for(var k = 0;k<arrClass.length;k++){
            if(arrClass[k]==oldClass){
                arrClass.splice(k,1)
            }
        }
        strClass = arrClass.join(" ")
        console.log(strClass);
        el.className = strClass;
    }
}