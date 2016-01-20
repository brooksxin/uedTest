define(['text!tpl/questionnaire/questionnaire.tpl'],function(tpl) {
	var $el = $(tpl);

	//tips
    $.fn.fanyTips = function(param){
    	var defaults = {
    		"maxWidth": 270,
    		"maxHeight": 150,
    		"backgroundColor": "#fff",
    		"ownClass": "ui-ques-tips",
    		"isSimulation":''
    	}
    	var options = $.extend({}, defaults, param);
    	var $random = parseInt(Math.random()*100000, 10);
    	var $this = $(this);
    	$el.prepend('<div class="querstionView fn-hide '+options.ownClass+'" id="fanyTips_'+$random+'"><div class="viewTitle"></div><div class="viewAnswer"></div><div class="divArrow"></div></div>');
    	var $fanyTips = $("#fanyTips_"+$random,$el);

    	$this.unbind("mouseover").bind("mouseover", function(e){
    		var content = $(this).data("json")||"暂无信息！";
    		$fanyTips.find('.viewTitle').html($(this).siblings('.qTxt').html());
    		$fanyTips.find(".viewAnswer").html(content);
    		if (!param.isSimulation) {
    			var l = $(this).offset().left + $(this).width()+15;
    			var t = $(this).offset().top + $(this).height() - 30;	
    		}else{
    			var l = 230;
    			var t = $(this).offset().top + $(this).height() - 107;
    		}
    		$fanyTips.css({"left": l, "top": t}).show();
    	});
    	$this.unbind("mouseout").bind("mouseout", function(e){
			$fanyTips.hide();
    	})
    	$fanyTips.unbind("mouseover").bind("mouseover", function(e){
    		$fanyTips.show();
    	});
    	$fanyTips.unbind("mouseout").bind("mouseout", function(e){
    		$fanyTips.hide();
    	});
    }

	var init = function(param,isSimulation,CNTMNG_ID,CMPGN_ID,CHNL_ID,RESV_MOBNUM){
		srvMap.add('getInitQues','ques_choice_blanks.json','front/sh/questionaire!index?uid=qoro018');//初始化页面，加载第一题
		srvMap.add('getQues','ques_choice_single.json','front/sh/questionaire!index?uid=qoro016');//加载下一题问卷题目
		srvMap.add('endQues','ques_choice_single.json','front/sh/questionaire!index?uid=qoro012');//结束答题
		srvMap.add('sendAnsw','ques_choice_single.json','front/sh/questionaire!index?uid=qoro026');//发送答案
		var initDatas = {
			"QNR_ID" : param.QNR_ID,  		//问卷记录id
			"QNR_ISTNC_ID" : param.QNR_ISTNC_ID,
			"isSimulation" : isSimulation?isSimulation:'',	//是否是模拟问卷
			"QNR_FILL_TYPE_CD" : "",   	//问卷填写类型代码
			"CMPGN_ID" : CMPGN_ID?CMPGN_ID:'',  			//营销活动id
			"CHNL_ID":CHNL_ID?CHNL_ID:'',  				//渠道id
			"CNTMNG_ID" : CNTMNG_ID?CNTMNG_ID:'',  			//接触id
			"CNVST_TELNUM" : RESV_MOBNUM?RESV_MOBNUM:'',  		//通话电话号码
			"FINISH_ASWSHET_TIME" : "",  	//结束答卷时间
			"QNR_REC_DESC" : "20",  		//问卷记录描述
			"QNR_BELG_DEPT_ID" : ""  			//所属部门id
		}
		loadQues(initDatas,srvMap.get('getInitQues'));
		if (isSimulation) {
			$('.questionLeft',$el).height(350).css('overflow','auto');
		};
		//上一题
		$('#J_before',$el).unbind('click').on('click',function(){
			$('#J_next',$el).addClass('BGblue').removeClass('BGgray').unbind('click').on('click',next);
			if ($('.ques_end',$el).length) {
				$('.ques_end',$el).remove();
			};
			if ($('#J_que_fail',$el).length) {
				$('#J_que_fail',$el).remove();
			};
			if ($('#J_ques_items li',$el).length>1) {
				$(this).removeClass('disable');
				var $lastLi = $('#J_ques_items li:last',$el),
					$lastQue = $('#J_questionRender .qBox:last',$el);
				$lastLi.remove();
				$lastQue.prev().show().end().remove();
			}
			if ($('#J_ques_items li',$el).length<2){
				$(this).addClass('disable');
			}
		})

		//下一题
		$('#J_next',$el).unbind('click').on('click',next);

		function next(){
			if ($('#J_before',$el).hasClass('disable')) {
				$('#J_before',$el).removeClass('disable');
			}
			$('#J_ques_items li.cur',$el).nextAll('li').remove();
			$('#J_questionRender .cur',$el).nextAll('.qBox').remove();
			var $lastLi = $('#J_ques_items li:last',$el),
				$lastQue = $('#J_questionRender .qBox:last',$el),
				queType = $lastQue.attr('queType'),
				anserTxt = '',//页面显示的答案
				aswr_cntt = '',//主观题答案
				datas = {
					"isSimulation" : isSimulation?isSimulation:'',	//是否是模拟问卷
					'QU_ID' : $lastQue.attr('queId'),				//问题id
					'QU_TYPE_CD' : queType,							//问题类型
					'QNR_ISTNC_ID' : $lastQue.attr('QNR_ISTNC_ID'),	//问卷实例id
					'QNR_REC_ID' : $lastQue.attr('QNR_REC_ID'),		//问卷记录id
					'beans' : []
				};

			/*
			*	获取题目答案
			*	填空题：10		单选题：20		多选题：30		判断题：40
			*	问答题：50		日期题：60		开场白：0B		结束语：0E
			*/
			if (queType === '10') {
				var tempArr = [],tempDatas=[];
				$lastQue.find("input[type='text']").each(function(){
					var _this = $(this);
					tempArr.push(_this.val());
					datas.beans.push({
						"QNR_ISTNC_ID":_this.attr('id'),
						"CUST_FILL_ASWR_CNTT":_this.val()
					});
				})
				datas.TGT_QU_ID = $lastQue.attr('TGT_QU_ID');
				anserTxt = tempArr.join(' ');
			}else if (queType === '20') {
				if ($lastQue.find("input[type='radio']:checked").length) {
					anserTxt = $lastQue.find("input[type='radio']:checked + label").text();
					datas.beans.push({
						"QNR_ISTNC_ID" : $lastQue.find("input[type='radio']:checked").attr('QNR_ISTNC_ID'),
						"TGT_QU_ID" : $lastQue.find("input[type='radio']:checked").attr('TGT_QU_ID'),
						"CUST_FILL_ASWR_CNTT" : ""
					});
				}else{
					alert('请选择答案！');
				}
			}else if (queType === '30') {
				for (var i = 0; i < $lastQue.find("input[type='checkbox']:checked").length; i++) {
					anserTxt += $lastQue.find("input[type='checkbox']:checked").eq(i).next().text()+' ';
					datas.beans.push({
						'QNR_ISTNC_ID' : $lastQue.find("input[type='checkbox']:checked").eq(i).attr('QNR_ISTNC_ID'),
						"CUST_FILL_ASWR_CNTT" : ""
					})
				};
				datas.TGT_QU_ID = $lastQue.attr('TGT_QU_ID');
			}else if (queType === '40') {
				if ($lastQue.find("input[type='radio']:checked").length) {
					anserTxt = $lastQue.find("input[type='radio']:checked + label").text();
					datas.beans.push({ 
						"QNR_ISTNC_ID" : $lastQue.find("input[type='radio']:checked").attr('QNR_ISTNC_ID'),
						"TGT_QU_ID" : $lastQue.find("input[type='radio']:checked").attr('TGT_QU_ID'),
						"CUST_FILL_ASWR_CNTT" : ""
					});
				}else{
					alert('请选择答案！');
				}
			}else if (queType === '50') {
				anserTxt = $lastQue.find("textarea").val();
				datas.beans.push({
					"CUST_FILL_ASWR_CNTT" : anserTxt,
					"QNR_ISTNC_ID" : ""
				});
				datas.TGT_QU_ID = $lastQue.attr('TGT_QU_ID');
			}else if (queType === '60') {
				anserTxt = $lastQue.find("input[type='text']").val();
				datas.beans.push({
					"CUST_FILL_ASWR_CNTT" : anserTxt,
					"QNR_ISTNC_ID" : ""
				});
				datas.TGT_QU_ID = $lastQue.attr('TGT_QU_ID');
			}
			if (queType === '40' || queType === '20') {
				if ($lastQue.find("input[type='radio']:checked").length) {
					var ability_tips = {
						"ownClass": "ques-tips",
						"isSimulation":isSimulation
					}
					if (!isSimulation) {
						$lastLi.find('.okIcon').show().end().find('.anserTxt').text(anserTxt).attr('data-json',anserTxt).fanyTips(ability_tips);
					}else{
						$lastLi.find('.okIcon').show().end().find('.anserTxt').text(anserTxt).attr('data-json',anserTxt);
					}
					loadQues(datas);
				}
			}else{
				var ability_tips = {
					"ownClass": "ques-tips",
					"isSimulation":isSimulation
				}
				if (!isSimulation) {
					$lastLi.find('.okIcon').show().end().find('.anserTxt').text(anserTxt).attr('data-json',anserTxt).fanyTips(ability_tips);
				}else{
					$lastLi.find('.okIcon').show().end().find('.anserTxt').text(anserTxt).attr('data-json',anserTxt);
				}
				loadQues(datas);
			}
		}

		$('#J_ques_items',$el).on('click','li',function(){
			$('#J_next',$el).addClass('BGblue').removeClass('BGgray').unbind('click').on('click',next);
			var _this = $(this),
				index = _this.index();
			_this.addClass('cur').siblings().removeClass('cur');
			$('#J_questionRender .qBox',$el).eq(index).addClass('cur').siblings().removeClass('cur');
			$('#J_questionRender .qBox',$el).eq(index).show().siblings().hide();
		});
		//重新答题
		$('#J_again_que',$el).unbind('click').on('click', function() {
			$('#J_next',$el).addClass('BGblue').removeClass('BGgray').unbind('click').on('click',next);
			$('#J_ques_items',$el).html('');
			$('#J_questionRender',$el).html('<div class="ui-loading" style="margin:60px auto;"><h1><img src="../../css/images/loading.gif" alt="loading">正在加载，请稍等 ...</h1></div>');
			loadQues(initDatas,srvMap.get('getInitQues'));
		});
		//结束答题
		$('#J_finish_que',$el).unbind('click').on('click',function() {
			var QNR_REC_ID = $('#J_questionRender .qBox:last',$el).attr('QNR_REC_ID');
			Util.ajax.postJson(srvMap.get('endQues'),'QNR_REC_ID='+QNR_REC_ID,function(json,status){
			    if (status) {
		    		$('#J_next,#J_before,#J_finish_que,#J_again_que',$el).hide();
		    		Util.ajax.loadTemp($('#J_questionRender',$el),$('#T_ques_end',$el),json.object);
		    	}else{
		    		alert(json.returnMessage||'结束答题失败！');
		    	}
			})
		})
	}

	/*
	*	加载题目
	*/
	var loadQues = function(datas,url){
		if (url) {
    		$('#J_next,#J_before,#J_finish_que,#J_again_que',$el).show();
			$('#J_ques_items',$el).html('');
			$('#J_questionRender',$el).html('<div class="ui-loading" style="margin: 60px auto; display: none;"><h1><img src="../../css/images/loading.gif" alt="loading">正在加载，请稍等 ...</h1></div>');
		};
		datas =JSON.stringify(datas);
		var $queWrap = $('#J_questionRender',$el);//问题右侧问题容器
		$('#J_que_fail',$el).length?$('#J_que_fail',$el).remove():'';
		$('.ui-loading',$el).show();
		$queWrap.find('.qBox').hide();
		Util.ajax.postJson(url?url:srvMap.get('getQues'),'queParams='+datas,function(json,status){
			$('.ui-loading',$el).hide();
		    if (status) {
		    	var queIndex = 0;
		    	if (json.object.QU_TYPE_CD != '0E') {
		    		appendTemp($('#J_ques_items',$el),$('#T_ques_cata',$el),json.object);//追加问卷纲要
			    	queIndex = $('#J_ques_items li',$el).index()+1;
			    	$('#J_ques_items li:last',$el).find('.J_que_index').text(queIndex);//添加题目索引
			    	$('#J_ques_items li:last',$el).siblings().removeClass('cur');
		    	}
		    	if (json.object.QU_TYPE_CD === '10') {
		    		appendTemp($queWrap,$('#T_ques_blanks',$el),json.object);
		    	}else if (json.object.QU_TYPE_CD === '20') {
		    		appendTemp($queWrap,$('#T_ques_choice_single',$el),json.object);
		    	}else if (json.object.QU_TYPE_CD === '30') {
		    		appendTemp($queWrap,$('#T_ques_choice_multi',$el),json.object);
		    	}else if (json.object.QU_TYPE_CD === '40') {
		    		appendTemp($queWrap,$('#T_ques_choice_single',$el),json.object);
		    	}else if (json.object.QU_TYPE_CD === '50') {
		    		appendTemp($queWrap,$('#T_ques_essay',$el),json.object);
		    	}else if (json.object.QU_TYPE_CD === '60') {
		    		appendTemp($queWrap,$('#T_ques_date',$el),json.object);
		    	}else if (json.object.QU_TYPE_CD === '0E') {
		    		datas = JSON.parse(datas);
		    		var answJson = [];
		    		$('#J_questionRender .qBox',$el).each(function(){
		    			var _this = $(this),
							anserTxt = '',
		    				queType = _this.attr('queType'),
		    				tempDatas = {
		    					"isSimulation" : datas.isSimulation?datas.isSimulation:'',	//是否是模拟问卷
		    					'QU_ID' : _this.attr('queId'),				//问题id
		    					'QU_TYPE_CD' : queType,							//问题类型
		    					'QNR_ISTNC_ID' : _this.attr('QNR_ISTNC_ID'),	//问卷实例id
		    					'QNR_REC_ID' : _this.attr('QNR_REC_ID'),		//问卷记录id
		    					'beans' : []
		    				};
		    			if (queType === '10') {
		    				var tempArr = [];
		    				_this.find("input[type='text']").each(function(){
		    					var _that = $(this);
		    					tempArr.push(_this.val());
		    					tempDatas.beans.push({
		    						"QNR_ISTNC_ID":_that.attr('id'),
		    						"CUST_FILL_ASWR_CNTT":_that.val()
		    					});
		    				})
		    				tempDatas.TGT_QU_ID = _this.attr('TGT_QU_ID');
		    			}else if (queType === '20') {
	    					tempDatas.beans.push({
	    						"QNR_ISTNC_ID" : _this.find("input[type='radio']:checked").attr('QNR_ISTNC_ID'),
	    						"TGT_QU_ID" : _this.find("input[type='radio']:checked").attr('TGT_QU_ID'),
	    						"CUST_FILL_ASWR_CNTT" : ""
	    					});
		    			}else if (queType === '30') {
		    				for (var i = 0; i < _this.find("input[type='checkbox']:checked").length; i++) {
		    					tempDatas.beans.push({
		    						'QNR_ISTNC_ID' : _this.find("input[type='checkbox']:checked").eq(i).attr('QNR_ISTNC_ID'),
		    						"CUST_FILL_ASWR_CNTT" : ""
		    					})
		    				};
		    				tempDatas.TGT_QU_ID = _this.attr('TGT_QU_ID');
		    			}else if (queType === '40') {
		    				if (_this.find("input[type='radio']:checked").length) {
		    					tempDatas.beans.push({ 
		    						"QNR_ISTNC_ID" : _this.find("input[type='radio']:checked").attr('QNR_ISTNC_ID'),
		    						"TGT_QU_ID" : _this.find("input[type='radio']:checked").attr('TGT_QU_ID'),
		    						"CUST_FILL_ASWR_CNTT" : ""
		    					});
		    				}else{
		    					alert('请选择答案！');
		    				}
		    			}else if (queType === '50') {
		    				anserTxt = _this.find("textarea").val();
		    				tempDatas.beans.push({
		    					"CUST_FILL_ASWR_CNTT" : anserTxt,
		    					"QNR_ISTNC_ID" : ""
		    				});
		    				tempDatas.TGT_QU_ID = _this.attr('TGT_QU_ID');
		    			}else if (queType === '60') {
		    				anserTxt = _this.find("input[type='text']").val();
		    				tempDatas.beans.push({
		    					"CUST_FILL_ASWR_CNTT" : anserTxt,
		    					"QNR_ISTNC_ID" : ""
		    				});
		    				tempDatas.TGT_QU_ID = _this.attr('TGT_QU_ID');
		    			}
		    			answJson.push(tempDatas);
		    		});
					//console.log(answJson);
					answJson = JSON.stringify(answJson);
					
					//发送答案
					Util.ajax.postJson(url?url:srvMap.get('sendAnsw'),'answParams='+answJson,function(data,status){
						$('.ui-loading',$el).hide();
					    if (status) {
					    	$('#J_next',$el).addClass('BGgray').removeClass('BGblue').unbind('click');
					    	appendTemp($queWrap,$('#T_ques_end',$el),json.object);
				    	}else{
				    		$queWrap.append('<div id="J_que_fail" style="margin:20px;">提交答案失败！</div>');
				    	}
					})
		    	}
		    	$('#J_questionRender .qBox:last',$el).find('.J_que_index').text(queIndex);//添加题目索引
		    	$('#J_questionRender .qBox:last',$el).siblings('.qBox').removeClass('cur');
		    }else{
		    	$queWrap.append('<div id="J_que_fail" style="margin:20px;">加载题目失败！</div>');
		    }
		})
	}
	//追加题目
	var appendTemp = function($J_id,$T_id,json){
		var template = Handlebars.compile($T_id.html());
		$J_id.append(template(json));
	}

	Handlebars.registerHelper("capIndex", function(str,fn){
	    var buffer ='';
	    if (str == 0) {
	      buffer = 'A';
	    }else if(str == 1){
	      buffer = 'B';
	    }else if(str == 2){
	      buffer = 'C';
	    }else if(str == 3){
	      buffer = 'D';
	    }else if(str == 4){
	      buffer = 'E';
	    }else if(str == 5){
	      buffer = 'F';
	    }
	    return buffer;
	});
	return {init:init,getTpl:$el}
})