
define(['common/util/searchToggle', 'dialog', 'common/util/frameContainer', 'jquery', 'jquery.blockUI', 'jquery.pagination'], function(searchToggle, dialog, frameContainer, $){

	var count = 0; 
	var d = null;
	var fn = function(){
		Util.ajax.postJson(srvMap.get('orderDividePage'), "uid=mwt015", function(json,status) {
			if (status) {
				count = json.bean.count;
				d = new dialog({
	                title:'创建团队目标',
	                //content: fn.getTpl(),
	                width: 900,
	                height:480
	            });
	            d.show();
				
				if(count=='0'){
					require(['common/market/orderDivideToday'],function(fn){
						fn.init(null, {loadViewPage:true}, orderSuccessGroupEndInit);
						d.content(fn.getTpl());
					});
				}else{
					orderSuccessGroupEndInit();
				}
				
			}else{
				alert('加载失败');
			}
		});
		searchToggle.init();
	}

	var orderSuccessGroupEndInit = function(){
		require(['common/market/orderSuccessGroupEnd'],function(fn){
			fn.init();
			d.content(fn.getTpl());
		});
	}
	
	return { init:fn };
});