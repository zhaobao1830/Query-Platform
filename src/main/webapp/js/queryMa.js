/**
 * Created by Administrator on 2017/1/5.
 */
$(function () {
    $("#import").click(function(){//点击导入按钮，使files触发点击事件，然后完成读取文件的操作。
        $(".popup").removeClass("displayNo").addClass("displayBlock")
    })
    
    $(".a_m").removeClass("aNoClick").addClass("aClick")
         $(".con").removeClass("show").addClass("hide")
         
     maSearch()     
})


 /*给页面绑定一个click事件，点击sendList之外的地方，调用nor_close方法*/
    $(".showMa").on("click",function(event){
        event.stopPropagation();
        var evt = event.srcElement ? event.srcElement : event.target;
        if(evt.id=='showMa'){
        	sm_close()
        }
    });


//导入按钮，用html5的FileReader方法 导入标准名称
function importMa(){
    var selectedFile = document.getElementById("files").files[0];//获取读取的File对象
    var name = selectedFile.name;//读取选中文件的文件名
    var size = selectedFile.size;//读取选中文件的大小
    var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile);//读取文件的内容

    var list=[] //txt文件里面的列表
    var liList=[] //保存txt文件
    var dataJson=[] //把参数拼装成json样子
    reader.onload = function(){
        list=this.result.split("\n")
        for(var i=0;i<list.length;i++){
            dataJson.push({"importer":'admin',"value":""+list[i].trim()+""})
        }

        var dj=JSON.stringify(dataJson) //转换成json
        $.ajax({
            url:ctx+'/add_standard_name',
            type:"post",
            data:dj,
            contentType:"application/json",
            success:function () {
                alert('导入成功')
                maSearch()
            }
        })
    };
    
}
//提示框 确定按钮
function popupSure(){
    $(".popup").removeClass("displayBlock").addClass("displayNo")
    $("#files").click();
}
//提示框 取消按钮
function popupCancel(){
    $(".popup").removeClass("displayBlock").addClass("displayNo")
}

//删除
function deleteAll() {
    var clickList=[], //点击的列表组合
        idLIst="", //id组合
        batchList=[], //批次组合
        batchIdList="" //批次ID租个
    clickList=$(".clickId")
    if(clickList.length>0){
        for(var i=0;i<clickList.length;i++){
        	if(idLIst){
        		idLIst+=","+clickList.eq(i).attr('nid')
        	}else{
        		idLIst+=clickList.eq(i).attr('nid')
        	}
        }
    }
    batchList=$(".batchId")
    if(batchList.length>0){
        for(var i=0;i<batchList.length;i++){
        	if(batchIdList){
       		 batchIdList+=","+batchList.eq(i).attr('bid')
       	}else{
       		 batchIdList+=batchList.eq(i).attr('bid')
       	}
          
        }
    }
    $.ajax({
        url:ctx+"/remove_standard_name",
        type:"post",
        data:{id:idLIst,batch_id:batchIdList},
        success:function (data) {     
        	if(data=="sucess"){
        		 maSearch()
        	}
           
        }
    })
}

//通过条件搜索标准名称
function maSearch() {
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据

    var importer=$(".importPerson").val() //导入人
    var value=$(".maName").val() //名称
    var imp_time_start=$(".createCode_date_start").val() //开始日期
    var imp_time_end=$(".createCode_date_end").val() //结束日期
    var batch_id=0  //批次
    batch_id=Number($(".maBatch").val())
    var source=0 //数据来源
    source=Number($(".source option:selected").val())
    var count="" //总数
    var standard="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:ctx+'/query_standard_name',
        type:"post",
        data:{importer:importer,value:value,imp_time_start:imp_time_start,imp_time_end:imp_time_end,batch_id:batch_id,source:source,start:startValue,limit:limitValue},
        dataType:"json",
        success:function (datas) {
            count=datas.count
            standard=datas.data
            if(standard.length>0){
                for(var i=0;i<standard.length;i++){
                    bzNum=Number(startValue)+i+1
                    tbodyList+="<tr>"
                    tbodyList+="<td><a class='noclickId' href='javascript:;' nid="+standard[i].id+" onclick='clickCodes(this)'><span>"+bzNum+"</span></td>"
                    tbodyList+="<td><a class='noBatchId' href='javascript:;' bid="+standard[i].batch_id+" onclick='clickBatchId(this)'><span>"+standard[i].batch_id+"</span></td>"
                    tbodyList+="<td>"+standard[i].importer+"</td>"
                    tbodyList+="<td>"+timeStamp2String(standard[i].imp_time.$date)+"</td>"
                    tbodyList+="<td>"+standard[i].value+"</td>"
                    //"source"数据来源:0人工导入1数据服务平台
                    tbodyList+="<td>"+(standard[i].source==0?'人工导入':'数据服务平台')+"</td>"
                    tbodyList+="<td><a href='javascript:;' class='showMean' value='"+standard[i].value+"' onclick='showMean(this)'>"+standard[i].mean+"</a></td>"
                }
                $(".man_body").html("")
                $(".man_body").append(tbodyList)

                var pageCount=0 //总页数
                pageCount=count/limitValue
                $('.list_button').pagination({
                    totalData:count,
                    pageCount:pageCount,
                    showData:limitValue,
                    current:1,
                    jump:true,
                    coping:true,
                    count:2,
                    homePage:'首页',
                    endPage:'末页',
                    prevContent:'上页',
                    nextContent:'下页',
                    callback: pageCallback //pageCallback() 为翻页调用次函数。
                });
            }else{
                $(".man_body").html("")
                $(".man_body").append("<p>没有相应数据</p>")
                $(".list_button").html("")
            }
        }
    })
}


