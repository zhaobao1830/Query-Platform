/**
 * Created by zb on 2016/1/15.
 */
$(function(){
	 var staHtml=$(".sts_title_add a").text().trim() //sts_standType a的值
     var str="" //标准编号标准名称
     var standard_status="" //标准状态
     var special_subject="" //专业分类
     var startValue=0 //初始值
     var limitValue=10 //一次取出多少条数据
     $.ajax({
         url:"../queryStandard",
         data:{str:str,standard_group:staHtml,standard_status:standard_status,special_subject:special_subject,start:startValue,limit:limitValue},
         type:"post",
         dataType : 'json',
         success:function(data){
         	var add_a="" //标题要加的东西
         		add_a+="<p>>></p><a>"+staHtml+"</a>"	
         		$(".sts_title_add").html("")
         		$(".sts_title_add").html(add_a)
            var tbodyList="" //保存解析的json数据
            var count=data.count
            var bzxx=data.bzxx
            var bzNum
            for(var i=0;i<bzxx.length;i++){
         	   bzNum=Number(startValue)+i+1
         	   tbodyList+="<tr>"
                tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+bzxx[i].standard_id+"</td>"
                tbodyList+="<td title='"+bzxx[i].standard_name+"'>"+bzxx[i].standard_name+"</td>"
                tbodyList+="<td>"+bzxx[i].replace_id+"</td>"
                tbodyList+="<td>"+bzxx[i].standard_group+"</td>"
                tbodyList+="<td>"+bzxx[i].special_subject+"</td>"
                tbodyList+="<td>"+bzxx[i].standard_status+"</td>"
                tbodyList+="<td>"+timeStamp2String(bzxx[i].publish_date.$date)+"</td>"
                tbodyList+="<td>"+timeStamp2String(bzxx[i].execute_date.$date)+"</td>"
                tbodyList+="</tr>"
            }
            $(".sts_search_tbody").html(" ")
            $(".sts_search_tbody").append(tbodyList)

             var asButton=""
             var countPages=Math.ceil(count/limitValue)
             var PageNo  //当前页码
             if(startValue==0){
                 PageNo=1
             }
             $(".pageNo").val(PageNo)
             var nextStartRow//下一页开始显示的编号
             asButton+="<a><img src='../images/sts_4.png'></a>"
             asButton+="<p>"+PageNo+"/"+countPages+"</p>"
             if(countPages>1){
                 nextStartRow=PageNo*limitValue
                 asButton+="<a class=clickCursor onclick=goPage('"+str+"','"+staHtml+"','"+standard_status+"','"+special_subject+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
             }else{
                 asButton+="<a><img src='../images/sts_5.png'></a>"
             }
             $(".listperAuth_button").html(" ")
             $(".listperAuth_button").append(asButton)
         },
         error:function(){
             alert("链接失败")
         }
     })
    $("#sts_standType a").on("click",function(){
        $(this).siblings().removeClass("colorRed").addClass("colorHui")
        $(this).removeClass("colorHui").addClass("colorRed")
        var staHtml //sts_standType a的值
        staHtml=$(this).html()
        var str="" //标准编号标准名称
        var standard_status="" //标准状态
        var special_subject="" //专业分类
        var startValue=0 //初始值
        var limitValue=10 //一次取出多少条数据
        $.ajax({
            url:"../queryStandard",
            data:{str:str,standard_group:staHtml,standard_status:standard_status,special_subject:special_subject,start:startValue,limit:limitValue},
            type:"post",
            dataType : 'json',
            success:function(data){
            	var add_a="" //标题要加的东西
            		add_a+="<p>>></p><a>"+staHtml+"</a>"	
            		$(".sts_title_add").html("")
            		$(".sts_title_add").html(add_a)
               var tbodyList="" //保存解析的json数据
               var count=data.count
               var bzxx=data.bzxx
               var bzNum
               for(var i=0;i<bzxx.length;i++){
            	   bzNum=Number(startValue)+i+1
            	   tbodyList+="<tr>"
                   tbodyList+="<td>"+bzNum+"</td>"
                   tbodyList+="<td>"+bzxx[i].standard_id+"</td>"
                   tbodyList+="<td title='"+bzxx[i].standard_name+"'>"+bzxx[i].standard_name+"</td>"
                   tbodyList+="<td>"+bzxx[i].replace_id+"</td>"
                   tbodyList+="<td>"+bzxx[i].standard_group+"</td>"
                   tbodyList+="<td>"+bzxx[i].special_subject+"</td>"
                   tbodyList+="<td>"+bzxx[i].standard_status+"</td>"
                   tbodyList+="<td>"+timeStamp2String(bzxx[i].publish_date.$date)+"</td>"
                   tbodyList+="<td>"+timeStamp2String(bzxx[i].execute_date.$date)+"</td>"
                   tbodyList+="</tr>"
               }
               $(".sts_search_tbody").html(" ")
               $(".sts_search_tbody").append(tbodyList)

                var asButton=""
                var countPages=Math.ceil(count/limitValue)
                var PageNo  //当前页码
                if(startValue==0){
                    PageNo=1
                }
                $(".pageNo").val(PageNo)
                var nextStartRow//下一页开始显示的编号
                asButton+="<a><img src='../images/sts_4.png'></a>"
                asButton+="<p>"+PageNo+"/"+countPages+"</p>"
                if(countPages>1){
                    nextStartRow=PageNo*limitValue
                    asButton+="<a class=clickCursor onclick=goPage('"+str+"','"+staHtml+"','"+standard_status+"','"+special_subject+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
                }else{
                    asButton+="<a><img src='../images/sts_5.png'></a>"
                }
                $(".listperAuth_button").html(" ")
                $(".listperAuth_button").append(asButton)
            },
            error:function(){
                alert("链接失败")
            }
        })
    })


    /*fileStatus_a里面的a的方法*/
    $(".fileStatus_a a").on("click",function(){
        $(".fileStatus_a a").removeClass("colorWhite").addClass("colorBule")
        $(this).removeClass("colorBule").addClass("colorWhite")
    })

    /*proClss_a里面的a的方法*/
    $(".proClss_a a").on("click",function(){
        $(".proClss_a a").removeClass("colorWhite").addClass("colorBule")
        $(this).removeClass("colorBule").addClass("colorWhite")
    })
})


