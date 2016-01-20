
define(['dialog', 'common/util/frameContainer', 'jquery', 'jquery.blockUI', 'jquery.pagination'], function(dialog, frameContainer, $){

	var count = 0;
	var choice = function(){
		Util.ajax.postJson(srvMap.get('orderDividePage'), "uid=mwt015", function(json,status) {
			if (status) {
				count = json.bean.count;
				if(count=='0'){
					require(['common/market/orderDivideToday'],function(fn){
						fn.init(null, {loadViewPage:true}, orderSuccessGroupEndInit);
						frameContainer.append(fn.getTpl());
					});
				}else{
					orderSuccessGroupEndInit();
				}
			}else{
				alert('加载失败');
			}
		});
	}
	var orderSuccessGroupEndInit = function(){
		require(['common/market/orderSuccessGroupEnd'],function(fn){
			fn.init();
			frameContainer.append(fn.getTpl());
		});
	}

	return { choice:choice };
});