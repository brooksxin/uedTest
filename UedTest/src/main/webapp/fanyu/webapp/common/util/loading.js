
define(['text!tpl/util/loading.tpl', 'style!css/util/loading.css'], function(source) {
        //return an object to define the "my/shirt" module.
        var $el = $(source);
        var fun = function(){
        	$('body').append($el);
        }
        var elDestroy = function(){
        	$el.remove();
        }
        return { init:fun, destroy:elDestroy };
    }
);
