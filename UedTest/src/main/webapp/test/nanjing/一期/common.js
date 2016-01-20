/*
* 扩展jQuery的Ajax方法，用于异步获取数据
* get方式，post方式，json返回
* 2个比较重要：GetJson  , PostJson
*/
(function($){
    $.extend({
        /*
        * post方式提交数据，适用于大数据提交。返回的JSON要符合规范。
        * 引号不能去掉。完整写法：{"key" , "value"}
        */
        PostJson: function(url, datas , callback) {
        	$.ajax({
                url: url,
                type: "POST",
                data : datas +"&_=" + (new Date()).getTime(),
                cache: false,
                dataType: "json",
                //async:false,//add by lufm 改为同步，后面需要讨论
				beforeSend: function (xhr) {
				    xhr.overrideMimeType("text/plain; charset=utf-8");
				},
                success: function(json) {
                    callback("success", json);
                },
                error: function(e) {
                    callback("error", null);
                }
            });
        }
    });
})(jQuery);

/*
 * 获取url参数，多个参数
 * //Get object of URL parameters
 * var allVars = $.getUrlVars();
 * //Getting URL var by its nam
 * var getName = $.getUrlVar('name');
 */
(function($){
	$.extend({
	    getUrlVars: function(){
	        var vars = [], hash;
	        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	        for(var i = 0; i < hashes.length; i++)
	        {
	          hash = hashes[i].split('=');
	          vars.push(hash[0]);
	          vars[hash[0]] = hash[1];
	        }
	        return vars;
	    },
	    getUrlVar: function(name){
	    	return $.getUrlVars()[name];
	    }
	});
})(jQuery)

//阻止事件冒泡
function stopEvent(e){
    if(e && e.stopPropagation ){
        e.stopPropagation();
    }else{
        window.event.cancelBubble = true;
	}
}

var NiceTools = {
	/*
	 * 功能:删除数组元素.
	 * 参数:dx删除元素的下标.
	 * 返回:在原数组上删除后的数组
	 */
	removeByIndex : function(arrays , dx){
		if(isNaN(dx)||dx>arrays.length){return false;}
		for(var i=0,n=0;i<arrays.length;i++)
		{
			if(arrays[i]!=arrays[dx])
			{
				arrays[n++]=arrays[i]
			}
		}
		arrays.length-=1
		return arrays;
	},
	//删除指定的item,根据数组中的值
	removeByValue : function(arrays, item ){
			for( var i = 0 ; i < arrays.length ; i++ ){
				if( item == arrays[i] )
				{
					break;
				}
			}
			if( i == arrays.length ){
				return;
			}
			for( var j = i ; j < arrays.length - 1 ; j++ ){
				arrays[ j ] = arrays[ j + 1 ];
			}
			arrays.length--;
			return arrays;
	}
}

$(function(){
	//顶部公用下拉框
	if($("#G_userInfo")){
		$("#G_userInfo .ui-button").click(function(){
			var _next = $(this).next();
			if(_next.is(":visible")){
				_next.hide();
			}else{
				_next.show();
			}
			return false;
		});
		$(document).click(function(e){
			$("#G_userInfo .ui-button-dropdown-small").hide();
			e.stopPropagation();
		})
		// $("#G_userInfo .ui-button-dropdown-item a").click(function(){
		// 	var idx = $(this).data("idx");
		// 	alert(idx)
		// 	return false;
		// });
	}

	$("#userBaseInfo").click(function(){
		$('#testWindow').show().window({
		    title: '测试',
		    width: 650,
		    height: 350,
		    shadow: true,
		    modal: true,
		    closed: true,
		    minimizable: false,
		    maximizable: false,
		    collapsible: false
		}).window("open");
	})

	//左侧目录
	$.PostJson("menu.json?1=1","",function(state,json){
		if(state=='success'){
			if(json){
				$('#contentMenu').temp( $('#menu_tpl'),  json );
				$("#contentMenu .menu-tit").click(function(){
					var _self = $(this);
					var _others = $(".menu-tit").not(_self);
					_others.removeClass("cur").next().stop(true,true).slideUp('normal');
					if(_self.next().is(':hidden')){
						_self.addClass("cur").next().slideDown('normal');
					}else{
						_self.next().slideUp('normal');
					}
				})
			}
		}
	})
})

/*
    handlebars扩展
    eg:
	$('#content').temp( $('#template'),  { name: "Alan" } );
	$('#content').temp( 'string' ,  { name: "Alan" } );
*/
;(function($){
    var compiled = {};
    $.fn.temp = function(template, data) {
        if(template instanceof jQuery){
            template = template.val();
        }
	    compiled[template] = Handlebars.compile(template);
	    this.html(compiled[template](data));
	    return this;
    };
})(jQuery);

window.aui = {
	datatimebox_clean : function(obj){
		console.log("888")
		obj.datetimebox('setValue', '');
	}
}