define(['handlebars', 'text!tpl/market/orderDivideToday-Setting.tpl', 'jquery'], function(Handlebars, tpl, $){

	var _el = null, _callback = null, _d = null;
	var init = function(json, callback){
		_callback = callback;
		var template = Handlebars.compile(tpl);
		var d = dialog({
			fixed: true,
			title: '任务数量设置',
			//_callback
			content:template(json), 
			width:380, height:60,
			okValue: '确定',
			ok: confirm,
		});
		d.show();
		_el = d.node;
		_d = d;
		setTimeout(function() {
			$('input.groupGoal', _el).focus().select();
		}, 500);
	}
	var confirm = function(e){
		var groupGoal = $('input.groupGoal', _el).val() || 0;
		_callback(groupGoal);
		_d.remove();
	}
	return { init:init };
});

		/*var $ftRight = $('.listTopTips .ft-right');
		var $count = $('#count', $ftRight).html(count);
		
		$count.html(groupGoal);
		$('#TSK_QTY', $ftRight).val(groupGoal);
		count = groupGoal;
		distributeTask();*/
