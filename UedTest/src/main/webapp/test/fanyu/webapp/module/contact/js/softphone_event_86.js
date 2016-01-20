//签入成功
function onOnInitalSuccess()
{
	//得到座席当前状态
	var agentStatus = objCinVccBar.GetAgentStatus();
	if(agentStatus == 1) //忙碌
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
	}else if(agentStatus == 4)//后处理
	{
		AiCtFrame.AgentStatusTimer.curStatusIndex =AiCtConst.AGENT_STATUS.ACW;
	}
	//当前状态计时
	AiCtFrame.AgentStatusTimer.setTimer(AiCtFrame.AgentStatusTimer.curStatusIndex, -1);
	LogManager.proxyMethod.ctlogger("----event------------onOnInitalSuccess  start");
	var ret= objCinVccBar.Configurate("1|0|0|1|0");//设置自动应答，挂机后处理，耳机滴滴声
	AiCtFrame.FrameButtonStyle.onSignIn();
	AiCtFrame.FrameButtonStyle.setSignCaption(true);
	
	//记录签入成功日志
	try{	
		AiCtFrame.BusinessTracks.util.clearData(AiCtFrame.BusinessTracks.signInOutObj);
		AiSoftPhone.busiAgentObj.SEAT_TRMN_IP_ADDR = AiCtUtil.getIpAddress();
		AiCtFrame.BusinessTracks.signInOutObj.crtUserId = AiSoftPhone.busiAgentObj.userId;
		AiCtFrame.BusinessTracks.signInOutObj.crtAppSysId =AiCtConst.APPSYSID;
		AiCtFrame.BusinessTracks.signInOutObj.seatTrmnIpAddr = AiCtUtil.getIpAddress();//IP地址
		AiCtFrame.BusinessTracks.signInOutObj.staffId=AiSoftPhone.busiAgentObj.staffId;//工号
		AiCtFrame.BusinessTracks.signInOutObj.callPltfStaffNum=AiSoftPhone.platWorkObj.callPltfStaffNum;//平台工号
		AiCtFrame.BusinessTracks.signInOutObj.ctiAddr=AiSoftPhone.platWorkObj.ctiIpAddr;//CTI
		AiCtFrame.BusinessTracks.signInOutObj.opTypeCd =AiCtConst.SIGNINOUT.IN;
		if(conf==1)
			AiSoftPhone.saveSignInOutLog();
	}catch(e){
		LogManager.proxyMethod.ctlogger("----event------------onOnInitalSuccess  saveSignInOutLog 异常"+e.message);
	}
	try{//座席状态初始化赋值
		AiCtFrame.BusinessTracks.agentCurStatus.staffId =AiSoftPhone.busiAgentObj.staffId ;
		AiCtFrame.BusinessTracks.agentCurStatus.crtUserId=AiSoftPhone.busiAgentObj.userId;
		AiCtFrame.BusinessTracks.agentCurStatus.crtTime="";
		AiCtFrame.BusinessTracks.agentCurStatus.crtAppSysId=AiCtConst.APPSYSID;
		AiCtFrame.BusinessTracks.agentCurStatus.modfUserId=AiSoftPhone.busiAgentObj.userId;
		AiCtFrame.BusinessTracks.agentCurStatus.modfTime="";
		AiCtFrame.BusinessTracks.agentCurStatus.modfAppSysId=AiCtConst.APPSYSID;
		AiCtFrame.BusinessTracks.agentCurStatus.seatStsCd=2;
		AiCtFrame.BusinessTracks.agentCurStatus.lastOneTmsSginTime="";
		AiCtFrame.BusinessTracks.agentCurStatus.qutyExamFlag="";
		AiCtFrame.BusinessTracks.agentCurStatus.callPltfStaffNum =AiSoftPhone.platWorkObj.callPltfStaffNum;
	}catch(e){
		LogManager.proxyMethod.ctlogger("----event------------onOnInitalSuccess 座席状态赋值异常"+e.message);
	}
	//获取营销活动业务数据
	try{
		var cmpgnId = Util.browser.getParameter("CMPGN_ID"),
			QNR_ID = Util.browser.getParameter("QNR_ID");
		//var phoneId = Util.browser.getParameter("phoneId");
		if(cmpgnId!=null && cmpgnId!="undefined" && cmpgnId!="")
		{
			AiCtFrame.bussinessData.CMPGN_ID = cmpgnId;
			//激动当前Iframe的页面
			$('#J_iframe_tab iframe').eq(1).html('').attr('src','../market/saleActivity.html?CMPGN_ID='+cmpgnId+'&QNR_ID='+QNR_ID);
			$('.ui-tab-items li').eq(1).removeClass('fn-hide').click();
		}
	}catch(e){
		LogManager.proxyMethod.ctlogger("----event------------onOnInitalSuccess 营销活动刷新异常"+e.message);
	}
	LogManager.proxyMethod.ctlogger("----event------------onOnInitalSuccess  end");
}
//签入失败
function onOnInitalFailure(fcode,fdesc)
{
	LogManager.proxyMethod.ctlogger("----event------------onOnInitalFailure  签入失败code="+fcode+" desc="+fdesc);
	$("#QueueWaitNum")[0].innerText=fdesc;
	//所有按钮不可用
	AiCtFrame.FrameButtonStyle.functionLimited();
	AiCtFrame.AgentStatusTimer.curStatusIndex =AiCtConst.AGENT_STATUS.SINGOUT;
	//当前状态计时
	AiCtFrame.AgentStatusTimer.setTimer(AiCtFrame.AgentStatusTimer.curStatusIndex, -1);	
}
//座席状态变更
function onOnAgentWorkReport(fcode,fdesc)
{
	LogManager.proxyMethod.ctlogger("----event------------触发onOnAgentWorkReport  start:"+fcode+" "+fdesc);
	//更新座席状态
	if(fcode == 2 || fcode == 7) //空闲
	{
 		AiCtFrame.AgentStatusTimer.curStatusIndex =AiCtConst.AGENT_STATUS.FREE;	
 		//当前状态计时
		AiCtFrame.AgentStatusTimer.setTimer(AiCtFrame.AgentStatusTimer.curStatusIndex, -1);
		AiCtFrame.FrameButtonStyle.onSayFree();
		LogManager.proxyMethod.ctlogger("----event------------更改座席按钮状态 onSayFree="+AiCtFrame.AgentStatusTimer.curStatusIndex);
	}else if(fcode == 3)//忙
	{
		AiCtFrame.AgentStatusTimer.curStatusIndex =AiCtConst.AGENT_STATUS.BUSY;
		//当前状态计时
		AiCtFrame.AgentStatusTimer.setTimer(AiCtFrame.AgentStatusTimer.curStatusIndex, -1);	
	}else if(fcode == 8)//后处理
	{
		AiCtFrame.FrameButtonStyle.onACW(false);
		AiCtFrame.AgentStatusTimer.curStatusIndex =AiCtConst.AGENT_STATUS.ACW;
		//当前状态计时
		AiCtFrame.AgentStatusTimer.setTimer(AiCtFrame.AgentStatusTimer.curStatusIndex, -1);
		LogManager.proxyMethod.ctlogger("----event------------更改座席按钮状态 onACW="+AiCtFrame.AgentStatusTimer.curStatusIndex);
	}else if(fcode == -1)
	{
		AiCtFrame.FrameButtonStyle.onSignOut();//签出按钮不可用
	}else if(fcode ==23){
		AiCtFrame.curMakeCALLRet = AiCtConst.MAKECALLSTATUS.CALLOUTDIAL;
	}else if(fcode == 20)
	{
		AiCtFrame.curMakeCALLRet = AiCtConst.MAKECALLSTATUS.CALLOUTRING;
	}else if(fcode ==11){
	}
}

