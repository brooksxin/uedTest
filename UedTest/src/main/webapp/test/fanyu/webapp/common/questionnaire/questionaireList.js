
define(['handlebars', 'text!tpl/questionnaire/questionaire.tpl', 'text!tpl/questionnaire/questionaireList.tpl'
  , 'common/util/searchToggle', 'jquery', 'dialog','jquery.blockUI', 'jquery.pagination']
	, function(Handlebars, tpl, listTpl, SearchToggle, $,Dialog){

	var $el = null;
	var G_params = null;
	var $form = null;
	var queryUserParams = {"DEPT_ID" : userInfo.bean.deptId};
	var _QNR_ID,_QNR_STS_CD;
	
	var init = function(Loading){
		Loading && Loading.destroy();
		
	    $el = $(tpl);
	    $form = $("#J_formSearch", $el);
		srvMap.add('queryQuestionaire', 'questionaire/queryQuestionaire.json','front/sh/questionaire!index?uid=qnrwq006');//查询问卷
		
		srvMap.add('getChnl', '','front/sh/user!getChnl?uid=u003');//查询一级渠道
		srvMap.add('getChnlSub', '','front/sh/user!getChnl?uid=u003');//查询所有渠道信息
		
		srvMap.add('queryUser', '','front/sh/user!userinfo?uid=u005');//查询所有的本部门员工
		srvMap.add('invalidQuestionaire', '','front/sh/questionaire!index?uid=qnrwq007');//作废问卷
		srvMap.add('unionDeleteQuestionaire', '','front/sh/questionaire!index?uid=qnrwq002');//删除问卷
		srvMap.add('modifyQuestionaire', '','front/sh/questionaire!index?uid=qnrwq003');//修改问卷
		srvMap.add('previewQuestionaire', '','front/sh/questionaire!index?uid=qnrwq004');//预览问卷
		srvMap.add('cloneQuestionaire', '','front/sh/questionaire!index?uid=qnrwq005');//复制问卷
    	srvMap.add('queryDept', 'query.json', 'front/sh/user!userinfo?uid=u011');//查询所属机构列表
		
		//所属机构初始化
		var jsonDpet = null;
    	$J_chan=$("#QNR_BELG_DEPT_ID",$el);
		Util.ajax.postJsonSync(srvMap.get("queryDept"),'',function(json1,status){
			jsonDpet=json1.object;
			//console.log(json1);
			//debugger;
			//console.log(jsonDpet);
			if(jsonDpet && jsonDpet.length != 0){
				for (var i = 0; i < jsonDpet.length; i++) {
				$J_chan.append("<option value='"+jsonDpet[i]['TGT_PTY_ID']+"'>"+jsonDpet[i]['PTY_NM']+"</option>");
				};
			}

		})

	    G_params = {
	      url : srvMap.get('queryQuestionaire'),
	      searchformId :"J_formSearch",
	      items_per_page : 10 ,   // 每页数     @param : limit
	      page_index : 0 , //当前页  @param : start
	      pagination : "Pagination" , //分页id
	      tabletpl : Handlebars.compile(listTpl),  //表单模型
	      tablewrap :$el.find("#J_tabletpl") //表格容器
	    };
    
    
   	eventInit();
	listInit();
   	SearchToggle.init($el);
   	chanelSelectInit();
   	userSelectInit();
	};
	
	
	var eventInit = function(){

		//级联下拉列表操作
		var $chanelSelct = $("#firest_RNG_ID", $el);
		$chanelSelct.change(function(){
			var _selectIndex = $(this).children('option:selected').attr("data");
			var _optionHtml = "";
			$('#SUIT_RNG_ID', $el).html(_optionHtml);
			//判断是否选择了渠道项
			if($(this).children('option:selected').val() != ""){
			
				Util.ajax.postJson(srvMap.get('getChnlSub'), '', function(json, status) {
					if (status) {

						//根据一级节点的索引判断有无二级渠道
						if(typeof(json.object[_selectIndex].subList) != "undefined"){
							//如果存在二级渠道，把一级渠道的NAME改变，不让其做为查询参数传递
							$("#firest_RNG_ID").attr("name","SUIT_RNG_ID_temp");
							$("#SUIT_RNG_ID").attr("name","SUIT_RNG_ID");
							for(var x in json.object[_selectIndex].subList){
								if(json.object[_selectIndex].subList != "undefined"){
									_optionHtml +='<option value="'+json.object[_selectIndex].subList[x].CHNL_ID+'">'+json.object[_selectIndex].subList[x].PTY_NM+'</option>'
									$('#SUIT_RNG_ID', $el).html(_optionHtml);
								}
							}
						}else{
							$('#SUIT_RNG_ID', $el).html("<option value=''>当前渠道无二级分类</option>");
							//如果不存在二级渠道，把一级渠道做为查询参数传递
							$("#firest_RNG_ID").attr("name","SUIT_RNG_ID");
							$("#SUIT_RNG_ID").attr("name","SUIT_RNG_ID_temp1");
						};
					};
				});
			};
		});


		//查询操作
		var $search = $("#J_search", $el);
		$search.click(function (){
			var str= $form.serialize();
			console.log(str);
			//询问一下工号查询是否是针对PTY_NO？
			Util.pagination(0, true , G_params , str );
		});

		

		

		//数据行操作
		var $list = $("#J_tabletpl", $el);
		$list.on('click', '.gridRowBtn a', function(e){
			var _proType = $(e.currentTarget).attr('data')
			var _btnState = $(e.currentTarget).attr('class')
			_QNR_ID = $(e.currentTarget).parent().find('input').attr('id');
			_QNR_STS_CD = $(e.currentTarget).parent().find('input').attr('QNR_STS_CD');
			if(_btnState != "disable-text"){
				switch (_proType){
					case "Qpreview":
						//Qpreview(_QNR_ID,_QNR_STS_CD);
						require(['common/questionnaire/questionView'], function(QuestionView){
							//'77ee5102-51cd-4223-ac68-39868917a8ce'
				            var creatQuestionArie = new QuestionView({ questionnaireID:_QNR_ID }).render();
				        });
						break;
					case "Qcopy":
						Qcopy(_QNR_ID,_QNR_STS_CD);
						break;
					case "Qedit":
						Qedit(_QNR_ID,_QNR_STS_CD);
						break;
					case "Qstop":
						Qstop(_QNR_ID,_QNR_STS_CD);
						break;
					case "Qdel":
						Qdel(_QNR_ID,_QNR_STS_CD);
						break;
				}
			}
		});
		
		//新建问卷操作
		var $addBtn = $("#Qcreat", $el);
		$addBtn.click(function(){
	       createQuestionnarie();
		});
		
		
	};
 
 
 
 
	//列表信息初始化
	var listInit = function(){
		var str= $form.serialize();
		Util.pagination(0, true , G_params , str );
	}


	//渠道信息初始化
	var chanelSelectInit = function(){
		Util.ajax.postJson(srvMap.get('getChnl'), '', function(json, status) {
			if (status) {
		   		var _html = '<option value="">请选择</option>'+'{{#each object}}<option value="{{CHNL_ID}}" data="{{@index}}">{{PTY_NM}}</option>{{/each}}';
		    	//Util.ajax.loadTemp('#firest_RNG_ID',_html,json);
				$('#firest_RNG_ID', $el).html(Handlebars.compile(_html)(json));
			}
		});
	};
	
	
	//发布员工初始化，加载当前本部门下的员工
	var userSelectInit = function(){
		Util.ajax.postJson(srvMap.get('queryUser'), queryUserParams, function(json, status) {
			if (status) {
				var _html = '<option value="">请选择</option>'+'{{#each beans}}<option value="{{USER_ID}}">{{PTY_NO}} {{PTY_NM}}</option>{{/each}}';
				$('#CRT_USER_ID', $el).html(Handlebars.compile(_html)(json));
				//$('#CRT_USER_ID', $el).html(Handlebars.compile(personTPL)(json));
			}
		});
	};


	/*预览问题*/
	var Qpreview = function(_QNR_ID,_QNR_STS_CD){
        //通过frameContainer追加
        require(['common/questionnaire/questionView'], function(QuestionView){
        	var creatQuestionArie = new QuestionView({ questionnaireID:_QNR_ID }).render();

        	$el.hide();
        	
        	creatQuestionArie.on('success',function(){
        		$el.show();
        		listInit();
        	});
        	
			creatQuestionArie.on('cancel',function(){
        		$el.show();
        		listInit();
        	});
        	
        });
        /*
        require(['common/questionnaire/builder','common/util/frameContainer'], function(builder,fc){
        	var creatQuestionArie = new builder({questionnaireID:_QNR_ID});
        	fc.append(creatQuestionArie.render().el, true);
        	$el.hide();
        	
        	creatQuestionArie.on('success',function(){
        		$el.show();
        		listInit();
        	});
        	
			creatQuestionArie.on('cancel',function(){
        		$el.show();
        		listInit();
        	});
        	
        });
		*/
        
        
        
        /*
            require(['common/questionnaire/ques_start'],function(fn){
                var obj = new fn.init();
                obj.startManage = function(){
                    require(['common/questionnaire/questionnaire'],function(fn){
                        fn.init();
                        var tpl = fn.getTpl;
                        $('#J_questionnaire').html(tpl);
                    })
                }
                $('#J_questionnaire').html(obj.$el);
            })
		*/
		
/*
		require(['common/questionnaire/questionnaire'],function(fn){
	              fn.init({QNR_ID:_QNR_ID,QNR_ISTNC_ID:"800a0c8f-e9f7-4989-a6b8-f359ec552e61"});
	              var tpl = fn.getTpl;
                        
				d = new Dialog({
					title: '问题预览',
					width:800, height:600, 
					content: tpl,
					cancelValue: '取消',
					cancel:  function() {}
				});
				d.showModal();
                        //$('#J_questionnaire').html(tpl);
       })
*/


	};
	
	
	/*复制问题*/
	var Qcopy = function(_QNR_ID,_QNR_STS_CD){
	
				var cmd={QNR_ID:_QNR_ID};
				Util.ajax.postJson(srvMap.get('cloneQuestionaire'), cmd, function(json, status) {
					if (status) {
						Util.dialog.tips("问卷已复制，您可以重新编辑发布！");
						setTimeout(function(){$("#J_search", $el).trigger("click")},1000);
					};
				});
	
        /*通过frameContainer追加*/
        /*
        require(['common/questionnaire/builder','common/util/frameContainer'], function(builder,fc){
        	var creatQuestionArie = new builder({questionnaireID:_QNR_ID});
        	fc.append(creatQuestionArie.render().el, true);
        	$el.hide();
        	
        	creatQuestionArie.on('success',function(){
        		$el.show();
        		listInit();
        	});
        });
        */
        
	};
	
	/*编辑问题*/
	var Qedit = function(_QNR_ID,_QNR_STS_CD){
	
        /*通过frameContainer追加*/
        require(['common/questionnaire/builder','common/util/frameContainer'], function(builder,fc){
        	var creatQuestionArie = new builder({questionnaireID:_QNR_ID});
        	fc.append(creatQuestionArie.render().el, true);
        	$el.hide();
        	
        	creatQuestionArie.on('success',function(){
        		$el.show();
        		listInit();
        	});
        	
			creatQuestionArie.on('cancel',function(){
        		$el.show();
        		listInit();
        	});



        });
        
	};
	
	/*作废问题*/
	var Qstop = function(_QNR_ID,_QNR_STS_CD){
		if (_QNR_STS_CD != "10A") {
			Util.dialog.tips("非发布状态的问卷，不能作废！");
			return;
		} else {
			var cmd = {"QNR_ID" : _QNR_ID,"OP_TYPE":"invalid"};
			Util.ajax.postJson(srvMap.get("invalidQuestionaire"), cmd,
				function(json) {
					if (json.returnCode == 0) {
						var str = $("#" + G_params.searchformId).serialize();
						Util.pagination(G_params.page_index , true, G_params, str);
						Util.dialog.tips("作废成功！");
					} else {
						Util.dialog.tips("作废失败！");
					}
				});
		}
	};
	
	

      
      
	var Qdel = function(_QNR_ID,_QNR_STS_CD){

		var elem = $('<div class="fn-hide"><div class="warn-wrapper"><div class="warn-logo"></div><div class="warn-text">确定要执行删除操作吗？</div></div></div>');
	    var params = {
	        top:top,
	        content: elem,
	        width: 300,
	        height: 120,
	        modal: true,
	        okVal:'确定',
	        okCallback:function(){
	        
	var cmd = {"QNR_ID" : _QNR_ID};
	Util.ajax.postJson(srvMap.get("unionDeleteQuestionaire"), cmd,
		function(json) {
			if (json.returnCode == 0) {
				var str = $("#" + G_params.searchformId).serialize();
				Util.pagination(G_params.page_index, true, G_params, str);
				Util.dialog.tips("删除成功！");
			} else {
				Util.dialog.tips("删除失败！");
			}
		});
		
	        },
	        cancelVal:'取消',
	        cancelCallback:function(){}
	      }
	
	      Util.dialog.openDiv(params);
		
	};



		Handlebars.registerHelper("QNR_STS_PARSE", function(QNR_STS_PARSE){
			return { '10D':'新建','10A':'发布','10X':'作废' }[QNR_STS_PARSE];
		});


		Handlebars.registerHelper("transferred", function(SUIT_RNG_ID){
			var _content;
		    switch(SUIT_RNG_ID){
		        case "1001":
		        	_content ="10085电话营销";
		            return _content;
		            break;
		        case "1002":
		        	_content ="10085网上商城";
		            return _content;
		            break;
		        case "1003":
		        	_content ="O2O渠道";
		            return _content;
		            break;
		        case "1004":
		        	_content ="线下省级营业厅";
		            return _content;
		            break;
		        case "1005":
		        	_content ="社交媒体";
		            return _content;
		            break;
		        case "1006":
		        	_content ="微信";
		            return _content;
		            break;
		        case "1007":
		        	_content ="微博";
		            return _content;
		            break;
		        case "1008":
		        	_content ="H5渠道";
		            return _content;
		            break;
		        case "1009":
		        	_content ="移动APP";
		            return _content;
		            break;
		        case "1010":
		        	_content ="社会代理道";
		            return _content;
		            break;
		        case "1011":
		        	_content ="代客下单";
		            return _content;
		            break;
		        case "1012":
		        	_content ="众包平台";
		            return _content;
		            break;
		        case "1014":
		        	_content ="10086外呼中心";
		            return _content;
		            break;   
		        default:
		        	_content ="未知渠道";
		        	return _content;
            }
		});



		Handlebars.registerHelper("choictBtn", function(status){
		    var _content;
		    switch(status){
		        case "10D":
		        	//新建
		             _content    = "<a class=\"item-text\" href=\"javascript:;\" data=\"Qpreview\" >预览</a>";
		             _content	+= "<a class=\"item-text\" href=\"javascript:;\" data=\"Qcopy\" >复制</a>";
		             _content	+= "<a class=\"item-text\" href=\"javascript:;\" data=\"Qedit\" >编辑</a>";
		             _content	+= "<a class=\"disable-text\" href=\"javascript:;\">作废</a>";
		             _content	+= "<a class=\"item-text\" href=\"javascript:;\" data=\"Qdel\" >删除</a>";
		             //console.log(_content);
		            return _content;
		            break;
		        case "10A":
		        	//发布
		             _content    = "<a class=\"item-text\" href=\"javascript:;\" data=\"Qpreview\">预览</a>";
		             _content	+= "<a class=\"item-text\" href=\"javascript:;\" data=\"Qcopy\">复制</a>";
		             _content	+= "<a class=\"disable-text\" href=\"javascript:;\">编辑</a>";
		             _content	+= "<a class=\"item-text\" href=\"javascript:;\" data=\"Qstop\">作废</a>";
		             _content	+= "<a class=\"disable-text\" href=\"javascript:;\">删除</a>";
		            return _content;
		            break;
		        case "10X":
		        	//作废
		             _content    = "<a class=\"item-text\" href=\"javascript:;\" data=\"Qpreview\">预览</a>";
		             _content	+= "<a class=\"item-text\" href=\"javascript:;\" data=\"Qcopy\">复制</a>";
		             _content	+= "<a class=\"disable-text\" href=\"javascript:;\">编辑</a>";
		             _content	+= "<a class=\"disable-text\" href=\"javascript:;\">作废</a>";
		             _content	+= "<a class=\"disable-text\" href=\"javascript:;\">删除</a>";
		            return _content;
		            break;
		    }
		});



    var createQuestionnarie = function(){
        Util.dialog.tips("加载中...");
        /*直接追加
        require(['common/questionnaire/builder'], function(builder){
        	debugger;
        	$('#J_busi_div').html(new builder().render().el).show();
        });
        */
        
        
        
        /*通过frameContainer追加*/
        require(['common/questionnaire/builder','common/util/frameContainer'], function(builder,fc){
        	var creatQuestionArie = new builder();
        	
        	//使用framecontainer追加时，如果不附带第二个参数，内容将被清空。如果还要使用原内容就必须附加true参数。
        	fc.append(creatQuestionArie.render().el, true);
        	$el.hide();
        	
        	/*
        	下面调用builder.js中的方法，把new builder中的$el显示
			cancelEdit:function(){
				this.trigger('cancel');
				this.$el.hide();
				return false;
			}
			*/
        	creatQuestionArie.on('cancel',function(){
        		$el.show();
        		listInit();
        	});

        	creatQuestionArie.on('success',function(){
        		$el.show();
        		listInit();
        	});
        	
        });
    };







	return { init:init, getTpl:function(){ return $el; } };
});