//时间格式化
function timeStamp2String(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return year + "-" + month + "-" + date;
}

/*
* 异步提交表单
* */
function formButton(){
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    var standard_group="" //standard_group 行业分类
    var str //标准编号标准名称
    if($(".search_number").val()=="标准编号/标准名称"){
    	str=""
    }else{
    	str=$(".search_number").val()
    }
    var special_subject="" //专业分类
    $(".proClss_a a").each(function(){
    	if($(this).hasClass("colorWhite")){
    		special_subject=$(this).text().trim()
    		if(special_subject=="不限"){
    			special_subject=""
    		}
    	}
    })
    var standard_status="" //标准状态
    $(".fileStatus_a a").each(function(){
    	if($(this).hasClass("colorWhite")){
    		standard_status=$(this).text().trim()
    		if(standard_status=="不限"){
    			standard_status=""
    		}
    	}
    })
     $("#searchForm").ajaxSubmit({
         url:"../queryStandard",
         data:{str:str,standard_group:standard_group,standard_status:standard_status,special_subject:special_subject,start:startValue,limit:limitValue},
         type:"post",
         dataType : 'json',
         success:function(data){
             var tbodyList="" //保存解析的json数据
             var count=data.count
             var bzxx=data.bzxx
             var bzNum
             for(var i=0;i<bzxx.length;i++){
            	 bzNum=Number(startValue)+i+1
            	 tbodyList+="<tr>"
                 tbodyList+="<td>"+bzNum+"</td>"
                 tbodyList+="<td>"+bzxx[i].standard_id+"</td>"
                 tbodyList+="<td title='"+bzxx[i].standard_name+"'>"+bzxx[i].standard_name+"</td>"
                 tbodyList+="<td>"+bzxx[i].replace_id+"</td>"
                 tbodyList+="<td>"+bzxx[i].standard_group+"</td>"
                 tbodyList+="<td>"+bzxx[i].special_subject+"</td>"
                 tbodyList+="<td>"+bzxx[i].standard_status+"</td>"
                 tbodyList+="<td>"+timeStamp2String(bzxx[i].publish_date.$date)+"</td>"
                 tbodyList+="<td>"+timeStamp2String(bzxx[i].execute_date.$date)+"</td>"
                 tbodyList+="</tr>"
             }
             $(".sts_search_tbody").html(" ")
             $(".sts_search_tbody").append(tbodyList)

             var asButton=""
             var countPages=Math.ceil(count/limitValue)
             var PageNo  //当前页码
             if(startValue==0){
                 PageNo=1
             }
             $(".pageNo").val(PageNo)
             var nextStartRow//下一页开始显示的编号
             asButton+="<a><img src='../images/sts_4.png'></a>"
             asButton+="<p>"+PageNo+"/"+countPages+"</p>"
             if(countPages>1){
                 nextStartRow=PageNo*limitValue
                 asButton+="<a class=clickCursor onclick=goPage('"+str+"','"+standard_group+"','"+standard_status+"','"+special_subject+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
             }else{
                 asButton+="<a><img src='../images/sts_5.png'></a>"
             }
             $(".listperAuth_button").html(" ")
             $(".listperAuth_button").append(asButton)
         },
         error:function(){
             alert("链接失败")
         }
     })
}

