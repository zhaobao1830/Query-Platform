
// 右侧加载相应的页面
function jumpPage(str) {
    $(".nm-l a").removeClass("aClick").addClass("aNoClick")
    if(str=='n'){
        $(".a_n").removeClass("aNoClick").addClass("aClick")
    }else if(str=='m'){
        $(".a_m").removeClass("aNoClick").addClass("aClick")
    }else if(str=='nm'){
        $(".a_nm").removeClass("aNoClick").addClass("aClick")
    }else{

    }
}