/*
* 扩展jQuery的Ajax方法，用于异步获取数据
* get方式，post方式，json返回
* 2个比较重要：GetJson  , PostJson
*/
(function($){
    $.extend({
    	/*
    	* 基本的ajax，返回html 
    	*/
        AjaxHtml: function(url, datas , callback) {
            $.ajax({
                url: url ,
                type: "GET",
                data : datas +"&_=" + (new Date()).getTime(),
                cache: false,
                dataType: "html",
				beforeSend: function (xhr) {
				    xhr.overrideMimeType("text/plain; charset=utf-8");
				},
                success: function(html) {
                    callback("success", html);
                },
                error: function() {
                    callback("error", null);
                }
            });
        },
        /*
        * get方式请求数据。返回的JSON要符合规范。
        * 引号不能去掉。完整写法：{"key","value"}
        */
        GetJson: function(url, datas , callback) {
        	$.ajax({
                url: url,
                type: "GET",
                data : datas +"&_=" + (new Date()).getTime(),
                cache: false,
                dataType: "json",
				beforeSend: function (xhr) {
				    xhr.overrideMimeType("text/plain; charset=utf-8");
				},
                success: function(json) {
                    //callback("success", json);
                    //符合Wade框架
                    callback("success", json.data);
                },
                error: function(e) {
                    callback("error", null);
                }
            });
        },
        /*
        * 这个是返回text json，json写法可以不规范。但不建议使用此方法，因为此方法使用了eval.
        */
        GetJson2: function(url, datas , callback) {
        	$.ajax({
                url: url,
                type: "GET",
                data : datas +"&_=" + (new Date()).getTime(),
                cache: false,
                dataType: "text",
				beforeSend: function (xhr) {
				    xhr.overrideMimeType("text/plain; charset=utf-8");
				},
                success: function(json) {
                	/**/
                	try{
                    	json=eval('('+json+')');
                	}
                	catch(e){
                		callback("error", null);
                		return;
                	}
                    //callback("success", json);
                    //符合Wade框架
                    callback("success", json.data);
                },
                error: function(e) {
                    callback("error", null);
                }
            });
        },
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
                    if(json.data && json.data.returnCode && json.data.returnMessage && json.data.returnCode!='0'&& (json.data.returnMessage.indexOf("Destination unreachable")>-1) ){
                        window.location.href = "business?service=page/PageError500";
                    }else if (json.data && json.data.returnCode && json.data.returnMessage && json.data.returnCode=='530') {
                        window.location.href = "/";
                    }else{
                        //callback("success", json);
                        //符合Wade框架
                        callback("success", json.data);
                    }
                },
                error: function(e) {
                    callback("error", null);
                }
            });
        },
        /*
        * 这个是返回text json，json写法可以不规范。但不建议使用此方法，因为此方法使用了eval.
        */
        PostJson2: function(url, datas , callback) {
        	$.ajax({
                url: url,
                type: "POST",
                data : datas +"&_=" + (new Date()).getTime(),
                cache: false,
                dataType: "text",
				beforeSend: function (xhr) {
				    xhr.overrideMimeType("text/plain; charset=utf-8");
				},
                success: function(json) {
                	try{
                    	json=eval('('+json+')');
                	}
                	catch(e){
                		callback("error", null);
                		return;
                	}
                    //callback("success", json);
                    //符合Wade框架
                    callback("success", json.data);
                },
                error: function(e) {
                    callback("error", null);
                }
            });
        },
        /*
        * 使用同步方式，post方式提交数据，适用于大数据提交。返回的JSON要符合规范。
        * 引号不能去掉。完整写法：{"key" , "value"}
        */
        PostJsonAsync: function(url, datas , callback) {
            $.ajax({
                url: url,
                type: "POST",
                data : datas +"&_=" + (new Date()).getTime(),
                cache: false,
                dataType: "json",
                async:false, //使用同步方式
                beforeSend: function (xhr) {
                    xhr.overrideMimeType("text/plain; charset=utf-8");
                },
                success: function(json) {
                    if(json.data && json.data.returnCode && json.data.returnMessage && json.data.returnCode!='0'&& (json.data.returnMessage.indexOf("Destination unreachable")>-1) ){
                        window.location.href = "business?service=page/PageError500";
                    }else if (json.data && json.data.returnCode && json.data.returnMessage && json.data.returnCode=='530') {
                        window.location.href = "/";
                    }else{
                        //callback("success", json);
                        //符合Wade框架
                        callback("success", json.data);
                    }
                },
                error: function(e) {
                    callback("error", null);
                }
            });
        }
    });
})(jQuery);