//页码跳转
function goPage(str,standard_group,standard_status,special_subject,start,limitValue,isGo){
    $.ajax({
        url:"../queryStandard",
        data:{str:str,standard_group:standard_group,standard_status:standard_status,special_subject:special_subject,start:start,limit:limitValue},
        type : 'post',
        dataType : 'json',
        success:function(data){
            var tbodyList="" //保存解析的json数据
            var count=data.count
            var bzxx=data.bzxx
            var bzNum
            for(var i=0;i<bzxx.length;i++){
            	 bzNum=Number(start)+i+1
            	 tbodyList+="<tr>"
                 tbodyList+="<td>"+bzNum+"</td>"
                tbodyList+="<td>"+bzxx[i].standard_id+"</td>"
                tbodyList+="<td title='"+bzxx[i].standard_name+"'>"+bzxx[i].standard_name+"</td>"
                tbodyList+="<td>"+bzxx[i].replace_id+"</td>"
                tbodyList+="<td>"+bzxx[i].standard_group+"</td>"
                tbodyList+="<td>"+bzxx[i].special_subject+"</td>"
                tbodyList+="<td>"+bzxx[i].standard_status+"</td>"
                tbodyList+="<td>"+timeStamp2String(bzxx[i].publish_date.$date)+"</td>"
                tbodyList+="<td>"+timeStamp2String(bzxx[i].execute_date.$date)+"</td>"
                tbodyList+="</tr>"
            }
            $(".sts_search_tbody").html(" ")
            $(".sts_search_tbody").append(tbodyList)

            var asButton=""
            var pageNo=$(".pageNo").val()  //当前页码
            var countPages=Math.ceil(count/limitValue)
            var noPage
            if(isGo=="next"){
                noPage=Number($(".pageNo").val())+1
                if(noPage>countPages){
                    pageNo=countPages
                }else{
                    pageNo=noPage
                }
            }
            if(isGo=="pre"){
                noPage=Number($(".pageNo").val())-1
                if(noPage==0){
                    noPage=1
                }
                pageNo=noPage
            }
            $(".pageNo").val(pageNo)
            var preStartRow //上一页开始显示的编号
            var nextStartRow//下一页开始显示的编号
            if(pageNo>1){
                preStartRow=(pageNo-2)*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+str+"','"+standard_group+"','"+standard_status+"','"+special_subject+"','"+preStartRow+"','"+limitValue+"','pre')><img src='../images/sts_4.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_4.png'></a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+str+"','"+standard_group+"','"+standard_status+"','"+special_subject+"','"+nextStartRow+"','"+limitValue+"','next')><img src='../images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='../images/sts_5.png'></a>"
            }
            $(".listperAuth_button").html(" ")
            $(".listperAuth_button").append(asButton)
        }
    })
}

