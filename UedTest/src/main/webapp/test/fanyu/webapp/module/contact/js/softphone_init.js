var clientIpAddress = AiCtUtil.getIpAddress();
	var clientPcName = AiCtUtil.getPcName();
	var signFlag = "0"; //是否签入电话功能
	//conf = 0; 测试使用  
	/*
    服务配置
    param1: 服务名
    param2: 假数据路径
    param3: 后台服务路径
	*/
	srvMap.add('contactInsert', '','front/sh/contact!execute?uid=mng009');//接触记录insert
	srvMap.add('contactUpdate', '','front/sh/contact!execute?uid=mng010');//接触记录update

	srvMap.add('touchInsert', '','front/sh/contact!execute?uid=touch004');//接续insert
	srvMap.add('touchUpdate', '','front/sh/contact!execute?uid=touch005');//接续update
	srvMap.add('staffInfoUrl', 'staffInfo.json','front/sh/user!session?uid=u001');//权限查询工号信息
	
	srvMap.add('signLogUrl', 'signInOut.json','front/sh/contact!execute?uid=sign002');//签入签出日志记录
	srvMap.add('ctiConfigUrl', 'ctiInfo.json','front/sh/contact!execute?uid=ctiSip001');//CTI平台信息查询
	srvMap.add('agentStateUrl', '','front/sh/contact!execute?uid=seat007');//座席实时状态记录
	srvMap.add('recordManageUrl', '','front/sh/contact!execute?uid=rcd016');//录音记录
	srvMap.add('transferIvrUrl', '','front/sh/contact!execute?uid=ivr012');//IVR转接记录
	srvMap.add('transferQueueUrl', '','front/sh/contact!execute?uid=skill014');//队列转接记录
	srvMap.add('transferAgentUrl', '','front/sh/contact!execute?uid=inner017');//工号转接记录
	srvMap.add('getUserPlaceUrl', 'userplace.json','front/sh/contact!execute?uid=u006');//归属地查询查询
	srvMap.add('queryIvr', 'ivrInfo.json','front/sh/contact!execute?uid=ivr011');//IVR查询服务
	srvMap.add('queryQueue', 'queue.json','front/sh/contact!execute?uid=skill013');//QUEUE查询服务
	srvMap.add('queryAgent', 'agent.json','front/sh/contact!execute?uid=u001');//AGENT查询服务
	srvMap.add('queryMytask', 'outCallTask.json','front/sh/market!index?uid=my00222');//外呼 暂时不用
	srvMap.add('queryMytaskDetail', 'outCallTaskDetail.json','front/pc/pcprnca!validatePc');//外呼任务 暂时不用
	
	srvMap.add('getUserTagUrl', 'userTags.json','front/sh/contact!execute?uid=left002');//用户标签查询
	srvMap.add('custInfoUrl', 'customerInfo.json','front/sh/contact!execute?uid=u009');//手机画像
	srvMap.add('hangUpTagsInsert', '','front/sh/contact!execute?uid=u010');//客户标签记录
	srvMap.add('custInfoRingInsert', '','front/sh/user!queryCustByLblId?uid=u004');//客户信息保存
	srvMap.add('contactHistory', 'contactHistory.json','front/sh/contact!execute?uid=left001');//接触历史
	srvMap.add('appointHistory', 'appointHistory.json','front/sh/contact!execute?uid=left003');//预约历史
	srvMap.add('billHistory', 'billHistory.json','front/sh/contact!execute?uid=left004');//订单历史
	srvMap.add('sendSmsUrl', '','front/sh/contact!execute?uid=hangup001');//短信发送服务
	
	srvMap.add('sendSms', '','front/sh/common!execute?uid=c005');//10085短信发送服务
	srvMap.add('sms','sms.json','front/sh/common!smsRs'); //加载短信模板
	srvMap.add('updateMarketInfo' , 'update.json','front/sh/market!index?uid=mt007');//营销更新
	
	var G_params = {
	    url : srvMap.get('query'),
	    items_per_page : 10 ,   // 每页数     @param : limit
	    page_index : 0 , //当前页  @param : start
	    pagination : "Pagination" , //分页id
	    searchformId : "J_formSearch", //搜索表单的id
	    tabletpl : "T_tabletpl", //表格模板
	    tablewrap : "J_tabletpl" //表格容器
	};
	
    //页面加载完开始执行
    $(function () {
    	
		var headerHeight=$(".header").height();
		var menuHeight=$(".menu").height();
		var windowHeight=$(window).height();
		var left_height=windowHeight-headerHeight-menuHeight;
    	
   		$(".J_outcall_contact_list").css("height",left_height-40+"px");
	
	    $(window).resize(function(){
	        $(".J_outcall_contact_list").css("height",left_height-40+"px");
	    });

	    $("#J_openTransferPage").hide();
		$("#J_searchOtherNum").hide();
		
    	//AiSoftPhone.outCallLeft(18838086870,$("#J_contact_list_1"));
			AiCtFrame.FrameButtonStyle.functionLimited();
			$("#myinput").setCaret();
			$("#J_calling_show").removeClass("callProcess");
			$("#J_calling_show").addClass("fn-hide");
			//读取登陆工号信息
			var agentObj = AiSoftPhone.getStaffById();
			try{
				CtHelper.InitLogFile("C:\\"+LogManager.logPath+AiSoftPhone.busiAgentObj.userName+".zyzx", 0);
				LogManager.proxyMethod.ctlogger("***************************************************");
				LogManager.proxyMethod.ctlogger("*********************CtAiLogger********************");
				LogManager.proxyMethod.ctlogger("***************************************************");
			}catch(e)
			{
				alert("浏览器未进行配置，请将当前地址加入信任站点，重新登陆");
			}
			try{
				//IE浏览器版本不同方法不用，捕捉异常实现
				//签入
				document.getElementById("objCinVccBar").attachEvent("OnInitalSuccess",onOnInitalSuccess);
				document.getElementById("objCinVccBar").attachEvent("OnInitalFailure",onOnInitalFailure);
				document.getElementById("objCinVccBar").attachEvent("OnAgentWorkReport",onOnAgentWorkReport);
				document.getElementById("objCinVccBar").attachEvent("ReportBtnStatus",onReportBtnStatus);
				document.getElementById("objCinVccBar").attachEvent("OnPrompt",onEventOnPrompt);
				//签出
				document.getElementById("objCinVccBar").attachEvent("OnBarExit",onOnBarExit);
				//呼入应答
				document.getElementById("objCinVccBar").attachEvent("OnCallRing",onEventOnCallRing);
				document.getElementById("objCinVccBar").attachEvent("AnswerCall",onEventAnswerCall);
				//挂机事件
				document.getElementById("objCinVccBar").attachEvent("OnCallEnd",onOnCallEnd); 
				//查询队列情况
				document.getElementById("objCinVccBar").attachEvent("OnCallQueueQuery",onOnCallQueueQuery);
				//查询座席统计信息
				document.getElementById("objCinVccBar").attachEvent("OnWorkStaticInfoReport",onOnWorkStaticInfoReport);
				}catch(e){
			}
			
			LogManager.proxyMethod.ctlogger("AiCtFBH.signIn() start");
			//初始化签入
			LogManager.proxyMethod.ctlogger(JSON.stringify(AiSoftPhone.busiAgentObj));
			if(agentObj != null)
			{
				//根据工号信息读取CTI配置
				signFlag = AiSoftPhone.getCtiInfoByStaff();
				//初始化签入
				if(signFlag == 1){
					AiCtFBH.signInProxy();
				}else{
					alert("未配置CTI平台工号信息，系统将不提供电话接续功能!");
				}
			}else{
				alert("工号配置信息为空，系统将不提供电话接续功能!");
			}
		if(document.readyState=="complete"){
			//综合接续tab切换
			var $div_li =$('#J_openIvr li');
		    $div_li.click(function(){
				$(this).addClass("ui-tab-item-current").siblings().removeClass("ui-tab-item-current");
		        var index = $div_li.index(this);
				$(".ui-tab-wrap > div").eq(index).show().siblings().hide();
			})
	
		    try{
				$('#J_searchIvr').bind('click',function(){
			        var strIvr = $("#"+G_paramsIvr.searchformId).serialize(); 	//把form序列化 IVR
			      	//分页获取数据
			        Util.pagination( G_paramsIvr.page_index , true , G_paramsIvr , strIvr );
			        
			    })
		    
			    $('#J_searchQueue').bind('click',function(){
			        var strQueue = $("#"+G_paramsQueue.searchformId).serialize(); //把form序列化 队列
			       	Util.pagination( G_paramsQueue.page_index , true , G_paramsQueue , strQueue);
			    })
			    $('#J_searchAgent').bind('click',function(){
			        var strAgent = $("#"+G_paramsAgent.searchformId).serialize(); //把form序列化 座席
			        //分页获取数据
			       	//Util.pagination( G_paramsAgent.page_index , true , G_paramsAgent , strAgent );
			        
			         //不分页获取数据
			        Util.ajax.postJson(srvMap.get('queryAgent'),strAgent,function(json,status){
			            if (status) {
			                Util.ajax.loadTemp('#J_Agenttabletpl',$('#T_Agenttabletpl'),json);//加载模板
			            }else{
			                //alert(json.returnMessage + '查询失败，请重试！');
			            }
			        })
			    })
			    $('#J_openTransferPage').click(function(){
			    	 $("#J_StleDerictionGroup").NiceSelect({
				    	  url:"../../front/sh/user!userinfo?uid=u003",
				          datas:"codeType=CONTACT_STLE_DERICTION",
				          id:"STLE_DERICTION_GROUP",
				          name:"STLE_DERICTION_GROUP",
				          all:"",
				          key:"DEPT_ID",
				          value:"BM",
				          handler:function(){
				            var provId = $(this).val();
				            //alert(provId);
				          }
				    	});
			    
		            var elem = document.getElementById('T_transferPage');
		            var params = {
		                id:'D_transferPage',
		                title:'综合接续',
		                content: elem,
		                width: 700,
		                height:400,
		                modal: true
		            }
		            Util.dialog.openDiv(params);
		        })
	        }catch(e)
	        {
	        }
		   Handlebars.registerHelper("agentStatsRevert", function(str,fn){
		    var buffer = "";
		    if(str == '0'){
		       buffer = '未登录';
		    }else if(str == '1'){
		       buffer = '忙碌';
		    }else if(str == '2'){
		       buffer = '空闲';
		    }else if(str == '3'){
		       buffer = '通话中';
		    }else  if(str == '4'){
		       buffer = '后续态';
		    }else{
		    	buffer = '未知';
		    }
		    return buffer;
			});
			try{
				$('#J_hangupComplete').bind('click',function(){
					//获取标记内容
					var tagscode ="";
					$("input[name='hangupTypes1'][checked]").each(
						function()
						{
							if($(this).attr("checked"))
								tagscode += $(this).attr("value") +"~";
						}
					)
			        $("input[name='hangupTypes1']").removeAttr("checked");
			        $("#hangupTypes1_1").attr("checked","checked");
			        if(tagscode.length<1)
			        {
			        	return;
			        }
				  	//调用后台保存记录
				  	AiCtFrame.BusinessTracks.hangupTags.lblId = tagscode;//取标签数据
				  	AiSoftPhone.saveOnHangupTagsLog();
				  	
				  	//调用空闲
					var agentStatus = objCinVccBar.GetAgentStatus(); //得到座席当前状态
					if(agentStatus == 1 || agentStatus == 4) //忙碌
					{
						var retInt = objCinVccBar.SetIdle();
						//示闲成功，按钮不可用
						if(retInt==0)
						{
							AiCtFrame.FrameButtonStyle.onSayFree();
							AiCtFrame.AgentStatusTimer.curStatusIndex =AiCtConst.AGENT_STATUS.FREE;			
						}
					}else if(agentStatus == 2)//空闲
					{
						AiCtFrame.AgentStatusTimer.curStatusIndex =AiCtConst.AGENT_STATUS.FREE;
					}
				   Util.dialog.close(AiCtFrame.hangUpPageType.hangUpPageURL);//关闭
				    try{
				   		if(AiCtFrame.bussinessData.CMPGN_ID !=null && AiCtFrame.bussinessData.CMPGN_ID !=""){
				   			document.frames("I_market").cancelButtonDisabed();
				   		}
				   }catch(e){
				   		LogManager.proxyMethod.ctlogger('挂机更新营销信息异常！');
				   }
			    })
		    
			}catch(e)
			{
			}
			
			try{
				$('#J_sendSms').bind('click',function(){
//					var dialNum = $("#myinput").val();
					var dialNum = top.AiCtFrame.BusinessTracks.custInfoRing.markNum;
					$("#smsSdTelnum").val(dialNum);
					var elem = document.getElementById('T_sendSmsPage');
					
					var param={'uid':'c001','flag':'phone'};
					Util.ajax.postJson(srvMap.get("sms"), param, function(json,flag){
				    	 Util.ajax.loadTemp('#J_smsTemplate',$('#T_smsTemplate'),json);//加载模板
				    	 $("input[name='smsType']")[0].checked=true;
				    		var sceneType=$("input[name='smsType']:checked").val();
				    		loadSmsInfo(sceneType);
				    			$("input[name='smsType']").each(function(){
									$(this).click(function(){
										loadSmsInfo($(this).val());
									});
				        		 });
				        });
					
		             var params = {
		                id:'T_sendSmsPage',
		                title:'',
		                content: elem,
		                width: 600,
		                height:550,
		                modal: true
		            }
		            Util.dialog.openDiv(params);
			    })
		    
			}catch(e)
			{
			}
			
			try{
				$('#smsSend').bind('click',function(){
					var smsSdTelnum = $('#smsSdTelnum').val();
					if(!validatemobile(smsSdTelnum)){
						return;
					}
					var smsCntt = $('#smsCntt').val();
					if(smsCntt.length==0){
						Util.dialog.tips("请选择短信模板或输入短信内容！");
						$('#smsCntt').focus();
						return;
					}
					var smsSdRsnCd = '0009';
					var crtUserId = '1001';
					Util.ajax.postJsonSync(srvMap.get('staffInfoUrl'),{},function(json,status){
			            if (status) {
			            	crtUserId = json.bean.userId;
			            }
			        })
					
					Util.ajax.postJson(srvMap.get('sendSms'),'&smsSdTelnum='+smsSdTelnum+'&smsCntt='+smsCntt+
							'&smsSdRsnCd='+smsSdRsnCd+'&crtUserId='+crtUserId,function(json,status){
						if (status && json.bean.status==0) {
							Util.dialog.close('T_sendSmsPage');
			 	        }else{
			 	           Util.dialog.tips("短信发送失败！");
			 	        }
			 	    })					
			    })		    
			}catch(e)
			{
			}
			
			try{
				$('#smsCancel').bind('click',function(){
					Util.dialog.close('T_sendSmsPage');
			    })		    
			}catch(e)
			{
			}		
			
			try{
    	 	//查询按钮单击事件
		    $("#phoneNum_search").on("click",function(){
		        var num = $("#J_otherPhoneInput").val();
		        if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(num))){ 
		            alert("不是有效的手机号码！");
		            return false;
		        }
		        
                $("#J_searchOtherNum").hide();
		        $("#J_othernumWrapper").addClass("fn-hide");
		        $("#J_contact_left").css("height","50px");
		        $("#out-phone2").css("width","100px");
		        $("#out-phone1").css("width","84px");
		        $("#phoneNumver_close").css("left","166px");
		        
		        AiSoftPhone.outCallLeft(num,$("#J_contact_list_2"));
		    });
    	 }catch(e){
    	 }
		}
    });

    function showDom(domTag){
    	$(domTag).toggle();
    }
    function setTab(name,cursel,n){
        for(i=1;i<=n;i++){
        var menu=document.getElementById(name+i);
        var con=document.getElementById(name+"_"+i);
        menu.className=i==cursel?"tabCurrent":"tabNormal";
        con.style.display=i==cursel?"block":"none";
        }
    }

	function onKeybordPress(el,keyCode){
		$('#myinput').insertAtCaret(keyCode);
	}

	function dialOutByInput(){
		var dialNum = $("#myinput").val();
		
		if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(dialNum))){ 
           	if(!window.confirm("不是有效的手机号码！是否继续呼叫?"))
           	{
           		 return false;
           	}
        }
		var ret = AiCtFBH.makeCall(dialNum);
		if(ret == 0){
			Util.dialog.tips("外拨号码中！");
			//关闭
			Util.dialog.close('D_outCallPage');
		}else{
			Util.dialog.tips("外呼失败！");
		}
	}

