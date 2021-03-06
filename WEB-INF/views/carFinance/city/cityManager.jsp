<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
    <link rel="shortcut icon" href="${ctx}/styles/images/favicon.ico">
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="id" id="parentId"  value="${parentId}"/>
    </div>
    <form id="pagerForm" action="${ctx}/city/getCityList.action" method="post" style="margin:0;">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
            <div class="col-sm-2">
                <a data-toggle="modal" class="btn btn-primary btn-sm insert">新增</a>
            </div>
            <div class="col-sm-10 text-right">
                <a data-toggle="modal" class="btn btn-sm btn-info backquery">返回列表</a>
            </div>
        </div>
    </form>
</div>

<div class="mod_basic">
    <div class="ibox-content full-height no-padding">
        <div class="table-responsive full-height">
            <table class="table table-hover table-height table-striped">
                <thead>
                <tr>
                    <th style="width:5%;">序号</th>
                    <th style="width:10%;">城市名</th>
                    <th style="width:10%;">城市类别</th>
                    <th style="width:20%;">排序</th>
                    <th style="width:20%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                    <tr>
                        <td class="col-td" colspan="7">暂无数据</td>
                    </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                    <tr>
                        <td>${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                        <td title="${item.cityName}" class="max-200">
                                ${item.cityName}
                        </td>
                        <td title="${item.cityType}" style="max-width: 350px">
                            <c:if test="${item.cityType == 1}">直辖市</c:if>
                            <c:if test="${item.cityType == 2}">省份</c:if>
                            <c:if test="${item.cityType == 3}">地市</c:if>
                        </td>
                        <td title="${item.orderNo}" style="max-width: 350px">
                                ${item.orderNo}
                        </td>
                        <td class="btn-cel" style="padding-left: 48px;">
                                <a href="#" class="btn btn-primary btn-xs edit" data-id="${item.id}">
                                    <i class="fa fa-edit"></i>编辑</a>
                                <a href="#"  class="btn btn-primary btn-xs start"  data-id="${item.id}"
                                        <c:if test="${item.isvalid ==0}">
                                            style="display:none;"
                                        </c:if>>
                                    <i class="fa fa-edit"></i>禁用</a>
                                <a href="#"  class="btn btn-danger btn-xs stop"  data-id="${item.id}"
                                        <c:if test="${item.isvalid ==1}">
                                            style="display:none;"
                                        </c:if>>
                                    <i class="fa fa-edit"></i>启用</a>
                        </td>
                    </tr>
                </c:forEach>
                </tbody>
            </table>
            <!-- 分页条 -->
            <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
        </div>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/stickUp/stickUp.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/city/cityManager.js"></script>
<script type="text/template" title="新增" id="sysSale-dialog">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="sysSaleForm" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>城市名称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="cityName" id="cityName"
                           check="sysSaleForm(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>排序:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="orderNo" id="orderNo"
                           check="sysSaleForm(this)">
                </div>
            </div>
        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>

<script type="text/template" title="编辑" id="sysSale-dialog-edit">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="sysSaleForm_edit" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>城市名称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="cityName_edit" id="cityName_edit"
                           check="sysSaleForm(this)">
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label"><span class="red">*</span>排序:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="orderNo_edit" id="orderNo_edit"
                           check="sysSaleForm(this)">
                </div>
            </div>

        </form>
        <div class="dialog-manage">
            <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-ok">确定</a>
            <a href="javascript:void(0);" type="button" class="btn btn-default dialog-close">取消</a>
        </div>
    </div>
</script>
<script type="text/template" title="查看" id="sysSale-dialog-detail">
    <div class="ibox-content" style="margin-bottom:0;">
        <form id="sysSaleForm_detail" class="form-horizontal">
            <div class="form-group">
                <label class="col-xs-3 control-label">城市名称:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="cityName_edit" id="cityName_detail"
                           check="sysSaleForm(this)" disabled>
                </div>
            </div>
            <div class="form-group">
                <label class="col-xs-3 control-label">排序:</label>
                <div class="col-xs-8">
                    <input type="text" class="form-control" name="orderNo_edit" id="orderNo_detail"
                           check="sysSaleForm(this)" disabled>
                </div>
            </div>
            <div class="dialog-manage">
                <a href="javascript:void(0);" type="button" class="btn btn-primary dialog-close">关闭</a>
            </div>
        </form>
    </div>
</script>
</html>