//按钮状态变更
function onReportBtnStatus(btns)
{
	LogManager.proxyMethod.ctlogger("----event------------onReportBtnStatus  start:"+btns);
	//AiCtFrame.FrameButtonStyle.resetButtonEnableEvent(btns,true);
}

//系统关键事件
function onEventOnPrompt(fcode,fdesc)
{
	LogManager.proxyMethod.ctlogger("----event------------电话条主动提示onEventOnPrompt  start:"+fcode+" "+fdesc);
	$("#QueueWaitNum")[0].innerText=fdesc;
}
//来话振铃事件
function onEventOnCallRing(CallingNo,CalledNo,OrgCalledNo,CallData,SerialID,ServiceDirect,CallID,UserParam,TaskID,
	UserDn,AgentDn,AreaCode,Filename,networkInfo,queueTime,opAgentID)
{
	LogManager.proxyMethod.ctlogger("----event------------onEventOnCallRing  来话振铃 CallingNo主叫"+CallingNo+" CalledNo被叫"+CalledNo+" 原始被叫OrgCalledNo"+OrgCalledNo+" 座席标示SerialID"+SerialID+" 呼叫类型ServiceDirect"+ServiceDirect+" CallID呼叫标示"+CallID+" UserParam="+UserParam+" TaskID"+TaskID+" UserDn="+UserDn+" AgentDn="+AgentDn+" AreaCode="+AreaCode);
	//清空数据
	AiCtFrame.BusinessTracks.util.clearData(AiCtFrame.BusinessTracks.callingObj);//清空数据
	AiCtFrame.BusinessTracks.util.clearData(AiCtFrame.BusinessTracks.contactObj);//清空数据
	AiCtFrame.BusinessTracks.util.clearData(AiCtFrame.BusinessTracks.recordObj);//清空数据
	AiCtFrame.BusinessTracks.util.clearData(AiCtFrame.ivrTransferData);//清空数据
	AiCtFrame.hangUpPageType.hangUpPageCODE = 1;//清空数据
	//设置按钮状态
	if(ServiceDirect != 0 ){
		AiCtFrame.FrameButtonStyle.onDialing();
	}else{
		AiCtFrame.FrameButtonStyle.onBelling();
	}
	AiCtFrame.AgentStatusTimer.curStatusIndex =AiCtConst.AGENT_STATUS.BELLING;
	//当前状态计时
	AiCtFrame.AgentStatusTimer.setTimer(AiCtFrame.AgentStatusTimer.curStatusIndex, -1);
	AiCtFrame.callType = ServiceDirect;
	var tempCustPhoneNum = CallingNo ;
	//显示来话号码
	$("#call_type").val(ServiceDirect);
	$("#J_calling_show_status")[0].innerText = "来电振铃";
	//外呼时 被叫是客户电话
	if(ServiceDirect != 0 )
	{
		tempCustPhoneNum = OrgCalledNo;
		AiCtFrame.curMakeCALLRet = AiCtConst.MAKECALLSTATUS.CALLOUTSELF;
		$("#J_calling_show_status")[0].innerText = "外呼振铃";
	}
	AiCtFrame.BusinessTracks.callingObj.custMobnum = tempCustPhoneNum;
	$("#J_calling_show_num")[0].innerText = tempCustPhoneNum;
	LogManager.proxyMethod.ctlogger("----event------------onEventOnCallRing  客户号码="+tempCustPhoneNum);
	 
	//来话首先保存用户数据 异步
	AiCtFrame.BusinessTracks.custInfoRing.crtUserId = AiSoftPhone.busiAgentObj.userId;
	AiCtFrame.BusinessTracks.custInfoRing.crtAppSysId = AiCtConst.APPSYSID;
	AiCtFrame.BusinessTracks.custInfoRing.markNum = tempCustPhoneNum;
	AiCtFrame.BusinessTracks.custInfoRing.ptyNm ="未知";
	//执行保存用户数据
	try{
		AiSoftPhone.saveCustInfoRingData();
	}catch(e){
		LogManager.proxyMethod.ctlogger("onEventOnCallRing 保存用户信息异常 message="+e.message);
	}
	try{
		//来话打开其他页面,供其他模块使用
		CtiUtils.API.openBusiOnRing(tempCustPhoneNum);
		$("#J_calling_show").removeClass("fn-hide");
		$("#J_calling_show").addClass("callProcess");
	}catch(e)
	{
		LogManager.proxyMethod.ctlogger("onEventOnCallRing 打开弹出页面异常 message="+e.message);
	}
	//获取随路数据 ,如果内部转接来话不再记录接触记录。 contactid:2233,ivrtrace:,preNo:3456
	var retIvrStr = objCinVccBar.GetCallData(objCinVccBar.AgentID);
	LogManager.proxyMethod.ctlogger("----电话震铃获取新方随路IVR数据"+retIvrStr);
	//设置本地随路数据，以IVR获取的为准
	var tempContactId = null ;
	try{
		if(retIvrStr!=null && retIvrStr!="undefined"&&retIvrStr!="")
		{
			AiCtFrame.BusinessTracks.util.setIvrData(retIvrStr,AiCtFrame.ivrTransferData);
			tempContactId = retIvrStr.contactid;
		}
	}catch(e){
		LogManager.proxyMethod.ctlogger("----电话震铃获取随路数据，设置IVR随路数据失败："+e.message);
	}
	//AiCtFrame.BusinessTracks.util.setData(retIvrStr,AiCtFrame.ivrTransferData);
	LogManager.proxyMethod.ctlogger("----电话震铃获取随路数据，设置本地："+JSON.stringify(AiCtFrame.ivrTransferData));
	//初始化接触数据
	try{
		//初始化接触信息
		AiCtFrame.BusinessTracks.contactObj.crtUserId = AiSoftPhone.busiAgentObj.userId;
		AiCtFrame.BusinessTracks.contactObj.crtAppSysId=AiCtConst.APPSYSID;
		AiCtFrame.BusinessTracks.contactObj.modfUserId ="";
		AiCtFrame.BusinessTracks.contactObj.modfAppSysId ="";
		AiCtFrame.BusinessTracks.contactObj.chnlId=AiCtConst.APPSYSID;//渠道10085
		AiCtFrame.BusinessTracks.contactObj.cntmngTypeCd =ServiceDirect;//默认咨询
		AiCtFrame.BusinessTracks.contactObj.staffId=AiSoftPhone.busiAgentObj.staffId
		AiCtFrame.BusinessTracks.contactObj.custId =AiCtConst.CURCUSTID;//客户ID为空
		AiCtFrame.BusinessTracks.contactObj.touchId="";//挂机进行更新
		AiCtFrame.BusinessTracks.contactObj.cmccolCustFlag ="0";
		//异步进行保存接触数据,转接电话不记录接触数据
		if(conf==1 && (tempContactId ==null || tempContactId =="undefined" || tempContactId.length ==0))
			AiSoftPhone.saveContactLog();
	}catch(e)
	{
		LogManager.proxyMethod.ctlogger("----振铃事件，接触数据保存异常 "+e.message);
	}
	//初始化数据
	try{
		//初始化 接续信息
		AiCtFrame.BusinessTracks.callingObj.touchId ="";
		AiCtFrame.BusinessTracks.callingObj.crtUserId = AiSoftPhone.busiAgentObj.userId;
		AiCtFrame.BusinessTracks.callingObj.crtTime ="";//使用后台时间
		AiCtFrame.BusinessTracks.callingObj.crtAppSysId = AiCtConst.APPSYSID;
		AiCtFrame.BusinessTracks.callingObj.modfUserId = "";
		AiCtFrame.BusinessTracks.callingObj.modfTime = "";
		AiCtFrame.BusinessTracks.callingObj.modfAppSysId ="" ;
		AiCtFrame.BusinessTracks.callingObj.staffId = AiSoftPhone.busiAgentObj.staffId;
		AiCtFrame.BusinessTracks.callingObj.touchChnlId = AiCtConst.APPSYSID;
		AiCtFrame.BusinessTracks.callingObj.touchModeCd = ServiceDirect;//呼入、呼出、内部咨询
		AiCtFrame.BusinessTracks.callingObj.touchBgnTime = "";//挂机时赋值
		AiCtFrame.BusinessTracks.callingObj.touchFinishTime = "";//挂机赋值
		AiCtFrame.BusinessTracks.callingObj.touchRmk = "";
		//if(retStr!=null && retStr!= "undefined" && retStr.skillid !=null && retStr.skillid !="undefined")
		if(TaskID!=null &&TaskID!="undefined"&&TaskID!=""){
			AiCtFrame.BusinessTracks.callingObj.skilId =  TaskID;//技能ID
		}else{
			AiCtFrame.BusinessTracks.callingObj.skilId =  "101";//技能ID
		}
		AiCtFrame.BusinessTracks.callingObj.skilNm = "";//随路数据获取,IVR无法传递 设置为空
		AiCtFrame.BusinessTracks.callingObj.callSeatMarkCntt = SerialID;
		AiCtFrame.BusinessTracks.callingObj.callMarkCntt = CallID;
		if(ServiceDirect!=0)
		{
			AiCtFrame.BusinessTracks.callingObj.callingNum =OrgCalledNo ;
			AiCtFrame.BusinessTracks.callingObj.calledNum = CalledNo;
			AiCtFrame.BusinessTracks.callingObj.origCallingNum = "";
			AiCtFrame.BusinessTracks.callingObj.origCalledNum = CallingNo;
		}else
		{
			AiCtFrame.BusinessTracks.callingObj.callingNum =CallingNo ;
			AiCtFrame.BusinessTracks.callingObj.calledNum = CalledNo;
			AiCtFrame.BusinessTracks.callingObj.origCallingNum = "";
			AiCtFrame.BusinessTracks.callingObj.origCalledNum = OrgCalledNo;
		}
		AiCtFrame.BusinessTracks.callingObj.lnupTmlenSecCnt = queueTime;
		AiCtFrame.BusinessTracks.callingObj.ringTmlenSecCnt = 0;
		AiCtFrame.BusinessTracks.callingObj.cnvstTmlenSecCnt = 0;
		AiCtFrame.BusinessTracks.callingObj.onhookTypeCd = "";
		if(retIvrStr!=null && retIvrStr!= "undefined")
		{
			AiCtFrame.BusinessTracks.callingObj.callTraceCntt = AiCtFrame.ivrTransferData.ivrtrace;
		}else{
			AiCtFrame.BusinessTracks.callingObj.callTraceCntt = CallData;
		}
		if(conf==1)
			AiSoftPhone.saveTouchLog();
		LogManager.proxyMethod.ctlogger("----振铃事件，接续数据"+JSON.stringify(AiCtFrame.BusinessTracks.callingObj));
	}catch(e)
	{	
		LogManager.proxyMethod.ctlogger("----振铃事件，接续数据保存异常 "+e.message);
	}
	//赋值挂机标签
	try{
		AiCtFrame.BusinessTracks.hangupTags.telnum = tempCustPhoneNum;
    	AiCtFrame.BusinessTracks.hangupTags.lblId = "";
   		AiCtFrame.BusinessTracks.hangupTags.lblTime = "";
    	AiCtFrame.BusinessTracks.hangupTags.crtUserId = AiSoftPhone.busiAgentObj.userId;
   		AiCtFrame.BusinessTracks.hangupTags.crtTime = "";
   		AiCtFrame.BusinessTracks.hangupTags.crtAppSysId = "";
    	AiCtFrame.BusinessTracks.hangupTags.modfUserId = "";
    	AiCtFrame.BusinessTracks.hangupTags.modfTime = "";
   		AiCtFrame.BusinessTracks.hangupTags.modfAppSysId = "";
    	AiCtFrame.BusinessTracks.hangupTags.staffId = AiSoftPhone.busiAgentObj.staffId;
   		AiCtFrame.BusinessTracks.hangupTags.cntmngId = AiCtFrame.BusinessTracks.contactObj.cntmngId;
	}catch(e)
	{
		LogManager.proxyMethod.ctlogger("----振铃事件，设置挂机标签数据异常 "+e.message);
	}
	
	try{
		//刷新左侧信息
		AiSoftPhone.outCallLeft(tempCustPhoneNum,$("#J_contact_list_1"));
	}catch(e){
		LogManager.proxyMethod.ctlogger("----event------------onEventOnCallRing  刷新左侧客户信息异常!!!!!");
	}
}