var G_paramsIvr = {
    url : srvMap.get('queryIvr'),
    items_per_page : 5 ,   // 每页数     @param : limit
    page_index : 0 , //当前页  @param : start
    pagination : "PaginationIvr" , //分页id
    searchformId : "J_formIVRSearch", //搜索表单的id
    tabletpl : "T_Ivrtabletpl", //表格模板
    tablewrap : "J_Ivrtabletpl" //表格容器
};
var G_paramsQueue = {
    url : srvMap.get('queryQueue'),
    items_per_page : 5 ,   // 每页数     @param : limit
    page_index : 0 , //当前页  @param : start
    pagination : "PaginationQueue" , //分页id
    searchformId : "J_formQueueSearch", //搜索表单的id
    tabletpl : "T_Queuetabletpl", //表格模板
    tablewrap : "J_Queuetabletpl" //表格容器
};
var G_paramsAgent = {
    url : srvMap.get('queryAgent'),
    items_per_page : 5 ,   // 每页数     @param : limit
    page_index : 0 , //当前页  @param : start
    pagination : "PaginationAgent" , //分页id
    searchformId : "J_formAgentSearch", //搜索表单的id
    tabletpl : "T_Agenttabletpl", //表格模板
    tablewrap : "J_Agenttabletpl" //表格容器
};

