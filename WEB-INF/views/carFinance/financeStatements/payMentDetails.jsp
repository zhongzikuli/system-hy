<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>公司垫款明细</title>
    <%@include file="/WEB-INF/views/include/inner_css.jsp" %>
</head>
<body>
<div class="mod_header">
    <div id="hiddenForm">
        <input type="hidden" name="bankId" value="${loanBankId}"/>
        <input type="hidden" name="departmentId" value="${departmentName}"/>
        <input type="hidden" name="startDate" value="${startDate}"/>
        <input type="hidden" name="endDate" value="${endDate}"/>
        <input type="hidden" name="newOrOld" value="${newOrOld}"/>
    </div>
    <form id="pagerForm" action="${ctx}/paymentDetail/list.action" method="post">
        <%@include file="/WEB-INF/views/include/pageForm.jsp" %>
        <div class="row">
                <div class="col-sm-11  text-left">
                    <div class="form-inline">
                    	<button type="button" data-toggle="modal" class="btn btn-success btn-sm panyment-excel">导出</button>
	                   <c:if test="${ not empty entity}">
	                    <div class="form-group">
	                        <label class="alert-warning">贷款金额合计(万元): </label>
	                        <code class="alert-info"><sl:format type="number" show="${entity.actualLoadMoney/10000}" pattern="#,##0.00"/></code>
	                        <!-- <input class="form-control" readOnly  value="${entity.actualLoadMoney}"/> -->
	                    </div>
	                    <div class="form-group">
		                	<label class="alert-warning">合同价合计(万元): </label>
		                	<code class="alert-info"><sl:format type="number" show="${entity.contractPrice/10000}" pattern="#,##0.00"/></code>
		                	<!--<input class="form-control" readOnly  value="${entity.contractPrice}"/> -->
		                </div>
                           <div class="form-group">
                               <label class="alert-warning">总数(条): </label>
                               <code class="alert-info">${pageBean.totalCount}</code>
                               <!--<input class="form-control" readOnly  value="${entity.evaluateReportPrice}" /> -->
                           </div>
	                    </c:if>
	                </div>
                </div>
                <div class="col-sm-1 text-right">
	                <a class="btn btn-primary  btn-sm btn-search">查询&nbsp;<i class="fa fa-caret-up"></i></a>
	                <div class="btn-box animated fadeInRight">
	                    <div class="row">
	                        <div class="col-sm-7">
		                        <div class="form-group" id="date-time">
	                                <label class="col-xs-3 control-label">垫款日期:</label>
	                                <div class="col-xs-8">
	                                    <div class="input-group  ">
	                                        <input type="text" class="form-control" name="startDate" id="search-start-date" value="${startDate}" />
			                            <span class="input-group-addon">到</span> <input type="text" class="form-control" name="endDate" id="search-end-date" value="${endDate}" />
	                                    </div>
	                                </div>
	                            </div>
			                    <div class="form-group">
			                        <label class="col-xs-3  control-label">贷款银行:</label>
			                        <div class="col-xs-8">
				                        <select name="bankId" id="search-bank" class="form-control chosen-select status" >
				                            <option value="">请选择</option>
				                            <c:forEach items="${banks}" var="bank">
				                                <option value="${bank.id}"
				                                        <c:if test="${bank.id eq loanBankId}">selected</c:if>
				                                >${bank.bankName}</option>
				                            </c:forEach>
				                        </select>
				                     </div>
			                    </div>
	                        </div>
	                        <div class="col-sm-5">
	                            <div class="form-group">
			                        <label class="col-xs-3 control-label">部门:</label>
			                        <div class="col-xs-8">
                                    <c:if test="${level>3}">
                                        <select class="form-control chosen-select status" id="search-deparment-name" name="departmentId">
                                            <option value="">请选择</option>
                                            <c:forEach items="${departments}" var="department">
                                                <option value="${department.departName}"
                                                        <c:if test="${department.departName eq departmentName}">selected</c:if>
                                                >${department.departName}</option>
                                            </c:forEach>
                                        </select>
                                    </c:if>
                                    <c:if test="${level<=3}">
				                        <select class="form-control chosen-select status" id="search-deparment-name" name="departmentId">
				                            <option value="">请选择</option>
				                            <c:forEach items="${departments}" var="department">
				                                <option value="${department.name}"
				                                        <c:if test="${department.name eq departmentName}">selected</c:if>
				                                >${department.name}</option>
				                            </c:forEach>
				                        </select>
                                    </c:if>

				                    </div>
			                    </div>
                                <div class="form-group">
                                    <label class="col-xs-3 control-label">车型构成:</label>
                                    <div class="col-xs-8">
                                        <select class="form-control chosen-select status" id="newOrOld" name="newOrOld">
                                            <option value="" <c:if test="${newOrOld ==''}">selected</c:if>>请选择</option>
                                            <option value="0"
                                                    <c:if test="${newOrOld eq 0}">selected</c:if>
                                            >二手车</option>
                                            <option value="1"
                                                    <c:if test="${newOrOld eq 1}">selected</c:if>
                                            >新车</option>
                                        </select>

                                    </div>
                                </div>
	                            <div class="form-group group-btn">
	                                <button type="button" class="btn btn-primary  btn-sm search-btn" onclick="searchSubmit()">搜索</button>
		                        	<button type="button" class="btn btn-info  btn-sm reset-btn">重置</button>
	                            </div>
	                        </div>
	                    </div>
	                </div>
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
                    <th style="width: 2%;"><input type="checkbox" class="checkAll" name="checkedAll"></th>
                    <th style="width:2%;">序号</th>
                    <th style="width:5%;">订单号</th>
                    <th style="width:5%;">客户姓名</th>
                    <th style="width:5%;">身份证号</th>
                    <th style="width:5%;">部门</th>
                    <th style="width:5%;">业务员</th>
                    <th style="width:5%;">贷款银行</th>
                    <th style="width:5%;">贷款金额(元)</th>
                    <th style="width:5%;">车型</th>
                    <th style="width:5%;">车型构成</th>
                    <th style="width:5%;">二手车登记日期</th>
                    <th style="width:5%;">产品</th>
                    <th style="width:5%;">公司垫付日期</th>
                    <th style="width:5%;">银行利率(%)</th>
                    <th style="width:3%;">签约费率(%)</th>
                    <th style="width:5%;">贷款年限(月份)</th>
                    <th style="width:5%;">上牌地</th>
                    <th style="width:5%;">单位地址</th>
                    <th style="width:5%;">工作单位</th>
                    <th style="width:5%;">家庭住址</th>
                    <th style="width:5%;">合同价(元)</th>
                    <th style="width:5%;">评估报告价格(元)</th>
                    <th style="width:5%;">经销商</th>
                    <th style="width:5%;">审核员</th>
                    <th style="width:5%;">候补审核员</th>
                    <th style="width:5%;">订单状态</th>
                    <th style="width:5%;">操作</th>
                </tr>
                </thead>
                <tbody>
                <c:if test="${pageBean.recordList == null || pageBean.recordList.size() == 0}">
                <tr>
                    <td class="col-td" colspan="30">暂无数据</td>
                </tr>
                </c:if>
                <c:forEach var="item" items="${pageBean.recordList}" varStatus="st">
                <tr>
                    <td><input type="checkbox" class="checkOne" name="blacklist_input" value="${item.id}"></td>
                    <td class="cel">${st.index+1+(pageBean.currentPage-1)*pageBean.numPerPage}</td>
                    <td class="cel">${item.orderNo}</td>
                    <td class="cel">${item.buyerRealName}</td>
                    <td class="cel">${item.buyerCardNo}</td>
                    <td class="cel">${item.departmentName}</td>
                    <td class="cel">${item.creditPerson}</td>
                    <td class="cel">${item.bankName}</td>
                    <td class="cel">${item.actualLoadMoney}</td>
                    <td class="cel">${item.brandName}</td>
                    <td class="cel">
                        <c:if test="${item.newOrOld==1}"><code class="alert-info">新车</code></c:if>
                        <c:if test="${item.newOrOld==0}"><code class="alert-warning">二手车</code></c:if>
                    </td>
                    <td class="cel"> <sl:format type="date" show="${item.initRegisterDate}" pattern="yyyy-MM-dd"/></td>
                    <td class="cel">${item.productName}</td>
                    <td class="cel"> <sl:format type="date" show="${item.ascompanyAdvanceMoneyDate}" pattern="yyyy-MM-dd"/></td>
                    <td class="cel"> <sl:format type="number" show="${item.bankRate}" pattern="#,##0.00"/></td>
                    <td class="cel"> <sl:format type="number" show="${item.customerRate}" pattern="#,##0.00"/></td>
                    <td class="cel">${item.loanPeriodMonth}</td>
                    <td class="cel">${item.carLicenseProvince}${item.carLicenseCity}</td>
                    <td class="cel">${item.buyerCompanyProvince}${item.buyerCompanyCity}${item.buyerCompanyTown}${item.buyerCompanyAddress}</td>
                    <td class="cel">${item.buyerCompanyName}</td>
                    <td class="cel">${item.buyerFamilyAddressProvince}${item.buyerFamilyAddressCity}${item.buyerFamilyAddressTown}${item.buyerFamilyAddress}</td>
                    <td class="cel"><sl:format type="number" show="${item.contractPrice}" pattern="#,##0.00"/></td>
                    <td class="cel"><sl:format type="number" show="${item.evaluateReportPrice}" pattern="#,##0.00"/></td>
                    <td class="cel">${item.dealerName}</td>
                    <td class="cel">${item.auditAuditer}</td>
                    <td class="cel">${item.auditUserName}</td>
                    <td class="cel"> <sl:OrderStatus showValue="${item.orderStatus}"/></td>

                    <td class="cel">
                        <shiro:hasPermission name="order:view">
                            <a title="查看" class="btn btn-info btn-xs detail"  data-id="${item.id}" data-type="${ctx}/paymentDetail/list.action">
                                <i class="fa fa-search-plus"></i>查看</a>
                        </shiro:hasPermission>
                    </td>
                </tr>
                </c:forEach>
            </table>
            <%-- 分页表单参数 --%>
            <%@include file="/WEB-INF/views/include/numberListPageBar.jsp" %>
        </div>
        <%-- end table-responsive --%>
    </div>
</div>
</body>
<%-- js库引入 --%>
<%@include file="/WEB-INF/views/include/inner_js.jsp" %>
<script type="text/javascript" src="${ctx}/js/third/laydate/laydate.js"></script>
<script type="text/javascript" src="${ctx}/js/mine/carFinance/newStatementStructure/paymentDetails.js"></script>
</html>