/*
    NiceSelect ： 获取下拉框
    参数设置：
    {
        url:"添加",
        datas:"",
        id : "J_form_add",
        name : "J_form_add",
        handler:function(){
          //do...
        }
    }

    eg:
    {
        url:"business?service=ajax&page=Common&listener=getStaticData",
        datas:"codeType="+codeType,
        id:"testId",
        name:"testId"
    }
*/
;(function($){
    $.fn.extend({
        "NiceSelectV2":function(options){
            var _self = this;
            options = $.extend({
                url:"business?service=ajax&page=Common&listener=getStaticData",
                datas:"codeType=test",
                id:"testId",
                name:"testId",
                key :"CODE_VALUE",
                value:"CODE_NAME",
                defaultValue:"",
                all:false, //是否显示"所有",值是"" 。 默认显示"请选择"，值是"" 
                allVal:"",
                handler:function(){ //onchange事件
                    //do...
                }, 
                callback:function(){ //回调事件
                    //do...
                }
            },options);
            sendAjax();
            function sendAjax(){
                $.PostJson(options.url, options.datas , ajaxCallback);
            }
            function errorAjax(){
                var $a = $('<a href="javascript:;">重新加载数据</a>')
                .bind("click",function(){
                    sendAjax();
                });
                _self.html($a);
            }
            function ajaxCallback(state,json){
                //判断状态,是否成功
                if(state=="success"){
                    //判断状态,是否成功
                    if(json.returnCode=="0"){
                        var ops = $('<select class="element text" id="'+options.id+'" name="'+options.name+'"></select>');
                    	var opsone = '';
                    	if( (typeof options.all=="boolean")&&(options.all.constructor==Boolean) ){
                        	if(options.all){
                        		opsone = '<option value="">所有</option>';
                        	}else{
                        		opsone = '<option value="">请选择</option>';
                        	}
                    	}else{
                    		if(options.all!=""){
                        		opsone = '<option value="'+options.allVal+'">'+options.all+'</option>';
                        	}else{
                        		opsone = '';
                        	}
                    	}
                    	$(opsone).appendTo(ops);
                        for(var i=0;i<json.beans.length;i++){
                        	//添加设置默认值
                        	var sel = (json.beans[i][options.key]==options.defaultValue) ? "selected='selected'" :"" ;
                            $('<option value="'+json.beans[i][options.key]+'" '+sel+' >'+json.beans[i][options.value]+'</option>')
                                .appendTo(ops);
                        }
                        ops.bind("change",options.handler);
                        _self.html(ops);
                        
                        //触发回调函数
                        if (typeof options.callback == 'function') {
                        	options.callback.call(this);
                        }
                        
                    }else{
                        errorAjax();
                    }
                }else{
                    errorAjax();
                }
            }
            return this;
        },
        "NiceSelect":function(options){
            var _self = this;
            options = $.extend({
                url:"business?service=ajax&page=Common&listener=getStaticData",
                datas:"codeType=test",
                id:"testId",
                name:"testId",
                key :"CODE_VALUE",
                value:"CODE_NAME",
                defaultValue:"",
                all:false, //是否显示"所有",值是"" 。 默认显示"请选择"，值是"" 
                allVal:"",
                handler:function(){ //onchange事件
                    //do...
                }, 
                callback:function(){ //回调事件
                    //do...
                }
            },options);
            sendAjax();
            function sendAjax(){
                $.PostJson(options.url, options.datas , ajaxCallback);
            }
            function errorAjax(){
                var $a = $('<a href="javascript:;">重新加载数据</a>')
                .bind("click",function(){
                    sendAjax();
                });
                _self.html($a);
            }
            function ajaxCallback(state,json){
                //判断状态,是否成功
                if(state=="success"){
                    //判断状态,是否成功
                    if(json.returnCode=="0"){
                        var ops = '<select class="element text" id="'+options.id+'" name="'+options.name+'" >';
                        if(json.beans.length!=1){
                            if( (typeof options.all=="boolean")&&(options.all.constructor==Boolean) ){
                                if(options.all){
                                    ops += '<option value="">所有</option>'; 
                                }else{
                                    ops += '<option value="">所有</option>';
                                }
                            }else{
                                if(options.all!=""){
                                    ops += '<option value="'+options.allVal+'">'+options.all+'</option>';
                                }else{
                                    ops += '';
                                }
                            }
                        }
                        for(var i=0;i<json.beans.length;i++){
                        	//添加设置默认值
                        	var sel = "";
                        	if(options.defaultValue){
                        		sel = (json.beans[i][options.key]==options.defaultValue) ? "selected='selected'" :"" ;
                        	}
                        	ops += '<option value="'+json.beans[i][options.key]+'" '+sel+' >'+json.beans[i][options.value]+'</option>';
                        }
                        ops += '</select>';
                        _self.html( $(ops).bind("change",options.handler) );
                        
                        //触发回调函数
                        if (typeof options.callback == 'function') {
                        	options.callback.call(_self.find("select")[0]);
                        }
                        
                    	if(options.muti){
                    		
                    	}else{
                            //把下拉框变成可以输入的下拉框
                            _self.find("select").combobox();
                    	}
                       
                        
                    }else{
                        errorAjax();
                    }
                }else{
                    errorAjax();
                }
            }
            return this;
        }
    });
})(jQuery);




