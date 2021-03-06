/**
 * Created by zb on 2016/1/6.
 */
//保存提交表单后返回的json数据
var demoJson=""
//列表JSON
var list_json="";
$(function(){
    /*改变头部的css*/
    $(".guanliUl").removeClass("displayBlock").addClass("displayNo")
    $(".codeUl").removeClass("displayNo").addClass("displayBlock")

    /*修改头部的css*/
    $(".nav li a").removeClass("colorClickLi").addClass("colorNoClick")
    $(".seniorSearchSpan").removeClass("colorNoClick").addClass("colorClickLi")
    /*添加loading页面*/
    var c = $(window).width();
    var e = $(window).height();
    var d = $(".fl").outerWidth();
    var f = $(".fl").outerHeight();
    $(".loadingImg").css({
        position: "absolute",
        left: (c / 2) - (d / 2),
        top: (e / 2) - (f / 2)
    })

    /*调用左边的方法*/
    searchCatalogList()


    /*
     给itemShowList里面的a元素添加click事件
     点击的时候，遍历itemShow下的div,判断class_num值，如果有class_num值大于点击的div，就将其移除
     判断有没有childs,有的话就创建相应的div,添加class
     调用itemShowList()方法
     */
    $(".itemShowList").on("click","a",function() {
        var first_word=""
        if($(this).hasClass("clas")) {
            $(".itemShow a").removeClass("colorClickLi").addClass("colorNoClick")
            $(".itemShow a img").attr("src", ""+ctx+"/images/as_2.png")
            $(this).removeClass("colorNoClick").addClass("colorClickLi")
            $(this).find("img").attr("src", ""+ctx+"/images/as_3.png")
            first_word=$(this).attr("first_word")
            $(".titleNum_"+first_word).removeClass("colorNoClick").addClass("colorClickLi")
        }

        var list_num = $(this).attr("num");
        var itemShowList_data=list_json.childs[list_num].childs;
        var num=1;

        for(var i = $(".itemShow .showItem").length;i > 0 ;i-- ){
            if($(".itemShow .showItem").eq(i).attr("class_num") > $(this).parent().parent().attr("class_num") ){
                $(".itemShow .showItem").eq(i).remove();
            }
        };
        if(itemShowList_data){
        	 $(".itemShow").append("<div class='itemShowList"+num+" showItem'></div>");
             $(".itemShowList"+num).append("<div class='mulluShow"+num+" mulluShowSh' name='mulluShowSh'></div>")
             $(".itemShowList"+num).append("<div id='scrollShow"+num+"' class='scrollShow'><div id='scrollSh"+num+"' class='scrollSh'></div></div>");
             $(".itemShowList" + num).attr("class_num", 1);
//            itemShowList($(".itemShowList"+num),itemShowList_data);
             itemShowList($(".mulluShow" + num), itemShowList_data);
             mousewheel_fn("itemShowList" + num,"mulluShow" + num,"scrollShow"+num,"scrollSh"+num)
        }
    });

    /*给body绑定一个click事件，点击itemShow之外的地方，调用closeItemShow方法 */
    $("body").click(function(event){
        var evt = event.srcElement ? event.srcElement : event.target;
        if(evt.getAttribute("name")!="mulluShowSh"&&evt.id!="itemShow"&&evt.tagName!="LI"&&evt.className!="clas"&&evt.tagName!="A"&&evt.tagName!="P"&&evt.tagName!="IMG"){
            closeItemShow()
        }
    });

})

