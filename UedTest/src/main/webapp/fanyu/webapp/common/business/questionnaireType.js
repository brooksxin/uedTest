
/*
 问卷类型 下拉框
*/
define(['handlebars', 'jquery', 'text!tpl/business/select.tpl']
	, function(Handlebars, $, tpl){

	var $el = null;
	var _options = null;
	var init = function(options){
		_options = options;
		$el = $('<select class="FormInputText selectStyle w323"></select>');
		if (options){
			$el.addClass(options.className).attr('name', options.name);
		}
		svrMapInit();
		loadData();
	}
	var loadData = function(){
		var param = {}
		Util.ajax.postJsonSync(srvMap.get('business-questionaireType'), param, function(json, status) {
			if (status != 0) {
				$el.html(Handlebars.compile(tpl)(json));
				$el.val((_options && _options.defaultValue) || '');
			}else{ 
				$el = $('<div>数据加载失败...</div>');
			}
		});
	}
	var svrMapInit = function(){
		srvMap.add('business-questionaireType', 'business/questionaireType.json', 'data/business/questionaireType.json');
	}
	

	return { getTpl:function(){ return $el; }, init:init };
});