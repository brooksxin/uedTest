
define(['handlebars', 'text!tpl/market/campgnListGrLdr.tpl', 'text!tpl/market/campgnListGrLdr-list.tpl'
  , 'market.common', 'common/util/searchToggle', 'jquery', 'underscore', 'jquery.blockUI', 'jquery.pagination']
	, function(Handlebars, tpl, listTpl, common, SearchToggle, $, _){

	var $el = null;
	
    
	var G_params = null;
	var $form = null;

	var init = function(Loading){
		Loading && Loading.destroy();
    $el = $(tpl);
    $form = $("#J_formSearch", $el);
    srvMap.add('query' , 'query.json','front/sh/market!index?uid=my011');//查询班组长已分配的活动
    G_params = {
      url : srvMap.get('query'),
      searchformId :"J_formSearch",
      items_per_page : 10 ,   // 每页数     @param : limit
      page_index : 0 , //当前页  @param : start
      pagination : "Pagination" , //分页id
      tabletpl : Handlebars.compile(listTpl),  //表单模型
      tablewrap :$el.find("#J_tabletpl") //表格容器
    };
    
		eventInit();
		listInit();
    SearchToggle.init();
	}
	
	var eventInit = function(){
		var $list = $("#J_tabletpl", $el);
		$el.on('click', '#Query', listInit);
    $list.on('click', '.distribute', distribute);
    $list.on('click', '.schedule', watchProcess);
    $list.on('click', '.detail', detail);
	}
	
	var listInit = function(){
		var str= $form.serialize();
		Util.pagination( G_params.page_index , true , G_params , str );
	}
	var detail = function (e){
		 var json = JSON.parse($(e.currentTarget).parent().attr('data'));
		require(['common/util/originFrame'], function(originFrame){
	        originFrame.append('../market/groupCmpgnDetail.html?CMPGN_ID='+json.CMPGN_ID);
	      });
		//window.location.href="cmpgnGroupDetail.html?CMPGN_ID"+CMPGN_ID;
	};
  var distribute = function(e){
    var json = JSON.parse($(e.currentTarget).parent().attr('data'));
    if($(e.currentTarget).hasClass("disable-text")){
		  return false;
	 }
    if((json.CMPGN_STS == "进行中"&&json.Distribution=='分配') || json.CMPGN_STS == "未开始"||json.CMPGN_STS == "再次分配暂停"){
      var jsonExtend = _.extend(json, {status:json.co});
      if(json.co=='未分配'){
        require(['common/market/divideTaskDept'], function(Main){
          Main.init(jsonExtend, null, {
            ok:function(){
              listInit();
            }, 
            cancel:function(){
              listInit();
            }
          });
        });
        //window.location.href="../market/divideTaskDept.html?"
         //        + "CMPGN_ID="+json.CMPGN_ID+"&CMPGN_NM="+json.CMPGN_NM+"&CMPGN_EFF_DATE="
         //        +json.CMPGN_EFF_DATE+"&CMPGN_INVLD_DATE="+json.CMPGN_INVLD_DATE;
      }else{
        var elem = $('<div class="fn-hide"><div class="warn-wrapper"><div class="warn-logo"></div><div class="warn-text"><span style="color:red;">警告：</span>重新分配会导致该活动处于暂停状态！请谨慎操作！</div></div></div>');
        var params = {
          top:top,
          content: elem,
          width: "300px",
          height: "140px",
          modal: true,
          okVal:'确定',
          okCallback:function(){
                $(obj).hide().siblings().hide();
                require(['common/market/againdivideTaskDept'], function(Main){
                  Main.init(jsonExtend, null, {
                    ok:function(){
                      listInit();
                    }, 
                    cancel:function(){
                      listInit();
                    }
                  });
                });
                //跳转
                /*window.location.href="../market/againdivideTaskDept.html?"
                     + "CMPGN_ID="+CMPGN_ID+"&CMPGN_NM="+CMPGN_NM+"&CMPGN_EFF_DATE="
                     +CMPGN_EFF_DATE+"&CMPGN_INVLD_DATE="+CMPGN_INVLD_DATE;*/
          },
          cancelVal:'取消',
          cancelCallback:function(){}
        }
        Util.dialog.openDiv(params);
      }
    }else{
      return false;
    }

  }
  var watchProcess = function(e){
    //CMPGN_ID,CMPGN_NM,CMPGN_EFF_DATE,CMPGN_INVLD_DATE,status,co
    var json = JSON.parse($(e.currentTarget).parent().attr('data'));
    if($(e.currentTarget).hasClass("disable-text")){
		  return false;
	  }else{
      /*require(['common/market/taskProgressDept'], function(Main){
        Main.init(json);
      });
      return false*/

      if(json.CMPGN_STS == '已结束'){
        require(['common/market/finishTaskStatusDept'], function(Main){
          Main.init(json);
        });
  		  /*window.location.href="finishTaskStatusDept.html?"
           	 + "CMPGN_ID="+CMPGN_ID+"&CMPGN_NM="+CMPGN_NM+"&CMPGN_EFF_DATE="
           	 +CMPGN_EFF_DATE+"&CMPGN_INVLD_DATE="+CMPGN_INVLD_DATE;*/
  	  }else{
        require(['common/market/taskProgressDept'], function(Main){
          Main.init(json);
        });
  		  /*window.location.href="taskprogressdept.html?"
           	 + "CMPGN_ID="+CMPGN_ID+"&CMPGN_NM="+CMPGN_NM+"&CMPGN_EFF_DATE="
           	 +CMPGN_EFF_DATE+"&CMPGN_INVLD_DATE="+CMPGN_INVLD_DATE;*/
  	  }
    }
  }
     
  	Handlebars.registerHelper("isDis", function(status, distribute,TSK_ALCT_MODE_CD){
  		var buffer = "";
  		if(TSK_ALCT_MODE_CD == "01"){
  			//随机分配
  			buffer = "disable-text";
  		} else {
  			if(status == "进行中"||status == "未开始"||status == "再次分配暂停"){
  		        if (status == "进行中" && distribute == '无法分配'){
  		          buffer = "disable-text";
  		        }else{
  		          buffer = "item-text";
  		        }
  			}else{
  				buffer = "disable-text";
  			}
  		}
  		return buffer;
  	});
  	
  	Handlebars.registerHelper("isWatch", function(status,co,TSK_ALCT_MODE_CD){
  		var buffer = "";
  		if(status == "废止" || status == "未开始"||co=='未分配'||status=='再次分配暂停'){
  			buffer = "disable-text";
  		}else{
  			buffer = "item-text";
  		}
  		return buffer;
  	});

	Handlebars.registerHelper('dataToJSON', function(obj) {
		return JSON.stringify(obj);
	});


	return { init:init, getTpl:function(){ return $el; } };
});


