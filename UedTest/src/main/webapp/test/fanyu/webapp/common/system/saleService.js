define(['text!tpl/system/saleService.tpl'],function(tpl){
	var init = function(){
		var J_addCj = document.getElementById('addCj'),
		 	J_cj = document.getElementById('cj'),
		 	J_smsCntt = document.getElementById('smsCntt'),
			mode = document.getElementById('T_addSms'),
		 	elem = document.getElementById('T_editSms'),
		 	addSmsCntt= document.getElementById('addSmsCntt'),
		 	J_coopInfo= document.getElementById('J_coopInfo'),
		 	T_coopInfo= document.getElementById('T_coopInfo');
		
		load({'uid':'c001','flag':'sales'});

		$("#J_search").click(function(){
			var coopId=$("#J_coop").find('option:selected').val();
			var param={'uid':'c001','coopId':coopId,'flag':'sales'};
			load(param);
		});

		$('#J_addSmsTemp').bind('click',function(){
			var _this = $(this),
				CD_VAL = _this.attr('CD_VAL'),
				CMN_CD_VAL_NM = _this.attr('CMN_CD_VAL_NM');
			$(J_addCj).html(CMN_CD_VAL_NM);
			$(J_smsCntt).val('');
			Util.ajax.postJson(srvMap.get("coopPrnr"), {'uid':'u001'}, function(json,flag){
			 	Util.ajax.loadTemp(J_coopInfo,$(T_coopInfo),json);//加载模板
			});
		    var params = {
		        top:top,
		        id:'T_addSms',
		        title:'添加短信模板',
		        content: mode,
		        width: 700,
		        height:300,
		        modal: true,
		        cancelVal:'取消',
		        cancelCallback:{},
		        okVal:'确定',
		        okCallback:add(CD_VAL)
		    }
		    Util.dialog.openDiv(params);
		})

		function add(tempID){
			return function() {
			var coopId=$(J_coopInfo).find('option:selected').val();
			var param1={'uid':'c007','bizSceneTypeCd':tempID,'coopPrnrId':coopId,'smsCntt':$(addSmsCntt).val()};
				Util.ajax.postJsonSync(srvMap.get("sms"),param1,function(json,status){
					if(status){
						alert("添加成功!");
		   				load({'uid':'c001','flag':'sales'});
					}else {
						alert("添加失败");
					};
				});
			};
		};

		$('#J_sms').on('click','.J_smsEdit',function(){
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
				cancelVal:'取消',
				cancelCallback:{},
				okVal:'确定',
				okCallback:option(SMS_RS_ID)
		    }
		    Util.dialog.openDiv(params);
			$(J_smsCntt).trigger('keyup');
		})
		 
		function option(tempID){
			return function() {
			var param1={'uid':'c004','smsRsId':tempID,'smsCntt':$(J_smsCntt).val()};
				Util.ajax.postJsonSync(srvMap.get("sms"),param1,function(json,status){
					if(status){
						alert("修改成功!");
		   				load({'uid':'c001','flag':'sales'});
					}else {
						alert("修改失败");
					};
				});
			};
		};

		$('#J_sms').on('click','.J_smsDel',function(){
			var SMS_RS_ID = $(this).attr('SMS_RS_ID');
			var delParam={'uid':'c006','smsRsId':SMS_RS_ID};
			if (confirm("确定删除吗？")) {
				Util.ajax.postJsonSync(srvMap.get("sms"),delParam,function(json,status){
					if(status){
		   				load({'uid':'c001','flag':'sales'});
					};
				});
			};
		})


		//计算最大输入字数
		var maxstrlen = 80;
		$('#smsCntt').bind('keyup',function(){
			var _this =$(this);
			len = maxstrlen;
			var str = _this.val();
			myLen = getStrleng(str);
			if (myLen > len * 2) {
				_this.val(str.substring(0, i + 1));
			}else{
			    document.getElementById('sale').innerHTML = maxstrlen - Math.floor((len * 2 - myLen) / 2);
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

	var load = function(param){
		var _html = '<script id="T_aaaa" type="text/text/x-handlebars-template">{{#if beans.length}}'+
					' 	{{#each beans}}'+
					'        <tr>'+
					'            <td align="center">{{coopNM}}</td>'+
					'			<td>{{SMS_CNTT}}</td>'+
					'			<td>'+
					'				<div class="gridRowBtn">'+
					'					<a class="item-text J_smsEdit" href="javascript:;" SMS_RS_ID="{{SMS_RS_ID}}" SMS_CNTT="{{SMS_CNTT}}" CMN_CD_VAL_NM="{{CMN_CD_VAL_NM}}"">编辑</a>'+
					'					<a class="item-text J_smsDel" href="javascript:;" SMS_RS_ID="{{SMS_RS_ID}}">删除</a>'+
					'				</div>'+
					'			</td>'+
					'		</tr>'+
					'	{{/each}}'+
					'{{else}}'+
					'	<tr><td colspan="3"><div class="ui-tips-box tipsBox"><div class="ui-icon-noData"></div><div class="ui-tips-text">暂无数据！</div></div></td></tr>'+
					'{{/if}}</script>';
		$('body').append(_html);
 		var G_params = {
		    url : srvMap.get('sms')+'?1=1',
		    items_per_page : 10 ,   		// 每页数     @param : limit
		    page_index : 0 , 				//当前页  @param : start
		    pagination : "Pagination" , 	//分页id
		    searchformId : "J_formSearch",  //搜索表单的id
		    tabletpl : 'T_aaaa', 		//表格模板
		    tablewrap : "J_tableTpl"
		};
		Util.pagination(G_params.page_index, true, G_params, $('#J_formSearch').serialize());
	}
	return {init:init,load:load};
})