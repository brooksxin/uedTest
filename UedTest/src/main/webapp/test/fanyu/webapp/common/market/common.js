 
function numSign(srcObj, container){
	var boxUpdate = function($tr){
		var $box = $tr.find('.ui-count-ipt');
		var $checkBox = $('input[type=checkbox]', $tr);
		if ($checkBox.is(':checked') && $box.val() == '0'){
			$box.addClass('fn-red');
		}else{
			$box.removeClass('fn-red');
		} 
	}
	if (srcObj){
		boxUpdate($(srcObj).parent().parent().parent());
	}
	else{
		var $trCheckeds = checkedGets(false, container);
		_.each($trCheckeds, function(obj, i) {
			boxUpdate($(obj));
		})
	}
}

function checkedGets(pickZero, container){
	var $tbody = container ? $('#J_tabletpl', container) : $('#J_tabletpl');
	var $trs = $tbody.children();
	var $trCheckeds = _.filter($trs, function(tr) {
		var $tr = $(tr);
		if (pickZero){
			return $tr.find('input[type=checkbox]').is(':checked') && $tr.find('input[type=text]').val() == 0;
		}else{
			return $tr.find('input[type=checkbox]').is(':checked');
		}
		//return $tr.find('input[type=checkbox]').is(':checked') && ((pickZero && $tr.find('input[type=text]').val() == 0) || true);
	});
	return $trCheckeds;
}

//这样写仅仅是为了兼容旧时的代码，函数曝露在公共作用域内是不可取的
//这可能会导致 Mismatched anonymous define() module 错误，这是由于在页面上直接引用模块引起的，不会中断程序的运行
define('market.common', [], function(){
	return { numSign:numSign, checkedGets:checkedGets };
});
