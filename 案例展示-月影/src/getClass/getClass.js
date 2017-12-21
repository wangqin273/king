
//  自定义函数getClass获取类名
    function getClass(hasclass) {
        // 获取所有标签
       var tags = document.getElementsByTagName("*"),
           length = tags.length,
        //  自定义一个数组 用来储存 含有hasclass的元素
               els =[];
        for(var i=0;i<length;i++){

            var strClass = '',
                arrClass = [];
            //  获取元素的类名，储存在一个字符串
            strClass = tags[i].className;
            //  把类名字符串以空格为切割符 转化为数组
            arrClass = strClass.split(" ");
            lens = arrClass.length;
            // 遍历数组 查看是否含有类名hasclass 如果有就拥有这个类名的元素添加到一个数组中
            for(var j=0;j< arrClass.length;j++){
                if(hasclass==arrClass[j]){
                    els.push(tags[i])
                }
            }
        }
//     返回这个储存含hasclass的元素的数组
        return els
    }
