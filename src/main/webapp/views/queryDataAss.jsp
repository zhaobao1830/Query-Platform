<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
   <jsp:include page="resource.jsp"/>
   <title>数据关联界面</title>
   <link rel="stylesheet" href="${ctx}/css/queryDataAss.css">
</head>
<body>
<div class="container">
  <div class="da-l">
    <a href="javascript:;" class="a_n aNoClick"  onclick="jumpPage('n')">非物资管理界面</a>
    <a href="javascript:;" class="a_m aNoClick" onclick="jumpPage('m')">物资管理界面</a>
    <a href="javascript:;" class="a_nm aClick" onclick="jumpPage('nm')">数据关联界面</a>
  </div>
  <div class="da-r">
    <div class="da_search">
      <span>标准名称</span>
      <input type="text" class="standard_v" value="">
      <span>非标准名称</span>
      <input type="text" class="nonstandard_v" value="">
      <span>关联方式</span>
      <input type="radio" name="assoic" value="0" checked>手动
      <input type="radio" name="assoic" value="1">自动
      <span>准确性</span>
      <input type="text" class="check" value="">
      <span>关联人</span>
      <input type="text" class="operator" value="">
      <a href="javascript:;" type="button" class="daSearch" onclick="daSearch()">搜索</a>
    </div>
    <table>
      <thead>
      <tr>
        <td width="75"></td>
        <td>标准名称</td>
        <td>非标准名称</td>
        <td>自动/手动</td>
        <td>准确性</td>
        <td>时间</td>
        <td>关联人</td>
      </tr>
      </thead>
      <tbody class="da_body">

      </tbody>
    </table>
    <div class="list_button">

    </div>
  </div>
</div>
<script type="text/javascript" src="${ctx}/js/jquery-1.11.3.js"></script>
<script type="text/javascript" src="${ctx}/js/queryDataAss.js"></script>
<script src="${ctx}/js/jquery.pagination.js"></script>
</body>
</html>
