
define(['jquery'], function($){
	var fn = function($el, keepElement){
		$busi_iframe = $('#J_busi_iframe'), $busi_div = $('#J_busi_div');
		$busi_iframe.hide();
		if (!keepElement){
			$busi_div.empty().append($el).show();
		}else{
			$busi_div.append($el).show();
		}
	}
	return { append:fn };
});
