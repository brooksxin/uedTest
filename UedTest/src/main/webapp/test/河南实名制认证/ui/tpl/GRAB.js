define(['text!../tpl/D_GRAB.tpl?v='+(new Date().getTime())], function(tpl){

	srvMap.add("D_YBGD", "tableData.json?1=1", "");

	var fnInit = function(){
		var D_param = {
			id: "D_showGRAB",
			title: "抢单",
			content: tpl,
			width: 970,
			cancel: false
		}
		openWindowDiv(D_param, function(e){
			//绑定关闭弹窗事件
			dialog.get("D_showGRAB").addEventListener('close', function(){
				$("#J_navigation").hide();
				$("#J_search").trigger("click");
			})

			//初始化弹窗内容
			initNavi();
		})
	}

	function initNavi(){
		$.PostJson(srvMap.get("D_YBGD"), "", function(state, json){
			if(state == 'success'){
				if(json){
					$(".detail_wrap").temp($("#T_D_YBGD"), json.rows[0]);
					dialog.get("D_showGRAB").reset();
					initHandleBtn();

				}else{
					result_prompt(0, json.rtnMsg || "抢单失败！");
				}
			}else{
				result_prompt(0, json.rtnMsg || "系统错误！");
			}
		})
	}

	function initHandleBtn(){

		//图片查看
		jQuery_1_6_3(".zpicbox").picbox();

		//隐藏不重要
		$("#J_toggle").find('a').unbind("click").bind("click", function(){
			var $J_toggle = $("#J_toggle");
			if($J_toggle.hasClass("open")){
				$J_toggle.removeClass("open").siblings("tr.hide").addClass("fn-hide").end().find("a").html('点击展开<i class="iconfont" title=""></i>');
			}else{
				$J_toggle.addClass("open").siblings("tr.hide").removeClass("fn-hide").end().find("a").html('点击收起<i class="iconfont" title=""></i>');
			}
		})

		//按键绑定
		$(document).unbind("keyup").bind("keyup", function(evt){
			quickClick(evt);
		})

		//快速选择
		$(".suggestion-wrap .zui_check_list .zui_check").unbind("click").bind("click", function(){
			var $this = $(this);
			var $val = $this.data("id");
			if($this.hasClass("checked")){
				switch($val){
					case 0:
						goPass();
						break;
					case 8:
						goOther();
						break;
					default:
						var auditOpinion = $this.data("des");
						goUnPass($val, auditOpinion);
						break;
				}
			}else{
				$(".suggestion-wrap .zui_check_list .zui_check").removeClass("checked");
				$(".J_suggestion").addClass("fn-hide");
				
				$this.addClass('checked');
				if($val == 8){
					$(".J_suggestion").removeClass("fn-hide");
				}
				switch($val){
					case 0:
						goPass();
						break;
					case 8:
						goOther();
						break;
					default:
						var auditOpinion = $this.data("des");
						goUnPass($val, auditOpinion);
						break;
				}
			}
		})
	}

	function quickClick(evt){
		var evt = (evt) ? evt : window.event;
		switch(evt.keyCode){
			case 48:case 96:
				$(".suggestion-wrap .zui_check_list .zui_check").eq(0).trigger("click");
				break;
			case 49:case 97:
				$(".suggestion-wrap .zui_check_list .zui_check").eq(1).trigger("click");
				break;
			case 50:case 98:
				$(".suggestion-wrap .zui_check_list .zui_check").eq(2).trigger("click");
				break;
			case 51:case 99:
				$(".suggestion-wrap .zui_check_list .zui_check").eq(3).trigger("click");
				break;
			case 52:case 100:
				$(".suggestion-wrap .zui_check_list .zui_check").eq(4).trigger("click");
				break;
			case 53:case 101:
				$(".suggestion-wrap .zui_check_list .zui_check").eq(5).trigger("click");
				break;
			case 54:case 102:
				$(".suggestion-wrap .zui_check_list .zui_check").eq(6).trigger("click");
				break;
			case 55:case 103:
				$(".suggestion-wrap .zui_check_list .zui_check").eq(7).trigger("click");
				break;
			case 56:case 104:
				$(".suggestion-wrap .zui_check_list .zui_check").eq(8).trigger("click");
				break;
		}
	}

	function goPass(){
		result_comfirm_S("确认通过审核？工单流程将结束！", function(){
			$.PostJson(srvMap.get("D_YBGD"), "", function(state, json){
				if(state == 'success'){
					if(json){
						result_tips("审核通过操作成功！");
						initNavi();
					}else{
						result_prompt(0, json.rtnMsg || "操作失败！");
					}
				}else{
					result_prompt(0, json.rtnMsg || "系统错误！");
				}
			})
		},"", function(){
			dialog.get("D_showGRAB").close().remove();
		})
	}

	function goOther(){
		dialog.get("D_showGRAB").reset();
	}

	return fnInit;
})