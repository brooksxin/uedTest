
define(['jquery'], function($){
	var fn = function($el){
		$busi_iframe = $('#J_busi_iframe'), $busi_div = $('#J_busi_div');
		$busi_iframe.show();
		$busi_div.hide();
		$busi_iframe.attr('src', $el);
	}
	return { append:fn };
});