//应答成功事件
function onEventAnswerCall(UserNo,AnswerTime,SerialID,ServiceDirect,CallID,UserParam,TaskID)
{
	LogManager.proxyMethod.ctlogger("----event------------onEventAnswerCall 用户号码="+UserNo+" 接通时间="+AnswerTime+" 呼叫标示="+SerialID+"呼叫类型="+ServiceDirect+"呼叫标示="+CallID+"UserParam="+UserParam+"TaskID="+TaskID);
	//调整按钮状态
	AiCtFrame.FrameButtonStyle.onAnswer();
	AiCtFrame.AgentStatusTimer.curStatusIndex =AiCtConst.AGENT_STATUS.TALK;
	//当前状态计时
	AiCtFrame.AgentStatusTimer.setTimer(AiCtFrame.AgentStatusTimer.curStatusIndex, -1);	
	AiCtFrame.AgentStatusTimer.setTalkTimer(true);
	
	//初始化 接续信息
	AiCtFrame.BusinessTracks.callingObj.crtUserId = AiSoftPhone.busiAgentObj.userId;
	AiCtFrame.BusinessTracks.callingObj.staffId = AiSoftPhone.busiAgentObj.staffId;
	AiCtFrame.BusinessTracks.callingObj.touchChnlId = AiCtConst.APPSYSID;//10085人工
	AiCtFrame.BusinessTracks.callingObj.touchBgnTime = AnswerTime;//呼入时间
	AiCtFrame.BusinessTracks.callingObj.callSeatMarkCntt = SerialID;//servid
	AiCtFrame.BusinessTracks.callingObj.callMarkCntt = CallID;//callid
	//显示来话号码
	$("#J_calling_show_status")[0].innerText = "通话中";
	if(ServiceDirect == 2){
		AiCtFrame.curMakeCALLRet = AiCtConst.MAKECALLSTATUS.CALLOUTCONN;
	}
	LogManager.proxyMethod.ctlogger("----电话接通，接续数据"+JSON.stringify(AiCtFrame.BusinessTracks.callingObj));
}
//挂机事件
function onOnCallEnd(callID,serialID,serviceDirect,userNo,bgnTime,endTime,agentAlertTime,userAlertTime,fileName,directory,disconnectType,userParam,taskID,serverName,networkInfo)
{	
	_html = '<div id="J_que_start">'+
		    '<div class="formItem bd-bottom">'+
		    '    <div class="titleArea fn-posr">'+
		    '        <h2>用户满意度问卷调查</h2>'+
		    '    </div>'+
		    '</div>'+
		   	'<div class="answerStart">'+
		    '    <div class="startIcon"></div>'+
		    '    <div class="startText">'+
		    '        <p id="J_quesDesc" style="height:25px;"></p>'+
		    '        <p class="questionNum">点击下一任务开始外呼</p>'+
		   	'    </div>'+
		    '</div>'+
		'</div>';
    $('#J_questionnaire').html(_html);
	bgnTime = bgnTime==null||bgnTime==''?endTime:bgnTime;
	var temp_begin_date = bgnTime.substring(0,4)+'/'+bgnTime.substring(4,6)+'/'+bgnTime.substring(6,8)+' '+bgnTime.substring(8,10)+':'+bgnTime.substring(10,12)+':'+bgnTime.substring(12,14);
	var temp_end_date = endTime.substring(0,4)+'/'+endTime.substring(4,6)+'/'+endTime.substring(6,8)+' '+endTime.substring(8,10)+':'+endTime.substring(10,12)+':'+endTime.substring(12,14);
	AiCtFrame.bussinessData.BGN_CNTMNG_TIME = temp_begin_date;
	AiCtFrame.bussinessData.END_CNTMNG_TIME = temp_end_date;
	//AiCtFrame.bussinessData.CNVST_RSLT_CD = ''; //通话结果代码 目前新方平台不支持
	AiCtFrame.bussinessData.CNTMNG_TYPE_CD = serviceDirect;	
	var temp_begin_date = new Date(Date.parse(temp_begin_date));
	var temp_end_date = new Date(Date.parse(temp_end_date));
	var talkLen = parseInt((temp_end_date.getTime()-temp_begin_date.getTime())/1000);
	LogManager.proxyMethod.ctlogger("----onOnCallEnd start callID="+callID+"serialID="+serialID+"userNo="+userNo+"disconnectType="+disconnectType);
	//调整按钮样式
	AiCtFrame.FrameButtonStyle.onRelease();
	//接触记录
	AiCtFrame.BusinessTracks.contactObj.modfUserId = AiSoftPhone.busiAgentObj.staffId;
	AiCtFrame.BusinessTracks.contactObj.modfAppSysId =AiCtConst.APPSYSID;
	AiCtFrame.BusinessTracks.contactObj.touchId = AiCtFrame.BusinessTracks.callingObj.touchId;
	AiCtFrame.BusinessTracks.contactObj.cmccolCustFlag ="0";
	

	
	if(conf==1)
		AiSoftPhone.updateContactLog();
	try{
		AiCtFrame.BusinessTracks.callingObj.modfUserId = AiSoftPhone.busiAgentObj.userId;
		AiCtFrame.BusinessTracks.callingObj.modfAppSysId =AiCtConst.APPSYSID ;
		AiCtFrame.BusinessTracks.callingObj.touchBgnTime = bgnTime;//挂机时赋值
		AiCtFrame.BusinessTracks.callingObj.touchFinishTime = endTime;//挂机赋值
		//var talkLen = eval(endTime-bgnTime);
		if(talkLen<0)
		{
			talkLen = 0;
		}
		AiCtFrame.BusinessTracks.callingObj.ringTmlenSecCnt = agentAlertTime;
		AiCtFrame.BusinessTracks.callingObj.cnvstTmlenSecCnt = talkLen;
		AiCtFrame.BusinessTracks.callingObj.onhookTypeCd = disconnectType;
		if(conf==1)
			AiSoftPhone.updateTouchLog();
		LogManager.proxyMethod.ctlogger("----onOnCallEnd 呼叫数据"+JSON.stringify(AiCtFrame.BusinessTracks.callingObj));
	}catch(e)
	{
		LogManager.proxyMethod.ctlogger("----onOnCallEnd 保存接续数据异常 "+e.message);
	}
	//显示来话号码
	$("#J_calling_show_num")[0].innerText = "";
	$("#J_calling_show_status")[0].innerText = "";
	$("#J_calling_show").removeClass("callProcess");
	$("#J_calling_show").addClass("fn-hide");
	try{
		//保存录音记录
		AiCtFrame.BusinessTracks.recordObj.touchId=AiCtFrame.BusinessTracks.callingObj.touchId;
		AiCtFrame.BusinessTracks.recordObj.callSeatMarkCntt=serialID;
		AiCtFrame.BusinessTracks.recordObj.callMarkCntt=callID;
		AiCtFrame.BusinessTracks.recordObj.rcdFileNm=fileName;
		AiCtFrame.BusinessTracks.recordObj.rcdFileSavePath=directory;
		AiCtFrame.BusinessTracks.recordObj.rcdBgnTime=bgnTime;
		AiCtFrame.BusinessTracks.recordObj.rcdFinishTime=endTime;
		//AiCtFrame.BusinessTracks.recordObj.rcdTmlenSecCnt=eval(endTime-bgnTime);
		AiCtFrame.BusinessTracks.recordObj.rcdTmlenSecCnt=talkLen;
		AiCtFrame.BusinessTracks.recordObj.rcdFileSvrUrlPath=AiCtConst.RECORD_URL;
	
		AiCtFrame.BusinessTracks.recordObj.crtUserId = AiSoftPhone.busiAgentObj.userId;
		AiCtFrame.BusinessTracks.recordObj.crtTime ="";//使用后台时间
		AiCtFrame.BusinessTracks.recordObj.crtAppSysId = AiCtConst.APPSYSID;
		LogManager.proxyMethod.ctlogger("----onOnCallEnd 录音记录"+JSON.stringify(AiCtFrame.BusinessTracks.recordObj));
		if(conf==1 && AiCtFrame.BusinessTracks.recordObj.touchId !=null && AiCtFrame.BusinessTracks.recordObj.touchId !="")
			AiSoftPhone.saveRecordLog();
		else{
			LogManager.proxyMethod.ctlogger("----onOnCallEnd 接续数据为空，不保存录音记录"+AiCtFrame.BusinessTracks.recordObj.touchId);
		}
	}catch(e)
	{
		LogManager.proxyMethod.ctlogger("----onOnCallEnd 录音记录异常"+e.message);
	}
	//转接记录记录
	try{
		if(AiCtConst.AGENT_CUR_OPERATOR == 1)//IVR转接
		{
		   AiCtFrame.BusinessTracks.tranferIVRObj.trstchRsltFlag = 1;//1成功
		   AiCtFrame.BusinessTracks.tranferIVRObj.crtUserId = AiSoftPhone.busiAgentObj.userId;
		   AiCtFrame.BusinessTracks.tranferIVRObj.crtTime = "";
		   AiCtFrame.BusinessTracks.tranferIVRObj.crtAppSysId = AiCtConst.APPSYSID;
		   AiCtFrame.BusinessTracks.tranferIVRObj.modfUserId = "";
		   AiCtFrame.BusinessTracks.tranferIVRObj.modfTime = "";
		   AiCtFrame.BusinessTracks.tranferIVRObj.modfAppSysId = "";
		   AiCtFrame.BusinessTracks.tranferIVRObj.touchId = AiCtFrame.BusinessTracks.callingObj.touchId;
		   AiCtFrame.BusinessTracks.tranferIVRObj.callSeatMarkCntt = serialID;
		   AiCtFrame.BusinessTracks.tranferIVRObj.trstchNum = AiCtFrame.BusinessTracks.callingObj.custMobnum;
		   AiCtFrame.BusinessTracks.tranferIVRObj.trstchTime = endTime;
		   if(conf==1)
				AiSoftPhone.saveTransferIvrLog();
			AiCtFrame.hangUpPageType.hangUpPageCODE = 4;
		}else if(AiCtConst.AGENT_CUR_OPERATOR == 2)//队列转接
		{
		   AiCtFrame.BusinessTracks.transferQueueObj.skilQueueTrstchId = "";
		   AiCtFrame.BusinessTracks.transferQueueObj.crtUserId =AiSoftPhone.busiAgentObj.userId;
		   AiCtFrame.BusinessTracks.transferQueueObj.crtTime = "";//默认取系统时间
		   AiCtFrame.BusinessTracks.transferQueueObj.crtAppSysId = AiCtConst.APPSYSID;
		   AiCtFrame.BusinessTracks.transferQueueObj.modfUserId = "";
		   AiCtFrame.BusinessTracks.transferQueueObj.modfTime = "";
		   AiCtFrame.BusinessTracks.transferQueueObj.modfAppSysId = "";
		   AiCtFrame.BusinessTracks.transferQueueObj.touchId =  AiCtFrame.BusinessTracks.callingObj.touchId;//接续ID
		   //AiCtFrame.BusinessTracks.transferQueueObj.skilQueueId = ""; //转接时赋值
		   //AiCtFrame.BusinessTracks.transferQueueObj.trstchModeCd = "";
		   AiCtFrame.BusinessTracks.transferQueueObj.trstchTime = "";
		   //AiCtFrame.BusinessTracks.transferQueueObj.trstchRsltFlag = "";
		   AiCtFrame.BusinessTracks.transferQueueObj.trstchRmk = "";
		   	if(conf==1)
				AiSoftPhone.saveTransferQueueLog();
			AiCtFrame.hangUpPageType.hangUpPageCODE = 4;
		   
		}else if(AiCtConst.AGENT_CUR_OPERATOR == 3)//座席工号
		{
			AiCtFrame.BusinessTracks.transferAgentObj.innerCnslId ="";
			AiCtFrame.BusinessTracks.transferAgentObj.crtUserId = AiSoftPhone.busiAgentObj.userId;
			AiCtFrame.BusinessTracks.transferAgentObj.crtTime ="";//默认取系统时间
			AiCtFrame.BusinessTracks.transferAgentObj.crtAppSysId =AiCtConst.APPSYSID;
			AiCtFrame.BusinessTracks.transferAgentObj.modfUserId ="";
			AiCtFrame.BusinessTracks.transferAgentObj.modfTime="";
			AiCtFrame.BusinessTracks.transferAgentObj.modfAppSysId="";
			AiCtFrame.BusinessTracks.transferAgentObj.touchId = AiCtFrame.BusinessTracks.callingObj.touchId;//接续ID
			AiCtFrame.BusinessTracks.transferAgentObj.byCnslStaffId="";//被咨询员工ID
			AiCtFrame.BusinessTracks.transferAgentObj.cnslTime ="";
			AiCtFrame.BusinessTracks.transferAgentObj.trstchFlag=0;
			AiCtFrame.BusinessTracks.transferAgentObj.trstchTime ="";
			//AiCtFrame.BusinessTracks.transferAgentObj.trstchRsltFlag ="";
			if(conf==1)
				AiSoftPhone.saveTransferAgentLog();
			AiCtFrame.hangUpPageType.hangUpPageCODE = 1;
		}
	}catch(e){
		
	}
	try{
		AiCtFrame.BusinessTracks.hangupTags.cntmngId = AiCtFrame.BusinessTracks.contactObj.cntmngId;
		//外呼失败，标记未接通时标记
		LogManager.proxyMethod.ctlogger(AiCtFrame.curMakeCALLRet+" "+AiCtConst.MAKECALLSTATUS.CALLOUTCONN +" "+serviceDirect+" "+AiCtFrame.hangUpPageType.hangUpPageCODE);
		if( (AiCtFrame.curMakeCALLRet != AiCtConst.MAKECALLSTATUS.CALLOUTCONN )  && serviceDirect=="2" && AiCtFrame.hangUpPageType.hangUpPageCODE =="1")
		{
			AiCtFrame.hangUpPageType.hangUpPageCODE = 5;
		}
		if(AiCtFrame.BusinessTracks.signInOutObj.hungup_flag==1){
			AiSoftPhone.onHangUpShow(AiCtFrame.hangUpPageType.hangUpPageCODE);
		}
		
	}catch(e){
		
	}
	try{
		//挂机进行满意度的发送
		AiSoftPhone.sendSmsOnHangup(AiCtFrame.BusinessTracks.callingObj.custMobnum);
	}catch(e){
	LogManager.proxyMethod.ctlogger("----event------------短信调用异常:");
	}
	//挂机以后重置
	AiCtConst.AGENT_CUR_OPERATOR =0;
}
//签出事件
function onOnBarExit(fcode,fdesc)
{
	LogManager.proxyMethod.ctlogger("----event------------onOnBarExit  start:"+fcode+" "+fdesc);
	if(fcode== 0 || fcode=="0"){
		//签出前台状态调整
		AiCtFrame.FrameButtonStyle.onSignOut();
		AiCtFrame.FrameButtonStyle.setSignCaption(false);
		AiCtFrame.AgentStatusTimer.curStatusIndex =AiCtConst.AGENT_STATUS.SINGOUT;
		//当前状态计时
		AiCtFrame.AgentStatusTimer.setTimer(AiCtFrame.AgentStatusTimer.curStatusIndex, -1);	
			//记录签入成功日志
		try{	
			AiCtFrame.BusinessTracks.util.clearData(AiCtFrame.BusinessTracks.signInOutObj);
			AiSoftPhone.busiAgentObj.SEAT_TRMN_IP_ADDR = AiCtUtil.getIpAddress();
			AiCtFrame.BusinessTracks.signInOutObj.crtUserId = AiSoftPhone.busiAgentObj.userId;
			AiCtFrame.BusinessTracks.signInOutObj.crtAppSysId =AiCtConst.APPSYSID;
			AiCtFrame.BusinessTracks.signInOutObj.seatTrmnIpAddr = AiCtUtil.getIpAddress();//IP地址
			AiCtFrame.BusinessTracks.signInOutObj.staffId=AiSoftPhone.busiAgentObj.staffId;//工号
			AiCtFrame.BusinessTracks.signInOutObj.callPltfStaffNum=AiSoftPhone.platWorkObj.callPltfStaffNum;//平台工号
			AiCtFrame.BusinessTracks.signInOutObj.ctiAddr=AiSoftPhone.platWorkObj.ctiIpAddr;//CTI
			AiCtFrame.BusinessTracks.signInOutObj.opTypeCd =AiCtConst.SIGNINOUT.OUT;
			if(conf==1)	
				AiSoftPhone.saveSignInOutLog();
		}catch(e){
			LogManager.proxyMethod.ctlogger("----event--------onOnBarExit 签出记录异常"+e.message);
		}
	}else if(fcode ==4305 || fcode =="4305")//强制签出
	{
		//签出前台状态调整
		AiCtFrame.FrameButtonStyle.onSignOut();
		AiCtFrame.FrameButtonStyle.setSignCaption(false);
		AiCtFrame.AgentStatusTimer.curStatusIndex =AiCtConst.AGENT_STATUS.SINGOUT;
		//当前状态计时
		AiCtFrame.AgentStatusTimer.setTimer(AiCtFrame.AgentStatusTimer.curStatusIndex, -1);	
	}
	AiCtFrame.callType =0;//默认呼入
}
//废弃不用 20150430
function onOnCallQueueQuery(QueueInfo)
{
	  LogManager.proxyMethod.ctlogger("----event------------onOnCallQueueQuery  start:");
		if(QueueInfo.length>0){
			var queueInfo = QueueInfo.split(" ");
			var counts = queueInfo[2].split("=");
			var v_count = counts[1].replace(/"/g,"");
	 	 AiCtFrame.AgentStatusTimer.setQueueWaitCount(v_count);
	}
}
//排队数更新，系统自动触发3秒一次
function onOnWorkStaticInfoReport(agentQueueInfo)
{
	LogManager.proxyMethod.ctlogger("----event------------onOnWorkStaticInfoReport  "+agentQueueInfo);
  	var jsonObj = XmlHelper.getJsonFromxml(agentQueueInfo);
  	if(jsonObj!=null)
  	{
  		var wait_count = jsonObj.totalCustNum;//总等待数量
  		var callCount = jsonObj.callCount;//总接话量
  		var showMsg ="";
  		if(wait_count>0)
  		{
  			showMsg =showMsg+wait_count+"人等待接入 ";
  		}
  		if(callCount>0)
  		{
  			showMsg =showMsg+"总通话量"+callCount;
  		}
  		//LogManager.proxyMethod.ctlogger("----event------------onOnWorkStaticInfoReport  "+showMsg);
  		//座席排队数量显示
  		if(showMsg!=null && showMsg.length>0){
  			AiCtFrame.AgentStatusTimer.setQueueWaitCount(showMsg);
  		}
  	}
	
}
