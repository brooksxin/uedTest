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

    $.fn.tempAppend = function(template, data) {
        if(template instanceof jQuery){
            template = template.val();
        }
	    compiled[template] = Handlebars.compile(template);
	    this.append(compiled[template](data));
	    return this;
    };
})(jQuery);

function openWindowDiv(D_param, callback){
	var newParam = $.extend({},{
		id: "",
		title: "",
		content: ""
	},D_param);
	var d = dialog(newParam);
	var block = '<div style="opacity: 0.2;filter:alpha(opacity=20); background: none repeat scroll 0% 0% rgb(0, 0, 0); position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; -moz-user-select: none; z-index: 1024;" tabindex="0" class="ui-popup-backdrop zui-dialog-pop"></div>';
	$("body").prepend($(block));

	d.addEventListener('show', function () {
	    if(typeof callback == 'function'){
	    	callback(this);
	    }
	});
	d.addEventListener('close', function(){
		$('body .zui-dialog-pop').eq(0).remove();
	})
	d.show();
}

function result_tips(content, time, callback){
	var d = dialog({
	    content: content||"数据正在提交..."
	});
	if(!time)
		time = 2000;
	else
		time = parseInt(time*1000, 10);
	d.addEventListener('close', function () {
	    if(typeof callback == 'function'){
	    	callback(this);
	    }
	});
	d.show();
	setTimeout(function () {
	    d.close().remove();
	}, time);
}
function result_prompt(content, callback){
	dialog({
	    title: '消息',
	    content: '<p style="font-size:14px;width:240px;word-wrap:break-word;word-break: break-all;">'+content+'</p>',
	    button: [
            {
                value: '确定',
                callback: function () {
    	    		this.close().remove();
                },
                autofocus: true
            }
        ],
        onclose: function(){
            if(typeof callback == 'function'){
	    		callback(this);
	    	}
        }
	}).show();
}
function result_comfirm(content, cbSure, cbRefuse){
	dialog({
	    title: '提示',
	    content: '<p style="font-size:14px;width:240px;word-wrap:break-word;word-break: break-all;">'+content+'</p>',
	    button: [
            {
                value: '取消',
                callback: function () {
            		if(typeof cbRefuse == 'function')
            			cbRefuse();
    	    		this.close().remove();
                },
                autofocus: false
            },
            {
                value: '确定',
                callback: function () {
            		if(typeof cbSure == 'function')
            			cbSure();
    	    		this.close().remove();
                },
                autofocus: true
            }
        ],
	    cancel: false
	}).show();
}
/*
 * 弹出确定框，第一个参数为提示信息，第二个参数为确定之后调用的函数，第二个参数为取消按钮调用的函数，不需要使用回调函数的时候可以不传
 * result_comfirm('测试',function(){alert(1);},function(){alert(2)});
 * */
function result_normalDiv(title, content, width, callback){
	var width = (width || '240')+"px";
	var d = dialog({
	    title: title,
	    content: '<p style="font-size:14px;width:'+width+';word-wrap:break-word;word-break: break-all;">'+content+'</p>',
	    quickClose: true// 点击空白处快速关闭
	});
	var block = '<div style="opacity: 0.2;filter:alpha(opacity=20); background: none repeat scroll 0% 0% rgb(0, 0, 0); position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; overflow: hidden; -moz-user-select: none; z-index: 1024;" tabindex="0" class="ui-popup-backdrop zui-dialog-pop"></div>';
	$("body").prepend($(block));

	d.addEventListener('show', function () {
	    if(typeof callback == 'function'){
	    	callback(this);
	    }
	});
	d.addEventListener('close', function(){
		$('body .zui-dialog-pop').eq(0).remove();
	})
	d.show();
}

