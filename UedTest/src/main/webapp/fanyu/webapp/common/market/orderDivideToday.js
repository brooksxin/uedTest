define(['common/util/frameContainer', 'handlebars', 'text!tpl/market/orderDivideToday.tpl', 'text!tpl/market/orderDivideToday-list.tpl', 'text!tpl/market/orderDivideToday-Setting.tpl'
	, 'jquery', 'underscore', 'market.common', 'jquery.countdown']
	, function(frameContainer, Handlebars, tpl, listTpl, settingTpl, $, _, common){

	

	//页面使用参数列表
	var G_params = {
		url : srvMap.get('getcount'),
		loginformId : "J_formCount", //搜索表单的id
		divideformId:"divideTask"//分配任务表单ID
	};
	var count = "",num = '';
	var DEPT_ID=userInfo.bean.deptId;//当前登录用户所在部门ID
	var _el = null;
	var d = null;
	var _mainPage = "/ecp/module/market/campgnList.html";
	var template = null;
	var _options = null;
	var _callback = null;
	var init = function(Loading, options, callback){
		Loading && Loading.destroy();
		_options = options;
		_callback = callback;
		srvMap.add('queryCountYesday', 'count.json', 'front/sh/market!index');//查询最近一次设置的订单数（订单分配数量默认为最近一次的数量）
		srvMap.add('stafflist', 'staf.json', 'front/sh/user!userinfo');//班组长查询所在部门的员工列表
		srvMap.add('divide', 'divide.json', 'front/sh/market!index');//分配任务
		template = Handlebars.compile(tpl);
		_el = $(template({}));
		panelInit();
		eventInit();
		//formInit();
		listInit();

	}
	var eventInit = function(){
		var $list = $("#J_tabletpl", _el);
		$("#J_search", _el).on("click",saveResult);
		//$("#J_Cancel", _el).on("click",Cancel);
		$('#J_distr_again', _el).on('click', distributeTask);
		//给任务数量文本框注册事件
		$('#J_tabletpl', _el).on('propertychange keyup input paste blur set', 'tr td .ui-count-ipt', function(e){
			numSign(e.currentTarget);
		});
		$('#selectAll', _el).on('change', checkAll);
		$list.on('click', '.decrease', function(e){ 
			decrease(e.currentTarget); 
		});
		$list.on('click', '.increase', function(e){ 
			increase(e.currentTarget); 
		});
		$list.on('change', '.order_productinput', function(e){ changeTaskIpt(e.currentTarget); })
		.on('onkeyup afterpaste', '.order_productinput', function(e){ this.value=this.value.replace(/\D/g,'') });
		$list.on('change', '.table_select input[type="checkbox"]', function(e){ checkStaff(e.currentTarget); });
		_el.on('click', '.settingBtn', settingInit);

	}
	var checkAll = function(e){
		var $boxCheckAll = $(e.currentTarget);
		var checked = $boxCheckAll.is(':checked');
		$("#J_tabletpl input[type='checkbox']", _el).each(function(i,ele){
			var $box = $(ele);
			checked ? $box.attr('checked', 'checked') : $box.removeAttr('checked') ;
			checkStaff(ele);
		});
	}
	/*
	var formInit = function() {
		$(".CMPGN_ID").val(CMPGN_ID);
		$("#CMPGN_NM").text(CMPGN_NM);
		$("#CMPGN_INVLD_DATE").text(CMPGN_INVLD_DATE);
		$("#CMPGN_EFF_DATE").text(CMPGN_EFF_DATE);
		$(".VALID_END_DATE").val(CMPGN_INVLD_DATE);
		$(".VALID_BGN_DATE").val(CMPGN_EFF_DATE);
	}
	*/
	var panelInit = function(json){
		
		/*d = top.dialog({
			title: '调整配给数量',
			width:800, height:500, 
			content: template(json)
		});
		_el = d.node;
		d.showModal();*/

		var date = Util.date.dateTimeWrapper('yyyy-MM-dd');
		$("#date", _el).html(date);
		
		var param1={"uid":"mt003"};
		Util.ajax.postJsonSync(srvMap.get('queryCountYesday'),param1, function(json,
				status) {
			if (status) {
				count = json.bean.TSK_QTY;
				$("#count", _el).text(count);
				$("#TSK_QTY", _el).val(count);
			}
		});
	}
	var listInit = function(){
		//查询员工列表
		var param2={"uid":"u005","DEPT_ID":DEPT_ID};
		Util.ajax.postJsonSync(srvMap.get('stafflist'), param2, function(
				json, status) {
			if (status) {
				num=json.beans.length;
				//Util.ajax.loadTemp('#J_tabletpl', $('#T_tabletpl'), json);
				$('#J_tabletpl', _el).html(Handlebars.compile(listTpl)(json));
				distributeTask();
			}
		});
	}
	var settingInit = function(e){
		require(['common/market/orderDivideToday-Setting'], function(Setting){
			Setting.init({groupGoalNumber:count}, function(goalNumber){
				$('#TSK_QTY', _el).val(goalNumber);
				$('#count', _el).html(goalNumber);
				count = goalNumber;
				distributeTask();
			});
		});
		return false;
	}
	//分配任务
	function distributeTask(e){
		if (e && $(e.currentTarget).attr('class').indexOf('disable') > -1) {
			return false;
		}
		var $tbody = $('#J_tabletpl', _el);
		var $trs = $tbody.children();
		var $trCheckeds = _.filter($trs, function(tr) {
			var $tr = $(tr);
			return $tr.find('input[type=checkbox]').is(':checked');
		});
		if($trCheckeds==null||$trCheckeds==''){
			Util.dialog.tips("请选择话务员");
		}else{
			var checkedNum = $trCheckeds.length;
			var averageTask = parseInt(parseInt(count)/checkedNum),//平均分配
				surplusTask = parseInt(parseInt(count)%checkedNum);//取余
			
			$('.ui-count-ipt', $trCheckeds).val(averageTask).attr('lastVal',averageTask)
				.eq(0).val(averageTask+surplusTask).attr('lastVal',averageTask+surplusTask);
			$('.surplus').html(0);
			canDistribute();
		}
	}

	
	var saveResult = function(e){
		if ($(e.currentTarget).attr('class').indexOf('disable') > -1) {
			return false;
		}
		/*Util.dialog.tips("今日下单量分配成功");
		_callback && _callback();
		return false;
		*/

		//分配任务
		Util.ajax.postJsonSync(srvMap.get('divide'), $("#divideTask", _el).serialize(), function(
				json, status) {
			if (status) {
				if(json.returnCode=='0'){
					Util.dialog.tips("今日下单量分配成功");
					_callback && _callback();
					/*if (_options && _options.loadViewPage){
						_el.remove();
						require(['common/market/orderSuccessGroupEnd'],function(fn){
							fn.init();
							frameContainer.append(fn.getTpl());
							//$busi_div.empty().append($el).show();
						});
					}*/
					
					//window.location.href="campgnListGrLdr.html";
				}else{
					Util.dialog.tips('分配失败');
				}
			}
				
		});
	}
	

	//递减
	function decrease(obj){
		if ($(obj).attr('class').indexOf('disabled')>-1){
			return false;
		}
		var obj = $(obj),surplus = parseInt($('.surplus', _el).html());
		var curTask = parseInt(obj.siblings('input').val());
		if (curTask>0) {
			curTask--;
			surplus++;
			obj.siblings('input').val(curTask).attr('lastVal',curTask);
			$('.surplus', _el).html(surplus);
		};
		canDistribute(obj);
	}

	//递增
	function increase(obj){
		if ($(obj).attr('class').indexOf('disabled')>-1){
			return false;
		}
		obj = $(obj);
		var $surplus = $('.surplus', _el);
		var surplus = parseInt($surplus.html());
		var curTask = parseInt(obj.siblings('input').val());
		if (surplus>0) {
			surplus--;
			curTask++;
			obj.siblings('input').val(curTask).attr('lastVal',curTask);
			$surplus.html(surplus);
		};
		canDistribute(obj);
	}
	//改变input的任务量值
	function changeTaskIpt(obj){
		obj = $(obj);
		var $surplus = $('.surplus', _el);
		var	lastVal = parseInt(obj.attr('lastVal')),
		curVal = parseInt(obj.val()),
		surplus = parseInt($surplus.html());
		if (curVal > lastVal) {
			var DVal = curVal - lastVal;
			if (DVal > surplus) {
				Util.dialog.tips('剩余配给量不足！');
				obj.val(lastVal);
			}else{
				$surplus.html(surplus - DVal);
				obj.attr('lastVal',curVal);
			}
		}else{
			var DVal = lastVal - curVal;
			$surplus.html(surplus + DVal);
			obj.attr('lastVal',curVal);
		}
		canDistribute(obj);
	}
	//是否选中员工
	var checkStaff = function(obj){
		obj = $(obj);
		var $tr = obj.parent().parent().parent();
		var curIpt = $tr.find('.ui-count-ipt'),
			curVal = parseInt(curIpt.val()),
			surplus = parseInt($('.surplus', _el).html()), 
			//$tr = obj.parents('tr'), 
			$box = $('input[type=text]', $tr), 
			$hideBox = $('.hideBox', $tr), 
			$plus = $('.order_productDiva', $tr);
		if (!obj.attr('checked')) {
			$('.surplus', _el).html(surplus+curVal);
			curIpt.val(0);
			$box.attr('disabled', 'disabled');
			$plus.addClass('disabled');
			$hideBox.attr('disabled', 'disabled');
		}else{
			$box.removeAttr('disabled');
			$plus.removeClass('disabled');
			$hideBox.removeAttr('disabled');
		}
		canDistribute(obj);
		$tr.find('.ui-count-ipt').attr('lastVal',0);
	}

	//判断重新分配按钮是否可用
	function canDistribute(obj){
		var $trCheckeds = common.checkedGets(true, _el);
		var surplus = parseInt($('.surplus', _el).html());
		if (surplus || $trCheckeds.length > 0) {
			$('#J_distr_again', _el).removeClass('disable');	//.attr('onclick','distributeTask()');
			$('#J_search', _el).addClass('disable');
		}else{
			$('#J_distr_again', _el).addClass('disable');	//.removeAttr('onclick');
			$('#J_search', _el).removeClass('disable');
		}
		numSign(obj, _el);
	}
	/*
	function Cancel(){
		var param1={"uid":"myxz006","CMPGN_ID":CMPGN_ID,"CMPGN_STS_CD":"1"};
		Util.ajax.postJsonSync(srvMap.get('updateCampngStatus'), param1,function(json, status) {
			 //alert(status);
			if (status) {//更细营销活动状态为暂停
				//跳转到营销活动列表页面
				window.location.href = _mainPage;
			}
		});
		d.remove();
	}*/

	return { getTpl:function(){ return _el; }, init:init };
});