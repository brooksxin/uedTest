define(['text!tpl/system/smsList.tpl'],function(mainTpl){
	var $el = null;

	var getTpl = function(){
		return $el;
	};
	var init = function(){
		$el = $(mainTpl);
		srvMap.add('sms','sms.json','front/sh/common!smsRs');
		var param={'uid':'c001','flag':'phone'},
			loadingHtml = '<div class="ui-loading"><h1><img src="../../css/images/loading.gif" alt="loading">正在加载，请稍等 ...</h1></div>';

		$el.on('click','#J_endCalling',function(){
			$(this).parent().addClass('ui-tab-item-current').siblings('li').removeClass('ui-tab-item-current');
			$('#J_sms').html(loadingHtml);
			require(['text!tpl/system/endCalling.tpl','common/system/endCalling'],function(tpl,appoFun){
				var param1={'uid':'c002','flag':'appointment'};
				Util.ajax.postJson(srvMap.get("sms"),{'uid':'c001','flag':'phone'}, function(json,flag){
					if (flag) {
						Util.ajax.loadTemp('#J_sms',tpl,json);//加载模板
						appoFun.init();
					};
				});
			})
		});
		$el.find('#J_endCalling').trigger('click');

		$el.on('click','#J_appoint',function(){
			$(this).parent().addClass('ui-tab-item-current').siblings('li').removeClass('ui-tab-item-current');
			$('#J_sms').html(loadingHtml);
			require(['text!tpl/system/appointment.tpl','common/system/appointment'],function(tpl,appoFun){
				Util.ajax.postJson(srvMap.get("sms"), {'uid':'c002','flag':'appointment'}, function(json,flag){
					if (flag) {
						Util.ajax.loadTemp('#J_sms',tpl,json);//加载模板
						appoFun.init();
					};
				});
			})
		})

		$el.on('click','#J_goodInfo',function(){
			$(this).parent().addClass('ui-tab-item-current').siblings('li').removeClass('ui-tab-item-current');
			$('#J_sms').html(loadingHtml);
			require(['text!tpl/system/goodInfo.tpl','common/system/goodInfo'],function(tpl,appoFun){
				Util.ajax.postJson(srvMap.get("sms"),{'uid':'c001','flag':'goodInfo'}, function(json,flag){
					if (flag) {
						Util.ajax.loadTemp('#J_sms',tpl,json);//加载模板
						appoFun.init();
					};
				});
			})
		})
		$el.on('click','#J_saleService',function(){
			$(this).parent().addClass('ui-tab-item-current').siblings('li').removeClass('ui-tab-item-current');
			$('#J_sms').html(loadingHtml);
			require(['text!tpl/system/saleService.tpl','common/system/saleService'],function(tpl,appoFun){

				Util.ajax.postJson(srvMap.get("sms"),{'uid':'c001','flag':'sales'}, function(json,flag){
					if (flag) {
		    			Util.ajax.loadTemp('#J_sms',tpl,json);//加载模板

		    			srvMap.add('coopPrnr','coopPrnr.json','front/sh/user!partnerInfo');
				   	 	//加载下拉列表
					   	Util.ajax.postJson(srvMap.get("coopPrnr"), {'uid':'u001'}, function(json,flag){
					   		var _html = '<option value="">全部</option>'+
								'{{#each beans}}<option value="{{PTY_ID}}">{{PTY_NM}}</option>{{/each}}';
					    	Util.ajax.loadTemp('#J_coop',_html,json);
					    });
					   	
					   	//加载新增短信模板
				    	Util.ajax.postJson(srvMap.get("sms"), {'uid':'c002','flag':'sales'}, function(json,flag){
				    		var _html = '<table width="100%" border="0" cellspacing="0" cellpadding="0">'+
				    		  	'<tr>'+
				    		        '<td style="color:#cfcfcf">使用场景：{{bean.CMN_CD_VAL_NM}}</div></td>'+
				    		        '<td width="162">'+
				    		        	'<div class="normalBtnArea ft-right mt-5" style="width:162px">'+
				    		        		'<a class="normalBtn BGblue" href="javascript:;" id="J_addSmsTemp" CD_VAL="{{bean.CD_VAL}}" CMN_CD_VAL_NM="{{bean.CMN_CD_VAL_NM}}">添加商家售后短信模板</a>'+
				    		        	'</div>'+
				    		        '</td>'+
				    		  	'</tr>'+
				    		'</table>';
				        	Util.ajax.loadTemp('#J_title',_html,json);//加载模板

				        	require(['common/system/addAfterSaleSmsTpl'],function(fn){
				        		fn.addSmsTpl();
				        	})
				        });

						appoFun.init();
					};
				});
			})
		})
		$el.on('click','#J_tailService',function(){
					$(this).parent().addClass('ui-tab-item-current').siblings('li').removeClass('ui-tab-item-current');
					$('#J_sms').html(loadingHtml);
					require(['text!tpl/system/tailService.tpl','common/system/tailService'],function(tpl,appoFun){
						Util.ajax.postJson(srvMap.get("sms"),{'uid':'c001','flag':'tail'}, function(json,flag){
							if (flag) {
								Util.ajax.loadTemp('#J_sms',tpl,json);//加载模板
								appoFun.init();
							};
						});
					})
		})
	}
	return {getTpl:getTpl,init:init};
})