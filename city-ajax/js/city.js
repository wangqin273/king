/**
 * Created by Administrator on 2017/5/7.
 */
$(function () {
    let citylist =[];
    let letter =[];
    let $li="";
    let $list="";
    let $cityBox = $("#city_box");
    let $selectCity = $("#selectCity");
    let $letter = $("#letter");
    let $showLetter = $("#showLetter");

    $.get("js/city.json", function(citylist){

        for(let i=0,length=citylist.length; i<length;i++){
            letter.push(citylist[i].tit);
            if(i===length-1){
                $list += "<div class='city-list'> <span class='city-letter' id='QT1'>"+citylist[i].tit+"</span>";
            }else {
                $list += "<div class='city-list'> <span class='city-letter' id='"+citylist[i].tit+"1'>"+citylist[i].tit+"</span>";
            }
            for(let j=0,lens=citylist[i].sub.length; j<lens;j++){
                $list += "<p>"+citylist[i].sub[j]+"</p>"
            }
            $list +="</div>"

        }
        $cityBox.append($list);

        for(let k=1,lens=letter.length; k<lens;k++){
            if(letter[k]==="#"){
                $li += "<li><a href='#QT1'>"+letter[k]+"</a></li>"
            }else{
                $li += "<li><a href='#"+letter[k]+"1'>"+letter[k]+"</a></li>"
            }
        }

        $letter.append($li);

    });
/*

    for(let i=0,length=citylist.length; i<length;i++){
        letter.push(citylist[i].tit);
        $list += "<div class='city-list'> <span class='city-letter' id='"+citylist[i].tit+"1'>"+citylist[i].tit+"</span>"
        for(let j=0,lens=citylist[i].sub.length; j<lens;j++){
            $list += "<p>"+citylist[i].sub[j].name+"</p>"
        }
        $list +="</div>"

    }
    $list += "<div class='city-list'> <span class='city-letter' id='QT1'>其他</span><p>其他</p></div>"
    $cityBox.append($list);

    for(let k=1,lens=letter.length; k<lens;k++){
        $li += "<li><a href='#"+letter[k]+"1'>"+letter[k]+"</a></li>"
    }
    $li += "<li><a href='#QT1'>#</a></li>";
    $letter.append($li);

*/


    //选择城市 start
    $(".city").on('click', 'p', function () {
        $selectCity.html($(this).html())

    });
    //点击索引查询城市
    $(".letter").on('click', 'a', function () {
        let s = $(this).html();
        $("html, body").animate({
            /*根据a标签href转换为ID选择器 获取对应位置*/
            scrollTop: $($(this).attr("href")).offset().top-96+"px"
        }, {
            duration: 500,
            easing: "swing"
        });
        $showLetter.find("span").html(s);
        $showLetter.show().delay(500).hide(0);
    });

});