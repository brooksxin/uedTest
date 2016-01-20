//控制事件集合
AiCtFrame.FrameButtonHandle = {
	//签出/签入
	sign: function()
	{
		
		LogManager.proxyMethod.ctlogger("----core--sign "+AiCtFrame.FrameButtonStyle.getSignCaption());
		if (AiCtFrame.FrameButtonStyle.getSignCaption() == AiCtFrame.CAPTIONS.CAPTION_LOGIN) {
			this.signInProxy();
		}else
			{
				this.signOut();
			}
	},
	//签出
	signOut : function()
	{
		objCinVccBar.UnInitial();
	},
	//签入
	signInProxy : function() {
		LogManager.proxyMethod.ctlogger("----core--signInProxy() start");
		AiSoftPhone.signIn();
	},
	//空闲
	setAfterCallStatus : function() {
		LogManager.proxyMethod.ctlogger("----core--setAfterCallStatus() start "+AiCtFrame.FrameButtonStyle.getAfterCallStatusCaption());
		if (AiCtFrame.FrameButtonStyle.getAfterCallStatusCaption() == AiCtFrame.CAPTIONS.CAPTION_AFTERCALL_FREE) 
		{
			var ret= objCinVccBar.Configurate("1|1|1|0|0");
			if(ret==0)
			 {
			 			AiCtFrame.FrameButtonStyle.setAgentCallStatusCaption(false);
			 			LogManager.proxyMethod.ctlogger("----设置挂机后空闲成功 "+objCinVccBar.GetConfiguration());
			 }
		}else {
			 var ret = objCinVccBar.Configurate("1|0|1|0|0");
			 if(ret ==0)
			 {
			 			AiCtFrame.FrameButtonStyle.setAgentCallStatusCaption(true);
			 			LogManager.proxyMethod.ctlogger("----设置挂机后后处理成功 "+objCinVccBar.GetConfiguration());
			 }
		}
	},
	//请求来话,（置闲）
	sayFree : function() {
		LogManager.proxyMethod.ctlogger("----sayFree start");
		var retInt = objCinVccBar.SetIdle();
		if(retInt ==0)
		{
			AiCtFrame.FrameButtonStyle.onSayFree();	
			LogManager.proxyMethod.ctlogger("----sayFree success");	
			AiCtFrame.AgentStatusTimer.curStatusIndex =AiCtConst.AGENT_STATUS.FREE;
			//当前状态计时
		  AiCtFrame.AgentStatusTimer.setTimer(AiCtFrame.AgentStatusTimer.curStatusIndex, -1);
		}else
			{
				LogManager.proxyMethod.ctlogger("----sayFree failed");
			}
	},
	
	//置后续态,进整理态
	sayACW : function() {
		LogManager.proxyMethod.ctlogger("----sayACW start");
		try{
	  	var retInt = objCinVccBar.SetWrapUp();
	  	if(retInt ==0)
	  	{
	  		LogManager.proxyMethod.ctlogger("----sayACW success");
	  		AiCtFrame.FrameButtonStyle.onACW(true);
	  		AiCtFrame.AgentStatusTimer.curStatusIndex =AiCtConst.AGENT_STATUS.ACW;
			//当前状态计时
			AiCtFrame.AgentStatusTimer.setTimer(AiCtFrame.AgentStatusTimer.curStatusIndex, -1);
	  	}else
	  	{
	  		LogManager.proxyMethod.ctlogger("----sayACW failed");
	  	}
	 }catch(e)
	 {
	 	LogManager.proxyMethod.ctlogger("----AiSoftPhone.sayACW() 进入整理态异常"+e.message);
	}
},
	
	//置忙
	sayBusy : function() {
		 var retInt = objCinVccBar.SetBusy(0);
		 if(retInt == 0)
		 {
		 	AiCtFrame.AgentStatusTimer.curStatusIndex =AiCtConst.AGENT_STATUS.BUSY;
			//当前状态计时
			AiCtFrame.AgentStatusTimer.setTimer(AiCtFrame.AgentStatusTimer.curStatusIndex, -1);	
		 }
	},

	//挂机释放
	releaseCall : function(){
		objCinVccBar.Disconnect();
	},
	
	//外呼,呼出
	dialOut : function()
	{
		//var strInput = "STAFF_ID="+AiSoftPhone.busiAgentObj.staffId;
      	//不分页获取数据
       // Util.ajax.postJson(srvMap.get('queryMytask'),strInput,function(json,status){
       //  if (status) {
      //       Util.ajax.loadTemp('#J_outCallTableTpl',$('#T_outCallPagetpl'),json);//加载模板
      //   }else{
      //      LogManager.proxyMethod.ctlogger("----AiSoftPhone.dialOut() 查询外呼任务异常"+json.returnMessage);
     //    }
   //  })
	   AiCtFrame.BusinessTracks.signInOutObj.hungup_flag=0;
       var elem = document.getElementById('T_outCallPage');
            var params = {
                id:'D_outCallPage',
                title:'呼出',
                content: elem,
                width: 800,
                height:550,
                modal: true
            }
	   Util.dialog.openDiv(params);
        $("#myinput").bind('keypress', function(e){
            if (e.keyCode == 13) {
               // $('#outCallBtn').trigger("click");
            }
        })
	},
	
	//通话保持
	holdProxy : function() {
		try{
		
		if (AiCtFrame.FrameButtonStyle.getHoldCaption() == AiCtFrame.CAPTIONS.CAPTION_HOLD) {
			if (confirm('是否需要通话保持')) {
				LogManager.proxyMethod.ctlogger("----AiCtFrame.FrameButtonHandle.hold AiSoftPhone.hold()");
				AiSoftPhone.hold();
			}
		} else {
			LogManager.proxyMethod.ctlogger("---AiCtFrame.FrameButtonHandle.hold AiSoftPhone.getHold()");
			AiSoftPhone.getHold();
		}
		}catch(e)
		{
			ctlogger("AiCtFrame.FrameButtonHandle.hold "+e.message);
		}
	},
	
	//转IVR
	transToIVR : function(ivrID,dataJson)
	{
		if(dataJson !=null && dataJson !="undefined" && dataJson!="")
		{
			LogManager.proxyMethod.ctlogger("---AiCtFrame.FrameButtonHandle.transToIVR---设置随路数据"+JSON.stringify(dataJson));
			AiCtFrame.BusinessTracks.util.setData(dataJson,AiCtFrame.ivrTransferData);
			LogManager.proxyMethod.ctlogger("---AiCtFrame.FrameButtonHandle.transToIVR---设置随路数据"+JSON.stringify(AiCtFrame.ivrTransferData));
			
			//格式转换
			var jStr="";
		    for(var item in AiCtFrame.ivrTransferData){
		        jStr += item+":"+AiCtFrame.ivrTransferData[item]+",";
		    }
		    jStr =jStr.substring(0,jStr.length-1);
			var dataSign = AiSoftPhone.setCallData(AiSoftPhone.platWorkObj.callPltfStaffNum,jStr);
			var getCallDataStr = AiSoftPhone.getCallData(AiSoftPhone.platWorkObj.callPltfStaffNum);
			LogManager.proxyMethod.ctlogger("---AiCtFrame.FrameButtonHandle.transToIVR---设置随路数据成功"+dataSign+JSON.stringify(AiCtFrame.ivrTransferData)+" 重新获取data="+getCallDataStr);
		}
		var retInt = AiSoftPhone.transToIVR(ivrID);
		LogManager.proxyMethod.ctlogger("---AiCtFrame.FrameButtonHandle.transToIVR---调用结果"+retInt+" "+ivrID);
		return retInt;
	},
	//转Queue
	transToQueue : function(queueID,dataJson)
	{
		if(dataJson !=null && dataJson !="undefined" && dataJson!="")
		{
			LogManager.proxyMethod.ctlogger("---AiCtFrame.FrameButtonHandle.transToQueue---设置随路数据"+JSON.stringify(dataJson));
			AiCtFrame.BusinessTracks.util.setData(dataJson,AiCtFrame.ivrTransferData);
			LogManager.proxyMethod.ctlogger("---AiCtFrame.FrameButtonHandle.transToQueue---设置随路数据"+JSON.stringify(AiCtFrame.ivrTransferData));
			
			//格式转换
			var jStr="";
		    for(var item in AiCtFrame.ivrTransferData){
		        jStr += item+":"+AiCtFrame.ivrTransferData[item]+",";
		    }
		    jStr =jStr.substring(0,jStr.length-1);
			var dataSign = AiSoftPhone.setCallData(AiSoftPhone.platWorkObj.callPltfStaffNum,jStr);
			var getCallDataStr = AiSoftPhone.getCallData(AiSoftPhone.platWorkObj.callPltfStaffNum);
			LogManager.proxyMethod.ctlogger("---AiCtFrame.FrameButtonHandle.transToQueue---设置随路数据成功"+dataSign+JSON.stringify(AiCtFrame.ivrTransferData)+" 重新获取data="+getCallDataStr);
			
		}
		var retInt = AiSoftPhone.transToQueue(queueID);
		LogManager.proxyMethod.ctlogger("---transToQueue---"+retInt);
	},
	//转Agent
	transToAgent : function(agentID,dataJson)
	{
		if(dataJson !=null && dataJson !="undefined" && dataJson!="")
		{
			LogManager.proxyMethod.ctlogger("---AiCtFrame.FrameButtonHandle.transToAgent---设置随路数据"+JSON.stringify(dataJson));
			AiCtFrame.BusinessTracks.util.setData(dataJson,AiCtFrame.ivrTransferData);
			LogManager.proxyMethod.ctlogger("---AiCtFrame.FrameButtonHandle.transToAgent---设置随路数据"+JSON.stringify(AiCtFrame.ivrTransferData));
			
			//格式转换
			var jStr="";
		    for(var item in AiCtFrame.ivrTransferData){
		        jStr += item+":"+AiCtFrame.ivrTransferData[item]+",";
		    }
		    jStr =jStr.substring(0,jStr.length-1);
			var dataSign = AiSoftPhone.setCallData(AiSoftPhone.platWorkObj.callPltfStaffNum,jStr);
			var getCallDataStr = AiSoftPhone.getCallData(AiSoftPhone.platWorkObj.callPltfStaffNum);
			LogManager.proxyMethod.ctlogger("---AiCtFrame.FrameButtonHandle.transToAgent---设置随路数据成功"+dataSign+JSON.stringify(AiCtFrame.ivrTransferData)+" 重新获取data="+getCallDataStr);
		}
		var retInt = AiSoftPhone.transToAgent(agentID);
		LogManager.proxyMethod.ctlogger("---transToIVR---"+retInt);
	},
	//应答
	answerCall : function() {
		AiSoftPhone.answerCall();
	},
	makeCall : function(phoneNum){
		//判断当前是否在通话 是的话 二次拨号		
		var agentStatus = objCinVccBar.GetAgentStatus();
		//通话过程中 进行二次拨号
		if(agentStatus == 3)
		{
			//return AiSoftPhone.reSendDTMF(phoneNum);
		}else if(agentStatus == 0)
		{
			Util.dialog.tips('未签入无法进行外呼，请先签入CTI平台！');
			return;
		}
		return AiSoftPhone.makeCall(phoneNum);
	}
}

