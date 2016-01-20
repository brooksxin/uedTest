
define(['handlebars', 'text!tpl/market/campgnListPhoner.tpl', 'text!tpl/market/campgnListPhoner-list.tpl'
	, 'market.common', 'common/util/searchToggle', 'jquery', 'underscore', 'jquery.blockUI', 'jquery.pagination']
	, function(Handlebars, tpl, listTpl, common, SearchToggle, $, _){

	var $el = null;
	var objWin;

	var G_params = null;
	var $form = null;

	var init = function(Loading){
		Loading && Loading.destroy();
		$el = $(tpl);
		$form = $("#J_formSearch", $el);
		srvMap.add('query' , 'query.json','front/sh/market!index?uid=my012');//查询已分配的活动
		srvMap.add('contact','query.json','front/sh/market!index?uid=mwt002');

		G_params = {
			url : srvMap.get('query'),
			searchformId :"J_formSearch",
			items_per_page : 10 ,   // 每页数     @param : limit
			page_index : 0 , //当前页  @param : start
			pagination : "Pagination" , //分页id
			tabletpl : Handlebars.compile(listTpl),  //表单模型
			tablewrap :$el.find("#J_tabletpl") //表格容器
		};
    
		eventInit();
		listInit();
   		SearchToggle.init($el);
	}
	var eventInit = function(){
		var $list = $("#J_tabletpl", $el);
		$el.on('click', '#Query', listInit);
		$list.on('click', '.gridRowBtn a', function(e){
			var json = JSON.parse($(e.currentTarget).attr('data'));
			goTo(e.currentTarget, json.CMPGN_ID,json.next_cmpgn,json.CMPGN_STS,json.QNR_ID);
		});
		$list.on('click', '.detail', function(e){
			 var json = JSON.parse($(e.currentTarget).parent().attr('data'));
			 detail(json.CMPGN_ID);
		});

	}
	var listInit = function(){
		var str= $form.serialize();
		Util.pagination( G_params.page_index , true , G_params , str );
	}


	var detail = function(CMPGN_ID){
		
		require(['common/util/originFrame'], function(originFrame){
	        originFrame.append('../market/groupCmpgnDetail.html?CMPGN_ID='+CMPGN_ID);
	      });
		//window.location.href="cmpgnGroupDetail.html?CMPGN_ID"+CMPGN_ID;
	}
	
	  var goTo = function(obj,CMPGN_ID,next_cmpgn,CMPGN_STS,QNR_ID){
		  if($(obj).hasClass("disable-text")){
			  return false;
		  }else{
				var postId = userInfo.bean.postId;
				var softphoneUrl = '';
			  if (postId=='13' || postId=='14' || postId=='15') {
	    	  	softphoneUrl = "../contact/softphoneManage_86.html?CMPGN_ID="+CMPGN_ID+"&QNR_ID="+QNR_ID;
			  }else{
	    	  	softphoneUrl = "../contact/softphoneManage.html?CMPGN_ID="+CMPGN_ID+"&QNR_ID="+QNR_ID;
			  }
	    		//判断是否打开
	    		if (objWin == null || objWin.closed) {
	    			 objWin = window.open(softphoneUrl,"","menubar=no,status=no,resizable=yes,scrollbars=no,toolbar=no,top=0,left=0,width="+ (window.screen.availWidth)+ ",height=" +(window.screen.availHeight-30));
	    		} else {
	    			objWin.focus();
	    		}
		  }
	  }
	  Handlebars.registerHelper("isInto", function(id1,id2,incount,CMPGN_STS){
		  var buffer = "";
		  if(CMPGN_STS=='进行中'&&id1 != '0'){
			  if(id1>id2){
				  buffer = "item-text";
			  }else{
				  buffer = "disable-text";
			  }
			  
		  }else if(CMPGN_STS=='进行中'&&id1 == '0'){
			  if(incount=='NO'){
				  buffer = "disable-text";
			  }else{
				  buffer = "item-text";
			  }
			 
		  }else{
			  buffer = "disable-text";
		  }
		  
		  return buffer;
	  });


	  
	  
	  
		Handlebars.registerHelper("ifCheck", function(next_cmpgn1){
		    var _content;
		    switch(next_cmpgn1){
		        case "0":
		        	//新建
		             _content	= "";
		            return _content;
		            break;
		        default:
		            _content	= "/"+next_cmpgn1;
		        return _content;
		    }
		});	  
	  
	  
	  
	  
	  
	  
	  
	/*
	* 截取日期字符串中的年月日，不显示时分秒
	*/
	Handlebars.registerHelper("tblDateFmt", function(date) {
	  return date.substr(0,10);
	});
	Handlebars.registerHelper('dataToJSON', function(obj) {
		return JSON.stringify(obj);
	});
	return { init:init, getTpl:function(){ return $el; } };
});


