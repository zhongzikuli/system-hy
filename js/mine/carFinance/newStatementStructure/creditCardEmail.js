$(function(){
	
	//下拉框初始化
	$("#search-deparment-name").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	$("#newOrOld").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//公司垫款明细导出
	$(".detail").on("click", function () {
		var url =$(this).attr("data-type");
		var id= $(this).attr("data-id");
		window.location.href = ctx+"/cfBusinessOrderAccept/detail.action?id="+id+"&goBackUrl="+url;
	});
	//下拉框初始化
	$("#search-bank").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "100%"
	});
	//下拉框初始化
	$("#search-style").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",	
		allow_single_deselect		: true,
		width: "100%"
	});
	//公司垫款明细导出
	$(".panyment-excel").on("click", function () {
		panyMentDownExcel();
	});
	//征信时效导出
	$(".credit-excel").on("click", function () {
		creditDownExcel();
	});
	//重置按钮
	$(".reset-btn").on("click", function(){
		$("#search-deparment-name").val("").trigger('chosen:updated');
		$("#search-bank").val("").trigger('chosen:updated');
		$("#search-start-date").val("");
		$("#search-end-date").val("");
        $("#search-date").val("");
		$("#search-keyword").val("")
		$("#newOrOld").val("").trigger('chosen:updated');
	});
	$(".creditNot-excel").on("click", function () {
		creditNotDownExcel();
	});

	//搜索时间控件
	var start = {
		elem:"#search-start-date",
		format: 'YYYY-MM-DD',
		min: '1970-01-01 ', //设定最小日期为当前日期
		//max: laydate.now(), //最大日期
		istoday: false, //显示今天
		issure: true, //确定框
		istime: false,
		start: laydate.now() + ' 00:00:00',
		choose: function (datas) {
			end.min = datas; //开始日选好后，重置结束日的最小日期
		},
		clear: function () {
			end.min = '1970-01-01 '; //开始日清空后，重置结束日的最小日期
		}
	}
	var end ={
		elem: '#search-end-date',
		format: 'YYYY-MM-DD',
		min: '1970-01-01', //设定最小日期为当前日期
		//max: laydate.now(), //最大日期
		istoday: false, //显示今天
		issure: true, //确定框
		istime: false,
		start: laydate.now(0, 'YYYY年MM月DD日 hh:mm:ss'),
		choose	: function (datas) {
			start.max = datas;			//结束日选好后，重置开始日的最大日期
		},
		clear: function () {
			start.min = '1970-01-01';	//结束日清空后，重置开始日的最小日期
			start.max = laydate.now();	//将开始日的最大值设定为今天
		}
	}
	laydate(start);
	laydate(end);

    //抵押情况导出
    $(".exportMortgageCondition").on("click",function(){
        exportMortgageCondition();
    });

    function exportMortgageCondition(){
        var ck = $("input[name='mortgageConditionInput']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要导出的报表。");
            return
        } else {
            var idArr = new Array();
            var userIsvalid = true;
            $(ck).each(function () {
                idArr.push($(this).val());
                if ($(this).attr("isvalid") == "0") {
                    userIsvalid = false;
                }
            });
            if (!userIsvalid) {
                alertDialog("所选信息包含无效账户");
                return false;
            }
            confirmDialog("确认导出选中的报表吗？", function () {
                window.location.href=ctx+"/mortgageCondition/exportMortgageCondition.action?idArr="+idArr.toString();
            })
        }
    }

    //机动车证书登记号统计明细表导出
    $(".exportRegisterLicenseNo").on("click",function(){
        exportRegisterLicenseNo();
    });

    function exportRegisterLicenseNo(){
        var ck = $("input[name='registerLicenseNoInput']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要导出的报表。");
            return
        } else {
            var idArr = new Array();
            var userIsvalid = true;
            $(ck).each(function () {
                idArr.push($(this).val());
                if ($(this).attr("isvalid") == "0") {
                    userIsvalid = false;
                }
            });
            if (!userIsvalid) {
                alertDialog("所选信息包含无效账户");
                return false;
            }
            confirmDialog("确认导出选中的报表吗？", function () {
                window.location.href=ctx+"/registerLicenseNo/exportRegisterLicenseNo.action?idArr="+idArr.toString();
            })
        }
    }

    //送交银行明细表导出
    $(".exportSendBankDetail").on("click",function(){
        exportSendBankDetail();
    });

    function exportSendBankDetail(){
        var ck = $("input[name='sendBankDetailInput']:checked");
        if (ck.length == 0) {
            alertDialog("请选择要导出的报表。");
            return
        } else {
            var idArr = new Array();
            var userIsvalid = true;
            $(ck).each(function () {
                idArr.push($(this).val());
                if ($(this).attr("isvalid") == "0") {
                    userIsvalid = false;
                }
            });
            if (!userIsvalid) {
                alertDialog("所选信息包含无效账户");
                return false;
            }
            confirmDialog("确认导出选中的报表吗？", function () {
                window.location.href=ctx+"/sendBankDetail/exportSendBankDetail.action?idArr="+idArr.toString();
            })
        }
    }

});

//公司垫款明细
function panyMentDownExcel() {
	var $has_checked = $(".checkOne:checked");
	if ($has_checked.length == undefined || $has_checked.length == 0) {
		alertDialog("请选择要导出的记录。");
		return;
	}
	var ids = new Array();
	$has_checked.each(function () {
		ids.push($(this).val());
	});
	confirmDialog("您确定要导出记录？", function () {
		var frame = $('<iframe>');//定义一个iframe
		frame.attr("src", ctx + "/creditCardEmail/newExportList.action?ids=" + ids.toString());
		frame.attr("style", "display:none");
		frame.append("</iframe>")
		$("body").append(frame);

	});


}