//按钮是否为disabled ,统一调用方法
function openCustomMenuAction(obj){
	if(obj.className!="disabled"){
		try {
			eval(obj.func);
			} catch (e) {
		}
	}
}
var AiCtFBH = AiCtFrame.FrameButtonHandle;
//封装CTI的方法
var AiSoftPhone = {
	//-----------------业务工号信息定义--------------------
	busiAgentObj:{"userName":"","userId":"","userAls":"","staffEnName":"","staffId":"","staffName":"","op_fullname":"测试工号","deptId":"","deptName":"","SEAT_TRMN_IP_ADDR":"127.0.0.1"
	},
	//-----------------话务工号定义--------------------
	platWorkObj:{"staffId":"2","grpcmNum":"888888","callPltfStaffNum":"0000108888881006","seatPw":"111111","seatPwEncrModeCd":"0",
	"seatTypeCd":0,"selfHintMarkNum":0,"ctiIpAddr":"221.176.67.103","ctiPrtnum":"14800","backctiIpAddr":"221.176.67.103",
	"backctiPrtnum":14800,"locPrtnum":9008,"callPltfExtNum":"0000028888881006","sipSvrIpAddr":"221.176.67.103","sipSvrPrtnum":5040,
	"sipDscrmPrivModeCd":1,"sipPw":"00000000","sipAgrmtCntt":"UDP","telnumTrmnModeCd":1,"appTypeCd":2,"monrSvrIpAddr":"221.176.67.103",
	"monrSvrPrtnum":4503,"sipPwEncrModeCd":0,"sipUbtyAreaNm":"ASIA","backsipSvrPrtnum":"221.176.67.103","backsipSvrIpAddr":5040
	},
	// 错误
	lst_errcode : 0,
	lst_errdesc : "",	
	function_limited : false,
	// 签出是状态值
	lst_signout_status : "1",
	win_dialout :null,
	//签入CTI操作
	signIn : function(){
		LogManager.proxyMethod.ctlogger("--core----AiSoftPhone.signIn() method start "+JSON.stringify(this.platWorkObj)+"  "+JSON.stringify(this.busiAgentObj));	
		try{
			//必填写 
			objCinVccBar.AgentID = this.platWorkObj.callPltfStaffNum ;
			objCinVccBar.Dn = this.platWorkObj.callPltfExtNum ;
			objCinVccBar.MainIP = this.platWorkObj.ctiIpAddr;    
			objCinVccBar.BackIP = this.platWorkObj.backctiIpAddr;
			//必填写   
			objCinVccBar.MainPortID = this.platWorkObj.ctiPrtnum;
			//必填写         
			objCinVccBar.BackPortID = this.platWorkObj.backctiPrtnum;
			//必填写        
			objCinVccBar.LocalPort = this.platWorkObj.locPrtnum;
			objCinVccBar.SipServerIP = this.platWorkObj.sipSvrIpAddr;			
			//必填写
			objCinVccBar.SipServerPort = this.platWorkObj.sipSvrPrtnum;
			objCinVccBar.SipAuthType = this.platWorkObj.sipDscrmPrivModeCd;
			objCinVccBar.SipPassWord = this.platWorkObj.sipPw;
			//必填写
			objCinVccBar.SipProtocol = this.platWorkObj.sipAgrmtCntt;
			//必填写
			objCinVccBar.PhonType = this.platWorkObj.telnumTrmnModeCd;  //0:内置坐席卡；1：内置Sip；2：外置其他终端 3： 远程sip 4:yealink
			objCinVccBar.SelfPrompt = this.platWorkObj.selfHintMarkNum;
			//必填写
			objCinVccBar.MonitorIP = this.platWorkObj.monrSvrIpAddr;
			objCinVccBar.MonitorPort = this.platWorkObj.monrSvrPrtnum;
			objCinVccBar.MediaFlag = this.platWorkObj.grpcmNum;
			objCinVccBar.AgentType = this.platWorkObj.seatTypeCd; 
			objCinVccBar.AppType = this.platWorkObj.appTypeCd;//Agent 0 Monitor 1  agent+minitor 2
			objCinVccBar.PassWord = this.platWorkObj.seatPw;
			objCinVccBar.SipBackServerIP =this.platWorkObj.backsipSvrIpAddr;
			objCinVccBar.SipBackServerPort=this.platWorkObj.backsipSvrPrtnum;
			objCinVccBar.SipBackProtocol =this.platWorkObj.sipAgrmtCntt;
			objCinVccBar.SipBackAuthType =this.platWorkObj.sipDscrmPrivModeCd;
			objCinVccBar.SipBackPassWord=this.platWorkObj.sipPw;
			objCinVccBar.SerialBtn("0,1,2,9,6,3,4,5,11,7,8,10,12,15,16,19,20,21,22","12,19,20,21,22");
			objCinVccBar.Initial();
		}catch(e)
		{
			AiCtFrame.FrameButtonStyle.functionLimited();
			alert("CTI平台参数配置不正确，将无法使用接续电话功能！"+e.message);
			LogManager.proxyMethod.ctlogger("--core----AiSoftPhone.signIn() method 异常");
		}
		LogManager.proxyMethod.ctlogger("--core----AiSoftPhone.signIn() method end");
	},	
	sayFree : function() {
		AiSoftPhone.invokeMethod("Device_SayFree","");
	},

	sayBusy : function() {
		objCinVccBar.SetBusy(0);
	},
	hold : function(){
		LogManager.proxyMethod.ctlogger("--core----AiSoftPhone.hold() method start");
		var retInt = objCinVccBar.Hold();
		if(retInt == 0)
		{
			LogManager.proxyMethod.ctlogger("--core----AiSoftPhone.hold() method success");
			AiCtFrame.FrameButtonStyle.onHold();
		  	AiCtFrame.FrameButtonStyle.setHoldCaption(true);
		}else{
			LogManager.proxyMethod.ctlogger("--core----AiSoftPhone.hold() method failed");
		}
		LogManager.proxyMethod.ctlogger("--core----AiSoftPhone.hold() method end");
	},
	getHold : function(){
		var retInt = objCinVccBar.RetrieveHold();
		if(retInt == 0)
		{
			AiCtFrame.FrameButtonStyle.onAnswer();
		  AiCtFrame.FrameButtonStyle.setHoldCaption(false);
		}		
	},
	makeCall :function(phoneNum){
		AiCtFrame.curMakeCALLRet = AiCtConst.MAKECALLSTATUS.CALLOUTINIT;
		return objCinVccBar.MakeCall(phoneNum);
	},
	//转IVR
	transToIVR : function(ivrID)
	{
		//设置转接标记
		AiCtFrame.BusinessTracks.util.clearData(AiCtFrame.BusinessTracks.tranferIVRObj);
		AiCtFrame.BusinessTracks.tranferIVRObj.ivrSeqprcId = ivrID;
		AiCtFrame.BusinessTracks.tranferIVRObj.trstchModeCd = 0;
		
		AiCtConst.AGENT_CUR_OPERATOR =1 ;//标记为转IVR挂机
		var retInt = objCinVccBar.TransferOut(2,ivrID);
		if(retInt == 0)
		   AiCtFrame.BusinessTracks.tranferIVRObj.trstchRsltFlag = 1;//1成功
		else
		   AiCtFrame.BusinessTracks.tranferIVRObj.trstchRsltFlag = 0;//0失败
		LogManager.proxyMethod.ctlogger("---AiSoftphone.transToIVR---ivrID="+ivrID+"  retInt="+retInt);
		return retInt;
	},
	//转Queue
	transToQueue : function(queueID)
	{	
		AiCtFrame.BusinessTracks.util.clearData(AiCtFrame.BusinessTracks.transferQueueObj);
		AiCtFrame.BusinessTracks.transferQueueObj.skilQueueId = queueID;
		AiCtFrame.BusinessTracks.transferQueueObj.trstchModeCd = 0;
		
		AiCtConst.AGENT_CUR_OPERATOR =2 ;//标记为转队列挂机
		var retInt = objCinVccBar.TransferOut(2,queueID);
			if(retInt == 0)
			AiCtFrame.BusinessTracks.transferQueueObj.trstchRsltFlag = 1;
		else
			AiCtFrame.BusinessTracks.transferQueueObj.trstchRsltFlag = 0;
		LogManager.proxyMethod.ctlogger("---transToQueue---"+retInt+" queueID="+queueID);
		return retInt;
	},
	//转Agent
	transToAgent : function(agentID)
	{
		AiCtFrame.BusinessTracks.util.clearData(AiCtFrame.BusinessTracks.transferAgentObj);
		AiCtFrame.BusinessTracks.transferAgentObj.calledCallPltfStaffNum = agentID;
		AiCtFrame.BusinessTracks.transferAgentObj.trstchModeCd = 0;
		
		AiCtConst.AGENT_CUR_OPERATOR =3 ;//标记为转座席挂机
		var retInt = objCinVccBar.TransferOut(0,agentID);
		if(retInt == 0)
			AiCtFrame.BusinessTracks.transferAgentObj.trstchRsltFlag = 1;
		else
			AiCtFrame.BusinessTracks.transferAgentObj.trstchRsltFlag = 0;
		LogManager.proxyMethod.ctlogger("---transToAgent---"+retInt+" agentID="+agentID);
		return retInt;
	},
	//转外部号码
	transferOut : function(phoneNum)
	{
		return objCinVccBar.TransferOut(phoneNum);
	},
	//二次拨号
	reSendDTMF : function(dialNum)
	{
		return objCinVccBar.SendDTMF(dialNum);
	},
	//设置随路数据
	setCallData : function(destAgentId,callData)
	{
		 return objCinVccBar.SetCallData(destAgentId, callData);
		 
	},
	//获取随路数据
	getCallData : function(destAgentId)
	{
		return objCinVccBar.GetCallData(destAgentId);
	},
	getAgentCurStatus : function ()
	{
		return objCinVccBar.GetAgentStatus();//0：未登录 1：忙碌 2：空闲 3：通话中 4：后续态
	},
	setDisplayPhoneNum : function ()
	{
		return objCinVccBar.SetDisplayNumber();
	},
	//咨询
	consultOther : function(destType,destNum)
	{
		return objCinVccBar.Consult(destType,destNum);
	},
	//转出
	transferOther : function()
	{
		return objCinVccBar.Transfer();
	},
	//会议
	conferenceOther : function()
	{
		return objCinVccBar.Conference();
	},
	releaceThirdParty : function(retrieveCall)
	{
		return objCinVccBar.ReleaseThirdOne(retrieveCall); //1：接通 0：保持
	},
	//转IVR，座席等待，返回
	tranferIvrBack : function(ivrID,backType)
	{
		return objCinVccBar.Bridge(ivrID,backType);
	},
	//静音、取消
	mute : function(muteType)
	{
		return objCinVccBar.Mute(muteType);//1：静音设置 0：静音取消
	},
	callbackLastPhone : function()
	{
		return objCinVccBar.CallBack();
	},
	//------------------以下封装业务方法-------------------------------------------
	//获取工号信息，调用权限SESSION获取
	getStaffById: function ()
	{
		AiCtFrame.BusinessTracks.util.clearData(AiSoftPhone.busiAgentObj);
		var jsonRet = null;
		Util.ajax.postJsonSync(srvMap.get('staffInfoUrl'),{},function(json,status){
			//alert(JSON.stringify(json))
            if (status) {
            	AiCtFrame.BusinessTracks.util.setData(json.bean,AiSoftPhone.busiAgentObj);
            	LogManager.proxyMethod.ctlogger("查询session工号数据成功"+JSON.stringify(json));
            	jsonRet = json;
            }else{
                LogManager.proxyMethod.ctlogger(json.returnMessage+'查询Session工号信息失败！');
                jsonRet=  null;
            }
        })
        return jsonRet;
	},
	//获取平台工号方法
	getCtiInfoByStaff: function ()
	{
		//先清空
		AiCtFrame.BusinessTracks.util.clearData(AiSoftPhone.platWorkObj);
		var signFlag = 0;
		Util.ajax.postJsonSync(srvMap.get('ctiConfigUrl'),{"staffId":this.busiAgentObj.staffId},function(json,status){
			//alert(JSON.stringify(json))
            if (status) {
            	if(jQuery.isEmptyObject( json.bean ))//判断是否为空 不进行签入
            	{
            		signFlag = 0;
            		LogManager.proxyMethod.ctlogger("getCtiInfoByStaff 获取平台工号信息为空，不进行签入 "+JSON.stringify(json));
            	}else{
              		signFlag = 1;
              		//对本地工号进行赋值
              		AiCtFrame.BusinessTracks.util.setData(json.bean,AiSoftPhone.platWorkObj);
              		//alert(JSON.stringify(json.bean));
              		//alert(JSON.stringify(AiSoftPhone.platWorkObj));
            	}
           	 LogManager.proxyMethod.ctlogger("getCtiInfoByStaff 获取平台工号信息 "+JSON.stringify(json));
            }else{
            	signFlag = 0;
                LogManager.proxyMethod.ctlogger(json.returnMessage+'根据工号查询CTI信息失败！');
            }
        })
       
       return signFlag;
	},
	//写入签入签出记录
	saveSignInOutLog: function ()
	{
		var signFlag = 0;
		var signInObj ={
			"sginSgoutId":AiCtFrame.BusinessTracks.signInOutObj.sginSgoutId,
			"crtUserId":AiCtFrame.BusinessTracks.signInOutObj.crtUserId,
			"crtTime":AiCtFrame.BusinessTracks.signInOutObj.crtTime,
			"crtAppSysId":AiCtFrame.BusinessTracks.signInOutObj.crtAppSysId,
			"modfUserId":AiCtFrame.BusinessTracks.signInOutObj.modfUserId,
			"modfTime":AiCtFrame.BusinessTracks.signInOutObj.modfTime,
			"modfAppSysId":AiCtFrame.BusinessTracks.signInOutObj.modfAppSysId,
			"staffId":AiCtFrame.BusinessTracks.signInOutObj.staffId,
			"seatTrmnIpAddr":AiCtFrame.BusinessTracks.signInOutObj.seatTrmnIpAddr,
			"callPltfStaffNum":AiCtFrame.BusinessTracks.signInOutObj.callPltfStaffNum,
			"ctiAddr":AiCtFrame.BusinessTracks.signInOutObj.ctiAddr,
			"opTypeCd":AiCtFrame.BusinessTracks.signInOutObj.opTypeCd,
			"opTime":AiCtFrame.BusinessTracks.signInOutObj.opTime
		};
		Util.ajax.postJsonSync(srvMap.get('signLogUrl'),signInObj,function(json,status){
            if (status) {
              	signFlag = json.bean.count;
            }else{
            	signFlag = 0;
                LogManager.proxyMethod.ctlogger(json.returnMessage+'更新签入签出信息异常！');
            }
        })
       return signFlag;
	},
	//写入接触记录
	saveContactLog: function ()
	{
		var serContactId = null;
		var inputObj ={"cntmngId":AiCtFrame.BusinessTracks.contactObj.cntmngId,
						"crtUserId":AiCtFrame.BusinessTracks.contactObj.crtUserId,
						"crtAppSysId":AiCtFrame.BusinessTracks.contactObj.crtAppSysId,
						"modfUserId":AiCtFrame.BusinessTracks.contactObj.modfUserId,
						"modfAppSysId":AiCtFrame.BusinessTracks.contactObj.modfAppSysId,
						"chnlId":AiCtFrame.BusinessTracks.contactObj.chnlId,
						"cntmngTypeCd":AiCtFrame.BusinessTracks.contactObj.cntmngTypeCd,
						"staffId":AiCtFrame.BusinessTracks.contactObj.staffId,
						"custId":AiCtFrame.BusinessTracks.contactObj.custId,
						"touchId":AiCtFrame.BusinessTracks.contactObj.touchId};
		Util.ajax.postJsonSync(srvMap.get('contactInsert'),inputObj,function(json,status){
            if (status) {
            	//alert(JSON.stringify(json.bean));
              	serContactId = json.bean.contactId; //返回流水号
              	AiCtFrame.BusinessTracks.contactObj.cntmngId = json.bean.contactId;
              	LogManager.proxyMethod.ctlogger('保存接触记录成功！接触流水号='+serContactId);
            }else{
            	serContactId = null;
                LogManager.proxyMethod.ctlogger(json.returnMessage+'保存接触记录异常！');
            }
        })
       return serContactId;
	},
	//更新接触记录
	updateContactLog: function ()
	{
		var retBoolean = false;
		var inputObj ={"cntmngId":AiCtFrame.BusinessTracks.contactObj.cntmngId,
						"modfUserId":AiCtFrame.BusinessTracks.contactObj.modfUserId,
						"modfAppSysId":AiCtFrame.BusinessTracks.contactObj.modfAppSysId,
						"touchId":AiCtFrame.BusinessTracks.contactObj.touchId,
						"cmccolCustFlag":AiCtFrame.BusinessTracks.contactObj.cmccolCustFlag
						};
		Util.ajax.postJson(srvMap.get('contactUpdate'),inputObj,function(json,status){
            if (status) {
            	retBoolean =true;
            	LogManager.proxyMethod.ctlogger('更新接触记录成功!接触流水号='+AiCtFrame.BusinessTracks.contactObj.cntmngId);
            }else{
            	retBoolean = false;
                LogManager.proxyMethod.ctlogger(json.returnMessage+'更新接触记录异常！');
            }
        })
       return retBoolean;
	},
	//写入接续记录
	saveTouchLog: function ()
	{
		var serTouchId = null;
		var inputObj ={
			"touchId":AiCtFrame.BusinessTracks.callingObj.touchId,
			"crtUserId":AiCtFrame.BusinessTracks.callingObj.crtUserId,
			"crtTime":AiCtFrame.BusinessTracks.callingObj.crtTime,
			"crtAppSysId":AiCtFrame.BusinessTracks.callingObj.crtAppSysId,
			"modfUserId":AiCtFrame.BusinessTracks.callingObj.modfUserId,
			"modfTime":AiCtFrame.BusinessTracks.callingObj.modfTime,
			"modfAppSysId":AiCtFrame.BusinessTracks.callingObj.modfAppSysId,
			"staffId":AiCtFrame.BusinessTracks.callingObj.staffId,
			"touchChnlId":AiCtFrame.BusinessTracks.callingObj.touchChnlId,
			"touchModeCd":AiCtFrame.BusinessTracks.callingObj.touchModeCd,
			"touchBgnTime":AiCtFrame.BusinessTracks.callingObj.touchBgnTime,
			"touchFinishTime":AiCtFrame.BusinessTracks.callingObj.touchFinishTime,
			"touchRmk":AiCtFrame.BusinessTracks.callingObj.touchRmk,
			"skilId":AiCtFrame.BusinessTracks.callingObj.skilId,
			"skilNm":AiCtFrame.BusinessTracks.callingObj.skilNm,
			"callSeatMarkCntt":AiCtFrame.BusinessTracks.callingObj.callSeatMarkCntt,
			"callMarkCntt":AiCtFrame.BusinessTracks.callingObj.callMarkCntt,
			"callingNum":AiCtFrame.BusinessTracks.callingObj.callingNum,
			"calledNum":AiCtFrame.BusinessTracks.callingObj.calledNum,
			"origCallingNum":AiCtFrame.BusinessTracks.callingObj.origCallingNum,
			"origCalledNum":AiCtFrame.BusinessTracks.callingObj.origCalledNum,
			"lnupTmlenSecCnt":AiCtFrame.BusinessTracks.callingObj.lnupTmlenSecCnt,
			"ringTmlenSecCnt":AiCtFrame.BusinessTracks.callingObj.ringTmlenSecCnt,
			"cnvstTmlenSecCnt":AiCtFrame.BusinessTracks.callingObj.cnvstTmlenSecCnt,
			"onhookTypeCd":AiCtFrame.BusinessTracks.callingObj.onhookTypeCd,
			"callTraceCntt":AiCtFrame.BusinessTracks.callingObj.callTraceCntt,
			"custMobnum":AiCtFrame.BusinessTracks.callingObj.custMobnum,
			"cmccCustNm":AiCtFrame.BusinessTracks.callingObj.cmccCustNm,
			"cmccCustBelgPlcNm":AiCtFrame.BusinessTracks.callingObj.cmccCustBelgPlcNm,
			"cmccCustBelgCityCode":AiCtFrame.BusinessTracks.callingObj.cmccCustBelgCityCode,
			"cmccCustBelgProvCode":AiCtFrame.BusinessTracks.callingObj.cmccCustBelgProvCode,
			"cmccCallingBrandNm":AiCtFrame.BusinessTracks.callingObj.cmccCallingBrandNm,
			"cmccCustConcAddr":AiCtFrame.BusinessTracks.callingObj.cmccCustConcAddr,
			"cmccCustLvlNm":AiCtFrame.BusinessTracks.callingObj.cmccCustLvlNm
		};
		Util.ajax.postJsonSync(srvMap.get('touchInsert'),inputObj,function(json,status){
            if (status) {
              	serTouchId = json.bean.touchId; //返回流水号
              	AiCtFrame.BusinessTracks.contactObj.touchId = json.bean.touchId;
              	AiCtFrame.BusinessTracks.callingObj.touchId = json.bean.touchId;
              	LogManager.proxyMethod.ctlogger("保存接续数据成功，接续流水号="+serTouchId);
            }else{
            	serTouchId = null;
                LogManager.proxyMethod.ctlogger(json.returnMessage+'保存接续记录异常！');
            }
        })
       return serTouchId;
	},
	//更新接续记录
	updateTouchLog: function ()
	{
		var updateCount = 0;
		var inputObj ={
			"touchId":AiCtFrame.BusinessTracks.callingObj.touchId,
			"modfUserId":AiCtFrame.BusinessTracks.callingObj.modfUserId,
			"modfAppSysId":AiCtFrame.BusinessTracks.callingObj.modfAppSysId,
			"touchBgnTime":AiCtFrame.BusinessTracks.callingObj.touchBgnTime,
			"touchFinishTime":AiCtFrame.BusinessTracks.callingObj.touchFinishTime,
			"lnupTmlenSecCnt":AiCtFrame.BusinessTracks.callingObj.lnupTmlenSecCnt,
			"ringTmlenSecCnt":AiCtFrame.BusinessTracks.callingObj.ringTmlenSecCnt,
			"cnvstTmlenSecCnt":AiCtFrame.BusinessTracks.callingObj.cnvstTmlenSecCnt,
			"onhookTypeCd":AiCtFrame.BusinessTracks.callingObj.onhookTypeCd,
			"callTraceCntt":AiCtFrame.BusinessTracks.callingObj.callTraceCntt,
			"custMobnum":AiCtFrame.BusinessTracks.callingObj.custMobnum,
			"cmccCustNm":AiCtFrame.BusinessTracks.callingObj.cmccCustNm,
			"cmccCustBelgPlcNm":AiCtFrame.BusinessTracks.callingObj.cmccCustBelgPlcNm,
			"cmccCustBelgCityCode":AiCtFrame.BusinessTracks.callingObj.cmccCustBelgCityCode,
			"cmccCustBelgProvCode":AiCtFrame.BusinessTracks.callingObj.cmccCustBelgProvCode,
			"cmccCallingBrandNm":AiCtFrame.BusinessTracks.callingObj.cmccCallingBrandNm,
			"cmccCustConcAddr":AiCtFrame.BusinessTracks.callingObj.cmccCustConcAddr,
			"cmccCustLvlNm":AiCtFrame.BusinessTracks.callingObj.cmccCustLvlNm
		};
		//alert(srvMap.get('touchUpdate'));
		Util.ajax.postJsonSync(srvMap.get('touchUpdate'),inputObj,function(json,status){
            if (status) {
            	//alert(JSON.stringify(json.bean));
              	updateCount = json.bean.count; //返回更新记录条数
              	LogManager.proxyMethod.ctlogger("更新接续数据成功，接续流水号="+AiCtFrame.BusinessTracks.callingObj.touchId +"更新记录数="+updateCount);
            }else{
            	updateCount = 0;
                LogManager.proxyMethod.ctlogger(json.returnMessage+'updateTouchLog 更新接续记录异常！');
            }
        })
       return updateCount;
	},
	//写入录音记录 
	saveRecordLog: function ()
	{
		var recordId = null;
		var inputObj ={
			"touchId":AiCtFrame.BusinessTracks.recordObj.touchId,
			"crtUserId":AiCtFrame.BusinessTracks.recordObj.crtUserId,
			"crtTime":AiCtFrame.BusinessTracks.recordObj.crtTime,
			"crtAppSysId":AiCtFrame.BusinessTracks.recordObj.crtAppSysId,
			"callSeatMarkCntt":AiCtFrame.BusinessTracks.recordObj.callSeatMarkCntt,
			"callMarkCntt":AiCtFrame.BusinessTracks.recordObj.callMarkCntt,
			"rcdFileNm":AiCtFrame.BusinessTracks.recordObj.rcdFileNm,
			"rcdFileSavePath":AiCtFrame.BusinessTracks.recordObj.rcdFileSavePath,
			"rcdBgnTime":AiCtFrame.BusinessTracks.recordObj.rcdBgnTime,
			"rcdFinishTime":AiCtFrame.BusinessTracks.recordObj.rcdFinishTime,
			"rcdTmlenSecCnt":AiCtFrame.BusinessTracks.recordObj.rcdTmlenSecCnt,
			"rcdFileSvrUrlPath":AiCtFrame.BusinessTracks.recordObj.rcdFileSvrUrlPath
		};
		///alert(JSON.stringify(inputObj));
		///alert(srvMap.get('recordManageUrl'));
		Util.ajax.postJsonSync(srvMap.get('recordManageUrl'),inputObj,function(json,status){
			//alert(status);
            if (status) {
              	recordId = json.bean.touchRcdSeq; //返回流水号
              	LogManager.proxyMethod.ctlogger('saveRecordLog 保存录音记录成功，录音流水号！'+recordId);
            }else{
            	recordId = null;
                LogManager.proxyMethod.ctlogger(json.returnMessage+'saveRecordLog 保存录音记录失败！');
            }
        })
       return recordId;
	},
	//写入转接IVR记录
	saveTransferIvrLog: function ()
	{
		var saveIvrId = null;
		var inputObj ={
			"ivrSeqprcId":AiCtFrame.BusinessTracks.tranferIVRObj.ivrSeqprcId,
			"trstchModeCd":AiCtFrame.BusinessTracks.tranferIVRObj.trstchModeCd,
			"trstchRsltFlag":AiCtFrame.BusinessTracks.tranferIVRObj.trstchRsltFlag,//1成功
		   	"crtUserId":AiCtFrame.BusinessTracks.tranferIVRObj.crtUserId,
		   	"crtTime":AiCtFrame.BusinessTracks.tranferIVRObj.crtTime,
		   	"crtAppSysId":AiCtFrame.BusinessTracks.tranferIVRObj.crtAppSysId,
		   "modfUserId":AiCtFrame.BusinessTracks.tranferIVRObj.modfUserId,
		   "modfTime":AiCtFrame.BusinessTracks.tranferIVRObj.modfTime,
		   "modfAppSysId":AiCtFrame.BusinessTracks.tranferIVRObj.modfAppSysId,
		   "touchId":AiCtFrame.BusinessTracks.tranferIVRObj.touchId,
		   "callSeatMarkCntt":AiCtFrame.BusinessTracks.tranferIVRObj.callSeatMarkCntt,
		   "trstchNum":AiCtFrame.BusinessTracks.tranferIVRObj.trstchNum,
		   "trstchTime":AiCtFrame.BusinessTracks.tranferIVRObj.trstchTime
		};
		//alert(JSON.stringify(inputObj));
		Util.ajax.postJsonSync(srvMap.get('transferIvrUrl'),inputObj,function(json,status){
           //alert(JSON.stringify(json));
			if (status) {
              	saveIvrId = json.bean.ivrTrstchId; //返回流水号
              	LogManager.proxyMethod.ctlogger('IVR转接记录保存成功！流水号'+saveIvrId);
            }else{
            	saveIvrId = null;
                LogManager.proxyMethod.ctlogger(json.returnMessage + '转IVR记录失败！');
            }
        })
       return saveIvrId;
	},
	//写入转接人工服务记录
	saveTransferQueueLog: function ()
	{
		var saveIvrId = null;
		var inputObj ={
			"skilQueueTrstchId":AiCtFrame.BusinessTracks.transferQueueObj.skilQueueTrstchId,
		   	"crtUserId":AiCtFrame.BusinessTracks.transferQueueObj.crtUserId,
		   	"crtTime":AiCtFrame.BusinessTracks.transferQueueObj.crtTime ,
		   	"crtAppSysId":AiCtFrame.BusinessTracks.transferQueueObj.crtAppSysId,
		   	"modfUserId":AiCtFrame.BusinessTracks.transferQueueObj.modfUserId,
		   	"modfTime":AiCtFrame.BusinessTracks.transferQueueObj.modfTime,
		   	"modfAppSysId":AiCtFrame.BusinessTracks.transferQueueObj.modfAppSysId,
		   	"touchId":AiCtFrame.BusinessTracks.transferQueueObj.touchId,
		   	"skilQueueId":AiCtFrame.BusinessTracks.transferQueueObj.skilQueueId,
		   	"trstchModeCd":AiCtFrame.BusinessTracks.transferQueueObj.trstchModeCd,
		   	"trstchTime":AiCtFrame.BusinessTracks.transferQueueObj.trstchTime,
		   	"trstchRsltFlag":AiCtFrame.BusinessTracks.transferQueueObj.trstchRsltFlag,
		   	"trstchRmk":AiCtFrame.BusinessTracks.transferQueueObj.trstchRmk
		};
		Util.ajax.postJsonSync(srvMap.get('transferQueueUrl'),inputObj,function(json,status){
            if (status) {
              	saveIvrId = json.bean.QueueTrstchId; //返回流水号
              	LogManager.proxyMethod.ctlogger('IVR转接记录保存成功！流水号'+saveIvrId);
            }else{
            	saveIvrId = null;
                LogManager.proxyMethod.ctlogger(json.returnMessage+'转人工服务失败！');
            }
        })
       return saveIvrId;
	},
	//写入转接座席记录
	saveTransferAgentLog: function ()
	{
		var saveIvrId = null;
		var inputObj ={
			
		};
		Util.ajax.postJsonSync(srvMap.get('transferAgentUrl'),inputObj,function(json,status){
            if (status) {
              	saveIvrId = json.bean.innerCnslId; //返回流水号
            }else{
            	saveIvrId = 0;
                LogManager.proxyMethod.ctlogger(json.returnMessage+'转座席失败！');
            }
        })
       return saveIvrId;
	},
	//获取用户归属地
	getUserPlaceByPhone: function (phonenum)
	{
		if(phonenum==null ||phonenum=="undefined" || phonenum.length <7)
		{
			Util.dialog.tips("号码:"+phonenum+" 格式错误！");
			return false ;
		}
		var retObj = null;
		Util.ajax.postJson(srvMap.get('getUserPlaceUrl'),{"mobnumSctno":phonenum},function(json,status){
            if (status) {
               retObj = json;
            }else{
            	retObj= false;
                LogManager.proxyMethod.ctlogger(json.returnMessage+'根据手机号码查询归属地信息失败！');
            }
        })
        return retObj;
	},
	//更新座席状态
	updateAgentCurStatus: function ()
	{
		var retCount = 0;
		var inputObj ={
			"staffId":AiCtFrame.BusinessTracks.agentCurStatus.staffId,
			"crtUserId":AiCtFrame.BusinessTracks.agentCurStatus.crtUserId,
			"crtTime":AiCtFrame.BusinessTracks.agentCurStatus.crtTime,
			"crtAppSysId":AiCtFrame.BusinessTracks.agentCurStatus.crtAppSysId,
			"modfUserId":AiCtFrame.BusinessTracks.agentCurStatus.modfUserId,
			"modfTime":AiCtFrame.BusinessTracks.agentCurStatus.modfTime,
			"modfAppSysId":AiCtFrame.BusinessTracks.agentCurStatus.modfAppSysId,
			"seatStsCd":AiCtFrame.BusinessTracks.agentCurStatus.seatStsCd,
			"lastOneTmsSginTime":AiCtFrame.BusinessTracks.agentCurStatus.lastOneTmsSginTime,
			"qutyExamFlag":AiCtFrame.BusinessTracks.agentCurStatus.qutyExamFlag,
			"callPltfStaffNum":AiCtFrame.BusinessTracks.agentCurStatus.callPltfStaffNum
		};
		//alert(JSON.stringify(inputObj));
		Util.ajax.postJson(srvMap.get('agentStateUrl'),inputObj,function(json,status){
            if (status) {
            	//alert(JSON.stringify(json.bean));
              	retCount = json.bean.count; //返回流水号
            }else{
            	retCount = 0;
                LogManager.proxyMethod.ctlogger('保存接触记录异常！');
            }
        })
       return retCount;
	},
	onHangUpShow : function(hangUpFromType)
	{
		var hangupPage = "hangupPage";
/*		var cmpgn_type_cd = $(window.frames["I_market"].document).find("#CMPGN_TYPE_CD").val();
		alert(cmpgn_type_cd);
		var cmpgn_invld_date = $(window.frames["I_market"].document).find("#CMPGN_INVLD_DATE").val();
		var rsvt_odr_mcds_unit_id = $(window.frames["I_market"].document).find("#RSVT_ODR_MCDS_UNIT_ID").val(); */
		
		//var cmpgn_type_cd = AiCtFrame.BusinessTracks.signInOutObj.CMPGN_TYPE_CD;
		var cmpgn_invld_date = Util.browser.getParameter('cmpgn_invld_date');
		//var cmpgn_invld_date = AiCtFrame.BusinessTracks.signInOutObj.CMPGN_INVLD_DATE;
		//var rsvt_odr_mcds_unit_id = AiCtFrame.BusinessTracks.signInOutObj.RSVT_ODR_MCDS_UNIT_ID;		
		AiCtFrame.hangUpPageType.hangUpPageCODE = hangUpFromType;
		sale_date = cmpgn_invld_date;
		
		var bgn_cntmng_time = AiCtFrame.bussinessData.BGN_CNTMNG_TIME;
		var end_cntmng_time = AiCtFrame.bussinessData.END_CNTMNG_TIME;
		//AiCtFrame.bussinessData.CNVST_RSLT_CD = ''; //通话结果代码 目前新方平台不支持
		var cntmng_type_cd = AiCtFrame.bussinessData.CNTMNG_TYPE_CD;
		var forespeak_flag_86 = AiCtFrame.BusinessTracks.signInOutObj.forespeak_flag_86;
		var type  =  forespeak_flag_86=="1"?"1":"0";
		
		
			if(hangUpFromType ==1)//正常挂机
			{
				hangupPage = "hangupPage";
				//营销下单失败，更新营销数据
				if(AiCtFrame.bussinessData.CMPGN_ID !=null && AiCtFrame.bussinessData.CMPGN_ID !="")
				{
					Util.ajax.postJsonSync(srvMap.get('updateMarketInfo'),{'CMPGN_ID':AiCtFrame.bussinessData.CMPGN_ID,'STAFF_ID':AiSoftPhone.busiAgentObj.staffId,'CUST_STS_CD':3,'RESV_MOBNUM':AiCtFrame.BusinessTracks.callingObj.custMobnum,"CNTMNG_ID":AiCtFrame.BusinessTracks.contactObj.cntmngId,'BGN_CNTMNG_TIME':bgn_cntmng_time,'END_CNTMNG_TIME':end_cntmng_time,'CNTMNG_TYPE_CD':cntmng_type_cd,'type':type},function(json,status){
		            if (status) {
		         		LogManager.proxyMethod.ctlogger("提交订单更新营销结果为失败3");
		            }else{
		                LogManager.proxyMethod.ctlogger(json.returnMessage+'提交订单更新营销结果异常!');
		            }
			        })
				}
			}else 	if(hangUpFromType ==3)//预约挂机
			{
				hangupPage = "hangupAppointPage";
				$("#appointOrderId")[0].innerText = AiCtFrame.hangUpPageType.hangUpOrderId;
				if(AiCtFrame.bussinessData.CMPGN_ID !=null && AiCtFrame.bussinessData.CMPGN_ID !="")
				{
					Util.ajax.postJsonSync(srvMap.get('updateMarketInfo'),{'CMPGN_ID':AiCtFrame.bussinessData.CMPGN_ID,'STAFF_ID':AiSoftPhone.busiAgentObj.staffId,'CUST_STS_CD':2,'RESV_MOBNUM':AiCtFrame.BusinessTracks.callingObj.custMobnum,"CNTMNG_ID":AiCtFrame.BusinessTracks.contactObj.cntmngId,'BGN_CNTMNG_TIME':bgn_cntmng_time,'END_CNTMNG_TIME':end_cntmng_time,'CNTMNG_TYPE_CD':cntmng_type_cd},function(json,status){
		            if (status) {
		         		LogManager.proxyMethod.ctlogger("提交订单更新营销结果为失败3！");
		            }else{
		                LogManager.proxyMethod.ctlogger(json.returnMessage+'提交订单更新营销结果异常!');
		            }
			        })
				}
				
			}else 	if(hangUpFromType ==4)//4:外呼拒绝
			{
				hangupPage = "hangupCallRefusePage";
				
				if(AiCtFrame.bussinessData.CMPGN_ID !=null && AiCtFrame.bussinessData.CMPGN_ID !="")
				{
					Util.ajax.postJsonSync(srvMap.get('updateMarketInfo'),{'CMPGN_ID':AiCtFrame.bussinessData.CMPGN_ID,'STAFF_ID':AiSoftPhone.busiAgentObj.staffId,'CUST_STS_CD':2,'RESV_MOBNUM':AiCtFrame.BusinessTracks.callingObj.custMobnum,"CNTMNG_ID":AiCtFrame.BusinessTracks.contactObj.cntmngId,'BGN_CNTMNG_TIME':bgn_cntmng_time,'END_CNTMNG_TIME':end_cntmng_time,'CNTMNG_TYPE_CD':cntmng_type_cd},function(json,status){
		            if (status) {
		         		LogManager.proxyMethod.ctlogger("提交订单更新营销结果为失败3！");
		            }else{
		                LogManager.proxyMethod.ctlogger(json.returnMessage+'提交订单更新营销结果异常!');
		            }
			        })
				}				
				
			}else 	if(hangUpFromType ==5)//5：未接通
			{
				hangupPage = "hangupUnconnPage";
				
				
				//营销下单失败，更新营销数据
				if(AiCtFrame.bussinessData.CMPGN_ID !=null && AiCtFrame.bussinessData.CMPGN_ID !="")
				{
					Util.ajax.postJsonSync(srvMap.get('updateMarketInfo'),{'CMPGN_ID':AiCtFrame.bussinessData.CMPGN_ID,'STAFF_ID':AiSoftPhone.busiAgentObj.staffId,'CUST_STS_CD':3,'RESV_MOBNUM':AiCtFrame.BusinessTracks.callingObj.custMobnum,"CNTMNG_ID":AiCtFrame.BusinessTracks.contactObj.cntmngId,'BGN_CNTMNG_TIME':bgn_cntmng_time,'END_CNTMNG_TIME':end_cntmng_time,'CNTMNG_TYPE_CD':cntmng_type_cd},function(json,status){
		            if (status) {
		         		LogManager.proxyMethod.ctlogger("提交订单更新营销结果为失败3！");
		            }else{
		                LogManager.proxyMethod.ctlogger(json.returnMessage+'提交订单更新营销结果异常!');
		            }
			        })
				}			
				
				
			}			
			
		

		
		AiCtFrame.hangUpPageType.hangUpPageURL ='hangupPage';
		CD_VAL=null;
		if(hangUpFromType=='1'||hangUpFromType=='2'||hangUpFromType=='3'){
			$("input[name='callResultStateRadio_0'][value=100]").attr('checked', true);
			$("input[name='callResultStateRadio_0'][value=200]").attr('disabled', true);
			chooseDisplayArea(100);
		}else if(hangUpFromType=='4'||hangUpFromType=='5'){
			$("input[name='callResultStateRadio_0'][value=200]").attr('checked', true);
			$("input[name='callResultStateRadio_0'][value=100]").attr('disabled', true);
			chooseDisplayArea(200);
		}
		LogManager.proxyMethod.ctlogger("----hangUpFromType="+hangUpFromType +" hangupPage="+hangupPage);
		var elem = document.getElementById('T_hangupPage');
            var params = {
                id:'hangupPage',
                title:'',
                content: elem,
                width: 600,
                height:550,
                modal: true
            }
            Util.dialog.openDiv(params);
	},
	saveOnHangupTagsLog: function ()
	{
		var serTouchId = null;
		var inputObj ={
			"telnum":AiCtFrame.BusinessTracks.hangupTags.telnum,
    		"lblId":AiCtFrame.BusinessTracks.hangupTags.lblId,
	   		"lblTime":AiCtFrame.BusinessTracks.hangupTags.lblTime,
	    	"crtUserId":AiCtFrame.BusinessTracks.hangupTags.crtUserId,
	   		"crtTime":AiCtFrame.BusinessTracks.hangupTags.crtTime,
	   		"crtAppSysId":AiCtFrame.BusinessTracks.hangupTags.crtAppSysId,
	    	"modfUserId":AiCtFrame.BusinessTracks.hangupTags.modfUserId ,
	    	"modfTime":AiCtFrame.BusinessTracks.hangupTags.modfTime,
	   		"modfAppSysId":AiCtFrame.BusinessTracks.hangupTags.modfAppSysId,
	    	"staffId":AiCtFrame.BusinessTracks.hangupTags.staffId,
	   		"cntmngId":AiCtFrame.BusinessTracks.hangupTags.cntmngId
		};
		Util.ajax.postJson(srvMap.get('hangUpTagsInsert'),inputObj,function(json,status){
            if (status) {
            	//alert(JSON.stringify(json.bean));
              	//serTouchId = json.bean.touchId; //返回流水号
              	//AiCtFrame.BusinessTracks.contactObj.touchId = json.bean.touchId;
              	//AiCtFrame.BusinessTracks.callingObj.touchId = json.bean.touchId;
              	//alert("serTouchId="+serTouchId);
            }else{
            	serTouchId = null;
                LogManager.proxyMethod.ctlogger('保存接续记录异常！');
            }
        })
       return serTouchId;
	},
	saveCustInfoRingData: function ()
	{
		var serTouchId = null;
		var inputObj ={
			"crtUserId":AiCtFrame.BusinessTracks.custInfoRing.crtUserId,
			"crtAppSysId":AiCtFrame.BusinessTracks.custInfoRing.crtAppSysId,
			//"crtTime":AiCtFrame.BusinessTracks.custInfoRing.crtTime,
			"ptyNm":AiCtFrame.BusinessTracks.custInfoRing.ptyNm,
			//"ptyEnNm":AiCtFrame.BusinessTracks.custInfoRing.,
			//"genCd":AiCtFrame.BusinessTracks.custInfoRing.,
			//"birthDate":AiCtFrame.BusinessTracks.custInfoRing.,
			//"lnslclndTypeCd":AiCtFrame.BusinessTracks.custInfoRing.,
			//"mrgFlag":AiCtFrame.BusinessTracks.custInfoRing.,
			//"mrgSvnrDate":AiCtFrame.BusinessTracks.custInfoRing.,
			//"edubgCd":AiCtFrame.BusinessTracks.custInfoRing.,
			//"fmlyPrsnCnt":AiCtFrame.BusinessTracks.custInfoRing.,
			//"sonCnt":AiCtFrame.BusinessTracks.custInfoRing.,
			//"daughtCnt":AiCtFrame.BusinessTracks.custInfoRing.,
			//"careerCd":AiCtFrame.BusinessTracks.custInfoRing.,
			//"jobttCd":AiCtFrame.BusinessTracks.custInfoRing.,
			//"yearRvnuAmt":AiCtFrame.BusinessTracks.custInfoRing.,
			//"haveVeFlag":AiCtFrame.BusinessTracks.custInfoRing.,
			//"residTypeCd":AiCtFrame.BusinessTracks.custInfoRing.,
			//"monAvgCommAmt":AiCtFrame.BusinessTracks.custInfoRing.,
			//"ptyNo":AiCtFrame.BusinessTracks.custInfoRing.,
			//"custDesc":AiCtFrame.BusinessTracks.custInfoRing.,
			//"endValidTime":AiCtFrame.BusinessTracks.custInfoRing.,
			//"bgnValidTime":AiCtFrame.BusinessTracks.custInfoRing.,
			"markNum":AiCtFrame.BusinessTracks.custInfoRing.markNum
		};
		//必须同步请求，否则用户ID获取不到
		Util.ajax.postJsonSync(srvMap.get('custInfoRingInsert'),inputObj,function(json,status){
            if (status) {
         		LogManager.proxyMethod.ctlogger("客户信息查询成功，用户id="+json.bean.ptyId);
              	serTouchId = json.bean.ptyId; //返回客户ID
              	AiCtConst.CURCUSTID = json.bean.ptyId;
              	AiCtFrame.BusinessTracks.contactObj.custId = json.bean.ptyId;
            }else{
            	serTouchId = null;
                LogManager.proxyMethod.ctlogger(json.returnMessage+'保存客户信息异常!!!!!');
            }
        })
       return serTouchId;
	},
	saveCustInfoFromWeb: function (phoneNum)
	{
		var tempCustId = null;
		var inputObj ={
			"crtUserId":AiSoftPhone.busiAgentObj.userId,
			"crtAppSysId":AiCtConst.APPSYSID,
			"ptyNm":"未知",
			"markNum":phoneNum
		};
		//必须同步请求，否则用户ID获取不到
		Util.ajax.postJsonSync(srvMap.get('custInfoRingInsert'),inputObj,function(json,status){
            if (status) {
         		LogManager.proxyMethod.ctlogger("页面调用客户信息查询成功，用户id="+json.bean.ptyId);
              	tempCustId = json.bean.ptyId; //返回客户ID
              	AiCtConst.CURCUSTID = json.bean.ptyId;
            }else{
            	tempCustId = null;
                LogManager.proxyMethod.ctlogger(json.returnMessage+'页面调用保存客户信息异常!!!!!');
            }
        })
       return tempCustId;
	},
	outCallLeft : function (num,dom){
		//话务左侧菜单
		if ($('#mainLeft').length) {
			var custTagsDiv =  $(dom).find("div.custTags");
			var custAreaDiv = $(dom).find("div.custAreaDiv"); 
			var obj0 = $(dom).find("div.custInfo");
			var obj1 = $(dom).find("div.J_contact_left_custInfo");
			var obj2 = $(dom).find("div.J_contact_left_histOrder");
			var obj3 = $(dom).find("div.J_contact_left_history");
			var obj4 = $(dom).find("div.J_contact_left_prehistory");
			
			Handlebars.registerHelper("isChinaMobile", function(str,fn){
			    var buffer = "";
			    if(str == '1'){
			       buffer = '移动';
			    }else  if(str == '2'){
			       buffer = '联通';
			    }else  if(str == '1'){
			       buffer = '电信';
			    }else{
			        buffer = '';
			    }
			    return buffer;
			});
			Handlebars.registerHelper("is4G", function(str,fn){
			    var buffer = "";
			    if(str == '1'){
			       buffer = '是';
			    }else{
			        buffer = '否';
			    }
			    return buffer;
			}); 
			
			//刷新归属地
			try{
				Util.ajax.postJsonSync(srvMap.get('getUserPlaceUrl'),{"mobnumSctno":num},function(json,status){
		        if (status) {
		        	$(".ui-loading").addClass("fn-hide");
		        	$("#J_openTransferPage").show();
					$("#J_searchOtherNum").show();
		        	var datas = {};
			    	datas.custArea = json;
			    	if(json.bean !=null && json.bean !="{}"){
			           	var chinaMoblieSign = json.bean.mtopFctyNo;
						AiCtFrame.BusinessTracks.callingObj.cmccCustBelgProvCode = json.bean.suprRegnCode;
						AiCtFrame.BusinessTracks.callingObj.cmccCustBelgCityCode = json.bean.regnCode;
						//bean":{"regnCode":"0713","regnDesc":"湖北省","regnNm":"黄州市" suprRegnCode:020}
						AiCtFrame.BusinessTracks.callingObj.cmccCustBelgPlcNm = json.bean.regnDesc+" "+json.bean.regnNm;
						LogManager.proxyMethod.ctlogger("----归属地信息:"+json.bean.regnDesc+" "+json.bean.regnNm);
			    		Util.ajax.loadTemp(custAreaDiv,$('#T_contact_areaInfo'),datas);//加载模板
		        	}
		        }else{
		        	$(".ui-loading").addClass("fn-hide");
		        	var datas = {};
			    	datas.custArea = {"regnDesc":"未知","regnNm":"","mtopFctyNo":""};
			    	//Util.ajax.loadTemp(custAreaDiv,$('#T_contact_areaInfo'),datas);//加载模板
					AiCtFrame.BusinessTracks.callingObj.cmccCustBelgProvCode = null;
					AiCtFrame.BusinessTracks.callingObj.cmccCustBelgCityCode = null;
		            LogManager.proxyMethod.ctlogger(json.returnMessage+'查询号码归属地信息异常！');
		         }
		         if($(dom).attr("id") == "J_contact_list_2"){
				         	$("#out-phone2").css("display","block").addClass("phoneNumber_curren").removeClass("phoneNumber_small").prev("a").addClass("phoneNumber_small").removeClass("phoneNumber_curren");
				           	$("#out-phone2").text(num);
				            $("#phoneNumver_close").removeClass("fn-hide");
				            $("#J_contact_list_2").removeClass("fn-hide");
				            $("#J_contact_list_1").addClass("fn-hide");
				            $("#J_searchOtherNum").hide();
		        	}else{
		        		$("#out-phone1").text(num);
		        	}
		
		        	//页签单击单击切换
				    $(".out-phone").on("click",function(){
		
				        var index = $(this).index();
		
				        $("#mainLeft").find("div.J_outcall_contact_list").eq(index).removeClass("fn-hide").siblings("div.J_outcall_contact_list").addClass("fn-hide");
				        
				        if(!$(this).hasClass("phoneNumber_curren")){
		
				            $(this).addClass("phoneNumber_curren").removeClass("phoneNumber_small").siblings().addClass("phoneNumber_small").removeClass("phoneNumber_curren");
				        }
				    });
				    //关闭按钮单击事件
			        $("#phoneNumver_close").on("click",function(){
		        		$(this).addClass("fn-hide").prev("a").css("display","none").prev("a").addClass("phoneNumber_curren").removeClass("phoneNumber_small");
		        		$("#J_contact_list_2").addClass("fn-hide").children().html("");
		        		$("#J_searchOtherNum").show();
		        		$("#J_contact_list_1").removeClass("fn-hide");
					});
				})
			}catch(e){
				LogManager.proxyMethod.ctlogger(json.returnMessage + '查询号码归属地信息移动！'+e.message);
			}
		
			//刷新用户标签
			try{
				Util.ajax.postJson(srvMap.get('getUserTagUrl'),{"markNum":num},function(json,status){
		        if (status) {
		          	var datas = {};
			    	datas.custTags = json;
			    	LogManager.proxyMethod.ctlogger("----客户标签信息成功"+JSON.stringify(datas));
			    	Util.ajax.loadTemp(custTagsDiv,$('#T_contact_tags'),datas);//加载模板
		        }else{
		            LogManager.proxyMethod.ctlogger(json.returnMessage + '获取用户标签数据异常！');
		        }
		   		})
			}catch(e){
				LogManager.proxyMethod.ctlogger(json.returnMessage + '查询客户标签数据异常！'+e.message);
			}
			var call_type = $("#call_type").val();
			if(call_type==0){
				srvMap.add('marketActivity', 'marketActivity.json','front/sh/market!index?uid=my023');//查询省数据
				Util.ajax.postJsonSync(srvMap.get('marketActivity'),'&RESV_MOBNUM='+num,function(json,status){
				    if (status) {
				    	$(".ui-loading").addClass("fn-hide");
				    	var datas = {};
				    	datas.mkt = json;
				    	Util.ajax.loadTemp(obj0,$('#T_contact_left'),datas);//加载模板
				    }else{
						$(".ui-loading").removeClass("fn-hide");
				        Util.dialog.tips('查询失败，请重试！');
				    }
				});				
			}

		
		try{
			Util.ajax.postJsonSync(srvMap.get('custInfoUrl'),{"MSISDN":num},function(json,status){
				
			    if (status) {
			    	var datas = {};
					json.bean.phonenum = num;
			    	datas.custInfo = json.bean;
			    	//更新CMCC用户名称
			    	if(num == AiCtFrame.BusinessTracks.callingObj.custMobnum)
			    	{
						AiCtFrame.BusinessTracks.callingObj.cmccCustNm = json.bean.custFamilyName;
						AiCtFrame.BusinessTracks.callingObj.cmccCustBelgCityCode = json.bean.cityCode;
						AiCtFrame.BusinessTracks.callingObj.cmccCallingBrandNm = json.bean.custBrandName;
						AiCtFrame.BusinessTracks.callingObj.cmccCustConcAddr = json.bean.address;
						AiCtFrame.BusinessTracks.callingObj.cmccCustLvlNm =json.bean.custLevelName;
			    	}
			    	LogManager.proxyMethod.ctlogger("----查询客户信息："+JSON.stringify(datas));
			    	Util.ajax.loadTemp(obj1,$('#T_contact_left_custInfo'),datas);//加载模板
			    }else{
			    	var datas = {};
			    	Util.ajax.loadTemp(obj1,$('#T_contact_left_custInfo'),datas);//加载模板
			        LogManager.proxyMethod.ctlogger(json.returnMessage + '查询客户信息失败，请重试！');
			    }
			});
		}catch(e){
			LogManager.proxyMethod.ctlogger("查询客户信息失败异常 "+e.message);
		}
		try{	
			Util.ajax.postJson(srvMap.get('contactHistory'),'CUST_MOBNUM='+num,function(json,status){
			    if (status) {
			    	var datas = {};
			    	json.bean.phonenum = num;
			    	datas.contactHisRec = json;
			    	LogManager.proxyMethod.ctlogger("----查询客户接触数据"+JSON.stringify(datas));
			    	Util.ajax.loadTemp(obj3,$('#T_contact_left_history'),datas);//加载模板
			    }else{
			       	LogManager.proxyMethod.ctlogger(json.returnMessage+'查询接触历史失败，请重试！');
			    }
			});
		}catch(e){
			LogManager.proxyMethod.ctlogger("查询接触历史异常 "+e.message);
		}
		try{
			Util.ajax.postJson(srvMap.get('billHistory'),{"CUST_RESV_TELNUM":num},function(json,status){
			    if (status) {
			    	var datas = {};
			    	json.bean.phonenum = num;
			    	datas.billHis = json;
			    	Util.ajax.loadTemp(obj2,$('#T_contact_left_histOrder'),datas);//加载模板
			    }else{
			        LogManager.proxyMethod.ctlogger(json.returnMessage+'查询订单历史失败，请重试！');
			    }
			});
		}catch(e){
			LogManager.proxyMethod.ctlogger("查询订单历史失败 "+e.message);
		}
		try{
			Util.ajax.postJson(srvMap.get('appointHistory'),{"CUST_RESV_TELNUM":num},function(json,status){
			    if (status) {
			    	var datas = {};
			    	json.bean.phonenum = num;
			    	datas.appoint = json;
			    	Util.ajax.loadTemp(obj4,$('#T_contact_left_prehistory'),datas);//加载模板
			    }else{
			        LogManager.proxyMethod.ctlogger(json.returnMessage+'查询预约历史失败，请重试！');
			    }
			});
		}catch(e){
			LogManager.proxyMethod.ctlogger("查询预约历史失败 "+e.message);
		}
		}
		},//标记回拨标签 5
		doSaveHangupCommonTag: function(tags){
			var qnr_rec_id = $('.qBox').attr('QNR_REC_ID');//取得答题记录id
			var current_date = new Date();
			var feedbackDate=null;
			var feedbackReason=null;
			if(CD_VAL==null){
				alert("请选择通话结果状态！");
				return false;
			}else if(CD_VAL==108){
				var minutesChoice = $("#timeChoiceData").val();
				var bgn_date = $("#BGN_DATE").val();
				feedbackReason = $(".textareaDesc").val();
				
				if(minutesChoice==0 && bgn_date==""){
					alert("回拨时间或者分钟数不能为空！！");
					return false;
				}else if(minutesChoice != 0 && bgn_date == ""){
					current_date.setMinutes(current_date.getMinutes()+parseInt(minutesChoice));
					feedbackDate = current_date.toLocaleString().replace(/年|月/g,'-').replace(/日/g,'');
				}else if(minutesChoice == 0 && bgn_date != ""){
					feedbackDate = bgn_date;
				}else if(minutesChoice != 0 && bgn_date != ""){
					bgn_date = new Date(bgn_date.replace(/-/g,"/"));
					bgn_date.setMinutes(bgn_date.getMinutes()+parseInt(minutesChoice));
					feedbackDate = bgn_date.toLocaleString().replace(/年|月/g,'-').replace(/日/g,'');
				}
				
				var str1 = feedbackDate.substring(feedbackDate.indexOf("-")+1,feedbackDate.lastIndexOf("-"));
				var str2 = feedbackDate.substring(feedbackDate.indexOf(" ")+1,feedbackDate.indexOf(":"));
				if(str1.length<2){
					str1="0"+str1;
					feedbackDate=feedbackDate.substring(0,feedbackDate.indexOf("-")+1)+str1+feedbackDate.substring(feedbackDate.lastIndexOf("-"))
				}
				if(str2.length<2){
					str2="0"+str2;
					feedbackDate=feedbackDate.substring(0,feedbackDate.indexOf(" ")+1)+str2+feedbackDate.substring(feedbackDate.indexOf(":"))
				}
				
				if(feedbackDate>sale_date){
					alert("回访时间不能大于活动结束时间！！回访活动结束时间为 "+sale_date);
					return false;
				}
				
				$("#BGN_DATE").val("");
				$("#timeChoiceData").attr("value","0");
				$(".textareaDesc").val("");
				$(".setCallbackTime").hide();	
			}
			if(tags == 5 ){
                $('.tabs .ui-tab-items li').eq(1).click();
                $('.tabs .ui-tab-items li').eq(3).addClass('fn-hide');
            }
			if(tags == 5 && qnr_rec_id != null && qnr_rec_id!= ""){
                if(CD_VAL=='102'){
                	
    				Util.ajax.postJsonSync(srvMap.get('rejectQnr'),{'QNR_REC_ID':qnr_rec_id},function(json,status){
    		            if (status) {
    		         		LogManager.proxyMethod.ctlogger("调用拒绝问卷 客户拒绝访问（调查类）102！rejectQnr");
    		            }else{
    		                LogManager.proxyMethod.ctlogger('调用拒绝问卷 客户拒绝访问（调查类）102  rejectQnr 异常');
    		            }
    			        });	                	
                	
                }else if(CD_VAL=='103'){
                	
    				Util.ajax.postJsonSync(srvMap.get('suspendQnr'),{'QNR_REC_ID':qnr_rec_id},function(json,status){
    		            if (status) {
    		         		LogManager.proxyMethod.ctlogger("暂停问卷 中途拒绝访问（调查类）103！suspendQnr");
    		            }else{
    		                LogManager.proxyMethod.ctlogger('暂停问卷 中途拒绝访问（调查类）103！suspendQnr 失败！');
    		            }
    			        });	                	
                	
                }else if(CD_VAL=='104'){
                	
    				Util.ajax.postJsonSync(srvMap.get('finishQnr'),{'QNR_REC_ID':qnr_rec_id},function(json,status){
    		            if (status) {
    		         		LogManager.proxyMethod.ctlogger("完成问卷   成功调研（调查类）104！ finishQnr");
    		            }else{
    		                LogManager.proxyMethod.ctlogger('完成问卷   成功调研（调查类）104！ finishQnr 失败！');
    		            }
    			        });	                	
                	
                }
			}
			
			if(AiCtFrame.bussinessData.CMPGN_ID !=null && AiCtFrame.bussinessData.CMPGN_ID !="")
			{

				if(CD_VAL==108){
					Util.ajax.postJsonSync(srvMap.get('updateMarketInfo'),{'CMPGN_ID':AiCtFrame.bussinessData.CMPGN_ID,'RESV_MOBNUM':AiCtFrame.BusinessTracks.callingObj.custMobnum,'CNVST_RSLT_CD':CD_VAL,'ONEMRE_RSVT_TIME':feedbackDate,'ONEMRE_RSVT_DESC':feedbackReason,'CUST_STS_CD':'4',"CNTMNG_ID":AiCtFrame.BusinessTracks.contactObj.cntmngId,"type":"4"},function(json,status){
			            if (status) {
			         		LogManager.proxyMethod.ctlogger("调用营销活动服务updateMarketInfo，传入通话结果状态！");
			            }else{
			                LogManager.proxyMethod.ctlogger(json.returnMessage+'调用营销活动服务updateMarketInfo，传入通话结果状态异常!');
			            }
				        });						
					
				}else{
					
					Util.ajax.postJsonSync(srvMap.get('updateMarketInfo'),{'CMPGN_ID':AiCtFrame.bussinessData.CMPGN_ID,'RESV_MOBNUM':AiCtFrame.BusinessTracks.callingObj.custMobnum,'CNVST_RSLT_CD':CD_VAL,"CNTMNG_ID":AiCtFrame.BusinessTracks.contactObj.cntmngId,"type":"4"},function(json,status){
			            if (status) {
			         		LogManager.proxyMethod.ctlogger("调用营销活动服务updateMarketInfo，传入通话结果状态！");
			            }else{
			                LogManager.proxyMethod.ctlogger(json.returnMessage+'调用营销活动服务updateMarketInfo，传入通话结果状态异常!');
			            }
				        });						
				}
				//alert(AiCtFrame.bussinessData.CMPGN_ID);
				//alert(AiCtFrame.BusinessTracks.callingObj.custMobnum);
				
				
			}
			
			//调用后台保存记录
		  	AiCtFrame.BusinessTracks.hangupTags.lblId = tags;//取标签数据
		  	AiSoftPhone.saveOnHangupTagsLog();
		  	 //$("input[name='hangupTypes1']").removeAttr("checked");
			 //$("#hangupTypes1_1").attr("checked","checked");
		  	
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
			
			//initialLoadMethod();			
		   Util.dialog.close('hangupPage');//关闭、
		   try{
		   		if(AiCtFrame.bussinessData.CMPGN_ID !=null && AiCtFrame.bussinessData.CMPGN_ID !=""){
		   			//document.frames("I_market").cancelButtonDisabed();
		   			$("#NextTask").removeClass("BGgray").addClass("BGblue");
		   		}
		   }catch(e){
		   		LogManager.proxyMethod.ctlogger('挂机更新营销信息异常！');
		   }
		},
		openContactInfoPage:function(phoneNum){
			window.open("customerContactSearch.html?CUST_MOBNUM="+phoneNum,'customerContactSearch','height=480,width=1024,top=0,left=0,Resizable=yes,scrollbars=yes');
		},
		openOrderInfoPage:function(phoneNum){
			window.open("../orders/allOrderHistoryList.html?CUST_MOBNUM="+phoneNum,'contactOrdersHistory','height=480,width=1024,top=0,left=0,Resizable=yes,scrollbars=yes');
		},openAppointInfoPage:function(phoneNum){
			window.open("../orders/reservationOrderList.html?CUST_MOBNUM="+phoneNum,'contactRsvtOrdersHistory','height=480,width=1024,top=0,left=0,Resizable=yes,scrollbars=yes');
		},
		sendSmsOnHangup: function (phoneNum)
		{
			if(phoneNum==null && phoneNum=="")
			{
				LogManager.proxyMethod.ctlogger('手机号码为空，不发送短信！');
				return false;
			}
			var serTouchId = null;
			var inputObj ={
				"smsSdTelnum":phoneNum,
	    		"smsCntt":"#如果世界上有一个快速通道能够买到爆款4G手机# 那么其他的挑选等待就会变成将就，我知道，您不愿意将就！@10085您身边的手机终端专家，帮您订购心仪手机，贴心服务送货到家。【诚邀您与10085一起玩转4G新时代，成为时尚大咖！】还能在线充值话费哟，更多惊喜敬请期待呦!",
		    	"smsSdRsnCd":"010",
		   		"crtUserId":AiSoftPhone.busiAgentObj.userId,
		   		"smsSdTime":""
			};
			Util.ajax.postJson(srvMap.get('sendSmsUrl'),inputObj,function(json,status){
	            if (status) {
	            	 serTouchId = true;
	            	 LogManager.proxyMethod.ctlogger(json.returnMessage+'短信发送成功！');
	            }else{
	            	serTouchId = null;
	                LogManager.proxyMethod.ctlogger(json.returnMessage+'短信发送失败！');
	            }
	        })
	       return serTouchId;
		},
		
		refreshUserHasActivity : function(num)
		{
			var current_date = new Date();
			var call_type = $("#call_type").val();
			var CMPGN_ID = AiCtFrame.bussinessData.CMPGN_ID;
			var CNTMNG_ID = AiCtFrame.BusinessTracks.contactObj.cntmngId;
			var RESV_MOBNUM = AiCtFrame.BusinessTracks.callingObj.custMobnum;
			var CUST_STS_CD = '3';
			var BGN_CNTMNG_TIME = AiCtFrame.bussinessData.BEGIN_SALE_TIME;
			var END_CNTMNG_TIME = current_date.toLocaleString().replace(/年|月/g,'-').replace(/日/g,'');
            var CNVST_RSLT_CD = "";//暂时不支持
            var CNTMNG_TYPE_CD = call_type;
            srvMap.add('marketService', 'marketService.json','front/sh/market!index?uid=mt008');//回调服务
            var jsonParam={'CMPGN_ID':CMPGN_ID,'CNTMNG_ID':CNTMNG_ID,'RESV_MOBNUM':RESV_MOBNUM,'CUST_STS_CD':CUST_STS_CD,'BGN_CNTMNG_TIME':BGN_CNTMNG_TIME,'END_CNTMNG_TIME':END_CNTMNG_TIME,'CNVST_RSLT_CD':'','CNTMNG_TYPE_CD':CNTMNG_TYPE_CD};
			Util.ajax.postJsonSync(srvMap.get('marketService'),jsonParam,function(json,status){
			    if (status) {
			    }else{
			        Util.dialog.tips('结束营销失败！');
			    }
			});				
			
			if(call_type==0){
				srvMap.add('marketActivity', 'marketActivity.json','front/sh/market!index?uid=my023');//查询省数据
				Util.ajax.postJsonSync(srvMap.get('marketActivity'),'&RESV_MOBNUM='+num,function(json,status){
				    if (status) {
				    	$(".ui-loading").addClass("fn-hide");
				    	var datas = {};
				    	datas.mkt = json;
				    	Util.ajax.loadTemp(obj0,$('#T_contact_left'),datas);//加载模板
				    	
				    }else{
						$(".ui-loading").removeClass("fn-hide");
				        Util.dialog.tips('查询失败，请重试！');
				    }
				});				
			}			
		}
		
/*		callBackSale : function(num)
		{
			var current_date = new Date();
			var call_type = $("#call_type").val();
			var CMPGN_ID = AiCtFrame.bussinessData.CMPGN_ID;
			var CNTMNG_ID = AiCtFrame.BusinessTracks.contactObj.cntmngId;
			var RESV_MOBNUM = AiCtFrame.BusinessTracks.callingObj.custMobnum;
			var CUST_STS_CD = '3';
			var BGN_CNTMNG_TIME = AiCtFrame.bussinessData.BEGIN_SALE_TIME;
			var END_CNTMNG_TIME = current_date.toLocaleString().replace(/年|月/g,'-').replace(/日/g,'');
            var CNVST_RSLT_CD = "";//暂时不支持
            var CNTMNG_TYPE_CD = call_type;
            srvMap.add('marketService', 'marketService.json','front/sh/market!index?uid=mt008');//回调服务
            var jsonParam={'CMPGN_ID':CMPGN_ID,'CNTMNG_ID':CNTMNG_ID,'RESV_MOBNUM':RESV_MOBNUM,'CUST_STS_CD':CUST_STS_CD,'BGN_CNTMNG_TIME':BGN_CNTMNG_TIME,'END_CNTMNG_TIME':END_CNTMNG_TIME,'CNVST_RSLT_CD':'','CNTMNG_TYPE_CD':CNTMNG_TYPE_CD};
			Util.ajax.postJsonSync(srvMap.get('marketService'),jsonParam,function(json,status){
			    if (status) {
			    	 AiSoftPhone.callBackSale();
			    }else{
			        Util.dialog.tips('结束营销失败！');
			    }
			    AiSoftPhone.refreshUserHasActivity(num);
			});	            
		}*/
}