//搜索表单提交
function search_a_button(){
    closeItemShow()
    $(".as_tbody").html("")
    $(".listperAuth_button").html("")
    var str=$(".serAInput").val() //搜索框里的值
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    $.ajax({
            url: ctx+'/queryCert',
            data:{str:str,start:startValue,limit:limitValue},
            type : 'post',
            dataType : 'json',
            beforeSend:function(){
                $(".loading_Img").css("display", "block")
            },
            complete:function(){
                $(".loading_Img").css("display", "none")
            },
            success:function(data){
                var trList=""
                demoJson=eval(data)
                var count=demoJson.count
                $("#as_num").text(count)
                var bzxx=demoJson.bzxx
                var bzNum
                for(var i=0;i<bzxx.length;i++){
                    bzNum=startValue+i+1
                    trList+="<tr>"
                    trList+="<td>"+bzNum+"</td>"
                    trList+="<td title="+bzxx[i].cert_status+">"+bzxx[i].cert_status+"</td>"
                    trList+="<td title="+bzxx[i].cert_unit+">"+bzxx[i].cert_unit+"</td>"
                    trList+="<td title="+bzxx[i].company_name+">"+bzxx[i].company_name+"</td>"
                    trList+="<td title="+bzxx[i].product_range+">"+bzxx[i].product_range+"</td>"
                    trList+="<td title="+bzxx[i].cert_num+">"+bzxx[i].cert_num+"</td>"
                    trList+="<td title="+bzxx[i].issue_organization+">"+bzxx[i].issue_organization+"</td>"
                    trList+="<td title="+bzxx[i].cert_standards+">"+bzxx[i].cert_standards+"</td>"
                    trList+="<td title="+timeStamp2String(bzxx[i].publish_date.$date)+">"+timeStamp2String(bzxx[i].publish_date.$date)+"</td>"
                    trList+="<td title="+timeStamp2String(bzxx[i].valid_date.$date)+">"+timeStamp2String(bzxx[i].valid_date.$date)+"</td>"
                    trList+="<td><a id=asdt_"+bzxx[i]._id.$oid+" class='as_details colorHui' onclick=as_details('"+bzxx[i]._id.$oid+"')>详情</a></td>"
                    trList+="</tr>"
                }
                $(".as_tbody").append(trList)

                //分页
                var asButton=""
                var countPages=Math.ceil(count/limitValue)
                var pageNo=0  //当前页码
                if(startValue==0){
                    pageNo=1
                }
                $(".pageNo").val(pageNo)
                var nextStartRow//下一页开始显示的编号
                asButton+="<a><img src='"+ctx+"/images/sts_4.png'></a>"
                asButton+="<p>"+pageNo+"/"+countPages+"</p>"
                if(countPages>1){
                    nextStartRow=pageNo*limitValue
                    asButton+="<a class=clickCursor onclick=goPage('"+str+"','"+nextStartRow+"','"+limitValue+"','next')><img src='"+ctx+"/images/sts_5.png'></a>"
                }else{
                    asButton+="<a><img src='"+ctx+"/images/sts_5.png'></a>"
                }
                $(".listperAuth_button").append(asButton)
            }
        }
    )
}

//目录提交
function itemShowButton(str){
    closeItemShow()
    var startValue=0 //初始值
    var limitValue=10 //一次取出多少条数据
    $.ajax({
            url: ctx+'/queryCert',
            data:{str:str,start:startValue,limit:limitValue},
            type : 'post',
            dataType : 'json',
            beforeSend:function(){
                $(".loading_Img").css("display", "block")
            },
            complete:function(){
                $(".loading_Img").css("display", "none")
            },
            success:function(bzxx){
                $(".as_tbody").html("")
                $(".listperAuth_button").html("")
                var trList=""
                demoJson=eval(bzxx)
                var count=demoJson.count
                $("#as_num").text(count)
                var bzxx=demoJson.bzxx
                for(var i=0;i<bzxx.length;i++){
                	bzNum=startValue+i+1
            	     trList+="<tr>"
                     trList+="<td>"+bzNum+"</td>"
                     trList+="<td title="+bzxx[i].cert_status+">"+bzxx[i].cert_status+"</td>"
                     trList+="<td title="+bzxx[i].cert_unit+">"+bzxx[i].cert_unit+"</td>"
                     trList+="<td title="+bzxx[i].company_name+">"+bzxx[i].company_name+"</td>"
                     trList+="<td title="+bzxx[i].product_range+">"+bzxx[i].product_range+"</td>"
                     trList+="<td title="+bzxx[i].cert_num+">"+bzxx[i].cert_num+"</td>"
                     trList+="<td title="+bzxx[i].issue_organization+">"+bzxx[i].issue_organization+"</td>"
                     trList+="<td title="+bzxx[i].cert_standards+">"+bzxx[i].cert_standards+"</td>"
                     trList+="<td title="+timeStamp2String(bzxx[i].publish_date.$date)+">"+timeStamp2String(bzxx[i].publish_date.$date)+"</td>"
                     trList+="<td title="+timeStamp2String(bzxx[i].valid_date.$date)+">"+timeStamp2String(bzxx[i].valid_date.$date)+"</td>"
                     trList+="<td><a id=asdt_"+bzxx[i]._id.$oid+" class='as_details colorHui' onclick=as_details('"+bzxx[i]._id.$oid+"')>详情</a></td>"
                     trList+="</tr>"
                }
                $(".as_tbody").append(trList)
                //分页
                var asButton=""
                var countPages=Math.ceil(count/limitValue)
                var pageNo=0  //当前页码
                if(startValue==0){
                    pageNo=1
                }
                $(".pageNo").val(pageNo)
                var nextStartRow//下一页开始显示的编号
                asButton+="<a><img src='"+ctx+"/images/sts_4.png'></a>"
                asButton+="<p>"+pageNo+"/"+countPages+"</p>"
                if(countPages>1){
                    nextStartRow=pageNo*limitValue
                    asButton+="<a class=clickCursor onclick=goPage('"+str+"','"+nextStartRow+"','"+limitValue+"','next')><img src='"+ctx+"/images/sts_5.png'></a>"
                }else{
                    asButton+="<a><img src='"+ctx+"/images/sts_5.png'></a>"
                }
                $(".listperAuth_button").append(asButton)
            }
        }
    )
}

