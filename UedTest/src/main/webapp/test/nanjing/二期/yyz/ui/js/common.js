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

$(function(){

	//目录
	$("#menuBar").find(".menu-tit").click(function(){
		var _self = $(this);
		var _others = $(".menu-tit").not(_self);
		_others.find("i:eq(1)").removeClass("open").addClass("close").end().next().stop(true,true).slideUp('normal');
		if(_self.next().is(':hidden')){
			_self.find("i:eq(1)").removeClass("close").addClass("open").end().next().slideDown('normal');
		}else{
			_self.find("i:eq(1)").removeClass("open").addClass("close").end().next().slideUp('normal');
		}
	});
	$("#menuBar").find(".sub-item li").each(function(){
		$(this).click(function(){
			var _url = $(this).find("a").data("url");
			// $("iframe").attr({"src": _url});
			window.location.href = _url
		})
	});

	//用户信息
	$("#userInfo").bind("mouseenter",function(){
		$("#userInfoMore").show();
	}).bind("mouseleave",function(){
		$("#userInfoMore").hide();
	});
	$("#userInfoBase").click(function(){
		openWindow("弹窗样式", "D_test.html", 820, 450)
	});
	$("#userInfoMore a:eq(1)").click(function(){
		openWindow("详情样式", "D_detail.html", 600, 200)
	});
	
	if($("#verifyList").length){
		//代办
		var G_verifyList_bg = ["0","-100","-200","-308","-411","-517","-613","-712"];
		var G_verifyList_tit = ["4CC08C","F4CE33","D5562B","8FC423","D5562B","3F6A8D","DBA187","F4CE33"];
		$.PostJson("ui/json/verifyList.json?1=1","id="+123+"&name=",function(state,json){
			if(state=='success'){
				if(json){
					$("#verifyList").temp($("#verify_tpl"), json)
						.find(".verify-icon").each(function(i){
							$(this).css({"background-position": "0 "+G_verifyList_bg[i]+"px"});
						}).end().find("dd").each(function(k){
							$(this).css({"color": "#"+G_verifyList_tit[k]});
						});
				}
			}
		})

		//能力使用排行
		$.PostJson("ui/json/abilityRank.json?1=1","",function(state,json){
			if(state=='success'){
				if(json){
					$("#abilityRankList").temp($("#abilityRank_tpl"), json);
				}
			}
		})
		//应用使用排行
		$.PostJson("ui/json/appRank.json?1=1","",function(state,json){
			if(state=='success'){
				if(json){
					$("#appRankList").temp($("#appRank_tpl"), json);
				}
			}
		})

		//公告
		// $("#noticeArea").bind("mouseenter", "noticeBtn",function(){
		// 	$("#noticeTbl").stop(true,true).animate({"height":"237px","width": "497px"});
		// }).bind("mouseleave",function(){
		// 	$("#noticeTbl").stop(true,true).animate({"height":"0","width": "0"});
		// })
		$("#noticeArea").bind("mouseenter", "noticeBtn",function(){
			$("#noticeTbl").stop(true, true).show(500);
		}).bind("mouseleave",function(){
			$("#noticeTbl").stop(true, true).hide(500);
		})
	}

	//iframe自适应高度
	window.dyniframesize = function(down) {
	    var pTar = null;
	    if (document.getElementById) {
	        pTar = document.getElementById(down);
	    } else {
	        eval('pTar = ' + down + ';');
	    }
	    if (pTar && !window.opera) {
	        //begin resizing iframe 
	        pTar.style.display = "block"
	        if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight) {
	            //ns6 syntax 
	            pTar.height = pTar.contentDocument.body.offsetHeight + 20;
	            // pTar.width = pTar.contentDocument.body.scrollWidth + 20;
	        } else if (pTar.Document && pTar.Document.body.scrollHeight) {
	            //ie5+ syntax 
	            pTar.height = pTar.Document.body.scrollHeight;
	            pTar.width = pTar.Document.body.scrollWidth;
	        }
	    }
	}
	//查询table
	//禁用时间控件可输入
	$(".datebox").find(".textbox-text").attr({"readonly":"readonly"});
	//重置按钮
	$("#J_reset").click(function(){
		$("#J_formSearch").resetForm();
		$(".textbox-value:hidden").val("");//easyui input隐藏数据
	})

})

function getPage(pageParam,callback){
	var newPageParam = $.extend({},{
		url: "ui/json/tableData.json?1=1",
		page_index: "0",
		perPage: "10",
		onepage: true,
		formStr: "",
		paginId: "Pagination",
		dataContainId: "dataTbody",
		dataTpl: "dataTbl_tpl",
		linkTo: "dataTable",
		gotoPage: "gotoPage"
	},pageParam);
	createBlock();
	console.log(JSON.stringify(newPageParam))
  	$.PostJson(newPageParam.url, newPageParam.formStr+"&page="+newPageParam.page_index+"&rows="+newPageParam.perPage, function(state,json){
  		if(state=='success'){
  			if(json){
  				unBlock();
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
								console.log(JSON.stringify(newPageParam))
								getPage(newPageParam);
							}
						});

						$(".dataTbl-bottom").show();

						if(typeof callback == 'function'){
							callback.call();
						}
						
						$("#dataTable").find("input[name=dataCheckAll]").attr({"checked":false}).bind("click", function(){
							$("#dataTable").find("input[name=dataCheck]").attr({"checked": $(this).is(":checked")});
						});
						$("#dataTable").find("input[name=dataCheck]").bind("click", function(){
							var _checkL = $("#dataTable").find("input[name=dataCheck]:checked").length;
							var _totalL = $("#dataTable").find("input[name=dataCheck]").length;
							if(_checkL==_totalL){
								$("#dataTable").find("input[name=dataCheckAll]").attr({"checked": true});
							}else{
								$("#dataTable").find("input[name=dataCheckAll]").attr({"checked": false});
							}
						});
						
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
function createBlock(){
    if( $("#dataTable .blockElement").length<1 ){
        $('#dataTable').block({ 
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
    $('#dataTable').unblock(); 
}