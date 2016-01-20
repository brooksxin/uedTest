
define(['common/util/searchToggle', 'handlebars', 'common/buttonAuthority', 'text!tpl/market/user-component.tpl', 'text!tpl/market/orderSuccessGroupEnd.tpl', 'text!tpl/market/orderSuccessGroupEnd-list.tpl', 'jquery', 'underscore', 'jquery.countdown']
	, function(searchToggle, Handlebars, ButtonAuthority, componentTpl, tpl, listTpl, $, _){

	var $el = null;
	var init = function(Loading){
		Loading && Loading.destroy();
		$el = $(tpl);
		/*debugger;
		$('.search_table', $el).on('click', function(){
			alert('feee')
		})*/
		searchToggle.init($el);
		srvMap.add('query' , 'query.json','front/sh/market!index?uid=my017');//查询订单排名和成单率
		srvMap.add('queryData' , 'query.json','front/sh/market!index?uid=my018');//查询订单排名和成单率
		srvMap.add('queryUser' , 'query.json','front/sh/user!userinfo?uid=u005');//查询所有的本部门员工

		eventInit();
		userComponentInit();
		listInit();
		//ButtonAuthority.init($el);
	}
	var eventInit = function(){
		//var $list = $("#J_tabletpl", _el);
		$el.on('click', '#Query', listInit);
	}
	var listInit = function(){
		var G_params = {
		    url : srvMap.get('query'),
		    searchformId :"J_formSearch",
			items_per_page : 10 ,   // 每页数     @param : limit
		    page_index : 0 , //当前页  @param : start
		    pagination : "Pagination" , //分页id
		    //Handlebars.compile(pageParams.tabletpl.html())
		    tabletpl : Handlebars.compile(listTpl),  //表格模板
		    //tablewrap :$("J_tabletpl", $el) //表格容器
		    tablewrap:$el.find('#J_tabletpl')
		};
		var str= $("#"+G_params.searchformId, $el).serialize();
		Util.pagination(G_params.page_index , true , G_params, str); 
		Util.ajax.postJson(srvMap.get("queryData"),'',function(json){
			if(json.returnCode==0){
				$("#count", $el).text(json.bean.count);
				$("#time", $el).text(json.bean.time);
			}
		});
	}
	var userComponentInit = function(){
		var cmd={
			"DEPT_ID": userInfo.bean.deptId 
		};
		Util.ajax.postJson(srvMap.get('queryUser'),cmd,function(json,status){
			if(status){
				var template = Handlebars.compile(componentTpl);
				$('.cmxform .element', $el).html(template(json));
			}else{
				alert('接口queryUser加载失败');
			}
		});
	}

	return { init:init, getTpl:function(){ return $el; } };
});