/*
    GridToolbar ： 工具条组件
    item设置：
        item: [{
            text:"添加",
            id : "J_form_add",
            bodyStyle : "add",
            handler:function(){
              //do...
            }
        }]

    bodyStyle目前支持的样式有：
    add,添加
    edit,修改
    delete,删除
    import,导出
    print,打印
    accept,同意
    refer,拒绝
    stop,终止
*/
;(function($){
    $.fn.extend({
        "gridToolbar":function(options){
            options=$.extend({
                item: []
            },options);
            if(options.item.length>0){
                var str1 = '<div class="flexigrid gridToolbar"><div class="tDiv"><div class="tDiv2"></div><div style="clear:both"></div></div></div>';
                var tDiv2 = $(this).append(str1).find(".tDiv2");
                var str3 = "";
                for(var i=0;i<options.item.length;i++){
                    $('<div class="fbutton"><div><span class="'+options.item[i].bodyStyle+'">'+options.item[i].text+'</span></div></div>')
                        .bind("click",options.item[i].handler)
                        .hover(function(){
                            $(this).addClass("fbOver");
                        },function(){
                            $(this).removeClass("fbOver");
                        })
                        .appendTo(tDiv2);
                }
            }
            return this;
        }
    });
})(jQuery);



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



;(function($){
    $.fn.extend({
        "popupDiv":function(options){
            options = $.extend({
               "wrapDiv":"body",
               "targetDiv":"targetDiv"
            },options);
            var _back = this;
            $("#"+options.wrapDiv).on("click", _back.selector ,function(){
            	var _self = $(this);
	 			var _top = _self.offset().top;
	 			var _left = _self.offset().left;
	 			var _itop = _self.outerHeight(true);
	 			$("#"+options.targetDiv).css({
	 				"position":"absolute",
	 				"left" : _left,
	 				"top" : _top + _itop + 1
	 			}).show();
	 		});
	 		var _buttons = $("#"+options.targetDiv).find(":button");
	 		/*
	 		_buttons.eq(0).click(function(){
	 			var _selects = $("#"+options.targetDiv).find("select");
	 			deVal.bean.key1 = _selects.eq(0).val();
	 			deVal.bean.key2 = _selects.eq(1).val();
	 			deVal.bean.key3 = _selects.eq(2).val();
	 			$( "#element_hid_1").val( _selects.eq(0).val() );
	 			$( "#element_hid_2").val( _selects.eq(1).val() );
	 			$( "#element_hid_3").val( _selects.eq(2).val() );
	 			$( _back.selector).val( _selects.eq(0).find("option:selected").text()+","+_selects.eq(1).find("option:selected").text()+","+_selects.eq(2).find("option:selected").text());
	 			$("#"+options.targetDiv).hide();
	 			//把值获取到
	 			//console.log( $("#"+options.targetDiv).find("select").serializeArray()  );
	 			//console.log( $("#"+options.targetDiv).find("select").serializeObject()  );
	 		})
	 		*/
	 		_buttons.eq(1).click(function(){
	 			$("#"+options.targetDiv).hide();
	 		})
            return _back;
        }
    });
})(jQuery);


