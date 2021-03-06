<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <jsp:include page="resource.jsp"/>
    <meta charset="UTF-8">
    <title>标准类型查询</title>
    <script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
    <script type="text/javascript" src="${ctx}/js/jquery-form.js"></script>
    <script type="text/javascript" src="${ctx}/js/queryStandard.js"></script>
    <link rel="stylesheet" type="text/css" href="${ctx}/css/queryStandard.css">
</head>
<body>
<jsp:include page="head_code.jsp"/>
<jsp:include page="loading.jsp"/>
<input type="hidden" class="pageNo" value="">
<div class="sts">
    <div class="sts_title">
        <p>当前位置：</p>
        <p>技术标准查询>></p>
        <p>标准类型查询</p>
        <div class="sts_title_add">
            <p>>></p>
            <a>铁路行业标准</a>
        </div>
    </div>
    <div class="sts_left">
        <div class="left_title_p">
            <div class="title_p">标准类型</div>
        </div>
        <div class="stsLeft_ul">
            <ul>
                <li id="sstandCountryType">国家标准</li>
                <li id="standType">行业标准</li>
                <div id="sts_standType">
                    <a class="colorRed">铁路行业标准</a>
                    <a class="colorHui">电力行业标准</a>
                    <a class="colorHui">冶金行业标准</a>
                </div>
                <li id="standWen">标准型技术文件</li>
                <li id="standGUicheng">铁道计量检定规程</li>
            </ul>
        </div>
    </div>
    <div class="sts_right">
        <div class="sts_right_top">
            <form id="searchForm">
                <div class="proClss">
                    <label>专业分类</label>
                    <div class="proClss_a">
                        <a class="colorWhite">不限</a>
                        <a class="colorBule">工务</a>
                        <a class="colorBule">牵引供电</a>
                        <a class="colorBule">通信信号</a>
                        <a class="colorBule">机车车辆</a>
                        <a class="colorBule">基础与综合</a>
                        <a class="colorBule">运输</a>
                        <a class="colorBule">其他</a>
                    </div>
                </div>
                <div class="fileStatus">
                    <label>文件状态</label>
                    <div class="fileStatus_a">
                        <a class="colorWhite">不限</a>
                        <a class="colorBule">有效</a>
                        <a class="colorBule">作废</a>
                    </div>
                </div>

                <div class="sts_search_number">
                    <label>编号/名称</label>
                    <input type="text" name="search_number" class="search_number"  id="search_number" value="标准编号/标准名称" onfocus="if (value =='标准编号/标准名称'){value ='';this.style.color = '#222222';}" onblur="if (value ==''){value='标准编号/标准名称'; this.style.color = '#dddddd';}else{this.style.color = '#222222';}"  >
                    <a type="reset" id="reset_submit" onclick="resetSubmit()">清除</a>
                    <a class="buttonForm" onclick="formButton()">查询</a>
                </div>
            </form>
        </div>
        <div class="sts_right_bottom">
            <!--<div class="sts_table_title">-->
            <!--找到100条记录-->
            <!--</div>-->
            <div class="sts_table">
                <table class="sts_search_table">
                    <thead class="sts_search_thead">
                    <tr>
                        <td></td>
                        <td width="120">标准编号</td>
                        <td width="250">标准名称</td>
                        <td width="120">代替标准号</td>
                        <td>标准类别</td>
                        <td>专业分类</td>
                        <td>标准状态</td>
                        <td>发布日期</td>
                        <td>实施日期</td>
                        <td>文本</td>
                    </tr>
                    </thead>
                    <tbody class="sts_search_tbody">

                    </tbody>
                </table>
            </div>
        </div>
        <div class="listperAuth_button">

        </div>
    </div>
</div>
<jsp:include page="foot.jsp"/>
</body>
</html>