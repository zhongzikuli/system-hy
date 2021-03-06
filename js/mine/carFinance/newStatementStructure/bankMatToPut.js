$(function(){
	
	//下拉框初始化
	$("#search-deparment-name").chosen({
		disable_search_threshold	: 8,
		no_results_text				: "没有找到",
		allow_single_deselect		: true,
		width: "160px"
	});

	//公司垫款明细导出
	$(".bank-excel").on("click", function () {
		panyMentDownExcel();
	});

	//重置按钮
	$(".reset-btn").on("click", function(){
		$("#search-deparment-name").val("").trigger('chosen:updated');
		$("#search-bank").val("").trigger('chosen:updated');
		$("#search-user").val("").trigger('chosen:updated');
		$("#search-start-date").val("");
		$("#search-end-date").val("");
		$("#keyWord").val("");
	});
	//搜索时间控件
	var start = {
		elem:"#search-start-date",
		format: 'YYYY-MM-DD',
		min: '1970-01-01 ', //设定最小日期为当前日期
		max: laydate.now(), //最大日期
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
		max: laydate.now(), //最大日期
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

});

//公司垫款明细
function panyMentDownExcel() {
	var depId= $("#search-deparment-name").val();
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
		frame.attr("src", ctx + "/bankMatToPut/newExportList.action?ids=" + ids.toString())+"&departmentId="+depId;
		frame.attr("style", "display:none");
		frame.append("</iframe>")
		$("body").append(frame);

	});


}

