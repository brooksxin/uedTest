define(['handlebars', 'text!tpl/market/taskprogresssys.tpl', 'text!tpl/market/taskprogresssys-list.tpl'
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
	var _mainPage = "/ecp/module/market/campgnList.html";

	var init = function(json, callback){
		srvMap.add('userinfo', 'user.json', 'front/sh/user!session');//用户信息查询
		srvMap.add('getcount', 'count.json', 'front/sh/market!index');//班组长查询未分配任务数量

		CMPGN_ID = json.CMPGN_ID;
		CMPGN_NM=  decodeURI(json.CMPGN_NM);//活动名称
		CMPGN_EFF_DATE=  decodeURI(json.CMPGN_EFF_DATE);//活动结束日期
		CMPGN_INVLD_DATE=  decodeURI(json.CMPGN_INVLD_DATE);//活动结束日期 
		CMPGN_STS_CD=decodeURI(json.CMPGN_STS_CD);
		panelInit();
		eventInit();
		listInit();
		
		//$('.againDivide', )

	}
	var eventInit = function(){
		var $el = $(_el);
		$el.on('click', '.againDivide', againDivide);
	}
	var listInit = function(){
		var param2={"uid":"mwt006","CMPGN_ID":CMPGN_ID,"type":"1","CMPGN_STS_CD":CMPGN_STS_CD};
		Util.ajax.postJsonSync(srvMap.get('getcount'), param2, function(json, status) {
			if (status) {
				//console.log(json);
				var beans=json.beans;
				$('#J_tabletpl', _el).html(Handlebars.compile(listTpl)(json));
				for(var i=0;i<beans.length;i++){
					//如果是随机分配的时候 将 进度和数量换为“/”
					if(beans[i].TSK_ALCT_MODE_CD == "01"){
						//$('#J_tabletpl').find('tr').eq(i).find('td').eq(3).html("/");
						$('._progress',_el).html('/');
						$('.cm_num',_el).html('/');
					}
				}
			}
				
		});

	}
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
		var param1={"uid":"mc004","CMPGN_ID":CMPGN_ID,"type":"0"};
		Util.ajax.postJsonSync(srvMap.get('getcount'), param1, function(json, status) {
			if (status) {
				var count = json.bean.count;
				$("#count", _el).html(count);
				$("#total", _el).html(json.bean.total);
			}
		});
	}
	var againDivide = function(){
		var elem = $('<div class="fn-hide"><div class="warn-wrapper"><div class="warn-logo"></div><div class="warn-text"><span style="color:red;">警告：</span>重新分配会导致该活动处于暂停状态！请谨慎操作！</div></div></div>');

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
	                require(['common/market/againdivideTaskSys', ], function(Main){
	                	_dialog.remove();
						Main.init({ CMPGN_ID:CMPGN_ID, CMPGN_NM:CMPGN_NM, CMPGN_EFF_DATE:CMPGN_EFF_DATE, CMPGN_INVLD_DATE:CMPGN_INVLD_DATE }, Loading, function(){
							window.location.href = _mainPage;
							//listInit();
						});
	                });

	              });
	              /*
	              window.location.href="../market/againdivideTaskSys.html?"
	            	  + "CMPGN_ID="+CMPGN_ID+"&CMPGN_NM="+CMPGN_NM+"&CMPGN_EFF_DATE="
	            	  +CMPGN_EFF_DATE+"&CMPGN_INVLD_DATE="+CMPGN_INVLD_DATE; */
	        },
	        cancelVal:'取消',
	        cancelCallback:function(){}
	      }

	      Util.dialog.openDiv(params);
		
		
		
		//window.location.href="againdivideTaskSys.html?CMPGN_ID="+CMPGN_ID+"&CMPGN_NM="+CMPGN_NM+"&CMPGN_INVLD_DATE="+CMPGN_INVLD_DATE;
	}

	return { init:init };
});