/*
 * JTip
 * By Cody Lindley (http://www.codylindley.com)
 * Under an Attribution, Share Alike License
 * JTip is built on top of the very light weight jquery library.
 */
$(document).ready(function(){

	JT_init();

	function JT_init(){
	   $("#tablewidth").on("mouseenter","a.jTip",function(){
		   JT_show(this.href , this.id, $(this).data("title")||"" , $(this).data("width")||"300" , $(this).data("link")||""  );
	   }).on("mouseleave","a.jTip",function(){
		   $('#JT').remove();
	   }).on("click","a.jTip",function(){
		   return false;
	   });	   
	}

	function JT_show(url,linkId,title,width,link){
		if(title == false)title="&nbsp;";
		var de = document.documentElement;
		var w = self.innerWidth || (de&&de.clientWidth) || document.body.clientWidth;
		var hasArea = w - getAbsoluteLeft(linkId);
		var clickElementy = getAbsoluteTop(linkId) - 3; //set y position
		if(  (clickElementy + 372 )  >($(window).height()+ $(window).scrollTop())){
            clickElementy = $(window).height() - 372 + $(window).scrollTop();
        }

		var queryString = url.replace(/^[^\?]+\??/,'');
		var params = parseQuery( queryString );
		params['width'] = width;
		params['link'] = link;
		if(params['link']){
			$('#' + linkId).bind('click',function(){window.location = params['link']});
		}
		if(hasArea>((params['width']*1)+75)){
			$("body").append("<div id='JT' style='width:"+params['width']*1+"px'><div id='JT_close_left'>"+title+"</div><div id='JT_copy'><div class='JT_loader'><div></div></div>");//right side
			var arrowOffset = getElementWidth(linkId) + 11;
			var clickElementx = getAbsoluteLeft(linkId) + arrowOffset; //set x position
		}else{
			$("body").append("<div id='JT' style='width:"+params['width']*1+"px'><div id='JT_close_right'>"+title+"</div><div id='JT_copy'><div class='JT_loader'><div></div></div>");//left side
			var clickElementx = getAbsoluteLeft(linkId) - ((params['width']*1) + 15); //set x position
		}
		$('#JT').css({left: clickElementx+"px", top: clickElementy+"px"});
		$('#JT').show();
	    $.PostJson( url , "" , function(state,data){
			$('#JT_copy').temp( $('#T_BrandDetails') ,  data.bean );
	    });

	}

	function getElementWidth(objectId) {
		x = document.getElementById(objectId);
		return x.offsetWidth;
	}

	function getAbsoluteLeft(objectId) {
		// Get an object left position from the upper left viewport corner
		o = document.getElementById(objectId)
		oLeft = o.offsetLeft            // Get left position from the parent object
		while(o.offsetParent!=null) {   // Parse the parent hierarchy up to the document element
			oParent = o.offsetParent    // Get parent object reference
			oLeft += oParent.offsetLeft // Add parent left position
			o = oParent
		}
		return oLeft
	}

	function getAbsoluteTop(objectId) {
		// Get an object top position from the upper left viewport corner
		o = document.getElementById(objectId)
		oTop = o.offsetTop            // Get top position from the parent object
		while(o.offsetParent!=null) { // Parse the parent hierarchy up to the document element
			oParent = o.offsetParent  // Get parent object reference
			oTop += oParent.offsetTop // Add parent top position
			o = oParent
		}
		return oTop
	}

	function parseQuery ( query ) {
	   var Params = new Object ();
	   if ( ! query ) return Params; // return empty object
	   var Pairs = query.split(/[;&]/);
	   for ( var i = 0; i < Pairs.length; i++ ) {
	      var KeyVal = Pairs[i].split('=');
	      if ( ! KeyVal || KeyVal.length != 2 ) continue;
	      var key = unescape( KeyVal[0] );
	      var val = unescape( KeyVal[1] );
	      val = val.replace(/\+/g, ' ');
	      Params[key] = val;
	   }
	   return Params;
	}

	function blockEvents(evt) {
	  if(evt.target){
	  evt.preventDefault();
	  }else{
	  evt.returnValue = false;
	  }
	}

});


