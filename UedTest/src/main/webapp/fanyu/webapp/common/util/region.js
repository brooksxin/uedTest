define(['jquery','text!tpl/util/regionSelect.tpl'],function($,tpl) {
	var $el = $(tpl);
	var init = function(provId,cityId,regionId){

		var $J_prov = $('#J_prov',$el),
			$J_city = $('#J_city',$el),
			$J_region = $('#J_region',$el),
			json = null;
		Util.ajax.postJson('../../data/region/region.json','',function(json,status){
			for (var i = 0; i < json.length; i++) {
				
				if (json[i]['val'] == provId) {
					$J_prov.append("<option selected='selected' value='"+json[i]['val']+"'>"+json[i]['txt']+"</option>");
				}else{
					$J_prov.append("<option value='"+json[i]['val']+"'>"+json[i]['txt']+"</option>");
				}
			};
			if (provId) {
				$J_prov.trigger('change');
			};
		})

		$J_prov.on('change',function(){
			$J_city.html("<option value=''>请选择</option>");
			$J_region.html("<option value=''>请选择</option>");
			Util.ajax.postJson('../../data/region/'+$J_prov.val()+'.json','',function(json1,status){
				json = json1;
				for (var i = 0; i < json.length; i++) {
					if (json[i]['val'] == cityId) {
						$J_city.append("<option selected='selected' value='"+json[i]['val']+"'>"+json[i]['txt']+"</option>");
					}else{
						$J_city.append("<option value='"+json[i]['val']+"'>"+json[i]['txt']+"</option>");
					}
				};
				$J_city.trigger('change');
			})
		});

		$J_city.on('change',function(){
			$J_region.html("<option value=''>请选择</option>");
			for(var i = 0; i<json.length; i++){
				if (json[i]['val'] == $J_city.val()) {
					for (var j = 0; j < json[i]['list'].length; j++) {
						if (json[i]['val'] == cityId) {
							$J_region.append("<option selected='selected' value='"+json[i]['list'][j]['val']+"'>"+json[i]['list'][j]['txt']+"</option>");
						}else{
							$J_region.append("<option value='"+json[i]['list'][j]['val']+"'>"+json[i]['list'][j]['txt']+"</option>");
						}
					};
				};
			}
		})
	}

	return {init:init,tpl:$el};
})