//证书详情
function as_details(str){
    $(".productInformation").removeClass("displayNo").addClass("displayBlock")
    $("#asdt_"+str).removeClass("colorHui").addClass("colorRed")
    $(".product_infor_show1 ul li").removeClass("displayBlock").addClass("displayNo")
    $("#"+str).removeClass("displayNo").addClass("displayBlock")
    $(".pis_content_ul li").removeClass("displayBlock").addClass("displayNo")
    $("."+str).removeClass("displayNo").addClass("displayBlock")

    var bzxx=demoJson.bzxx
    //显示详情页
    var pis=""
    pis+="<ul>"
    for(var i=0;i<bzxx.length;i++){
        if(bzxx[i]._id.$oid==str){
            pis+="<li>"
            pis+="<p>企业名称：</p><div>"+bzxx[i].company_name+"</div>"
            pis+="<p>证书编号：</p><div>"+bzxx[i].cert_num+"</div>"
            pis+="<p>颁发单位：</p><div>"+bzxx[i].issue_organization+"</div>"
            pis+="<p>产品类别：</p><div>"+bzxx[i].product_kind+"</div>"
            pis+="<p>认证规则名称：</p><div>"+bzxx[i].cert_name+"</div>"
            pis+="<p>认证单元：</p><div>"+bzxx[i].cert_unit+"</div>"
            pis+="<p>认证标准和技术要求：</p><div>"+bzxx[i].cert_standards+"</div>"
            pis+="<p>注册地址：</p><div>"+bzxx[i].reg_addr+"</div>"
            pis+="<p>制造地址：</p><div>"+bzxx[i].product_addr+"</div>"
            pis+="<p>证书变更情况：</p><div>"+bzxx[i].cert_condition+"</div>"
            pis+="<p>发证日期：</p><div>"+timeStamp2String(bzxx[i].publish_date.$date)+"</div>"
            pis+="<p>有效期：</p><div>"+timeStamp2String(bzxx[i].valid_date.$date)+"</div>"
            pis+="<p>公告号：</p><div>"+bzxx[i].notification_number+"</div>"
            pis+="<p>证书状态：</p><div>"+bzxx[i].cert_status+"</div>"
            pis+="</li>"

            var pisContent=""
            var cert_detail=bzxx[i].cert_detail
            for(var j=0;j<cert_detail.length;j++){
                pisContent+="<tr>"
                pisContent+="<td>"+cert_detail[j].product_code+"</td>"
                pisContent+="<td id='xinghao'>"+cert_detail[j].specification+"</td>"
                pisContent+="<td id='zhuangtai'>"+cert_detail[j].specification_status+"</td>"
                pisContent+="</tr>"
            }
            $(".show2_tbody").html("")
            $(".show2_tbody").append(pisContent)
        }
    }
    pis+="</ul>"
    $(".product_infor_show1").append(pis)

    var docuHeight=$(document).height()  //页面可视区域
    var prShHeight=$(".product_show_infor").height()
    if(prShHeight<docuHeight){
        $(".productInformation").height(docuHeight)
    }

    /*给详情页绑定一个click事件，点击productInformation之外的地方，调用pis_close方法*/
    $(".productInformation").on("click",function(event){
        event.stopPropagation();
        var evt = event.srcElement ? event.srcElement : event.target;
        if(evt.id=='productInformation'){
            pis_close()
        }
    });
}

