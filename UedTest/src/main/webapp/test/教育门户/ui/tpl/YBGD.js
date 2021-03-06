define(['text!../tpl/YBGD.tpl', 'text!../tpl/D_YBGD.tpl'], function(tpl, tpl2){
	var fnInit = function(){

		//主页面的查询table
		srvMap.add("YBGD", "tableData.json?1=1", "后台action路径");

		//弹窗查询的100条数据接口
		srvMap.add("D_YBGD", "tableData.json?1=1", "");

		//添加模板到页面
		$("#J_wrap").html(tpl);

		//默认选中某个下拉选项
		$("#J_province").find("option[value='2']").attr({"selected": "selected"}).end().selectOrDie();

		//设置默认为当前时间
		setCurDate($("#J_date"));

		//抢单
		$("#J_grab").click(function(){
			require(['../tpl/GRAB'], function(fnInit){
				fnInit();
			})
		})

		//查询按钮
		$("#J_search").click(function(){
			var str = $("#J_formSearch").formSerialize();
			var pageParam = {
				url: srvMap.get("tableData"),
				formStr: str
			}
			//分页查询
			getPage(pageParam, function(json){

				//查看详情
				//根据id返回自身数据以及之后的99条数据
				//type == 1表示往后查找 type == 2表示往前查找
				$(".J_showDetail").click(function(){

					var cId = $(this).data("id");

					var D_param = {
						id: "D_showYBGD",
						title: "查看工单",
						content: tpl2,
						width: 770
					}
					openWindowDiv(D_param, function(e){
						//绑定关闭弹窗事件
						dialog.get("D_showYBGD").addEventListener('close', function(){
							$("#J_navigation").hide();
							$("#J_search").trigger("click");
						})

						//初始化弹窗内容
						initNavi(cId);
					})
				})

			});
		});

		//0.5秒后自动执行查询
		setTimeout(function(){
			$("#J_search").click();
		}, 500);

		//handlebars模板引擎，用于修改页面展示数据
		Handlebars.registerHelper("retNewCode", function(code, fn) {
			return code+"_new";
		});

		function initNavi(cId){

			//定义变量存储当前索引
			var cIndex = 0;

			$.PostJson(srvMap.get("D_YBGD"), "cId="+cId+"&type=1", function(state, json){
				if(state == 'success'){
					if(json){
						$("#J_YBGD_detail").temp($("#T_D_YBGD"), json.rows[cIndex]);
						initHandleBtn(cId);
						cIndex++;

						//点击下一个工单
						$("#J_navigation .right").unbind("click").bind("click", function(){
							if(cIndex == json.rows.length){
								var new_cId = json.rows[json.rows.length - 1].ABILITY_ID;
								//重新获取数据
								$("#J_navigation").hide();
								initNavi(new_cId);
							}else{
								$("#J_YBGD_detail").temp($("#T_D_YBGD"), json.rows[cIndex]);
								var new_cId = json.rows[cIndex].ABILITY_ID;
								initHandleBtn(new_cId);
								cIndex++;
							}
						})

						//点击上一个工单
						$("#J_navigation .left").unbind("click").bind("click", function(){
							var new_cId = json.rows[cIndex-1].ABILITY_ID;
							//重新获取数据
							$("#J_navigation").hide();
							initNavi(new_cId);
						})

					}else{
						result_prompt(0, json.rtnMsg || "查询失败！");
					}
				}else{
					result_prompt(0, json.rtnMsg || "系统错误！");
				}

				//显示导航
				$("#J_navigation").show();
			})
		}

		function initHandleBtn(cId){

			//图片查看
			jQuery_1_6_3(".zpicbox").picbox();

			var zui_check_val = 1;
			$(".suggestion-wrap .zui_check_list .zui_check").unbind("click").bind("click", function(){
				$(".suggestion-wrap .zui_check_list .zui_check").removeClass("checked");
				$(this).addClass("checked");
				zui_check_val = $(this).data("id");
				if(zui_check_val == 5){
					$("#J_suggestion").removeClass("fn-hide");
				}else{
					$("#J_suggestion").addClass("fn-hide");
				}
			})

			$("#J_pass").unbind("click").bind("click", function(){
				result_comfirm("确认通过审核？工单流程将结束！", function(){
					var J_suggestion = $("#J_suggestion").val();
					$.PostJson(srvMap.get("D_YBGD"), "cId="+cId+"&zui_check_val="+zui_check_val+"&J_suggestion="+J_suggestion, function(state, json){
						if(state == 'success'){
							if(json){
								result_tips("审核通过操作成功！");
								$("#J_navigation .right").trigger("click");
							}else{
								result_prompt(0, json.rtnMsg || "操作失败！");
							}
						}else{
							result_prompt(0, json.rtnMsg || "系统错误！");
						}
					})
				})
			})

			$("#J_unpass").unbind("click").bind("click", function(){
				result_comfirm("确认不通过审核？工单将发往**省进行补登记！", function(){
					var J_suggestion = $("#J_suggestion").val();
					$.PostJson(srvMap.get("D_YBGD"), "cId="+cId+"&zui_check_val="+zui_check_val+"&J_suggestion="+J_suggestion, function(state, json){
						if(state == 'success'){
							if(json){
								result_tips("审核不通过操作成功！");
								$("#J_navigation .right").trigger("click");
							}else{
								result_prompt(0, json.rtnMsg || "操作失败！");
							}
						}else{
							result_prompt(0, json.rtnMsg || "系统错误！");
						}
					})
				})
			})

			$("#J_wait").unbind("click").bind("click", function(){
				result_comfirm("确认待定审核？工单将交由审核专家最终判定！", function(){
					var J_suggestion = $("#J_suggestion").val();
					$.PostJson(srvMap.get("D_YBGD"), "cId="+cId+"&zui_check_val="+zui_check_val+"&J_suggestion="+J_suggestion, function(state, json){
						if(state == 'success'){
							if(json){
								result_tips("审核待定操作成功！");
								$("#J_navigation .right").trigger("click");
							}else{
								result_prompt(0, json.rtnMsg || "操作失败！");
							}
						}else{
							result_prompt(0, json.rtnMsg || "系统错误！");
						}
					})
				})
			})

			$("#J_cancel").unbind("click").bind("click", function(){
				if(dialog.get("D_confirm"))
					return false;
				dialog.get("D_showYBGD").close().remove();
			})

			//按键绑定
			$(document).unbind("keyup").bind("keyup", function(evt){
				var evt = (evt) ? evt : window.event;
				console.log(evt.keyCode)
				switch(evt.keyCode){
					case 49:
						$(".suggestion-wrap .zui_check_list .zui_check").eq(0).trigger("click");
						break;
					case 50:
						$(".suggestion-wrap .zui_check_list .zui_check").eq(1).trigger("click");
						break;
					case 51:
						$(".suggestion-wrap .zui_check_list .zui_check").eq(2).trigger("click");
						break;
					case 52:
						$(".suggestion-wrap .zui_check_list .zui_check").eq(3).trigger("click");
						break;
					case 53:
						$(".suggestion-wrap .zui_check_list .zui_check").eq(4).trigger("click");
						break;
					case 89:
						$("#J_pass").trigger("click");
						break;
					case 78:
						$("#J_unpass").trigger("click");
						break;
					case 84:
						$("#J_wait").trigger("click");
						break;
					case 67:
						$("#J_cancel").trigger("click");
						break;
				}
			})
		}
	}
	return fnInit;
})