//阻止事件冒泡
function stopEvent(e){
    if(e && e.stopPropagation ){
        e.stopPropagation();
    }else{
        window.event.cancelBubble = true;
	}
}
//打开窗口
function openWindow(title,url,width,height){
	//art.dialog.data('tel',GLOBE_tel);//传递参数
	art.dialog.open( url , 
		{
		title: title,
		lock: true,
		width: width+'px',
		height: height+'px',
        opacity:.2
	},
	false);
}	
//关闭窗口	
function closeDialog(id){
	if(id){
    	art.dialog.list[id].close();
    }else{art.dialog.close();} 
}
//关闭所有窗口
function closeDialogDD(){
    //关闭所有
    var list = art.dialog.list;
    for (var i in list) {
        list[i].close();
    };
}
/*
//刷新表格
function gridReload(id){
	var id = id||"grid";
    if($('#'+id).omGrid)
    	$('#'+id).omGrid('reload');
}
*/
//刷新表格
function gridReload(id){
	var id = id||"grid";
    if($('#'+id).length){
    	$('#'+id).omGrid('reload');
    }else{
    	//pageParams.url+'&start='+(pageIndex*pageParams.items_per_page)+'&limit='+pageParams.items_per_page+'&'+str;
    	//alert( G_params.page_url   );
    	getDataList( G_params.page_index , true , G_params , G_params.page_params );
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
 * 按钮状态控制
 * */
function toggleButtonStyle(obj , istyle , txt ){
	if(istyle){
		$(obj).addClass("W_btn_a")
			.removeClass("W_btn_b")
			.html('<span><img class="icon_loading" title="正在提交中..." src="res/theme/alice/img/loading.gif">正在提交中...</span>');
	}else{
		$(obj).addClass("W_btn_b")
			.removeClass("W_btn_a")
			.html('<span>'+(txt||"提 交")+'</span>');
	}
}

/*
 * 导出数据方法
 * @url : 请求的后台地址
 * @start : 起始条数 
 * @limit ： 每页条数
 * 注：若导出全部，start和limit都传0
 */
function imtData(url,start,limit,data){
	url = url || G_params.url;
	if(start === undefined || start === null || start === ''){// 不传则设置初始值
		start = G_params.page_index * G_params.items_per_page;
	}
	if(limit === undefined || limit === null || limit === ''){// 不传则设置初始值
		limit = G_params.items_per_page;
	}
	data = data || $("#" + G_params.searchformId).serialize();
	window.open(url + "&p_export=1&start="+start+"&limit="+limit +"&"+ data );
}

/*
@pindex : 当前页
@onepage : 控制分页控件只初始化一次
@obj : JSON对象,放url以及各种id.
@str ： 表单搜索的数据
*/
function getDataList( pindex , onepage , obj , formStr ){
    createBlock();//添加loading提示
    var pageIndex = pindex; 
    var pageParams = obj;
    var str = formStr; //form序列化的数据 
	G_params.page_index = pindex;   //弹出窗口修改数据后，刷新当前页的数据需要用到这些数据.
	G_params.page_params = formStr;
    $.PostJson( pageParams.url ,'start='+(pageIndex*pageParams.items_per_page)+'&limit='+pageParams.items_per_page+'&'+str , function(state,json){
		var _page = $("#"+pageParams.pagination);
    	var _jcontrol = $("#J_table_control");
		if(state=="success"){
			if(json&&json.returnCode=='0'){
		    	//拼接页面 
		    	$("#"+pageParams.tablewrap).temp( $("#"+pageParams.tabletpl) , json.rows );
                //触发回调函数
                if (typeof obj.pageCallback == 'function') {
                    obj.pageCallback.call(_page);
                }
				//分页调用-只初始化一次  
		        if( onepage ){

		    		if(json.total<1){
		    			_jcontrol.hide();
		    			_page.html('<p class="ui-tiptext ui-tiptext-warning">'+
								    '<i class="ui-tiptext-icon" title="警告"></i>'+
								    '没有查询到数据,请更换查询条件!'+
									'</p>');
		    			_page.next().hide();
                        _page.prev().hide();
		    		}else{
		    			_jcontrol.show();
			            _page.pagination( json.total , {  
			                'items_per_page'      : pageParams.items_per_page,
			                'current_page': pageIndex ,
			                'num_display_entries' : 3,
			                'num_edge_entries'    : 1,  
			                'link_to': '#tradeRecordsIndex' ,
			                'prev_text'           : "上一页",  
			                'next_text'           : "下一页",  
			                'call_callback_at_once' : false,  //控制分页控件第一次不触发callback.
			                'callback'            : function(page_index, jq){  
														getDataList(page_index , false , pageParams , str );  
													}  
			            });  
			            _page.next().text("共"+json.total+"条").show();

			            if(_page.prev().length<1){
                            var $bf = $('<div class="fn-right fn-pt5 fn-pr10">'+
                                '每页<input type="text" class="element text" style="width:24px;" id="J_pagenum" title="输入数量后,请按回车" />条'+
                            '</div>');
				            _page.before($bf);
				            $bf.find("input").keyup(function(e){
                                var _self = $(this);
                                var newVal = _self.val().replace(/[^\d]/g,'');
                                //newVal = (newVal<1) ? 10 : newVal;
                                newVal = (newVal>500) ? 500 : newVal ;
                                _self.val(newVal);
                            }).keypress(function(e){
				                if(e.which==13){
                                    var _self = $(this);
                                    if(_self.val()<10){
                                        _self.val(10);
                                    }
				                	G_params.items_per_page = _self.val();
				                	$("#J_search").click();
				                }
				            });
			            }else{
                            _page.prev().show();
                        }
		    		}
		        }  
			}else{ 
				var _errorMsg = json.returnMessage ? ('查询数据失败！原因：'+json.returnMessage) : '加载数据失败,请稍后再试!' ;
    			_page.html('<p class="ui-tiptext ui-tiptext-warning">'+
					    '<i class="ui-tiptext-icon" title="警告"></i>'+
					    ''+_errorMsg+
						'</p>');
    			_jcontrol.hide();
    			_page.next().hide();
                _page.prev().hide();
			}
		}else{
			var _errorMsg = json.returnMessage ? ('查询数据失败！原因：'+json.returnMessage) : '加载数据失败,请稍后再试!' ;
			_page.html('<p class="ui-tiptext ui-tiptext-warning">'+
				    '<i class="ui-tiptext-icon" title="警告"></i>'+
				    ''+_errorMsg+
					'</p>');
			_jcontrol.hide();
			_page.next().hide();
            _page.prev().hide();
		}
		
        unBlock(); //隐藏loading提示
	});
}  

//Loading提示
function createBlock(){
    if( $("#tablewidth .blockElement").length<1 ){
        $('#tablewidth').block({ 
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
function unBlock(){
    $('#tablewidth').unblock(); 
}

function uiShowTab(obj,id){
    $(obj).parent().addClass("ui-tab-item-current").siblings().removeClass("ui-tab-item-current");
    $("#"+id).show().siblings().hide();
}
/*
* 框架模板
* version:2013.05.21
*/
(function($){
    /*
    * 打印控件
    * 基于LODOP套打控件，兼容IE,Firefox,Chrome.
    */
    var NBprint = {
        LODOP:'',
		init : function(setting){
			/* setting参数：
			 * {
			 * showMode : "PREVIEW_IN_BROWSE" , //打印模式，暂时不要 
			 * printTaskName : "标题" , 
             * printData : "打印数据"
			 * }
             * printData:{
             *    createTime:"开票日期",
             *    countMonth:"计费月份",
             *    clientName:"客户名称",
             *    phone:"电话号码",
             *    phoneCost:"终端费用",
             *    total:"总费用",
             *    totalUP:"总费用（大写）"
             *    operater:"操作员"
             *    addr:"组织"
             * }
			 * */
			this.LODOP = getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
		    try{
				if ((this.LODOP!=null)&&(typeof(this.LODOP.VERSION)!="undefined")) {
                    this.LODOP.SET_LICENSES("南京欣网视讯网络科技有限公司","253717576838577787994958093190","","");
                    return true;
				}else{
                    return false;
                }
			}catch(err){
					//alert("Error:本机未安装或需要升级!");
                    return false;
		 	}
		},
        makeBill:function(setting){
            var settingObj = setting;
            if(!settingObj.printData)return false;
            this.LODOP.PRINT_INIT(settingObj.printTaskName);
            //LODOP.SET_PRINT_PAGESIZE(0,2300,2600,"");
            this.LODOP.SET_PRINT_PAGESIZE(0,0,0,"A4");
            
            this.LODOP.SET_SHOW_MODE(settingObj.showMode,1);
            //ADD_PRINT_TEXT(top,left,width,height，str)
            var data=settingObj.printData;
            this.LODOP.ADD_PRINT_TEXT(97,150,120,20,data.createTime);
            this.LODOP.ADD_PRINT_TEXT(97,515,120,20,data.countMonth);
            this.LODOP.ADD_PRINT_TEXT(122,165,120,20,data.clientName);
            this.LODOP.ADD_PRINT_TEXT(122,510,120,20,data.phone);
            this.LODOP.ADD_PRINT_TEXT(165,100,70,20,'终端费用');
            this.LODOP.ADD_PRINT_TEXT(165,200,120,20,data.phoneCost);
            this.LODOP.ADD_PRINT_TEXT(308,230,150,20,data.totalUP);
            this.LODOP.ADD_PRINT_TEXT(308,500,150,20,'￥'+data.total);
            this.LODOP.ADD_PRINT_TEXT(335,115,120,20,data.operater);
            this.LODOP.ADD_PRINT_TEXT(335,350,120,20,data.addr);
        },
        makePrint:function(setting){
            var settingObj = setting;
            this.LODOP.SET_PRINT_PAGESIZE(0,0,0,"A4");//设置A4纸张
            this.LODOP.SET_SHOW_MODE(settingObj.showMode,1);
            this.LODOP.ADD_PRINT_HTM(10,"5%","90%",1000,settingObj.head.data);
            //this.LODOP.ADD_PRINT_TABLE(20,0,"90%",0,settingObj.body.data);
            var i=0;
            for(i=0;i<settingObj.body.data.length;i++){
                this.LODOP.ADD_PRINT_TABLE(20,0,"90%",0,settingObj.body.data[i]);
                this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",i+1);
            }
            this.LODOP.ADD_PRINT_HTM(23,0,"90%",0,settingObj.foot.data);
            this.LODOP.SET_PRINT_STYLEA(0,"LinkedItem",i+1);
            this.LODOP.SET_PRINT_STYLE("ItemType",2);
            this.LODOP.SET_PRINT_STYLE("FontSize",11);
            //this.LODOP.ADD_PRINT_TEXT(655,330,50,20,'第#页/共&页');
        },
		print : function(){
			return this.LODOP.PRINT();
		},
		preview:function(){
			this.LODOP.PREVIEW();
		}
    }
    window.NBprint = NBprint;
    
})(jQuery);

function getLodop(oOBJECT,oEMBED){
/**************************
  本函数根据浏览器类型决定采用哪个对象作为控件实例：
  IE系列、IE内核系列的浏览器采用oOBJECT，
  其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用oEMBED,
  对于64位浏览器指向64位的安装程序install_lodop64.exe。
**************************/
        var strHtmInstall="<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='res/lib/lodop/6.058/install_lodop.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
        var strHtmUpdate="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='res/lib/lodop/6.058/install_lodop.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
        var strHtm64_Install="<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='res/lib/lodop/6.058/install_lodop.exe' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
        var strHtm64_Update="<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='res/lib/lodop/6.058/install_lodop.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
        var strHtmFireFox="<br><br><font color='#FF00FF'>注意：<br>1：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它。</font>";
        var LODOP=oEMBED;       
    try{             
         if (navigator.appVersion.indexOf("MSIE")>=0) LODOP=oOBJECT;
         if ((LODOP==null)||(typeof(LODOP.VERSION)=="undefined")) {
         if (navigator.userAgent.indexOf('Firefox')>=0)
             document.documentElement.innerHTML=strHtmFireFox+document.documentElement.innerHTML;
         if (navigator.userAgent.indexOf('Win64')>=0){
            if (navigator.appVersion.indexOf("MSIE")>=0) document.write(strHtm64_Install); else
            document.documentElement.innerHTML=strHtm64_Install+document.documentElement.innerHTML;      
         } else {
            if (navigator.appVersion.indexOf("MSIE")>=0) document.write(strHtmInstall); else
            document.documentElement.innerHTML=strHtmInstall+document.documentElement.innerHTML;
         }
         return LODOP; 
         } else if (LODOP.VERSION<"6.0.5.8") {
        if (navigator.userAgent.indexOf('Win64')>=0){
                if (navigator.appVersion.indexOf("MSIE")>=0) document.write(strHtm64_Update); else
            document.documentElement.innerHTML=strHtm64_Update+document.documentElement.innerHTML; 
        } else {
                if (navigator.appVersion.indexOf("MSIE")>=0) document.write(strHtmUpdate); else
            document.documentElement.innerHTML=strHtmUpdate+document.documentElement.innerHTML; 
        }
         return LODOP;
         }
         //=====如下空白位置适合调用统一功能:=====         


         //=======================================
         return LODOP; 
    }catch(err){
        if (navigator.userAgent.indexOf('Win64')>=0)    
        document.documentElement.innerHTML="Error:"+strHtm64_Install+document.documentElement.innerHTML;else
        document.documentElement.innerHTML="Error:"+strHtmInstall+document.documentElement.innerHTML;
         return LODOP; 
    }
}


//其他
var NB_Tools = {
	initLoginInfo : function(){
		var nowDate = new Date(),
			nowHour = nowDate.getHours(),
			str = '';
		if(nowHour < 6){ str = "凌晨好！"; } 
		else if (nowHour < 9){ str = "早上好！"; } 
		else if (nowHour < 12){ str = "上午好！"; } 
		else if (nowHour < 13){ str = "中午好！"; } 
		else if (nowHour < 17){ str = "下午好！"; } 
		else if (nowHour < 19){ str = "傍晚好！"; } 
		else if (nowHour < 22){ str = "晚上好！"; } 
		else { str = "夜里好！"; } 
		return str||"您好";
	},
	previewWindow:function(url,w,h){
		window.open(url,'newwindow','height='+h+',width='+w+',top=40,left=40,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
	},
	//使用了artDialog插件
	openTpl:function(url,tit){
		art.dialog.open( url ,{
			title: tit ,
			lock: true,
			opacity : 0.3
		},false);
	}
}


/*
等待，成功，失败，警告等提示方法
state：-1代表loading ， 0代表失败，1代表成功，2代表警告，3代表问题。 
msg：提示信息。
*/
function result_prompt(state,msg,width){
	var stateMsg = msg ;
	if(state==-1){  
		return art.dialog({ 
		    content: msg? "<div class='artLoading'>"+stateMsg+"</div>" : "<div class='artLoading'>请稍候，正在保存数据...</div>",
			drag:false,
			cancel: false,
		    id: 'loadingBusiId'
		});
	}
	var stateIcon = 'succeed';
	if(state==0){  
		stateIcon = 'error';
	}else if(state==2){
		stateIcon = 'warning';
	}else if(state==3){
		stateIcon = 'question';
	}
	return art.dialog({
		 // icon对应skins/icons/目录下相应名称的图片
		  icon: stateIcon,
		  content: '<p style="font-size:14px;width:'+(width||200)+'px;">'+stateMsg+'</p>',
		  drag:false,
		  cancel: false,
		  lock:true,
		  opacity:0,
		  button :[
		      {
		          name: '确定',
		          callback: function () {
		          	this.close();
		          	if(state!=2&&state!=3&&state!=0){
			           closeDialog();   //关闭其他窗口
		          	}
		            return false;
		          },
		          focus: true
		      }
		  ]
	});
}
/*
 * 弹出确定框，第一个参数为提示信息，第二个参数为确定之后调用的函数，第二个参数为取消按钮调用的函数，不需要使用回调函数的时候可以不传
 * result_comfirm('测试',function(){alert(1);},function(){alert(2)});
 * */
function result_comfirm(msg,cbSure,cbRefuse){
	var stateMsg = msg ;
	stateIcon = 'warning';
	return art.dialog({
		 // icon对应skins/icons/目录下相应名称的图片
		  icon: stateIcon,
		  content: '<p style="font-size:14px;width:180px;">'+stateMsg+'</p>',
		  drag:false,
		  cancel: false,
		  lock:true,
		  opacity:0,
			button :[
		      {
		          name: '确定',
		          callback: function () {
		        	  this.close();
		        	  if(cbSure)
		        		  cbSure();
		        	  return false;
		          },
		          focus: true
		      },
		      {
		    	  name: '取消',
		          callback: function () {
		        	  this.close();
		        	  if(cbRefuse)
		        		  cbRefuse();
		        	  return false;
		          }
		      }
		  ]
	});
}


/**
 * jQuery UI Autocomplete "hack" to support maximum number of items options ("maxItems")
*/
var jq_oldSuggest =  jQuery.ui.autocomplete.prototype._suggest;
jQuery.ui.autocomplete.prototype._suggest = function(items) {
    var itemsArray = items;
    if(this.options.maxItems) {
        itemsArray = items.slice(0, this.options.maxItems);
    }
    jq_oldSuggest.call(this, itemsArray);
};