var G_paramsOutCallTask = {
    url : srvMap.get('queryMytask'),
    items_per_page : 5 ,   // 每页数     @param : limit
    page_index : 0 , //当前页  @param : start
    pagination : "PaginationMytask" , //分页id
    searchformId : "", //搜索表单的id
    tabletpl : "T_outCallPagetpl", //表格模板
    tablewrap : "J_outCallTableTpl" //表格容器
};

var G_paramsOutCallTaskDetail = {
    url : srvMap.get('queryMytaskDetail'),
    items_per_page : 5 ,   // 每页数     @param : limit
    page_index : 0 , //当前页  @param : start
    pagination : "PaginationMytask" , //分页id
    searchformId : "", //搜索表单的id
    tabletpl : "T_outCallPage_Detailtpl", //表格模板
    tablewrap : "J_outCallDetailPage" //表格容器
};




function addOrder(){
	//result_prompt(0,"【已确认】状态的退货单才可以做【审批】操作，请检查!");
	Util.dialog.openWin('新增商品','http://www.baidu.com',800,500);
	//art.dialog.data("asdf","12123123");
}

function transferIvr(brandId){
    Util.dialog.close('open_transferPage');
};
function deleteData(brandId){
    /*Util.ajax.postJson(srvMap.get('query'),'formData='+str,function(json,status){
        if (status) {
            Util.ajax.loadTemp('#J_tabletpl',$('#T_tabletpl'),json);//加载模板
        }else{
            alert(json.returnMessage||'查询失败，请重试！');
        }
    })*/
}