//分页方法
function getPage(pageParam,callback){
	var newPageParam = $.extend({},{
		url: "ui/json/tableData.json?1=1",
		page_index: "0",
		perPage: "10",
		onepage: true,
		formStr: "",
		paginId: "Pagination",
		dataContainId: "dataTbody",
		blockId: "dataTable",
		dataTpl: "dataTbl_tpl",
		linkTo: "dataTable",
		gotoPage: "gotoPage"
	},pageParam);
	createBlock(newPageParam.linkTo);

  	//跳转页面时将goto 的值去除
	$("#"+newPageParam.gotoPage).val("");
  	$.PostJson(newPageParam.url, newPageParam.formStr+"&page="+newPageParam.page_index+"&rows="+newPageParam.perPage, function(state,json){
  		if(state=='success'){
  			if(json){
  				unBlock(newPageParam.linkTo);
			  	if(json.total){
			  		$("#"+newPageParam.dataContainId).temp($("#"+newPageParam.dataTpl).val() ,  json );
					if(newPageParam.onepage){
						$("#"+newPageParam.paginId).pagination( json.total , {
							'items_per_page'      : newPageParam.perPage,
							'num_display_entries' : 4,
							'num_edge_entries'    : 1,
							'link_to'             : '#'+newPageParam.linkTo ,
							'prev_text'           : "上一页",
							'next_text'           : "下一页",
							'call_callback_at_once' : false,  //控制分页控件第一次不触发callback.
							'gotoPage'            : newPageParam.gotoPage,
							'callback'            : function(page_index, jq){
								newPageParam = $.extend({},newPageParam,{
									page_index: page_index,
									onepage: false
								});
								getPage(newPageParam, callback);
							}
						});

						$(".dataTbl-bottom").show();

						if(typeof callback == 'function'){
							callback.call(json);
						}
						
						var checkWrap = $("#"+newPageParam.linkTo);
						var search_checkAll = checkWrap.find("input[name=dataCheckAll]");
						if(search_checkAll){
							search_checkAll.attr({"checked":false}).bind("click", function(e){
								stopEvent(e);
								checkWrap.find("input[name=dataCheck]").attr({"checked": $(this).is(":checked")});
							});
							$("#"+newPageParam.linkTo).find("input[name=dataCheck]").bind("click", function(e){
								stopEvent(e);
								var _checkL = checkWrap.find("input[name=dataCheck]:checked").length;
								var _totalL = checkWrap.find("input[name=dataCheck]").length;
								if(_checkL==_totalL){
									search_checkAll.attr({"checked": true});
								}else{
									search_checkAll.attr({"checked": false});
								}
							});
						}
					}
			  	}else {
			  		var _tdLength = $("#"+newPageParam.dataContainId).prev("thead").find("tr th").length;
			  		$("#"+newPageParam.dataContainId).html('<tr><td class="fn-center" colspan="'+_tdLength+'"><b>暂无数据，请更改搜索条件！</b></td><tr>');
			  	}
  			}else {
  				result_prompt(0,"数据格式返回错误！");
  			}
  		}else {
			result_prompt(0,"系统错误，请稍后再试！");
		}
  	})
}

//Loading提示
function createBlock(obj){
    if( $("#"+obj).find(".blockElement").length<1 ){
        $("#"+obj).block({ 
            message: '<div class="fn-loading">正在努力加载数据...</div>', 
            css: { border: '1px solid #DDD' , padding:"10px 20px" , textAlign: "left" ,width:'20%' } ,
            overlayCSS:{ 
                backgroundColor: '#333', 
                opacity:  0.2, 
                cursor: 'wait' 
            }
        });
    }
}
function unBlock(obj){
    $("#"+obj).unblock(); 
}

// 自动获取高度
function initIframe(){
    var iframe = $(".aui_outer").find("iframe");
    try{
    	var i_height =  $(iframe).height();
    	var b_height = $(iframe).contents().find('body').height();
    	if(b_height > i_height)
    		$(iframe).height(b_height);

    }catch (ex){
        //console.log("iframe 高度获取失败...")
    }
}
// window.setInterval("initIframe()", 400);

var conf = 0; //控制服务，0表示本地假数据，1表示远程服务器数据
var srvMap = (function(){
	var srcPref = ["ui/json/",""];//测试
    var dataArray = [
         {

         },
         {

         }
    ];
    
    return {
        add: function(uid, mockSrc, srvSrc) {
            dataArray[0][uid] = srcPref[conf] + mockSrc;
            dataArray[1][uid] = srcPref[conf] + srvSrc;         
        },
        get: function(uid) {
            return dataArray[conf][uid];
        },
        getAppPath:function(){
        	return srcPref[conf];
        },
        dataArrays:function(){
            return dataArray[conf];
        }
    };
})(jQuery);
window.dataArray = srvMap.dataArrays();

/**
 * 获取ie版本
 * http://www.5ycode.com/353
**/
window._IE = (function(){
    var v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');
    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );
    return v > 4 ? v : false ;
}());

/**
* 滚动条优化(竖直方向)
**/
function zuiScroll(obj,width,height){
	var width = width || 300,
		height = height || 100;
	if(obj instanceof jQuery){
		obj.css({"width": width+"px"}).find(".viewport").css({"width": (width-20)+"px","height": height+"px"}).end().tinyscrollbar();
	}
}

$(function(){
	
})

