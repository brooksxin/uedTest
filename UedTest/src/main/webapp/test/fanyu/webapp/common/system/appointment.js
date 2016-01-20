define(['text!tpl/system/appointment.tpl'],function(tpl){
	var init =  function(){
		var topTitle= document.getElementById('T_title');
		var T_val=document.getElementById('title');
		var elem = document.getElementById('T_editSms');
		var J_cj = document.getElementById('cj');
		var J_smsCntt = document.getElementById('smsCntt');
		var wck = document.getElementById('appoint');

		$('.thead_diva a').on('click',function(){
			var _this = $(this),
				CMN_CD = _this.attr('CMN_CD'),
				CMN_CD_VAL_NM = _this.attr('CMN_CD_VAL_NM'),
				CD_VAL = _this.attr('CD_VAL');

			$(T_val).val(CMN_CD_VAL_NM);
		    var params = {
		        id:'T_title',
		        title:'修改标题',
		        content: topTitle,
		        width: 200,
		        height:50,
		        modal: true,
		        cancelVal:'取消',
		        cancelCallback:{},
		        okVal:'确定',
		        okCallback:updateTitle(CMN_CD,CD_VAL)
		    }
		    Util.dialog.openDiv(params);
		})
		function updateTitle(id,val){
		    return function(){
		    	var params={'uid':'c003','cmnCd':id,'cdVal':val,'cmnCdValNm':$(T_val).val()};
				Util.ajax.postJson(srvMap.get("sms"),params,function(json,status){
					if(status){
						alert("修改成功!");
						Util.ajax.postJson(srvMap.get("sms"),{'uid':'c002','flag':'appointment'}, function(json,flag){
					    	Util.ajax.loadTemp('#J_sms',tpl,json);//加载模板
					    	init();
					    });
					}else {
						alert("修改失败");
					}
				});
		    }
		}

		$('.J_content_edit').on('click',function(){
			var _this = $(this),
				SMS_RS_ID = _this.attr('SMS_RS_ID'),
				SMS_CNTT = _this.attr('SMS_CNTT'),
				CMN_CD_VAL_NM = _this.attr('CMN_CD_VAL_NM');
				
			$(J_smsCntt).val(SMS_CNTT);
			$(J_cj).html(CMN_CD_VAL_NM);
		    var params = {
				top:top,
				id:'T_editSms',
				title:'编辑短信模板',
				content: elem,
				width: 900,
				height:200,
				modal: true,
				okVal:'确定',
				cancelVal:'取消',
				cancelCallback:{},
				okCallback:option(SMS_RS_ID)
		    };
		    Util.dialog.openDiv(params);
			$(J_smsCntt).trigger('keyup');
		})
		function option(tempID){
			return function() {
			var param1={'uid':'c004','smsRsId':tempID,'smsCntt':$(J_smsCntt).val()};
				Util.ajax.postJsonSync(srvMap.get("sms"),param1,function(json,status){
					if(status){
						alert("修改成功!");
						Util.ajax.postJson(srvMap.get("sms"), {'uid':'c002','flag':'appointment'}, function(json,flag){
					    	Util.ajax.loadTemp('#J_sms',tpl,json);//加载模板
					    	init();
					    });
					}else {
						alert("修改失败");
					}
				});
			}
		}
		    
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