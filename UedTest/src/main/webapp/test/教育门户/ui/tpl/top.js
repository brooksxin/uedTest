define(['text!../tpl/top.tpl'], function(tpl){
	var fnInit = function(){

		//搜索
		srvMap.add('autoComplete', 'autoComplete.json','commonCMS-AllApps.action?uid=cmsA');//自动补全
		
		$("body").prepend(tpl);

		//搜索
		$(".J_glob_search_wrap label").click(function(){
			$(this).addClass("fn-hide").siblings("#J_search_ipt").focus();
		})
		$("#J_search_ipt").focus(function(){
			$(this).animate({"width": "303px"}).siblings("label").addClass("fn-hide").end().siblings(".iconfont").css({"color": "#07f"});
			$("#ui-id-1").css({"display": "block"});
		}).blur(function(){
			if($(this).val() == "")
				$(this).siblings("label").removeClass("fn-hide");
			$(this).animate({"width": "201px"}).siblings(".iconfont").css({"color": "#ccc"});
			$("#ui-id-1").css({"display": "none"});
		})

		$("#J_glob_search_btn").click(function(){
			console.log("搜索")
		});
		initAutoComplete();
	}

	function initAutoComplete(){
		$.PostJson(srvMap.get("autoComplete"), "", function(state, json){
			if(state == 'success'){
				if(json && json.rtnCode == '1'){

					/*	jQuery UI Autocomplete 插件使用注意：
						对于JSON格式要求有：label、value属性，其中label属性用于显示在autocomplete弹出菜单，而value属性则是选中后给文本框赋的值。
						格式：[ {label: "test", value: "test"}, {label: "test", value: "test"} , ... ]
					 */
					$("#J_search_ipt").autocomplete({
						minLength: 1,
						autoFocus: true, 
						source: json.rows,
						select: function( event, ui ) {
							if (ui.item.byOrdered == '1') {
								var opurl = srvMap.getBaseUrl() + "edu_forward.jsp?nodeUid="+ui.item.nodeUid+"&sysType="+ui.item.sysType;
								window.open(opurl);
							}else if(ui.item.appID){
								window.open("prodDtl.html?appID="+ui.item.appID+"&nodeUid="+ui.item.nodeUid);
							}
							return false;
						},
						response: function(event, ui){
							if (!ui.content.length) {
								ui.content.push({value:'对不起，没有查到数据！'});	
							}
						},
						close: function(event, ui){
							var _this = $(this);
							if (_this.val()) {
								$('#ui-id-1').show();
							}else{
								$('#ui-id-1').hide();
							}
							$("#J_search_ipt").blur(function(){
								$('#ui-id-1').hide();
							})
							$("#J_search_ipt").focus(function(){
								if (_this.val()) {
									$('#ui-id-1').show();
								}
							})
						}
					}).data("ui-autocomplete")._renderItem = function( ul, item ) {
						return $( "<li>" ).append( "<a>"+item.value+"</a>" ).appendTo( ul ); 
					};
				}
			}
		})
	}

	return fnInit;
})