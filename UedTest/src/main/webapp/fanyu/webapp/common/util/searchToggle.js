define(['jquery'], function ($) {
    //表单开关
    var fn = function($container){
    	var $search_table = $container ? $('.search_table', $container) :$('.search_table');
	    if ($search_table.length > 0 ) {
	        var $seeMoreFilter = $('.seeMoreFilter', $container);
	        var $searchMore = $('.searchMore', $container);
	        if ($searchMore.length <= 0) {
	            $seeMoreFilter.length && $seeMoreFilter.hide();
	        } else if ($seeMoreFilter.length > 0) {
	            $seeMoreFilter.find('a').on('click', function(e){
	                var $el = $(e.currentTarget);
	                var $link = $el;
	                if ($link.attr('class').indexOf('down') >= 0) {
	                    $link.removeClass('down').addClass('up');
	                    $searchMore.show();
	                }else{
	                    $link.removeClass('up').addClass('down');
	                    $searchMore.hide();
	                    $searchMore.find('input[type=text]').val('');
	                }
	            });
	        }
	        
	        $search_table.delegate('input', 'keypress', function(e){
	            if (e.keyCode == 13) {
	            	$('#Query,#J_search').trigger("click");
	                return false;
	            }
	        })
	    };
    }
    
    return {init:fn}
});