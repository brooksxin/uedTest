define(['handlebars', 'dialog', 'text!tpl/market/againdivideTaskDept.tpl', 'text!tpl/market/againdivideTaskDept-list.tpl', 'jquery', 'underscore', 'jquery.countdown'], function(Handlebars, dialog, tpl, listTpl, $){


	//获取传递的营销活动ID
	var CMPGN_ID = Util.browser.getParameter("CMPGN_ID");//活动ID
	var CMPGN_NM=  decodeURI(Util.browser.getParameter("CMPGN_NM"));//活动名称
	var CMPGN_EFF_DATE=  decodeURI(Util.browser.getParameter("CMPGN_EFF_DATE"));//活动结束日期
	var CMPGN_INVLD_DATE=  decodeURI(Util.browser.getParameter("CMPGN_INVLD_DATE"));//活动结束日期
	var STATUS=  decodeURI(Util.browser.getParameter("co"));//分配状态
	//页面使用参数列表
	var G_params = null;
	var count = "",num = '';
	var _callback = null;

	var _el = null;
	var d = null;
	var _mainPage = "/ecp/module/market/campgnListGrLdr.html";
	var init = function(json, Loading, callback){
		Loading && Loading.destroy();
		_callback = callback;
		srvMap.add('getcount', 'count.json', 'front/sh/market!index');//班组长查询未分配任务数量
		srvMap.add('stafflist', 'dept.json', 'front/sh/user!userinfo');//系统管理员查询所有班组
		srvMap.add('divide', 'divide.json', 'front/sh/market!index');//分配任务
		srvMap.add('updateCampngStatus', 'divide.json', 'front/sh/market!index');//进入重新分配，更新该营销活动状态为暂停
		G_params = {
			url : srvMap.get('getcount'),
			loginformId : "J_formCount", //搜索表单的id
			divideformId:"divideTask"//分配任务表单ID
		};
		CMPGN_ID = json.CMPGN_ID;//活动ID
		CMPGN_NM=  decodeURI(json.CMPGN_NM);//活动名称
		CMPGN_EFF_DATE=  decodeURI(json.CMPGN_EFF_DATE);//活动结束日期
		CMPGN_INVLD_DATE=  decodeURI(json.CMPGN_INVLD_DATE);//活动结束日期
		STATUS= decodeURI(json.co);//活动结束日期
		panelInit(json);
		eventInit();
		formInit();
		listInit();
	}
	var eventInit = function(){
		var $list = $("#J_tabletpl", _el);
		$("#J_search", _el).on("click",saveResult);
		$("#J_Cancel", _el).on("click",Cancel);
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
		.on('keyup afterpaste', '.order_productinput', function(e){ 
			this.value=this.value.replace(/\D/g,'') 
		});
		$list.on('change', '.table_select input[type="checkbox"]', function(e){ checkStaff(e.currentTarget); });
	}
	
	var formInit = function() {
		$(".CMPGN_ID", _el).val(CMPGN_ID);
		$("#CMPGN_NM", _el).text(CMPGN_NM);
		$("#CMPGN_INVLD_DATE", _el).text(CMPGN_INVLD_DATE);
		$("#CMPGN_EFF_DATE", _el).text(CMPGN_EFF_DATE);
		$(".VALID_END_DATE", _el).val(CMPGN_INVLD_DATE);
		$(".VALID_BGN_DATE", _el).val(CMPGN_EFF_DATE);
	}
	var panelInit = function(json){
		var template = Handlebars.compile(tpl);
		d = top.dialog({
			title: '调整配给数量',
			width:800, height:500, cancel:false, 
			content: template(json)
		});
		_el = d.node;
		d.showModal();
	}
	var listInit = function(){
		var DEPT_Id=userInfo.bean.deptId;
		//一进入重新分配页面，更新营销活动状态为暂停
		var paramupdate={"uid":"myxz006","CMPGN_ID":CMPGN_ID,"CMPGN_STS_CD":"6"};
		Util.ajax.postJsonSync(srvMap.get('updateCampngStatus'), paramupdate,function(json, status) {
			 //alert(status);
			if (status) {//更细营销活动状态为暂停
				
					
			}
		});
		//获取任务数量
		var params={"uid":"mc003","CMPGN_ID":CMPGN_ID,"type":"1"};
		Util.ajax.postJsonSync(srvMap.get('getcount'), params, function(json, status) {
			if (status) {
				count = json.bean.plusCount;
				$("#plusCount", _el).text(count);
				$("#total", _el).text(json.bean.total);


				//查询员工列表
				var param={'uid':'u005',"DEPT_ID":DEPT_Id};
				Util.ajax.postJsonSync(srvMap.get('stafflist'),param, function(
						json, status) {
					if (status) {
						num=json.beans.length;
						$('#J_tabletpl', _el).html(Handlebars.compile(listTpl)(json));
						distributeTask();
					}
				});

			}
		});
		//倒计时
		var countdownParam = {};
		Util.ajax.postJson(srvMap.get('stafflist'), countdownParam, function(json, status) {
			if (status) {
				//json
			}
		});
		var dateStr = CMPGN_INVLD_DATE.replace(/-/g, '/');
		var countdownDate = new Date(dateStr);
		if (countdownDate > new Date()) {
			$('#clock', _el).countdown(dateStr, function(event) {
				$(this).html(event.strftime('%D 天 %H:%M:%S'));
			});
		}else{
			$('#clock', _el).html('活动已过期！');
		}
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

	var distributeTask = function(e) {
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
			$('.surplus', _el).html(0);
			canDistribute();
		}
	}
	var saveResult = function(e){
		if ($(e.currentTarget).attr('class').indexOf('disable') > -1) {
			return false;
		}
		//分配任务
		//alert("重新分配任务开始");
		var str1 = $("#" + G_params.divideformId, _el).serialize(); //把form序列化
		Util.ajax.postJsonSync(srvMap.get('divide'), str1, function(
				json, status) {
			if (status) {
				if(json.returnCode='0'){
					//重新分配完成后，更新重新分配标志为正常
					var param1={"uid":"mwt017","CMPGN_ID":CMPGN_ID};
					Util.ajax.postJsonSync(srvMap.get('updateCampngStatus'), param1,function(json, status) {
						 //alert(status);
						if (status) {//更细营销活动状态为正常
							Util.dialog.tips("调整任务成功");
							//_callback();
							_callback && _callback.cancel && _callback.ok();
							d.remove();
							//跳转到营销活动列表页面
							//window.location.href = _mainPage;
						}
					});
					
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
		var surplus = parseInt($('.surplus', _el).html());
		var curTask = parseInt(obj.siblings('input').val());
		if (surplus>0) {
			surplus--;
			curTask++;
			obj.siblings('input').val(curTask).attr('lastVal',curTask);
			$('.surplus', _el).html(surplus);
		};
		canDistribute(obj);
	}
	//改变input的任务量值
	function changeTaskIpt(obj){
		obj = $(obj);
		var	lastVal = parseInt(obj.attr('lastVal')),
		curVal = parseInt(obj.val()),
		surplus = parseInt($('.surplus', _el).html());
		if (curVal > lastVal) {
			var DVal = curVal - lastVal;
			if (DVal > surplus) {
				Util.dialog.tips('剩余配给量不足！');
				obj.val(lastVal);
			}else{
				$('.surplus', _el).html(surplus - DVal);
				obj.attr('lastVal',curVal);
			}
		}else{
			var DVal = lastVal - curVal;
			$('.surplus', _el).html(surplus + DVal);
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
			$box.attr('readonly', 'readonly');
			$plus.addClass('disabled');
			$hideBox.attr('readonly', 'readonly');
		}else{
			$box.removeAttr('readonly');
			$plus.removeClass('disabled');
			$hideBox.removeAttr('readonly');
		}
		canDistribute(obj);
		$tr.find('.ui-count-ipt').attr('lastVal',0);
	}

	//判断重新分配按钮是否可用
	function canDistribute(obj){
		var $trCheckeds = checkedGets(true, _el);
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
	
	function Cancel(){
		//alert(STATUS);
		if(STATUS!='待重新分配'){
			//alert("ee");
			var param1={"uid":"mwt017","CMPGN_ID":CMPGN_ID};
			Util.ajax.postJsonSync(srvMap.get('updateCampngStatus'), param1,function(json, status) {
				 //alert(status);
				if (status) {//更细营销活动状态为暂停
					//跳转到营销活动列表页面
					//window.location.href = _mainPage;
					_callback && _callback.cancel && _callback.cancel();
				}
			});
		}
		
		d.remove();
	}

	return { init:init };
});