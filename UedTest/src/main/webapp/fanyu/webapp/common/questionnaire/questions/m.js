define(['handlebars', 'text!tpl/questionaire/questions.tpl'
	, 'jquery', 'underscore', 'market.common']
	, function(Handlebars, tpl, $, _, common){

	var $el = null;
	var init = function(){
		$el = $(tpl);
		svrMapInit();
	}
	var svrMapInit = function(){
		srvMap.add('questionaire-basicAppend', 'data/questionnaire/basicAppend.json', 'front/sh/market!index');//班组长查询未分配任务数量
	}
	var save = function(successCallback){
		var param = $el.serialize();
		Util.ajax.postJsonSync(srvMap.get('questionaire-basicAppend'), param, function(json, status) {
			if (status != 0) {
				Util.dialog.tips("保存失败");
			}else{ 
				successCallback && successCallback(); 
			}
		});
	}

	return { getTpl:function(){ return $el; }, init:init, save:save };
});