//转IVR 随路数据根据需要设置
function doTransferIvr(ivrId)
{
	var curStatus = AiSoftPhone.getAgentCurStatus(); ////0：未登录 1：忙碌 2：空闲 3：通话中 4：后续态
	if(curStatus!=3)
	{
		Util.dialog.tips("座席当前未通话，系统无法转接！");
		return;
	}
	var dataJson ={"contactid":AiCtFrame.BusinessTracks.contactObj.cntmngId};
	var transferFlag = AiCtFBH.transToIVR(ivrId,dataJson);
	if(transferFlag == 0)
	{
		Util.dialog.tips("转接成功");
		Util.dialog.close('D_transferPage');
	}else{
	 	Util.dialog.tips('转接失败，请重试！');
	 	Util.dialog.close('D_transferPage');
	}
}
//转队列 随路数据根据需要设置
function doTransferQueue(queueId)
{
	var curStatus = AiSoftPhone.getAgentCurStatus(); ////0：未登录 1：忙碌 2：空闲 3：通话中 4：后续态
	if(curStatus!=3)
	{
		Util.dialog.tips("座席当前未通话，系统无法转接！");
		return;
	}
	var dataJson ={"contactid":AiCtFrame.BusinessTracks.contactObj.cntmngId};
	var transferFlag = AiCtFBH.transToQueue(queueId,dataJson);
	if(transferFlag == 0)
	{
		Util.dialog.tips("转接成功");
		Util.dialog.close('D_transferPage');
	}else{
	 	Util.dialog.tips('转接失败，请重试！');
	 	Util.dialog.close('D_transferPage');
	}

}

