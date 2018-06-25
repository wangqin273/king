$(function () {
    /*上传单张图片 start*/
    $('.img_input_file').change(function () {
        //检验是否为图像文件
        if(/image\/\w+/.test($(this)[0].files[0].type)){
            if($(this)[0].files && $(this)[0].files[0]){
                var reader = new FileReader();
                //将文件以Data URL形式读入页面
                reader.readAsDataURL($(this)[0].files[0]);
                reader.onload=function(e){
                    //载入文件
                    $("#img_preview").attr("src",e.target.result);
                    console.log(e.target.result)
                }
            }
        }else{
            alert("这里需选择图片！");
            return false;
        }
    });
    /*事件冒泡控制父级显示隐藏*/
    $(".img_updata").on("click",function () {
        $(this).hide().siblings().show()
    });
    /*上传单张图片 end*/

});