//分页回调函数
function pageCallback(api) {
    var limitValue=10 //一次取出多少条数据
    var pageNo=1 //当前页码
    if(api){
        pageNo=api.getCurrent()
    }
    var startValue=(pageNo-1)*limitValue //初始值

    var importer=$(".importPerson").val() //导入人
    var value=$(".maName").val() //名称
    var imp_time_start=$(".createCode_date_start").val() //开始日期
    var imp_time_end=$(".createCode_date_end").val() //结束日期
    var batch_id=$(".maBatch").val() //批次
    var source=$(".source option:selected").val() //数据来源
    var count="" //总数
    var standard="" //保存data信息
    var tbodyList=""
    var bzNum
    $.ajax({
        url:ctx+'/query_standard_name',
        type:"post",
        data:{importer:importer,value:value,imp_time_start:imp_time_start,imp_time_end:imp_time_end,batch_id:batch_id,source:source,start:startValue,limit:limitValue},
        dataType:"json",
        success:function (datas) {
            count=datas.count       
            standard=datas.data
            if(standard.length>0){
                for(var i=0;i<standard.length;i++){
                    bzNum=Number(startValue)+i+1
                    tbodyList+="<tr>"
                    tbodyList+="<td><a class='noclickId' href='javascript:;' nid="+standard[i].id+" onclick='clickCodes(this)'><span>"+bzNum+"</span></td>"
                    tbodyList+="<td><a class='noBatchId' href='javascript:;' bid="+standard[i].batch_id+" onclick='clickBatchId(this)'><span>"+standard[i].batch_id+"</span></td>"
                    tbodyList+="<td>"+standard[i].importer+"</td>"
                    tbodyList+="<td>"+timeStamp2String(standard[i].imp_time.$date)+"</td>"
                    tbodyList+="<td>"+standard[i].value+"</td>"
                    //"source"数据来源:0人工导入1数据服务平台
                    tbodyList+="<td>"+(standard[i].source==0?'人工导入':'数据服务平台')+"</td>"
                    tbodyList+="<td><a href='javascript:;' class='showMean' value='"+standard[i].value+"' onclick='showMean(this)'>"+standard[i].mean+"</a></td>"
                }
                $(".man_body").html("")
                $(".man_body").append(tbodyList)

                var pageCount=0 //总页数
                pageCount=count/limitValue
                $('.list_button').pagination({
                    totalData:count,
                    pageCount:pageCount,
                    showData:limitValue,
                    current:pageNo,
                    jump:true,
                    coping:true,
                    count:2,
                    homePage:'首页',
                    endPage:'末页',
                    prevContent:'上页',
                    nextContent:'下页',
                    callback: pageCallback //pageCallback() 为翻页调用次函数。
                });


            }else{
                $(".man_body").html("")
                $(".man_body").append("<p>没有相应数据</p>")
                $('.list_button').html("")
            }
        }
    })
}


/*点击序号，如果背景是白的，就变成蓝色，如果是蓝色，就变成白色*/
function clickCodes(str){
    if($(str).hasClass("noclickId")){
        $(".noman_body a").removeClass("clickId").addClass("noclickId")
        $(str).removeClass("noclickId").addClass("clickId")
    }else{
        $(str).removeClass("clickId").addClass("noclickId")
    }
}
/*点击批次序号，如果背景是白的，就变成蓝色，如果是蓝色，就变成白色*/
function clickBatchId(str) {
    if($(str).hasClass("noBatchId")){
        $(str).removeClass("noBatchId").addClass("batchId")
    }else{
        $(str).removeClass("batchId").addClass("noBatchId")
    }
}
//显示关联信息
function showMean(str) {
    var ma=$(str).attr('value')
    sm_show()
    nonstandard_name_by_std(ma)
}

//从标准页码请求过来
function nonstandard_name_by_std(str){
    var standard_v=str  //标准名称
    var nonstandard="" //非标准名称
    var nonstandardList=""
    $.ajax({
        url:ctx+"/query_nonstandard_name_by_std",
        type:"post",
        data:{standard_v:standard_v},
        dataType:'json',
        success:function(datas){
            nonstandardList=datas.data
            for(var i=0;i<nonstandardList.length;i++){
                nonstandard+="<li>"+nonstandardList[i].trim()+"</li>"
            }
            $(".smCon ul").html("")
            $(".smCon ul").append(nonstandard)

             

        }
    })
}


//时间格式化
function timeStamp2String(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    return year + "-" + month + "-" + date;
}

//关闭页面
function sm_close(){
	$(".showMa").removeClass("show").addClass("hide")
	$(".smCon ul").html("")
}

/*打开新增页面*/
function sm_show(){
    $(".showMa").removeClass("hide").addClass("show")
    var docuHeight = $(document).height()  //页面可视区域
    $(".showMa").height(docuHeight)

}