//转座席 随路数据根据需要设置
function doTransferAgent(agentId)
{
	var curStatus = AiSoftPhone.getAgentCurStatus(); ////0：未登录 1：忙碌 2：空闲 3：通话中 4：后续态
	if(curStatus!=3)
	{
		Util.dialog.tips("您当前未通话，系统无法转接！");
		return;
	}
	var dataJson ={"contactid":AiCtFrame.BusinessTracks.contactObj.cntmngId};
    var agentNum = agentId.split(",");
    if(agentNum[1] !=2)
    {
    	Util.dialog.tips("对方座席当前未空闲，系统不允许转接！");
		return;
    }
	var transferFlag = AiCtFBH.transToAgent(agentNum[0],dataJson);
	if(transferFlag == 0)
	{
		Util.dialog.tips("转接成功");
		Util.dialog.close('D_transferPage');
	}else{
	 	Util.dialog.tips('转接失败，请重试！');
	 	Util.dialog.close('D_transferPage');
	}
	
}
function openTaskDetail(taskID)
{
 	  var str = $("#"+G_paramsTask.searchformId).serialize(); 	//把form序列化 IVR
	 //不分页获取数据
     Util.ajax.postJson(srvMap.get('queryMytaskDetail'),'formData='+str,function(json,status){
         if (status) {
             Util.ajax.loadTemp('#J_outCallDetailPage',$('#T_outCallPage_Detailtpl'),json);//加载模板
         }else{
             //alert(json.returnMessage||'查询失败，请重试！');
         }
     })
}
function dialOutTask(phoneNum)
{
	var ret = CtiUtils.API.dialOut(phoneNum);
	if(ret == 0)
	{
		Util.dialog.tips("外拨号码中！");
		//关闭
		Util.dialog.close('D_outCallPage');
	}else
	{
		Util.dialog.tips("外呼失败！");
	}
}
//左侧事件
function refreshLeftInfoByPhone(phoneNum)
{
	
}
//查询客户详情
function getMoreCustDetail(obj){
    var num = $(obj).data("phonenum");
    Util.ajax.postJsonSync(srvMap.get('custInfoUrl'),'MSISDN='+num,function(json,status){
        if (status) {
            var datas = {};
            datas.custInfo = json.bean;
            
            Util.ajax.loadTemp('#J_custInfoMoreLayer',$('#T_contact_custInfoMoreLayer'),datas);//加载模板
            
            var elem = document.getElementById('J_custInfoMoreLayer');
            var params = {
                 id:'D_importProd',
                 title:'更多用户信息',
                 content: elem,
                 width: 900,
                 height:380,
                 modal: true,
                 okVal:'确定',
                 okCallback:closeCustPage
            }
         Util.dialog.openDiv(params);

        }else{
            Util.dialog.tips(json.returnMessage||'查询失败，请重试！');
        }
    });
    $("#J_custInfoMoreLayer").removeClass("fn-hide");
}
function closeCustPage(){

}

function closeLayer(obj){

    $(obj).parent().parent().addClass("fn-hide");
}

function loadSmsInfo(sceneType) {
	var param = {'uid' : 'c001','flag' : 'phone','cdVal' : sceneType};
	Util.ajax.postJson(srvMap.get("sms"), param, function(json, flag) {
		if (flag) {
			if (json.beans.length > 0) {
				var bean = json.beans[0];
				var smsMsg = json.beans[0]['SMS_CNTT'];
				$("#smsCntt").val(smsMsg);
			}
		}
	});
}

function validatemobile(mobile){
    if(mobile.length==0){
       Util.dialog.tips("请输入电话号码！");
       $('#smsSdTelnum').focus();
       return false;
    }    
    if(mobile.length!=11){
        Util.dialog.tips("请输入有效的手机号码！");
        $('#smsSdTelnum').focus();
        return false;
    } 
    var myreg = /^0?1[3|4|5|8][0-9]\d{8}$/;
    if(!myreg.test(mobile)){
    	Util.dialog.tips("请输入有效的手机号码！");
        $('#smsSdTelnum').focus();
        return false;
    }
    return true;
}