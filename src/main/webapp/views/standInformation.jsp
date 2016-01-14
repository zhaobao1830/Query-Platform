<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>最新发布标准信息</title>
  <script type="text/javascript" src="../js/jquery-1.11.3.js"></script>
  <script type="text/javascript" src="../js/standInformation.js"></script>
  <link rel="stylesheet" type="text/css" href="../css/standInformation.css">
</head>
  <body>
  <div class="si">
  <div class="si_title">
  <p>当前位置：</p>
  <p>资质信息查询>></p>
  <p>目录查询</p>
  </div>
  <div class="si_main">
  <div class="si_search">
  <input type="text" value="" class="serInput">
  <input type="button" name="search_si" value="搜索" class="search_si_btn" onclick="search_si_button()">
  </div>
  <div class="si_tableDiv">
  <table class="si_table">
  <thead class="si_thead">
  <tr>
  <td></td>
  <td>标准类型</td>
  <td>标准编号</td>
  <td width="300">标准名称</td>
  <td>代替标准编号</td>
  <td>批准日期</td>
  <td>实施日期</td>
  <td>标准状态</td>
  <td>专业分类</td>
  </tr>
  </thead>
  <tbody class="si_tbody">

  </tbody>
  </table>
  </div>

  <div class="listperAuth_button">

  </div>
  </div>
  </div>
  </body>
</html>
