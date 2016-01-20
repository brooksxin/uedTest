define(['text!tpl/system/addAfterSaleSmsTpl.tpl'],function(tpl){
	var init = function(){

		srvMap.add('coopPrnr','coopPrnr.json','front/sh/user!partnerInfo');

		$('#J_addSmsTemp').bind('click',function(){
			var _this = $(this),
				CD_VAL = _this.attr('CD_VAL'),
				CMN_CD_VAL_NM = _this.attr('CMN_CD_VAL_NM');

		    var params = {
		        top:top,
		        id:'T_addSms',
		        title:'添加短信模板',
		        content: tpl,
		        width: 700,
		        height:300,
		        modal: true,
		        cancelVal:'取消',
		        cancelCallback:{},
		        okVal:'确定',
		        okCallback:add(CD_VAL)
		    }
		    Util.dialog.openDiv(params);
			$('#addCj').html(CMN_CD_VAL_NM);
			$('smsCntt').val('');

	   	 	//加载下拉列表
		   	Util.ajax.postJson(srvMap.get("coopPrnr"), {'uid':'u001'}, function(json,flag){
		   		var _html = '<option value="">全部</option>'+
					'{{#each beans}}<option value="{{PTY_ID}}">{{PTY_NM}}</option>{{/each}}';
				var template = Handlebars.compile(_html);
				top.$('#J_coopInfo').html(template(json));
		    });
		})

		function add(tempID){
			return function() {
				var coopId=top.$('#J_coopInfo').find('option:selected').val();
				var param1={'uid':'c007','bizSceneTypeCd':tempID,'coopPrnrId':coopId,'smsCntt':top.$('#addSmsCntt').val()};
				Util.ajax.postJsonSync(srvMap.get("sms"),param1,function(json,status){
					if(status){
						alert("添加成功!");
    					require(['common/system/saleService'],function(appoFun){
    						appoFun.load({'uid':'c001','flag':'sales'});
    					})
					}else {
						alert("添加失败");
					};
				});
			};
		};

		//计算最大输入字数
		var maxstrlen = 80;
		$('#addSmsCntt').bind('keyup',function(){
			var _this =$(this);
			len = maxstrlen;
			var str = _this.val();
			myLen = getStrleng(str);
			if (myLen > len * 2) {
				_this.val(str.substring(0, i + 1));
			}else{
			    document.getElementById('word').innerHTML = maxstrlen - Math.floor((len * 2 - myLen) / 2);
			}
		})
		function getStrleng(str) {
		    myLen = 0;
		    i = 0;
		    for (; (i < str.length) && (myLen <= maxstrlen * 2); i++) {
		        if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128){
		        	myLen++;
		        }else{
		         	myLen += 2;
		        }
		    }
		    return myLen;
		}
	}
	return {addSmsTpl:init};
})
