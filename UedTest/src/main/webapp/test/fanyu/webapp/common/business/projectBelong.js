
/*
 问卷类型 下拉框
*/
define(['handlebars', 'jquery', 'text!tpl/business/select.tpl']
	, function(Handlebars, $, tpl){

	var $el = null;
	var _options = null;
	var init = function(options){
		_options = options;
		//$el = $('<select class="selectStyle w160"></select>');
		$el = $('<div></div>');
		$el.append($('<select class="FormInputText selectStyle w160 province"></select>'));
		if (options){
			$el.find('select').addClass(options.className).attr('name', options.name);
		}
		//$el.append($('<select class="selectStyle w160 city"></select>'));

		svrMapInit();
		eventInit();
		provinceInit();
	}
	var eventInit = function(){
		//$el.on('change', '.province', cityInit);
	}
	/*var cityInit = function(e){
		//debugger;
		var provinceID = 0;
		var param = { provinceID:provinceID };
		Util.ajax.postJsonSync(srvMap.get('business-projectBelong'), param, function(json, status) {
			$city = $('.city', $el);
			if (status != 0) {
				$city.html(Handlebars.compile(tpl)(json));
			}else{ 
				//$el.html('<div>数据加载失败...</div>');
			}
		});
	}*/
	var provinceInit = function(){
		var param = {};
		Util.ajax.postJsonSync(srvMap.get('business-projectBelong'), param, $.proxy(function(json, status) {
			$province = $('.province', $el);
			if (status != 0) {
				jsonDpet=json.object;
				if(jsonDpet && jsonDpet.length != 0){
					for (var i = 0; i < jsonDpet.length; i++) {
						$province.append("<option value='"+jsonDpet[i]['TGT_PTY_ID']+"'>"+jsonDpet[i]['PTY_NM']+"</option>");
					};
				}
				// $province.html(Handlebars.compile(tpl)(json));
				 $province.val((_options && _options.defaultValue) || '');
			}else{ 
				$el.html('<div>数据加载失败...</div>');
			}
		}, this));
	}
	var svrMapInit = function(){

		srvMap.add('business-projectBelong', 'query.json', 'front/sh/user!userinfo?uid=u011');//查询所属机构列表
		//srvMap.add('business-projectBelong', 'business/projectBelong.json', 'data/business/projectBelong.json');
	}
	

	return { getTpl:function(){ return $el; }, init:init };
});