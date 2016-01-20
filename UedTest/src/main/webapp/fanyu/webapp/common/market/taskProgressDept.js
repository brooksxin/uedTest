define(['handlebars', 'text!tpl/market/taskProgressDept.tpl', 'text!tpl/market/taskProgressDept-list.tpl'
	, 'jquery', 'underscore', 'market.common', 'jquery.countdown']
	, function(Handlebars, tpl, listTpl, $, _, common){
	
	

	var _dialog = null;
	var DEPT_ID = userInfo.bean.deptId;
	var _el = null;
	var CMPGN_ID = 0;
	var CMPGN_NM = '';
	var CMPGN_EFF_DATE = '';
	var CMPGN_INVLD_DATE = '';
	var CMPGN_STS_CD ='';
	//var _callback = null;
	
	var init = function(json){
		srvMap.add('userinfo', 'user.json', 'front/sh/user!session');//用户信息查询
		srvMap.add('getcount', 'count.json', 'front/sh/market!index');//班组长查询任务数量
		srvMap.add('stafflist', 'staf.json', 'front/sh/user!userinfo');//班组长查询所在部门的员工列表
		CMPGN_ID = json.CMPGN_ID;
		CMPGN_NM=  decodeURI(json.CMPGN_NM);//活动名称
		CMPGN_EFF_DATE=  decodeURI(json.CMPGN_EFF_DATE);//活动结束日期
		CMPGN_INVLD_DATE=  decodeURI(json.CMPGN_INVLD_DATE);//活动结束日期 
		//_callback = callback;
		CMPGN_STS_CD=decodeURI(json.CMPGN_STS_CD);
		panelInit();
		eventInit();
		listInit();

	}
	var eventInit = function(){
		$('.gridBottom .changeDistribute').on('click', againDivide);
	}
	var listInit = function(){
		var param2={"uid":"mwt007","CMPGN_ID":CMPGN_ID,"type":"1","CMPGN_STS_CD":CMPGN_STS_CD};
		Util.ajax.postJsonSync(srvMap.get('getcount'), param2, function(json, status) {
			if (status) {
//				if(json.beans[0].TSK_ALCT_MODE_CD=="01"){
//					$("#tskCountShow").hide();
//				}
//				$('#J_tabletpl', _el).html(Handlebars.compile(listTpl)(json));
				//Util.ajax.loadTemp('#J_tabletpl', $('#T_tabletpl'), json1);
				if(json.beans[0].TSK_ALCT_MODE_CD=="01"){
					$("#tskCountShow").hide();
				}
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
			title: '10085-任务管理-查看进度',
			width:800, height:500, 
			content: template({})
		});
		_el = _dialog.node;
		_dialog.showModal();

		$(".CMPGN_NM", _el).text(CMPGN_NM);
		$(".CMPGN_EFF_DATE", _el).text(CMPGN_EFF_DATE);
		$(".CMPGN_INVLD_DATE", _el).text(CMPGN_INVLD_DATE);

		//获取任务数量
		var str = $("#J_formCount").serialize(); //把form序列化
		//console.log(str);
		//不分页获取数据
		var params={"uid":"mc004","CMPGN_ID":CMPGN_ID,"type":"1","DEPT_ID":DEPT_ID};
		Util.ajax.postJsonSync(srvMap.get('getcount'), params, function(json, status) {
			if (status) {
				var count = json.bean.count;
				$("#count", _el).html(count);
				$("#total", _el).html(json.bean.total);
			}
		});
	}

	var againDivide = function(){
		var elem = $('<div class="fn-hide"><div class="warn-wrapper"><div class="warn-logo"></div><div class="warn-text"><span style="color:red;">警告：</span>重新分配会导致该活动处于暂停状态！请谨慎操作！</div></div></div>'
	    );

	    var params = {
	        top:top,
	        content: elem,
	        width: "300px",
	        height: "140px",
	        modal: true,
	        okVal:'确定',
	        okCallback:function(){
				$(obj).hide().siblings().hide();
				require(['common/util/loading'], function(Loading){
					Loading.init();
					require(['common/market/againdivideTaskDept', ], function(Main){
						Main.init({ CMPGN_ID:CMPGN_ID, CMPGN_NM:CMPGN_NM, CMPGN_EFF_DATE:CMPGN_EFF_DATE, CMPGN_INVLD_DATE:CMPGN_INVLD_DATE }, Loading);
					});

				});
				_dialog.remove();
	              /*
	              window.location.href="../market/againdivideTaskSys.html?"
	            	  + "CMPGN_ID="+CMPGN_ID+"&CMPGN_NM="+CMPGN_NM+"&CMPGN_EFF_DATE="
	            	  +CMPGN_EFF_DATE+"&CMPGN_INVLD_DATE="+CMPGN_INVLD_DATE; */
	        },
	        cancelVal:'取消',
	        cancelCallback:function(){}
	      }

	      Util.dialog.openDiv(params);
	      //_callback && _callback();
		//window.location.href="againdivideTaskSys.html?CMPGN_ID="+CMPGN_ID+"&CMPGN_NM="+CMPGN_NM+"&CMPGN_INVLD_DATE="+CMPGN_INVLD_DATE;
	}

	return { init:init };
});
