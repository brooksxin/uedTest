define(['text!tpl/system/endCalling.tpl'],function(tpl){
	var init = function(){
		var elem = document.getElementById('T_editSms');
		var J_cj = document.getElementById('cj');
		var J_smsCntt = document.getElementById('smsCntt');
		var wck = document.getElementById('wordCheck');
		$('.J_endCall_edit').bind('click',function(){
			var _this = $(this),
				SMS_RS_ID = _this.attr('SMS_RS_ID');
			$(J_smsCntt).val(_this.attr('SMS_CNTT'));
			$(J_cj).html(_this.attr('CMN_CD_VAL_NM'));
		    var params = {
				id:'T_editSms',
				title:'编辑短信模板',
				content: elem,
				width: 900,
				height:200,
				modal: true,
				cancelVal:'取消',
				cancelCallback:{},
				okVal:'确定',
				okCallback:option(SMS_RS_ID)
		     }
		    Util.dialog.openDiv(params);
			$(J_smsCntt).trigger('keyup');
		});
		function option(tempID){
			return function() {
			var param1={'uid':'c004','smsRsId':tempID,'smsCntt':$(J_smsCntt).val()};
				Util.ajax.postJsonSync(srvMap.get("sms"),param1,function(json,status){
					if(status){
						alert("修改成功!");
						Util.ajax.postJson(srvMap.get("sms"), {'uid':'c001','flag':'phone'}, function(json,flag){
							if (flag) {
						    	Util.ajax.loadTemp('#J_sms',tpl,json);//加载模板
					    		init();
							};
				        });
					}else {
						alert("修改失败");
					}
				});
			}
		};
		
		//计算最大输入字数
		var maxstrlen = 80;
		//onMouseDown
		$(J_smsCntt).bind('keyup',function(){
			var _this =$(this);
			len = maxstrlen;
			var str = _this.val();
			myLen = getStrleng(str);
			if (myLen > len * 2) {
				_this.val(str.substring(0, i + 1));
			}else{
			    wck.innerHTML = maxstrlen - Math.floor((len * 2 - myLen) / 2);
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
	return {init:init};
})