//关闭证书详情页
function pis_close(){
    $(".productInformation").removeClass("displayBlock").addClass("displayNo")
    $(".as_details").removeClass("colorRed").addClass("colorHui")
}

//页码跳转
function goPage(str,start,limit,isGo){
    $(".as_tbody").html("")
    $(".listperAuth_button").html("")
    $.ajax({
        url: ctx+'/queryCert',
        data:{str:str,start:start,limit:limit},
        type : 'post',
        dataType : 'json',
        beforeSend:function(){
            $(".loading_Img").css("display", "block")
        },
        complete:function(){
            $(".loading_Img").css("display", "none")
        },
        success:function(data){
            var trList=""
            demoJson=eval(data)
            var count=demoJson.count
            $("#as_num").text(count)
            var bzxx=demoJson.bzxx
            var bzNum=""
            for(var i=0;i<bzxx.length;i++){
                bzNum=Number(start)+i+1
                trList+="<tr>"
                trList+="<td>"+bzNum+"</td>"
                trList+="<td title="+bzxx[i].cert_status+">"+bzxx[i].cert_status+"</td>"
                trList+="<td title="+bzxx[i].cert_unit+">"+bzxx[i].cert_unit+"</td>"
                trList+="<td title="+bzxx[i].company_name+">"+bzxx[i].company_name+"</td>"
                trList+="<td title="+bzxx[i].product_range+">"+bzxx[i].product_range+"</td>"
                trList+="<td title="+bzxx[i].cert_num+">"+bzxx[i].cert_num+"</td>"
                trList+="<td title="+bzxx[i].issue_organization+">"+bzxx[i].issue_organization+"</td>"
                trList+="<td title="+bzxx[i].cert_standards+">"+bzxx[i].cert_standards+"</td>"
                trList+="<td title="+timeStamp2String(bzxx[i].publish_date.$date)+">"+timeStamp2String(bzxx[i].publish_date.$date)+"</td>"
                trList+="<td title="+timeStamp2String(bzxx[i].valid_date.$date)+">"+timeStamp2String(bzxx[i].valid_date.$date)+"</td>"
                trList+="<td><a id=asdt_"+bzxx[i]._id.$oid+" class='as_details colorHui' onclick=as_details('"+bzxx[i]._id.$oid+"')>详情</a></td>"
                trList+="</tr>"
            }
            $(".as_tbody").append(trList)


            var asButton=""
            var pageNo  //当前页码
            var noPage
            var limitValue=10
            var countPages=Math.ceil(count/limitValue)
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
                asButton+="<a class=clickCursor onclick=goPage('"+str+"','"+preStartRow+"','"+limitValue+"','pre')><img src='"+ctx+"/images/sts_4.png'></a>"
            }else{
                asButton+="<a><img src='"+ctx+"/images/sts_4.png'></a>"
            }
            asButton+="<p>"+pageNo+"/"+countPages+"</p>"
            if(countPages>pageNo){
                nextStartRow=pageNo*limitValue
                asButton+="<a class=clickCursor onclick=goPage('"+str+"','"+nextStartRow+"','"+limitValue+"','next')><img src='"+ctx+"/images/sts_5.png'></a>"
            }else{
                asButton+="<a><img src='"+ctx+"/images/sts_5.png'></a>"
            }
            $(".listperAuth_button").append(asButton)
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

//查找目录列表
function searchCatalogList(){
    var first_word = "";
    $.ajax({
        url:ctx+"/queryCertMenu_tz",
        data:"",
        type:"post",
        async:false,
        dataType : 'json',
        success:function(str){
            $(".itemShow").removeClass("displayNo").addClass("displayBlock")
            list_json=str;
            $(".mulluShow").html("")
            for(var i = 0 ; i < str.childs.length ; i++){
                if(str.childs[i].name_title){
                    first_word = str.childs[i].name_title;
                    $(".mulluShow").append("<a href='javaScript:;' class='claCapital colorNoClick titleNum_mulluShow_"+first_word+"'  num='"+i+"'>"+str.childs[i].name_title+"</a>")
                }else{
                    $(".mulluShow").append("<a href='javaScript:;' class='clas colorNoClick' num='"+i+"' first_word = 'mulluShow_"+first_word+"'><p>"+str.childs[i].name+"</p><img src='"+ctx+"/images/as_2.png'></a>")
                }
            }
            mousewheel_fn('itemShowList','mulluShow','scrollShow','scrollSh')
            //获取页面可视区域，然后确定showItem的高度
            var sihHeight=$("#itemShow").height()
            $(".as").height(sihHeight+91)
        },
        error:function(){
            alert("链接错误！");
        }
    });

}

function itemShowList(append_dom,data){
    var first_word = "";
    var append_dom_id=""
    var thisText //当前点击对象的text值
    if (data) {
        append_dom.html("");
        for (var i = 0; i < data.length; i++) {
            if(data[i].name_title){
                first_word = data[i].name_title;
                append_dom.append("<a href='javaScript:;' class='claCapital colorNoClick titleNum_"+append_dom_id+"_"+first_word+"'  num='"+i+"'>"+data[i].name_title+"</a>");
            }else{
                append_dom.append("<a href='javaScript:;' class='clas colorNoClick' num='"+i+"' first_word = '"+append_dom_id+"_"+first_word+"'><p>"+data[i].name+"</p><img src='"+ctx+"/images/as_2.png'></a>")
            }
        };
        append_dom.on("click","a",function() {
            var first_word=""
            if($(this).hasClass("clas")){
                $(this).parent().find("a").removeClass("colorClickLi").addClass("colorNoClick")
                $(this).parent().find("a").find("img").attr("src",""+ctx+"/images/as_2.png")
                $(this).removeClass("colorNoClick").addClass("colorClickLi")
                $(this).find("img").attr("src",""+ctx+"/images/as_3.png")
                first_word=$(this).attr("first_word")
                $(".titleNum_"+first_word).removeClass("colorNoClick").addClass("colorClickLi")
            }

            list_n = $(this).attr("num");
            var itemShowList_data=data[list_n].childs;
            class_num = parseInt(append_dom.parent().attr("class_num")) + 1 ;           
            for(var i = $(".itemShow .showItem").length;i > 0 ;i-- ){
                if($(".itemShow .showItem").eq(i).attr("class_num") > $(this).parent().parent().attr("class_num") ){
                    $(".itemShow .showItem").eq(i).remove();
                }
            };
            if(itemShowList_data){
                $(".itemShow").append("<div class='itemShowList"+class_num+" showItem'></div>");
                $(".itemShowList"+class_num).append("<div class='mulluShow"+class_num+" mulluShowSh' name='mulluShowSh'></div>")
                $(".itemShowList"+class_num).append("<div id='scrollShow"+class_num+"' class='scrollShow'><div id='scrollSh"+class_num+"' class='scrollSh'></div></div>");
                $(".itemShowList" + class_num).attr("class_num", class_num);
                itemShowList($(".mulluShow" + class_num), itemShowList_data);
                mousewheel_fn("itemShowList" + class_num,"mulluShow" + class_num,"scrollShow"+class_num,"scrollSh"+class_num)
            }else{
                if($(this).hasClass('clas')){
                	thisText=$(this).find("p").html()
                    itemShowButton(thisText)
                }
            };
        });

    }
}

//关闭页面
function closeItemShow(){
    $(".itemShow").removeClass("displayBlock").addClass("displayNo");
    for(var i = $(".itemShow .showItem").length;i >=0 ;i-- ){
        if($(".itemShow .showItem").eq(i).attr("class_num") == 0 ){
            $(".itemShow .showItem").eq(i).html("");
            $(".itemShowList").append("<div class='mulluShow' name='mulluShowSh'></div><div id='scrollShow' class='scrollShow'><div id='scrollSh' class='scrollSh'></div></div>")
             $(".jq_message_content").height(526)        
        }
        else{
            $(".itemShow .showItem").eq(i).remove();
        }
    }
}
