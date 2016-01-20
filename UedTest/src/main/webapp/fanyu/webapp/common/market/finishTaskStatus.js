define(['handlebars', 'text!tpl/market/finishTaskStatus.tpl', 'text!tpl/market/finishTaskStatus-list.tpl'
	, 'jquery', 'underscore', 'market.common', 'jquery.countdown']
	, function(Handlebars, tpl, listTpl, $, _, common){
	
	

	var _dialog = null;
	var DEPT_ID = userInfo.bean.deptId;
	var _el = null;
	var CMPGN_ID = 0;
	var CMPGN_NM = '';
	var CMPGN_EFF_DATE = '';
	var CMPGN_INVLD_DATE = '';
	var CMPGN_STS_CD='';
	var init = function(json, callback){
		srvMap.add('getcount', 'count.json', 'front/sh/market!index');//班组长查询未分配任务数量
		srvMap.add('stafflist', 'staf.json', 'front/sh/user!userinfo');//班组长查询所在部门的员工列表

		CMPGN_ID = json.CMPGN_ID;
		CMPGN_NM=  decodeURI(json.CMPGN_NM);//活动名称
		CMPGN_EFF_DATE=  decodeURI(json.CMPGN_EFF_DATE);//活动结束日期
		CMPGN_INVLD_DATE=  decodeURI(json.CMPGN_INVLD_DATE);//活动结束日期 
		CMPGN_STS_CD=decodeURI(json.CMPGN_STS_CD);
		panelInit();
		listInit();


	}
	var listInit = function(){
		//var param2={"uid":"mwt007","CMPGN_ID":CMPGN_ID,"type":"0","CMPGN_STS_CD":CMPGN_STS_CD};
		var param2={"uid":"mwt006","CMPGN_ID":CMPGN_ID,"type":"0","CMPGN_STS_CD":CMPGN_STS_CD};
		Util.ajax.postJsonSync(srvMap.get('getcount'), param2, function(json, status) {
			if (status) {
				var beans=json.beans;
				$('#J_tabletpl', _el).html(Handlebars.compile(listTpl)(json));
				for(var i=0;i<beans.length;i++){
					//如果是随机分配的时候 将 进度和数量换为“/”
					if(beans[i].TSK_ALCT_MODE_CD == "01"){
						//$('#J_tabletpl').find('tr').eq(i).find('td').eq(3).html("/");
						$('._progress',_el).html('/');
						//$('.cm_num',_el).html('/');
					}
				}
			}
				
		});

	}
	
	Handlebars.registerHelper("ifCheck", function(TSK_ALCT_QTY,TSK_ALCT_MODE_CD){
	    var _content;
	    switch(TSK_ALCT_MODE_CD){
	        case "01":
	        	//新建
	             _content	= "";
	            return _content;
	            break;
	        default:
	            _content	= "/"+TSK_ALCT_QTY;
	        return _content;
	    }
	});	
	
	
	var panelInit = function(){
		var template = Handlebars.compile(tpl);
		_dialog = top.dialog({
			title: '10085-任务管理-查看进度1',
			width:800, height:500, 
			content: template({})
		});
		_el = _dialog.node;
		_dialog.showModal();

		$(".CMPGN_NM", _el).text(CMPGN_NM);
		$(".CMPGN_EFF_DATE", _el).text(CMPGN_EFF_DATE);
		$(".CMPGN_INVLD_DATE", _el).text(CMPGN_INVLD_DATE);
		//获取任务数量
		//var param1={"uid":"mc004","CMPGN_ID":CMPGN_ID,"type":"1","DEPT_ID":DEPT_ID};
		var param1 = {
			"uid" : "mc004",
			"CMPGN_ID" : CMPGN_ID,
			"type" : "0"
		};
		Util.ajax.postJsonSync(srvMap.get('getcount'), param1, function(json, status) {
			if (status) {
				var count = json.bean.count;
				$("#count", _el).html(count);
				$("#total", _el).html(json.bean.total);
			}
		});
	}

	return { init:init };
});