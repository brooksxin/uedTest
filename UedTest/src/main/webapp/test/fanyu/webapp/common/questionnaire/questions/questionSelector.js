define(['backbone', 'underscore', 'handlebars'
	, 'text!tpl/questionnaire/choiceQuestion.tpl'
	, 'text!tpl/questionnaire/choiceQuestionList.tpl'
	
	, 'jquery'
	, 'dialog'
	, 'jquery.blockUI'
	, 'jquery.pagination'

	, 'style!css/questionnaire/questions/questionSelector.css'
	]
	, function(Backbone, _, Handlebars, tpl, listTpl
	, $,Dialog){

	var $el = null;
	var G_params = null;
	var $form = null;
	var queryUserParams = {"DEPT_ID" : userInfo.bean.deptId};
	var _selectData ="";
	
	var Obj = function(options){
		this.init();
	}
	_.extend(Obj.prototype, Backbone.Events)
	
	_.extend(Obj.prototype, {
	
		selectCallback:null,
		//template:Handlebars.compile(tpl), 
		init:function(){
			_selectData="";
			this.$el = $(tpl);
			var $el = this.$el;
			
			d = new Dialog({
				title: '选择问题',
				width:900, height:600, 
				content: this.$el,
				okValue: '确定',
				ok: $.proxy(this.getSelectVal, this),
				cancelValue: '取消',
				cancel:  function() {}
			});
			d.showModal();
		    
		    /***********************************************
	    	注意：tpl文件应该确保是一个大DIV或完整一个DOM，不能是多个DOM片段,否则$(tpl)取到的是tpl模板文件中的第一个DOM节点。
		    ***********************************************/

		    $form = $("#J_formSearch", $el);
		    srvMap.add('query' , 'questionnaire/lib.json','front/sh/question!index?uid=mys0058');//查询问题列表
			srvMap.add('queryUser', '','front/sh/user!userinfo?uid=u005');//查询下级人员
			srvMap.add('previewQuestionaire', '','front/sh/questionaire!index?uid=qnrwq004');
			srvMap.add('queryAnswer', 'query.json', 'front/sh/question!index?uid=mys005');//查询答案的服务
			this.G_params = G_params;
          	var G_params = {
       		    url : srvMap.get('query'),
       		    searchformId :"J_formSearch",
       		    items_per_page : 100 ,   // 每页数     @param : limit
       		    page_index : 0 , //当前页  @param : start
       		    pagination : "Pagination" , //分页id
		        tabletpl : Handlebars.compile(listTpl),  //表单模型
		        tablewrap :this.$el.find(".J_tabletpl") //表格容器
	      		/*************************************************
	      		模块化的方法需要这样先调用handlebars编译,非模块化的方法直接写ID
				tabletpl : "T_tabletpl",  //表格模板
       		    tablewrap :"J_tabletpl" //表格容器
	      		***********************************************/
        		};
    
            //初始化函数
          	var cmd={"DEPT_ID": 1000000000106};
			Util.ajax.postJson(srvMap.get('queryUser'), queryUserParams, function(json, status) {
				if (status) {
					var _html = '<option value="">请选择</option>'+'{{#each beans}}<option value="{{PTY_NO}}">{{PTY_NO}} {{PTY_NM}}</option>{{/each}}';
					$('#USER_ID', $el).html(Handlebars.compile(_html)(json));
				};
			});
            
       	  	var str= $("#"+G_params.searchformId).serialize();
       	  	Util.pagination(0, true , G_params , str );
			
			/***********************************************************
			注意：模块化后$('#J_search').html()取不到元素,如alert($('#J_search').html())得到是未定义，因为页面还没有把tpl文件插入到页面中
			正确的取值方式是：$("#J_search",$el)
			*******************************************************/
			var $search = $("#J_search", this.$el);
			$search.on('click',function (){
				var str= $form.serialize();
				Util.pagination(G_params.page_index , true , G_params , str );
			});	    



			//预览问题
			$(this.$el).on('click', '.watch', function (e) {

				debugger;
			    var dialog = document.getElementById("T_title");// || top.document.getElementById("T_title")
			    var params = {
			        //top: top,
			        title: '问题预览',
			        content: dialog,
			        width: 600,
			        height: 350,
			        cancelVal: '取消',
			        cancelCallback: function () {
			            $("#J_qAnswerEdit").empty();
			            $("#gggtitle").html("");
			        }
			    }
			    Util.dialog.openDiv(params);
			    
			    var json = JSON.parse($(e.currentTarget).parent().attr('data'));
			    $("#gggtitle").html(json.QU_DESC);
			    $("#ftitle").html(json.QU_NM);
			    if (json.QU_TYPE_CD == "单选题") {
			        var cmd = {"QU_ID": json.QU_ID};
			        var str=""
			        Util.loading.create($("#J_qAnswerEdit"));
			        Util.ajax.postJson(srvMap.get("queryAnswer"), cmd, function (data) {
			            if (data.returnCode == 0) {
			                var beans = data.beans;
			                for (var i = 0; i < beans.length; i++) {
			                    str += "<li><i class=\"listIndex\">" + beans[i].NOTO + "</i>" + beans[i].ASWR_CNTT +"</li>";
			                }
			                $("#J_qAnswerEdit").html(str);
			                Util.loading.close($("#J_qAnswerEdit"));
			            }
			        });
			    } else if (json.QU_TYPE_CD == "判断题") {
			        var cmd = {"QU_ID": json.QU_ID};
			        var str=""
			        Util.loading.create($("#J_qAnswerEdit"));
			        Util.ajax.postJson(srvMap.get("queryAnswer"), cmd, function (data) {
			            if (data.returnCode == 0) {
			                var beans = data.beans;
			                for (var i = 0; i < beans.length; i++) {
			                    str += "<li><i class=\"listIndex\">" + beans[i].NOTO + "</i>" + beans[i].ASWR_CNTT +"</li>";
			                }
			                $("#J_qAnswerEdit").html(str);
			                Util.loading.close($("#J_qAnswerEdit"));
			            }
			        });
			    } else if (json.QU_TYPE_CD == "多选题") {
			        var cmd = {"QU_ID": json.QU_ID};
			        var str=""
			        Util.loading.create($("#J_qAnswerEdit"));
			        Util.ajax.postJson(srvMap.get("queryAnswer"), cmd, function (data) {
			            if (data.returnCode == 0) {
			                var beans = data.beans;
			                for (var i = 0; i < beans.length; i++) {
			                    str += "<li><i class=\"listIndex\">" + beans[i].NOTO + "</i>" + beans[i].ASWR_CNTT +"</li>";
			                }
			                $("#J_qAnswerEdit").html(str);
			                Util.loading.close($("#J_qAnswerEdit"));
			            }
			        });
			    } else if (json.QU_TYPE_CD == "填空题") {
			    	var str=""
			    	str += "<li><input type='text' ></li>";
			    	$("#J_qAnswerEdit").html(str);
			    } else if (json.QU_TYPE_CD == "问答题") {
			    	var str=""
			    	str += "<li><input type='text' ></li>";
			    	$("#J_qAnswerEdit").html(str);
			    } else if (json.QU_TYPE_CD == "日期题") {
			    	var str=""
			    	str += "<li><input type='text' ></li>";
			    	$("#J_qAnswerEdit").html(str);
			    }
			});





		},
		//取选中项的ID
		getSelectVal:function(){
			var valContainer= new Array();
			var _obj = $("input[type='checkbox']:checked",$el);
			var _objLength = $("input[type='checkbox']:checked",$el).length;
			for(var a=0;a<_objLength;a++){
				valContainer.push(_obj[a].value);
			}
			$("input[type='checkbox']:checked",$el).attr("checked",false);
			_selectData = valContainer.join(",")
			//console.log(_selectData);
			this.trigger('select', _selectData);
			return _selectData;
		}
	});

          Handlebars.registerHelper("isInto", function(QU_STS_CD,QU_ID,QU_TYPE_CD){
        	  var buffer = "";
        	  switch(QU_STS_CD){
        	  case "新建":  
        		  buffer ='<a class="item-text watch"  href="javascript:;" >预览</a>';  	  
        	  break;
        	  case "发布":  
        		  buffer ='<a class="item-text watch"  href="javascript:;" >预览</a>';
        	  break;
        	  case "失效":  
        		  buffer ='<a class="item-text watch"  href="javascript:;" >预览</a>';
        	  break;
        	  }
        	  return new Handlebars.SafeString(buffer);
          });
          
          Handlebars.registerHelper('dataToJSON', function(obj) {
        	  return JSON.stringify(obj);
       	  });

        	  
	return Obj;
});
